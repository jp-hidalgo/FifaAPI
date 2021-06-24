module.exports = app => {
  const players = require("../controllers/player.controller.js");

  var router = require("express").Router();

  // Create a new Player
  router.post("/", players.create);

  // Retrieve all Players
  router.post("/team", players.findTeam);

  // Retrieve Players with name
  router.get("/players", players.findPlayers);
  
  // Retrieve a single Player with id
  router.get("/:id", players.findOne);

  app.use('/api/v1', router);
};