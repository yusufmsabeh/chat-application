const Group = require("../models/group");

exports.postGroup = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: `Name is required`,
      });
    const group = await req.user.createGroup({
      name: name,
    });

    res.status(200).json({
      status: "success",
      code: 200,
      message: `group created successfully`,
      data: {
        group: {
          id: group.id,
          name: group.name,
          members: group.members,
        },
      },
    });
    console.log(typeof group, "\n", group);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Something went wrong",
    });
  }
};

exports.postJoinGroup = async (req, res) => {
  try {
    const { group_id } = req.body;
    if (!group_id)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "All fields are required (group_id) ",
      });

    const group = await Group.findByPk(group_id);
    if (!group)
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "There is no group with this ID",
      });
    const isJoined = await req.user.hasGroup(group_id);
    if (isJoined)
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "You are already joined this group",
      });
    await req.user.addGroup(group_id);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Group joined successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Something went wrong",
    });
  }
};
