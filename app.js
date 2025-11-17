import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import usersRouter from "./routes/users-routes/usersRouter.js";
import contactsRouter from "./routes/contacts-routes/contactsRouter.js";
import groupsRouter from "./routes/contacts-routes/groupsRouter.js";
// import companiesRouter from "./routes/contacts-routes/companiesRouter.js";
// import suppliersRouter from "./routes/contacts-routes/suppliersRouter.js";
// import clientsRouter from "./routes/contacts-routes/clientsRouter.js";

const { PORT = 3000 } = process.env;
const allowedOrigins = [
  "http://localhost:3000",
  "https://phonebook-seven-beta.vercel.app",
];

const app = express();

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/users", usersRouter);

app.use("/api/people/contacts", contactsRouter);
app.use("/api/people/groups", groupsRouter);
// app.use("/api/contacts/companies", companiesRouter);
// app.use("/api/contacts/suppliers", suppliersRouter);
// app.use("/api/contacts/clients", clientsRouter);

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
