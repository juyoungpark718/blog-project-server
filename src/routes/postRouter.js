import Router from "express";
import { Post } from "../model/Post/Post";
import multer from "multer";

const date = new Date();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });
const router = Router();

// Post ALl
router.get("/", (req, res) => {
  Post.findAll()
    .then(project => res.send(project))
    .catch(err => err);
});

router.post("/upload", upload.single("upload"), (req, res) => {
  const { file } = req;
  console.log("file:", file);
  res.send({
    uploaded: true,
    url: `http://localhost:4000/uploads/${file.originalname}`
  });
});

// Post Create
router.post("/", (req, res) => {
  const { title, body, rawBody } = req.body;
  console.log("title:", title);
  console.log("body:", body);
  console.log("rawBody:", rawBody);
  // Post.create({ title, body, rawBody })
  //   .then(post => res.status(200).send(`Created post ${post.id}`))
  //   .catch(err => {
  //     console.log(err);
  //     res.status(401).send("Fail to create post");
  //   });
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
