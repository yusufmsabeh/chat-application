module.exports = {
  user_id: {
    trim: true,
    notEmpty: {
      errorMessage: "user_id is required",
    },
    in: ["params"],
  },
};
