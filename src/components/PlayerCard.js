import React, { useState, useEffect } from 'react';
import '../styles/styles.css'
// once the user hits sumbit, take the string in the input field and make a fetch to the server to retrieve the player's info

/*
const [name, setName] = useState('')
const [stats, setStats] = useState({});

function fetchUserStats() {
  e.preventDefault();
  fetch(localhost/${name})
}

function clearStates() {
  e.preventDefault();
  setName('');
  set3ptConversion('')

}

useEffect(()=> {
  doSomething()
},[])

return (
<form> 
inputfield --> onChange(setName(e.target.value)) 
button type submit  --> onclick(fetchUserStats)
button Clear --> onclick(clearStats)
</form>
)
*/

export default function PlayerCard(){
  // const [flip, setFlip] = useState(false);
  const [name, setName] = useState('')
  const [stats, setStats] = useState({});
  
  async function fetchPlayer(e) {
    e.preventDefault();
    console.log('name in playerCard', name)
    let response = await fetch(`http://localhost:3000/api/players/${name}`)
    const playersData = await response.json();
    console.log('playersData: ', playersData)
    response = await fetch(`http://localhost:3000/api/players/stats/${playersData.id}`)
    const playersStats = await response.json();
    console.log('playersStats: ', playersStats);
    const obj = {...playersData, ...playersStats};
    console.log(obj);
    await setStats(obj)
  }

  // useEffect(()=> {
  //   console.log('name in useEffect', name)
  // }, [])

  return(
    <div className='card-form-container'>
    <div className = 'card' >

        <div className='player-bio'>
          <div className='player-name-team'>
            <h2>{stats.first_name} {stats.last_name}</h2>
            <h3>{stats.full_name}</h3>
          </div>
          

          <div className='players-stats'>
            <div className="statCat"><div className="stat-label">Season</div> <div className="stat-info">2017-2018</div></div>
            <div className="statCat"><div className="stat-label">G</div><div className="stat-info">{stats.games_played}</div> </div>
            <div className="statCat"><div className="stat-label">FG%</div><div className="stat-info">{stats.fg_pct}</div> </div>
            <div className="statCat"><div className="stat-label">FT%</div><div className="stat-info">{stats.ft_pct}</div> </div>
            <div className="statCat"><div className="stat-label">3PT%</div><div className="stat-info">{stats.fg3_pct}</div> </div>
            <div className="statCat"><div className="stat-label">PPG</div><div className="stat-info">{stats.pts}</div> </div>
            <div className="statCat"><div className="stat-label">RPG</div><div className="stat-info">{stats.reb}</div> </div>
            <div className="statCat"><div className="stat-label">APG</div><div className="stat-info">{stats.ast}</div> </div>
            <div className="statCat"><div className="stat-label">SPG</div><div className="stat-info">{stats.stl}</div> </div>
            <div className="statCat"><div className="stat-label">BPG</div><div className="stat-info">{stats.blk}</div> </div>
        </div>

        </div>
    </div>
    <div className='form'>
        <form onSubmit={fetchPlayer}> 
          <label htmlFor='playerName'>
          Enter player name:
          <input id='playerName' type="text" required onChange={(e)=>{setName(e.target.value)}} /> 
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>

    </div>
  )
}