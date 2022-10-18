import bcrypt from "bcrypt";
import authenticationHelper from "../helpers/authenticationHelper.js";
import User from "./../models/user.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

export const login = async (req, res) => {
  //email and password
  const { email, password } = req.body;

  try {
    //check if there is a password?
    if (!password) {
      return res.status(400).json({ mesage: "No password supplied" });
    }

    //check if a user with that email address exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      console.log("Yaay we're authenticated");
      //generate a token for the user using the authentication helper
      const token = await authenticationHelper.generateToken(user);

      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false, // we are not using https
          sameSite: false,
        })
        .json({ message: "You are authenticated, welcome!" });
    } else {
      return res.status(400).json({ message: "No access granted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  //we're hashing the password that the user provided us.
  // we don't want to store the password in plain text in the db
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const userUsernameExists = await User.findOne({
      userName: req.body.userName,
    });
    const userEmailExists = await User.findOne({ email: req.body.email });

    if (userUsernameExists || userEmailExists) {
      return res.status(409).send({ message: "User already registered" });
    }

    //creating the user document into the users collection
    const createdUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "User created", createdUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
