import Router from "express";
import { Post } from "../model/Post/Post";

const router = Router();

// Post ALl
router.get("/", (req, res) => {
  Post.findAll()
    .then(project => res.send(project))
    .catch(err => err);
});

// Post Create
router.post("/", (req, res) => {
  const { title, body } = req.body;
  console.log(title, body);
  Post.create({ title, body })
    .then(post => res.status(200).send(`Created post ${post.id}`))
    .catch(err => {
      console.log(err);
      res.status(401).send("Fail to create post");
    });
});

// Post read
router.post("/:postId", (req, res) => {
  const { postId } = req.params;
  Post.findOne({ where: { id: postId } })
    .then(post =>
      res
        .status(200)
        .send(`id:${post.id}, title:${post.title},body:${post.body}`)
    )
    .catch(err => console.log(err));
});

//Post Update
router.patch("/:postId", (req, res) => {
  const { postId } = req.params;
  const { title, body } = req.body;
  Post.update({ title, body }, { where: { id: postId } })
    .then(() => res.status(200).send("Update complete!"))
    .catch(err => console.log(err));
});

//Post Delete
router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  Post.destroy({ id: postId })
    .then(() => res.status(200).send("Destroy complete!"))
    .catch(err => console.log(err));
});

export default router;
