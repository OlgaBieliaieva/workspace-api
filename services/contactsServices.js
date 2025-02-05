import Contact from "../models/contact.js";

export const findContact = (filter) => Contact.findOne(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const getAll = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings);
};

export const removeContact = (filter) => Contact.findOneAndDelete(filter);
