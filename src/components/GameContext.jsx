// import React, { createContext, useState, useEffect } from 'react';

// export const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [selectedSetId, setSelectedSetId] = useState(() => {
//     const savedSetId = localStorage.setItem('selectedSetId',1);
//     return savedSetId ? JSON.parse(savedSetId) : null;
//   });

//   const [tries, setTries] = useState(() => {
//     const savedTries = localStorage.getItem('tries');
//     return savedTries ? JSON.parse(savedTries) : 0;
//   });

//   const [timer, setTimer] = useState(() => {
//     const savedTimer = localStorage.getItem('timer');
//     return savedTimer ? JSON.parse(savedTimer) : 0;
//   });

//   useEffect(() => {
//     localStorage.setItem('selectedSetId', JSON.stringify(selectedSetId));
//   }, [selectedSetId]);

//   useEffect(() => {
//     localStorage.setItem('tries', JSON.stringify(tries));
//   }, [tries]);

//   useEffect(() => {
//     localStorage.setItem('timer', JSON.stringify(timer));
//   }, [timer]);

//   return (
//     <GameContext.Provider value={{ selectedSetId, setSelectedSetId, tries, setTries, timer, setTimer }}>
//       {children}
//     </GameContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [selectedSetId, setSelectedSetId] = useState(() => {
    const savedSetId = localStorage.getItem('selectedSetId');
    return savedSetId ? JSON.parse(savedSetId) : null;
  });

  const [tries, setTries] = useState(() => {
    const savedTries = localStorage.getItem('tries');
    return savedTries ? JSON.parse(savedTries) : 0;
  });

  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem('timer');
    return savedTimer ? JSON.parse(savedTimer) : 0;
  });

  useEffect(() => {
    localStorage.setItem('selectedSetId', JSON.stringify(selectedSetId));
  }, [selectedSetId]);

  useEffect(() => {
    localStorage.setItem('tries', JSON.stringify(tries));
  }, [tries]);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(timer));
  }, [timer]);

  return (
    <GameContext.Provider value={{ selectedSetId, setSelectedSetId, tries, setTries, timer, setTimer }}>
      {children}
    </GameContext.Provider>
  );
};
    