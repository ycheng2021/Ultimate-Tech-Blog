const router = require("express").Router();
const { Post } = require("../models");

// post a comment

router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
    //   post_id: req.session.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
