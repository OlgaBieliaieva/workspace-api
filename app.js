import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import contactsRouter from "./routes/contacts-routes/contactsRouter.js";
// import companiesRouter from "./routes/contacts-routes/companiesRouter.js";
// import suppliersRouter from "./routes/contacts-routes/suppliersRouter.js";
// import clientsRouter from "./routes/contacts-routes/clientsRouter.js";
// import groupsRouter from "./routes/contacts-routes/groupsRouter.js";

import usersRouter from "./routes/users-routes/usersRouter.js";

const { PORT = 3000 } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", usersRouter);

app.use("/api/contacts/", contactsRouter);
// app.use("/api/contacts/companies", companiesRouter);
// app.use("/api/contacts/suppliers", suppliersRouter);
// app.use("/api/contacts/clients", clientsRouter);
// app.use("/api/contacts/groups", groupsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
