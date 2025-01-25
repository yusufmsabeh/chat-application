module.exports = {
  content: {
    trim: true,
    notEmpty: {
      errorMessage: "content is required",
    },
  },
  group_id: {
    trim: true,
    notEmpty: {
      errorMessage: "group_id is required",
    },
  },
};
