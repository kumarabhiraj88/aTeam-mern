import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import globalErrorHandler from "./src/utils/GlobalErrorHandler.js";

//routes
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

const app = express();
app.use(express.json());

app.use(cors());

//writing an api keyword before all apis
app.use("/api/admin/user", userRoutes);
app.use("/api/admin/product", productRoutes);

//ERROR HANDLER
app.use(globalErrorHandler);

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//connecting to DB
const DB_CONN_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@merndbcluster.b3mvtzv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4001;

mongoose
  .connect(DB_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
  })
  .catch((error) => {
    console.log("Database Connection Failed -", error);
  });
