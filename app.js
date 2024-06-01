import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import employeesRouter from "./routes/contacts-routes/employeesRouter.js";

const { DB_CONTACTS_HOST, PORT = 3000 } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts/employees", employeesRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_CONTACTS_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
