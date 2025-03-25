// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Confetti from 'react-confetti';
// import { GameContext } from './GameContext.jsx';
// import { Popover } from 'bootstrap';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import {useWebcam , useSessionId , useCapture } from "image-capture-hooks";
// import "../styles/MissingLetterGame.css";
// export default function MissingLetterGame() {
//   const navigate = useNavigate();
//   // const { selectedSetId, timer, tries, setTries, setTimer } = useContext(GameContext);
//   const [wordsData, setWordsData] = useState(null);
//   const selectedSetId =1;
//   const {timer, setTries} = 


//   useEffect(() => {
//     if (selectedSetId === null) {
//       navigate('/');
//     }
//   }, [selectedSetId, navigate]);

//   const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
//   // eslint-disable-next-line
//   const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))

//   const [index, setIndex] = useState(1);
//   const [w, setW] = useState([]);
//   const [buttonColors, setButtonColors] = useState(Array(15).fill(''));
//   const [noOfTries, setNoOfTries] = useState(0);
//   const [nextButtonVisible, setNextButtonVisible] = useState(false);
//   const [correctTries, setCorrectTries] = useState(0);
//   const [correctIndex, setCorrectIndex] = useState([]);
//   const [startTime, setStartTime] = useState(new Date());
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [audioFiles, setAudioFiles] = useState({});
 
//   // I added
//   const [gameStarted, setGameStarted] = useState(false);
//   const location = useLocation();
//   const { username, gameName } = location.state || {};
//   const [intervalId, setIntervalId] = useState(null);
//   const { videoRef, webcamGranted, requestWebcamAccess } = useWebcam();
//   const { sessionId } = useSessionId();
//   const { canvasRef, captureImage, captureScreenshot } = useCapture(
//     videoRef,
//     sessionId
//   );
//   useEffect(() => {
//     return () => clearInterval(intervalId); // Cleanup the interval
//   }, [intervalId]);
  
//   const startGame = () => {
//     console.log("Game 2 - StartGame Debug Info:", {
//       sessionId,
//       username,
//       gameName,
//       webcamGranted,
//     });
    
//     setGameStarted(true);
//     const id = setInterval(() => {
//       console.log("Game 2 - Capture Interval Debug Info:", {
//         sessionId,
//         username,
//         gameName,
//       });
//       captureImage(sessionId, username || `Child_${sessionId}`, gameName);
//       captureScreenshot(sessionId, username || `Child_${sessionId}`, gameName);
//     }, 10000);
//     setIntervalId(id);
//   };
  
//     // Stop the webcam stream
//   const stopWebcamStream = () => {
//         if (videoRef.current && videoRef.current.srcObject) {
//           const tracks = videoRef.current.srcObject.getTracks();
//           tracks.forEach((track) => track.stop()); // Stop each track
//           videoRef.current.srcObject = null; // Clear the srcObject
//         }
//       };
    
//       // const currentQuestion = questions[currentLevel] || {};
//       // const { image = "", options = [] } = currentQuestion;
    
//       // if (showEndScreen) {
//       //   stopWebcamStream(); // Stop the webcam when the game ends
//       //   return <EndScreen />;
//       // }
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const r = await axios.get('https://api.joywithlearning.com/api/memorygame/getGameData/1');
//         setWordsData(r.data.words);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (wordsData) {
//       const currentSet = wordsData[index];
//       const wordArr = Object.keys(currentSet).filter(key => key !== '_id' && key !== 'function String() { [native code] }');
//       const underWord = wordArr.map(word => word.replace(word[0], "_"));
//       setW(underWord);
//       setButtonColors(Array(15).fill(''));
//       localStorage.setItem('flag', 'true');
//     }
//   }, [index, wordsData]);

//   useEffect(() => {
//     const loadAudioFiles = async () => {
//       if (wordsData) {
//         const audioFilesTemp = {};
//         const wordArr = Object.keys(wordsData[index]).filter(key => key !== '_id' && key !== 'function String() { [native code] }');
//         for (const word of wordArr) {
//           try {
//             const audioModule = await import(`../assets/audios/${word}.mp3`);
//             audioFilesTemp[word] = new Audio(audioModule.default);
//           } catch (error) {
//             console.error('Error loading audio file:', error);
//           }
//         }
//         setAudioFiles(audioFilesTemp);
//       }
//     };
//     loadAudioFiles();
//   }, [index, wordsData]);

//   const playAudio = async (word) => {
//     const synth = window.speechSynthesis;
//     const utterThis = new SpeechSynthesisUtterance(word);
//     const voices = synth.getVoices();
//     utterThis.voice = voices[1];
//     synth.speak(utterThis);
//   };

//   const eachLetter = async (word) => {
//     const audio = audioFiles[word];
//     audio.play();
//   };

//   const checkLetter = async (letter, word, indexW, i) => {
//     setNoOfTries(noOfTries + 1);
//     playAudio(letter);

//     if (letter === word[0] && correctIndex.indexOf(i) === -1) {
//       setTimeout(() => {
//         eachLetter(word);
//       }, 1000);
//       setTimeout(() => {
//         playAudio(word);
//       }, 2500);

//       setCorrectIndex([...correctIndex, i]);
//       const newW = [...w];
//       newW[indexW] = word;
//       const newButtonColors = [...buttonColors];
//       newButtonColors[i] = "#14fc03";
//       setButtonColors(newButtonColors);
//       setW(newW);
//       setCorrectTries(prevCorrectTries => {
//         const correctTries = prevCorrectTries + 1;
//         if (correctTries === 5) {
//           setNextButtonVisible(true);
//           setShowConfetti(true);
//           setTimeout(() => {
//             setShowConfetti(false);
//           }, 5000);
//         }
//         return correctTries;
//       });
//       const button = document.getElementById(i);
//       button.classList.add('correct-animation');

//       setTimeout(() => {
//         button.classList.remove('correct-animation');
//       }, 1000);

//       return true;
//     } else {
//       const button = document.getElementById(i);
//       button.classList.add('incorrect-animation');

//       setTimeout(() => {
//         button.classList.remove('incorrect-animation');
//       }, 2000);
//     }
//   };

//   const handleNext = async () => {
//     playAudio("GoodJob");
//     window.scrollTo(0, 160);
//     setCorrectTries(0);
//     setIndex(prevIndex => prevIndex + 1);
//     setNextButtonVisible(false);
//     setCorrectIndex([]);
//     setTries(noOfTries);
//     if (index === Object.keys(wordsData).length) {
//       const endTime = new Date();
//       const timeDiff = (endTime - startTime) / 1000;
//       setTimer(timeDiff);
//       navigate('/end');
//     }
//   };

//   const renderButtons = () => {
//     if (!wordsData || !wordsData[index]) return null;

//     const currentSet = wordsData[index];
//     const wordArr = Object.keys(currentSet).filter(key => key !== '_id' && key !== 'function String() { [native code] }');
//     const groupedButtons = [];

//     for (let i = 0; i < wordArr.length; i++) {
//       const word = wordArr[i];
//       const buttonGroup = currentSet[word].map((letter, j) => {
//         const letterIndex = i * 3 + j;
//         return (
//           <button
//             key={letterIndex}
//             id={letterIndex}
//             className="btn letter-button p-3 mb-3"
//             onClick={() => { checkLetter(letter, word, i, letterIndex); }}
//             style={{ backgroundColor: buttonColors[letterIndex] }}
//           >
//             {letter}
//           </button>
//         );
//       });

//       groupedButtons.push(
//         <div key={i} className="button-group-horizontal d-flex">
//           <div className="button-group-vertical">
//             {buttonGroup}
//           </div>
//           <button key={`rbutton${i}`} id={`rbutton${i}`} className="btn btn-lg word-button" onClick={() => playAudio(word)}>
//             {w[i]}
//           </button>
//         </div>
//       );
//     }

//     return groupedButtons;
//   };
//   // End Screen component with confetti effect
//   const EndScreen = () => {
//     return (
//       <div className="end-screen text-center p-5">
//         <Confetti />
//         <h1
//           className="display-2 font-weight-bold"
//           style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#4CAF50" }}
//         >
//           Well Done!
//         </h1>
//         <p
//           className="lead"
//           style={{ fontFamily: "Comic Sans MS, sans-serif", color: "#555" }}
//         >
//           You've completed all the levels.
//         </p>
//         <button
//           className="btn2"
//           onClick={() => (window.location.href = "/select-game")}
//         >
//           Back to Games
//         </button>
//       </div>
//     );
//   };
  
//   return (
//     <div>
//       <div className='justify-content-center d-flex'>
//         <div className='head'>
//           <h1 className="text-center mt-2">Find the Missing Letters</h1>
//           {!webcamGranted && (
//         <button className="btn2" onClick={requestWebcamAccess} >
//           ALLOW ACCESS TO CAMERA
//         </button>
//       )}
//       {webcamGranted && !gameStarted && (
//         <button className="btn2" onClick={startGame} >
//           START GAME
//         </button>
//       )}

//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         style={{ display: "none" }}
//       ></video>
//       <canvas
//         ref={canvasRef}
//         style={{ display: "none" }}
//         width="640"
//         height="480"
//       ></canvas>
//           <div className="d-flex mt-4 inst">
//             <div className='instruction-container'>
//               <div className='d-flex justify-content-evenly'>
//                 <Link className='btn btn-warning' to="/">Home</Link>
//                 <button type="button" className="btn btn-warning me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content="Make sure to turn up the volume!">
//                   Instructions
//                 </button>
//                 <svg xmlns="http://www.w3.org/2000/svg" onClick={() => playAudio("Select the correct letter from the options")} width="35" height="35" fill="#3269a8" className="bi bi-play-circle-fill me-1" viewBox="0 0 16 16">
//                   <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='outerDiv'>
//         <div className="grid-container flex-column justify-content-center align-items-center mt-4">
//           {renderButtons()}
//         </div>
//         <div className='nextButton mt-5'>
//           {nextButtonVisible && <button className="btn btn-success btn-lg next-button" onClick={handleNext}>Next</button>}
//         </div>
//         <div style={{ marginBottom: '50px' }}></div>
//         {showConfetti && <Confetti />}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { GameContext } from './GameContext.jsx';
import { Popover } from 'bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/MissingLetterGame.css";
export default function MissingLetterGame() {
  const navigate = useNavigate();
  const { selectedSetId, timer, tries, setTries, setTimer } = useContext(GameContext);
  const [wordsData, setWordsData] = useState(null);

  useEffect(() => {
    if (selectedSetId === null) {
      navigate('/');
    }
  }, [selectedSetId, navigate]);

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  // eslint-disable-next-line
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))

  const [index, setIndex] = useState(1);
  const [w, setW] = useState([]);
  const [buttonColors, setButtonColors] = useState(Array(15).fill(''));
  const [noOfTries, setNoOfTries] = useState(0);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [correctTries, setCorrectTries] = useState(0);
  const [correctIndex, setCorrectIndex] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [showConfetti, setShowConfetti] = useState(false);
  const [audioFiles, setAudioFiles] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const r = await axios.get('https://api.joywithlearning.com/api/memorygame/getGameData/1');
        setWordsData(r.data.words);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (wordsData) {
      const currentSet = wordsData[index];
      const wordArr = Object.keys(currentSet).filter(key => key !== '_id' && key !== 'function String() { [native code] }');
      const underWord = wordArr.map(word => word.replace(word[0], "_"));
      setW(underWord);
      setButtonColors(Array(15).fill(''));
      localStorage.setItem('flag', 'true');
    }
  }, [index, wordsData]);

  useEffect(() => {
    const loadAudioFiles = async () => {
      if (wordsData) {
        const audioFilesTemp = {};
        const wordArr = Object.keys(wordsData[index]).filter(key => key !== '_id' && key !== 'function String() { [native code] }');
        for (const word of wordArr) {
          try {
            const audioModule = await import(`../assets/audios/${word}.mp3`);
            audioFilesTemp[word] = new Audio(audioModule.default);
          } catch (error) {
            console.error('Error loading audio file:', error);
          }
        }
        setAudioFiles(audioFilesTemp);
      }
    };
    loadAudioFiles();
  }, [index, wordsData]);

  const playAudio = async (word) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(word);
    const voices = synth.getVoices();
    utterThis.voice = voices[1];
    synth.speak(utterThis);
  };

  const eachLetter = async (word) => {
    const audio = audioFiles[word];
    audio.play();
  };

  const checkLetter = async (letter, word, indexW, i) => {
    setNoOfTries(noOfTries + 1);
    playAudio(letter);

    if (letter === word[0] && correctIndex.indexOf(i) === -1) {
      setTimeout(() => {
        eachLetter(word);
      }, 1000);
      setTimeout(() => {
        playAudio(word);
      }, 2500);

      setCorrectIndex([...correctIndex, i]);
      const newW = [...w];
      newW[indexW] = word;
      const newButtonColors = [...buttonColors];
      newButtonColors[i] = "#14fc03";
      setButtonColors(newButtonColors);
      setW(newW);
      setCorrectTries(prevCorrectTries => {
        const correctTries = prevCorrectTries + 1;
        if (correctTries === 5) {
          setNextButtonVisible(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }
        return correctTries;
      });
      const button = document.getElementById(i);
      button.classList.add('correct-animation');

      setTimeout(() => {
        button.classList.remove('correct-animation');
      }, 1000);

      return true;
    } else {
      const button = document.getElementById(i);
      button.classList.add('incorrect-animation');

      setTimeout(() => {
        button.classList.remove('incorrect-animation');
      }, 2000);
    }
  };

  const handleNext = async () => {
    playAudio("GoodJob");
    window.scrollTo(0, 160);
    setCorrectTries(0);
    setIndex(prevIndex => prevIndex + 1);
    setNextButtonVisible(false);
    setCorrectIndex([]);
    setTries(noOfTries);
    if (index === Object.keys(wordsData).length) {
      const endTime = new Date();
      const timeDiff = (endTime - startTime) / 1000;
      setTimer(timeDiff);
      navigate('/end');
    }
  };

  const renderButtons = () => {
    if (!wordsData || !wordsData[index]) return null;

    const currentSet = wordsData[index];
    const wordArr = Object.keys(currentSet).filter(key => key !== '_id' && key !== 'function String() { [native code] }');
    const groupedButtons = [];

    for (let i = 0; i < wordArr.length; i++) {
      const word = wordArr[i];
      const buttonGroup = currentSet[word].map((letter, j) => {
        const letterIndex = i * 3 + j;
        return (
          <button
            key={letterIndex}
            id={letterIndex}
            className="btn letter-button p-3 mb-3"
            onClick={() => { checkLetter(letter, word, i, letterIndex); }}
            style={{ backgroundColor: buttonColors[letterIndex] }}
          >
            {letter}
          </button>
        );
      });

      groupedButtons.push(
        <div key={i} className="button-group-horizontal d-flex">
          <div className="button-group-vertical">
            {buttonGroup}
          </div>
          <button key={`rbutton${i}`} id={`rbutton${i}`} className="btn btn-lg word-button" onClick={() => playAudio(word)}>
            {w[i]}
          </button>
        </div>
      );
    }

    return groupedButtons;
  };

  return (
    <div>
      <div className='justify-content-center d-flex'>
        <div className='head'>
          <h1 className="text-center mt-2">Find the Missing Letters</h1>
          <div className="d-flex mt-4 inst">
            <div className='instruction-container'>
              <div className='d-flex justify-content-evenly'>
                <Link className='btn btn-warning' to="/">Home</Link>
                <button type="button" className="btn btn-warning me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content="Make sure to turn up the volume!">
                  Instructions
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => playAudio("Select the correct letter from the options")} width="35" height="35" fill="#3269a8" className="bi bi-play-circle-fill me-1" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='outerDiv'>
        <div className="grid-container flex-column justify-content-center align-items-center mt-4">
          {renderButtons()}
        </div>
        <div className='nextButton mt-5'>
          {nextButtonVisible && <button className="btn btn-success btn-lg next-button" onClick={handleNext}>Next</button>}
        </div>
        <div style={{ marginBottom: '50px' }}></div>
        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}