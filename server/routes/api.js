const express = require('express');
const playerController = require('../controller/playerController')
const router = express.Router();

router.get('/:name', playerController.getPlayers, (req, res) => {
  return res.status(200).json(res.locals.players)
})

router.get('/stats/:id', playerController.getPlayersStats, (req, res) => {
  return res.status(200).json(res.locals.stats)
})

module.exports = router;