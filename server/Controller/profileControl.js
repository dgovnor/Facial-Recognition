const profile = (req, res, db) => {
  const { id } = req.params;
  db.select()
    .from("users")
    .where({ id: Number(id) })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        throw new Error();
      }
    })
    .catch(err => res.status(400).json("error getting user"));
};

module.exports = {
  profile
};
