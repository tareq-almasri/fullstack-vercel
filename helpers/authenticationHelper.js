import jwt from "jsonwebtoken";

/**
 * This function generates a token based on a user.
 * @param {*} user
 * @returns
 */
const generateToken = (user) => {
  const payload = { sub: user._id }; // subject = user

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};

export default { generateToken };
