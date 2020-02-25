/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");

const getAverageRate = async idArtist => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
};

router.get("/artists", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit artists ? > ", sortQ, limitQ);
  artistModel
    .find({})
    .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async artists => {
      const artistsWithRatesAVG = await Promise.all(
        artists.map(async res => {
          // AVG : things are getting tricky here ! :) 
          // the following map is async, updating each artist with an avg rate
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          // copy.avg = await getAverageRate(res._id); // get the average rates fr this artist

          copy.isFavorite =
            req.user && req.user.favorites.artists.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithRatesAVG }); // send the augmented result back to client
    })
    .catch(next);
});


router.get("/artists/:id", (req, res, next) => {
  artistModel.findById(req.params.id)
  .then(artist => {
    res.status(200).json(artist)
  }).catch(err => {
    res.status(500).json(err)
  })
});

router.get("/filtered-artists", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

router.post("/artists", (req, res) => {
  const newArtist = {...req.body}

  artistModel.create(newArtist)
  .then((results) => {
    res.status(200).json({ msg: "YES" })
  }).catch(err => {
    res.status(500).json(err)
  });
})

router.patch("/artists/:id", (req, res, next) => {
  const updatedArtist = req.body;

  console.log(req.body)

  artistModel
    .findByIdAndUpdate(req.params.id, updatedArtist)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(next);
});

router.delete("/artists/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" })
});

module.exports = router;
