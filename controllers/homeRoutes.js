const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all posts
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["contents"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
    // res.json(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the page to sign up
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// new/post route to get the form to make new post, use withAuth
router.get("/new/post", withAuth, async (req, res) => {
  try {
    res.render("newpost", {
      logged_in: req.session.logged_in,
    });
    // res.json(car)
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for dashboard
router.get("/user/posts", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
    // res.json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for page to add comments
router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["contents", "date_created", "user_id"],
          include: [
            {
             model: User,
             attributes:["username"]
            }
          ]
        },
      ],
    });
    // Serialize data so the template can read it
    const post = postData.get({ plain: true });
    // console.log(post)
    res.render("addComment", {
      post,
      logged_in: req.session.logged_in,
    });
    // res.json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// redirect to login if not logged in
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  try {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }

    res.render("login");
  } catch (err) {
    console.log(err);
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["contents"],
        },
      ],
    });
    // Serialize data so the template can read it
    const post = postData.get({ plain: true });
    console.log(post);
    // Pass serialized data and session flag into template
    res.render("singlepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
