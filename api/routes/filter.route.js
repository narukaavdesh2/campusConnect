// user.route.js
import express from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
const router = express.Router();

router.get("/unique-passout-years", async (req, res) => {
  try {
    const years = await User.distinct("passoutYear");
    res.json(years.sort((a, b) => b - a)); // latest first
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/unique-branches", async (req, res) => {
  try {
    const branches = await User.distinct("branch");
    res.json(branches.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/post", async (req, res) => {
  const { year, branch, category } = req.query;
  const postFilter = {};

  // Case-insensitive category
  if (category) {
    postFilter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  try {
    const userFilter = {};
    if (year) userFilter.passoutYear = Number(year);
    if (branch) {
      userFilter.branch = { $regex: new RegExp(`^${branch}$`, "i") };
    }

    let posts;

    if (!year && !branch) {
      posts = await Post.find(postFilter).populate(
        "createdBy",
        "username avatar"
      );
    } else {
      const users = await User.find(userFilter).select("_id"); // <-- ✅ FIXED HERE
      const userIds = users.map((u) => u._id);
      postFilter.createdBy = { $in: userIds };

      posts = await Post.find(postFilter).populate(
        "createdBy",
        "username avatar"
      );
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error in /api/filter/post:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/profiles', async (req, res) => {
  const { year, branch } = req.query;
  const filter = {};
  if (year) filter.passoutYear = Number(year);
  if (branch) filter.branch = new RegExp(`^${branch}$`, 'i'); // case-insensitive exact match

  try {
    const users = await User.find(filter).select('username avatar branch passoutYear');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
