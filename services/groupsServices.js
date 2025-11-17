import Group from "../models/group.js";

export function getAll(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Group.find(filter, fields, settings);
}

export const count = async (filter) => {
  return Group.countDocuments(filter);
};

export async function getById(filter) {
  const result = await Group.findOne(filter);
  return result;
}

export function removeGroup(filter) {
  return Group.findOneAndDelete(filter);
}

export function addGroup(data) {
  return Group.create(data);
}

export const updateGroupById = (filter, data) => {
  return Group.findOneAndUpdate(filter, data);
};
