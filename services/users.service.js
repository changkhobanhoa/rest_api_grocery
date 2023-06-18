const { user } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

async function login(email, password, calback) {
  const userModel = await user.find({ email });

  if (userModel.length != 0) {
    
    if (bcrypt.compareSync(password, userModel[0].password)) {

      let tokenData;
      tokenData = { userId: userModel[0].id, email: userModel[0].email, fullName:userModel[0].fullName  };

      const token = auth.generateAccessToken(tokenData);
      return calback(null, { ...tokenData, token });
    } else {
      return calback({ message: "Invalid Email/Password" });
    }
  } else {
    return calback({
      message: "Invalid Email/Password",
    });
  }
}

async function register(params, calback) {
  if (params.email === undefined) {
    return calback({
      message: "Email Required",
    });
  }
  let isUserExits = await user.findOne({ email: params.email });

  if (isUserExits) {
    return calback({
      message: "Email already registered",
    });
  }
  const salt = bcrypt.genSaltSync(10);
  params.password = bcrypt.hashSync(params.password, salt);
  const userSchema = new user(params);
  userSchema
    .save()
    .then((response) => {
      return calback(null, response);
    })
    .catch((error) => {
      return calback(null, error);
    });
}

module.exports = {
  login,
  register,
};
