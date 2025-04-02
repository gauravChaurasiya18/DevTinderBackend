const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is Not Valid");
  } else if (firstName.length < 2 || firstName.length > 10) {
    throw new Error("Not Valid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};
const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "photoUrl",
  ];

  const isEditAbleOrNot = Object.keys(req.body).every((field) => {
    return allowedEditFields.includes(field);
  });
  return isEditAbleOrNot;
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
