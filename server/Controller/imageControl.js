const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "1c486cd4473e4239bfddebe2232e3ef2"
});

const imageUrl = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      return res.json(data);
    })
    .catch(err => res.status(400).json(err));
};

const image = (req, res, db) => {
  const { id } = req.body;
  return db("users")
    .where("id", "=", Number(id))
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(404).json("User not found"));
};

module.exports = {
  image,
  imageUrl
};
