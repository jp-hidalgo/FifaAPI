const db = require("../models");
const Player = db.players;
// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if(!req.header("authkey")||req.header("authkey")!==process.env.API_KEY){
    res.status(401).send({message: "Unauthorized"});
    return;
  }
  // Create a Player
  const player = new Player({
    name: req.body.name,
    fieldPos: req.body.fieldPos,
    nationality: req.body.nationality,
    team: req.body.team
  });

  // Save Player in the database
  player
    .save(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

// Retrieve all Players from the database.
exports.findTeam = (req, res) => {
  const team = req.query.team;
  var condition = team ? { team: { $regex: new RegExp(team), $options: "i" } } : {};

  Player.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a players by name
exports.findPlayers = (req, res) => {
  const name = req.query.name;
  let sorting = 1;
  const order =req.query.order;
  if(order==="desc") sorting =-1;
  Player.find({ name: { $regex: new RegExp(name), $options: "i" }}).sort({name:sorting})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Players with name " + name });
      else{
        res.send(data);
      } 
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Players with name=" + name });
    });
};


