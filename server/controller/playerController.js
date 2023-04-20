const fetch = require('node-fetch');

playerController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return { 
    log: `swapiController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in swapiController.${method}. Check server logs for more details.` }
  };
};


//middleware to retrieve characters
playerController.getPlayers = async (req, res, next) => {
  const name = req.params.name;
  fetch(`https://www.balldontlie.io/api/v1/players?search=${name}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.data)
    const playersObj = data.data[0]
    const {id, first_name, last_name, position, team} = playersObj;
    const {full_name} = team
    console.log(full_name)
    res.locals.players = {id, first_name, last_name, position, full_name}
    return next();
  })
  .catch(err => {
    console.log(err);
    return next(createErr({
      method: "getStats",
      type: err.type,
      err: err
    }));
  })

}

playerController.getPlayersStats = (req, res, next) =>{
  const charId = req.params.id;
  fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${charId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.data);
      const statsObj = data.data[0];
      const {games_played, pts, reb, ast, stl, blk, fg_pct, fg3_pct, ft_pct} = statsObj
      res.locals.stats = {games_played, pts, reb, ast, stl, blk, fg_pct, fg3_pct, ft_pct};
      return next();
    })
    .catch(err => {
      console.log(err);
      return next(createErr({
        method: "getStats",
        type: err.type,
        err: err
      }));
    })
}

module.exports = playerController;