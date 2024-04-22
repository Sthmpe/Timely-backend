import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";


/**
 * Connects to the MongoDB database using the connection string from the environment variables.
 */

mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("connected to database!"));

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
	res.send({ message: "Health OK!" });
});

// Routes
app.use("/api/my/user", myUserRoute);

// Start the server
app.listen(7000, () => {
	console.log("server stared on localhost:7000")
});
