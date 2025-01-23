module.exports = {
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 3,
        max: 50,
      },
      errorMessage: "Name length must be between 3 and 50.",
    },
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
  password: {
    trim: true,
    notEmpty: {
      errorMessage: "password is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
};
