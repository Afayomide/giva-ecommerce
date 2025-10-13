import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ max: 255 })
    .withMessage("Email too long")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .isLength({ max: 255 })
    .withMessage("Email too long")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("fullName")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),
];
