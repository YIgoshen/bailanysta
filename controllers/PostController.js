import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save()

    res.json(post)
  } catch (error) {
    console.log("Register error:", error)
    res.status(500).json({ message: "Couldn't create a post"})
  }
}

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec()

    const tags = posts
      .map(obj => obj.tags)
      .flat()
      .slice(0, 5)

    res.json(tags)
  } catch (e) {
    console.log('----Get all posts error:', e);
    res.status(500).json({
      message: "Couldn't get posts"
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()

    res.json(posts)
  } catch (e) {
    console.log('----Get all posts error:', e);
    res.status(500).json({
      message: "Couldn't get posts"
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    const doc = await PostModel.findByIdAndUpdate(
      // {
      //   _id: postId,
      // },
      postId,
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      },
      // MongooseError: Model.findByIdAndUpdate() no longer accepts a callback
      // 4-м параметром передаем функцию, которая будет выполняться - когда произойдет изменение и обновление статьи - что делать дальше.
      // (err, doc) => {
      //   if (err) {
      //     console.log('Doc err:', err);
      //     return res.status(500).json({
      //       message: 'Не удалось вернуть статью'
      //     })
      //   }

      //   if (!doc) {
      //     return res.status(404).json({
      //       message: "Статья не найдена"
      //     })
      //   }

      //   res.json(doc)
      // }
    )

    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена"
      });
    }
  
    res.json(doc);
  } catch (e) {
    console.log('----Get all posts error:', e);
    res.status(500).json({
      message: "Couldn't get posts"
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id         // id is from url - app.get('/posts/:id'

    const doc = await PostModel.findOneAndDelete({
      _id: postId,
    })

    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена"
      })
    }

    res.json({
      success: true
    })
  } catch (e) {
    console.log('----Remove post:', e);
    res.status(500).json({
      message: "Couldn't remove posts"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id         // id is from url - app.get('/posts/:id'

    const doc = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId, 
      }
    )
    
    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена"
      })
    }

    res.json({
      success: true
    })
  } catch (e) {
    console.log('----Update post:', e);
    res.status(500).json({
      message: "Couldn't update posts"
    })
  }
}
