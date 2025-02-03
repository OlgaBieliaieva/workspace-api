import mongoose from "mongoose";


const { DB_USERS_HOST, DB_CONTACTS_HOST, DB_WORKSPACES_HOST, PORT = 3000 } = process.env;

export const usersDB = mongoose.createConnection(DB_USERS_HOST);
export const contactsDB = mongoose.createConnection(DB_CONTACTS_HOST);
export const workspacesDB = mongoose.createConnection(DB_WORKSPACES_HOST);

