module.exports = {
  content: {
    trim: true,
    notEmpty: {
      errorMessage: "content is required",
      bail: true,
    },
  },
  receiver_id: {
    trim: true,
    notEmpty: {
      errorMessage: "receiver_id is required",
      bail: true,
    },
  },
};
