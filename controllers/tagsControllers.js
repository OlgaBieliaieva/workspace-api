import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as tagsService from "../services/tagsServices.js";
import HttpError from "../helpers/HttpErrors.js";

const createTag = async (req, res) => {
  console.log("REQ.USER IN CONTROLLER:", req.user);
  const { _id: userId } = req.user;
  const data = req.body;

  // prevent duplicates by name
  const exists = await tagsService.findTag({
    user: userId,
    name: data.name,
  });

  if (exists) {
    throw HttpError(400, `Tag "${data.name}" already exists.`);
  }

  const newTag = await tagsService.addTag({
    ...data,
    user: userId,
  });

  res.status(201).json(newTag);
};

const getAll = async (req, res) => {
  const { _id: userId } = req.user;
  const { module = null, page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  const filter = {
    user: userId,
    ...(module ? { modules: module } : {}),
  };

  const fields = "-createdAt -updatedAt";

  const settings = {
    skip,
    limit: Number(limit),
  };

  const tags = await tagsService.getAll({ filter, fields, settings });
  const total = await tagsService.count(filter);

  res.status(200).json({
    total,
    page: Number(page),
    limit: Number(limit),
    result: tags,
  });
};

const getById = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const tag = await tagsService.findTag({
    _id: id,
    user: userId,
  });

  if (!tag) throw HttpError(404, "Tag not found or access denied");

  res.status(200).json(tag);
};

const updateTag = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const tag = await tagsService.findTag({ _id: id, user: userId });
  if (!tag) throw HttpError(404, "Tag not found or access denied");

  const updated = await tagsService.updateTagById({ _id: id }, req.body);

  res.status(200).json(updated);
};

const deleteTag = async (req, res) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const tag = await tagsService.findTag({ _id: id, user: userId });
  if (!tag) throw HttpError(404, "Tag not found or access denied");

  await tagsService.removeTag({ _id: id });

  res.status(200).json({ message: "Tag deleted successfully" });
};

export default {
  createTag: ctrlWrapper(createTag),
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateTag: ctrlWrapper(updateTag),
  deleteTag: ctrlWrapper(deleteTag),
};
