module.exports = mongoose => {
    const Player = mongoose.model(
      "player",
      mongoose.Schema(
        {
          name: String,
          fieldPos: String,
          nationality: String,
          team: String
        },  
        { timestamps: false }
      )
    );
  
    return Player;
  };