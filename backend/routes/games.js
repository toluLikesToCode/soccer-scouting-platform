const express = require('express');
const router = express.Router();
const controllers = require("../controllers/games")



router.put("/update/:gameId",controllers.updateGame)
router.get("/all",controllers.getGames)
router.get("/projection", controllers.getGameStatsProjection);
router.get("/goalscorers/:gameId", controllers.getGoalScorers); 
router.delete("/delete/:gameId",controllers.deleteGame)
router.post("/add",controllers.addGame)


module.exports = router;