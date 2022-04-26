const express = require("express");
const router = express.Router();

const axios = require("axios");
router.get("/getMyPlaylists", (req, res) => {
  let url = "https://api.spotify.com/v1/me/playlists?limit=40";
  axios
    .get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + global.access_token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status == 200) {
        res.status(200).send(response.data);
      }
    })
    .catch((error) => {
      console.log("an error happened at /playlist/getMyPlaylists");
    });
});

router.get("/getPlaylistItems", (req, res) => {
  let playlistId = req.query.playlistId;
  let market = req.query.market;
  console.log(playlistId, market);
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=${market}`;
  axios
    .get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + global.access_token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status == 200) {
        console.log(response.data);
        res.status(200).send(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("an error happened at /playlist/getMyPlaylists");
    });
});

module.exports = { router };
