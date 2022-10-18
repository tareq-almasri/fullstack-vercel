import passportJWT from "passport-jwt";
import User from "./models/user.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configureJwtStrategy = (passport) => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        //where is the token located in the request
        //here we read the token from the cookie
        jwtFromRequest: (req) => req.cookies["jwt"],
        //which secret was used to sign it?
        secretOrKey: process.env.SECRET,
      },
      (jwtPayload, done) => {
        return User.findById(jwtPayload.sub)
          .select("_id firstName lastName email")
          .then((user) => {
            //attach a user object to the request object.
            //first parameter is error paramter: null
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};

export default configureJwtStrategy;
