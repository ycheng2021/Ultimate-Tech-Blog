const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// post a comment

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
    });
    // res.status(200).json(newComment);
    res.json(newComment)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
