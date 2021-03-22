const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });

    //   const comment = await Comment.create(req.body);

      console.log(req.body);
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/:id', withAuth, async (req, res) => {
      try{
          var comment = await Comment.create({
              ...req.body,
              post_id:req.body.post_id,
              user_id: req.session.user_id
          })

          console.log(comment)
          res.status(200).json(comment);
      }catch (err) {
        res.status(400).json(comment);
      }
  })

  router.delete('/:id', withAuth, async (req, res) => {
      try{
          const postData = await Post.destroy({
              where: {
                  id: req.params.id,
                  user_id: req.session.user_id,
              }
          })

          if (!postData){
              res.status(404).json({message: 'Post does not exist'});
              return
          }
          res.status(200).json(postData);
      }catch (err){
          res.status(500).json(err);
      }
  })

  router.put('/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.update(req.body,{
            where: {
        
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })
        if (!postData){
            res.status(404).json({message: 'Post does not exist'});
            return
        }
        res.status(200).json(postData);
    }catch (err){
        res.status(500).json(err);
    }
  })
  module.exports = router;