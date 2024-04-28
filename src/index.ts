import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute"

/**
 * Connects to the MongoDB database using the connection string from the environment variables.
 */
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("connected to database!"));

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
	res.send({ message: "Health OK!" });
});

// Routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

// Start the server
app.listen(7000, () => {
	console.log("server stared on localhost:7000")
});
