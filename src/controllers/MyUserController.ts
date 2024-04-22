import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const currentUser = await User.findOne({ _id: req.userId });

		if (!currentUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(currentUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

/**
 * Handles the creation of a new user.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const createCurrentUser = async (req: Request, res: Response) => {
	try {
		const { auth0Id } = req.body;
		const existingUser = await User.findOne({ auth0Id });

		if (existingUser) {
			return res.status(200).send();
		}

		const newUser = new User(req.body);
		await newUser.save();

		res.status(201).json(newUser.toObject());
	} catch (error) {
		console.log("createCurrentUser error message: ", error);
		res.status(500).json({ message: "Error creating user" });
	}
};

/**
 * Handles the update of an existing user.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const updateCurrentUser = async (req: Request, res: Response) => {
	try {
		const { name, location, office, hostel, phoneNumber } = req.body;
		const user = await User.findById(req.userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.name = name;
		user.location = location;
		user.office = office;
		user.hostel = hostel;
		user.phoneNumber = phoneNumber;

		await user.save();

		res.send(user);
	} catch (error) {
		console.log("updateCurrentUser error message: ", error);
		res.status(500).json({ message: "Error updating user" });
	}
};

export default {
	getCurrentUser,
	createCurrentUser,
	updateCurrentUser,
};