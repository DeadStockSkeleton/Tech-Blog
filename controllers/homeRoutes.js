const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        res.render('homepage', {
            logged_in:req.session.logged_in
        });
    }
    catch {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => { 
    res.render('login');
})
router.get('/signup', async(req, res) => {
    try{
      res.render('signup');  
    }
    catch{
        res.status(500).json(err);
    }
})

router.get('/dashboard', async(req, res) => {
   try {
       const userData = await User.findByPk(req.session.user_id, {
           attributes: {exclude: ['password']},
       })

       const user = userData.get({ plain: true });
       
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
   } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;