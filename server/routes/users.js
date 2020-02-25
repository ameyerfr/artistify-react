/*------------------------------------------
// USERS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get("/users", async (req, res, next) => {
  try {
    res.json({ users: await userModel.find() });
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    res.json(await userModel.findById(req.params.id));
  } catch (dbErr) {
    next(dbErr);
  }
});

router.get("/users/:id/favorites", async (req, res, next) => {
  userModel.findById(req.params.id)
  .populate("favorites.albums")
  .then(user => {
    res.status(200).json({favoriteAlbums : user.favorites.albums})
  }).catch(next)
});

router.patch("/users/favorites/:resourceType/:id", async (req, res, next) => {

  userModel.findById(req.user._id)
  .then(user => {
    let isFavorite;
    resourceFavorites = user.favorites[req.params.resourceType];

    // Already favorites => remove
    if (resourceFavorites.includes(req.params.id)) {
      resourceFavorites.splice(resourceFavorites.indexOf(req.params.id), 1);
      isFavorite = false;
    // Not favorited yet => add
    } else {
      resourceFavorites.push(req.params.id);
      isFavorite = true;
    }

    user.save(function (err) {
      if (err) { next(err); return; }
      res.status(200).json({ isFavorite: isFavorite })
    });

  }).catch(next)

});

module.exports = router;
