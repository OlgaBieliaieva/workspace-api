import Client from "../models/client.js";

export function getAll(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Client.find(filter, fields, settings);
}

export async function getById(filter) {
  const result = await Client.findOne(filter);
  return result;
}

export function removeClient(filter) {
  return Client.findOneAndDelete(filter);
}

export function addClient(data) {
  return Client.create(data);
}

export const updateClientById = (filter, data) => {
  return Client.findOneAndUpdate(filter, data);
};
