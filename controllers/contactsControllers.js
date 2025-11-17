import fs from "fs/promises";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpErrors.js";
import cloudinary from "../helpers/cloudinary.js";

const createContact = async (req, res) => {
  const { _id: createdBy } = req.user;
  const { phones } = req.body;

  if (phones && phones.length > 0) {
    for (const phone of phones) {
      const contactExists = await contactsService.findContact({
        createdBy,
        "phones.number": phone.number,
      });

      if (contactExists) {
        throw HttpError(
          400,
          `Contact with phone number ${phone.number} already exists.`
        );
      }
    }
  }

  try {
    if (req.file) {
      const { public_id: newAvatarId, secure_url: newAvatarUrl } =
        await cloudinary.uploader.upload(req.file.path, {
          folder: "workspace_avatars",
        });

      const newContact = await contactsService.addContact({
        ...req.body,
        createdBy,
        avatar: { avatarId: newAvatarId, avatarUrl: newAvatarUrl },
      });
      res.status(201).json(newContact);
    } else {
      const newContact = await contactsService.addContact({
        ...req.body,
        createdBy,
      });
      res.status(201).json(newContact);
    }
  } catch (error) {
    throw HttpError(400, error.message);
  } finally {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
  }
};

const deleteAvatar = async (req, res) => {
  const { id } = req.params;
  const { _id: createdBy } = req.user;

  const contact = await contactsService.findContact({ createdBy, _id: id });

  if (!contact) {
    throw HttpError(404, "Contact not found");
  }

  if (!contact.avatar || !contact.avatar.avatarId) {
    throw HttpError(400, "No avatar to delete");
  }

  try {
    await cloudinary.uploader.destroy(contact.avatar.avatarId);

    const updatedContact = await contactsService.updateContactById(
      { _id: id },
      {
        avatar: { avatarId: null, avatarUrl: null },
      }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    throw HttpError(500, `Error deleting avatar: ${error.message}`);
  }
};

const addAvatar = async (req, res) => {
  const { id } = req.params;
  const { _id: createdBy } = req.user;

  if (!req.file) {
    throw HttpError(400, "File not uploaded");
  }

  try {
    const { public_id: newAvatarId, secure_url: newAvatarUrl } =
      await cloudinary.uploader.upload(req.file.path, {
        folder: "workspace_avatars",
      });

    const contact = await contactsService.findContact({ createdBy, _id: id });

    if (contact.avatar?.avatarId) {
      await cloudinary.uploader.destroy(contact.avatar.avatarId);
    }

    const updatedContact = await contactsService.updateContactById(
      { _id: id },
      { avatar: { avatarId: newAvatarId, avatarUrl: newAvatarUrl } }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    throw HttpError(400, error.message);
  } finally {
    await fs.unlink(req.file.path);
  }
};

const updateContact = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const updateData = req.body;

  const contact = await contactsService.findContact({ _id: contactId });

  if (!contact) {
    throw HttpError(404, "Contact not found.");
  }

  if (contact.createdBy.toString() !== userId.toString()) {
    throw HttpError(403, "You don't have permission to update this contact.");
  }

  if (updateData.phones && updateData.phones.length > 0) {
    for (const phone of updateData.phones) {
      const existingContact = await contactsService.findContact({
        createdBy: userId,
        "phones.number": phone.number,
        _id: { $ne: contactId },
      });

      if (existingContact) {
        throw HttpError(
          400,
          `Contact with phone number ${phone.number} already exists.`
        );
      }
    }
  }

  try {
    const updatedContact = await contactsService.updateContactById(
      { _id: contactId },
      updateData
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    throw HttpError(400, error.message);
  }
};
const getAll = async (req, res) => {
  const { page = 1, limit = 20, filter = "" } = req.query;
  const { _id: userId } = req.user;
  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit: parseInt(limit, 10) };

  const filterQuery = {
    createdBy: userId,
    ...(filter
      ? {
          $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { middleName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } },
            { department: { $regex: filter, $options: "i" } },
            { position: { $regex: filter, $options: "i" } },
          ],
        }
      : {}),
  };

  const result = await contactsService.getAll({
    filter: filterQuery,
    fields,
    settings,
  });
  const total = await contactsService.count(filterQuery);
  res.status(200).json({
    total,
    page: Number(page),
    limit: Number(limit),
    result,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactsService.findContact({
    _id: id,
    createdBy: userId,
  });
  if (!contact) {
    throw HttpError(404, "Not found or access denied");
  }
  res.status(200).json(contact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const contact = await contactsService.findContact({
    _id: id,
    createdBy: userId,
  });

  if (!contact) {
    throw HttpError(404, "Not found or access denied");
  }

  try {
    if (contact.avatar && contact.avatar.avatarId) {
      await cloudinary.uploader.destroy(contact.avatar.avatarId);
    }

    const result = await contactsService.removeContact({
      _id: id,
      createdBy: userId,
    });

    if (!result) {
      throw HttpError(404, "Not found or access denied");
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    throw HttpError(500, "Failed to delete contact avatar or contact");
  }
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  createContact: ctrlWrapper(createContact),
  deleteAvatar: ctrlWrapper(deleteAvatar),
  addAvatar: ctrlWrapper(addAvatar),
  updateContact: ctrlWrapper(updateContact),
};
