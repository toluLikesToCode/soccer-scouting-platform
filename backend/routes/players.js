const express = require('express');
const router = express.Router();
const controllers = require("../controllers/players");

router.get("/player-stats", controllers.getPlayerStats);
router.delete("/delete/:playerId", controllers.deletePlayer); 
router.get("/games-where-player-scored/:playerId", controllers.getGamesWherePlayerScored);
router.get('/who-scored-in-every-game', controllers.getPlayersWhoScoredInEveryGame);

router.get("/player-average-stats",controllers.getPlayerAverageStats);

router.get("/count-by-club",controllers.getPlayerCountByClub);

router.get("/selectionquery",controllers.getSelectionResutls);


module.exports = router;
