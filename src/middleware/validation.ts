import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";


/**
 * Middleware function to handle validation errors.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 */
const handleValidationErrors = async (
	req: Request,
	res: Response, 
	next: NextFunction,
) => {
	const errors = validationResult(req);

	if (!errors.isEmpty) {
		return res.status(400).json({ error: errors.array() });
	}

	next();
};


/**
 * Middleware function to validate request body for creating a user.
 */
export const validateMyUserRequest = [
	body("name")
		.notEmpty().withMessage("Name cannot be empty")
		.isString().withMessage("Name must be a string"),
	body("location")
		.optional()
		.isString().withMessage("Name must be a string"),
	body("office")
		.optional()
		.isString().withMessage("Name must be a string"),
	body("hostel")
		.optional()
		.isString().withMessage("Name must be a string"),
	body("phoneNumber")
  	.notEmpty().withMessage("Phone number cannot be empty")
    .isString()
    .isLength({ min: 11, max: 11 }).withMessage("Phone number must be 11 digits"),
	handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a postivie integar"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a postive number"),
  handleValidationErrors,
];