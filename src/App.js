import React from 'react';
import PlayerCard from './components/PlayerCard';

import './styles/styles.css'

export default function App(){
  return (
    <>
        <main className="twoCardsContainer">
          <PlayerCard />
          <PlayerCard />
        </main>
    </>
  )
}
