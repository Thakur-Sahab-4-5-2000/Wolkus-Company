const userSchema = require("../models/UserModel");

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userSchema.findOne({ email });
    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else res.json({ msg: "User with given email not found." });
  } catch (error) {
    res.json({ msg: "Error fetching movies." });
  }
};

const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await userSchema.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return res.json({
          msg: "Movie already liked.",
        });
      }
    } else await userSchema.create({ email, likedMovies: [data] });
    res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    res.json({ msg: "Error adding movie to the liked list" });
  }
};

const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ _id }) => _id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await userSchema.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      res.json({ msg: "Movie successfully removed.", movies });
    } else res.json({ msg: "User with given email not found." });
  } catch (error) {
    res.json({ msg: "Error removing movie to the liked list" });
  }
};

module.exports = {
  getLikedMovies,
  addToLikedMovies,
  removeFromLikedMovies,
};
