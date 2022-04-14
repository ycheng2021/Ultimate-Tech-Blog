const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['contents']
          }
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
      res.json(posts)
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get post by id 

// new/post route to get the form to make new post, use withAuth

// search a post by the term

// redirect to login if not logged in
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  