import Tag from "../models/tag.js";

export const findTag = (filter) => Tag.findOne(filter);

export const addTag = (data) => Tag.create(data);

export const updateTagById = (filter, data) =>
  Tag.findOneAndUpdate(filter, data);

export const getAll = ({ filter = {}, fields = "", settings = {} }) => {
  return Tag.find(filter, fields, settings);
};

export const count = (filter) => Tag.countDocuments(filter);

export const removeTag = (filter) => Tag.findOneAndDelete(filter);
