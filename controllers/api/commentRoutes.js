const router = require("express").Router();
const { redirect } = require("express/lib/response");
const { Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// post a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      user_id: req.session.user_id,
      post_id: req.body.post_id,
      ...req.body,
    });
    res.status(200).json(newComment);
    // res.json(newComment)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
