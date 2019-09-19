const User = require("../model/user");

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: "user not found." });
    }

    if (user.userId.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await user.findByIdAndRemove(req.params.userId);
    res.json({ msg: "Contact Removed." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "internal server error" });
  }
};
