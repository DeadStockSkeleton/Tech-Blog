const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        
        const postData = await Post.findAll({
            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          });
      
          // Serialize data so the template can read it
          const posts = postData.map((post) => post.get({ plain: true }));
          
        res.render('homepage', {
            posts,
            logged_in:req.session.logged_in
        });
    }
    catch {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        })

        const post = postData.get({plain: true});
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{ model: Post }],
        })
    
        const user = userData.get({ plain: true });
        res.render('edit', {
            ...user,
            ...post,
            logged_in: req.session.logged_in
        });
    }catch (err) {
        res.status(500).json(err);
    }
})

router.get('/new', async (req,res) => {
    const userData = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [{ model: Post }],
    })

    const user = userData.get({ plain: true });
    res.render('newPost', {
        ...user,
        logged_in:req.session.logged_in
    });
})

router.get('/post/:id', async (req,res) => {
    try{
        const postData = await Post.findByPk(req.params.id, {
            include: [
                'comment',
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        })
        
        
    

        const post = postData.get({plain: true});
        console.log(post)
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    }catch (err) {
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

router.get('/dashboard', withAuth, async(req, res) => {
   try {
       const userData = await User.findByPk(req.session.user_id, {
           attributes: {exclude: ['password']},
           include: [{ model: Post }],
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