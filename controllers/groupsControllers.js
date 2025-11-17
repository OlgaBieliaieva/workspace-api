import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as groupsService from "../services/groupsServices.js";

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
            { groupName: { $regex: filter, $options: "i" } },
            { groupDescription: { $regex: filter, $options: "i" } },
          ],
        }
      : {}),
  };

  const result = await groupsService.getAll({
    filter: filterQuery,
    fields,
    settings,
  });

  const total = await groupsService.count(filterQuery);

  res.status(200).json({
    total,
    page: Number(page),
    limit: Number(limit),
    result,
  });
};

const getGroupById = async (req, res) => {
  const { id } = req.params;
  const result = await groupsService.getById({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await groupsService.removeGroup({ _id: id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateGroup = async (req, res) => {
  const { id } = req.params;

  const result = await groupsService.updateGroupById({ _id: id }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const createGroup = async (req, res) => {
  const result = await groupsService.addGroup({ ...req.body });
  res.status(201).json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getGroupById: ctrlWrapper(getGroupById),
  deleteById: ctrlWrapper(deleteById),
  updateGroup: ctrlWrapper(updateGroup),
  createGroup: ctrlWrapper(createGroup),
};
