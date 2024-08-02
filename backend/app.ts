import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./router/router";
import connectDB from "./connectMongoDB/db";
const app = express();
const port = process.env.PORT || 7004;
const mongoURI = process.env.MONGODB_URI || 'default_connection_string';
const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

app.use(cors());

app.use(express.json());

app.use("/", router);

// Connect to MongoDB
connectDB();
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
