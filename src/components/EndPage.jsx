import React, { useContext, useEffect } from 'react';
import { GameContext } from './GameContext.jsx';
import axios from 'axios';

export default function EndPage() {
  const { tries, timer } = useContext(GameContext);

  useEffect(() => {
    const sendGameData = async () => {
      const hasSentGameData = localStorage.getItem('flag');
      if (hasSentGameData == 'true') {
        try {
          const gameId = localStorage.getItem('gameId');
          const childId = localStorage.getItem('childId');
          await axios.put(`https://jwlgamesbackend.vercel.app/api/caretaker/${gameId}/${childId}`, {
            tries: tries,
            timer: timer,
            status: true,
          },
            {
              headers: {
                "Authorization": `${localStorage.getItem('logintoken')}`
              }
            }
          );
          localStorage.setItem('flag', 'false');
        } catch (error) {
          console.log(error);
        }
      }
    };

    sendGameData();
  }, []);

  const handleHome = () => {  
    window.location.href = '/games/memorygame';
  }
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex align-items-center justify-content-center' style={{ marginTop: '3rem' }}>
              <p style={{ fontSize: '4rem' }}>Game Over</p>
            </div>

            <div className='d-flex align-items-center justify-content-center'>
              <p style={{ fontSize: '2rem' }}>Total Tries: {tries}</p>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <p style={{ fontSize: '2rem' }}>Total Time: {timer.toFixed(2)} seconds</p>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              <button type="button" className='btn btn-primary' onClick={handleHome}>Return to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
