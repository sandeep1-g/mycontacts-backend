const express = require("express");
const errorHandler = require("./middleware/errorHandle");
const connectDb = require("./config/dbconnection");
const dotenv = require("dotenv").config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts/user", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);
app.listen(port, () => {
    console.log(`${port}`);
});