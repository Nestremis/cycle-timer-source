// src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import useSound from 'use-sound';
import calculateTime from './CalculateTime';
import glassClink from './glass-clink-1.mp3';
import bell from './bell-ring.mp3';

const Timer = () => {

  const [seconds, setSeconds] = useState(30*60);
  const [isActive, setIsActive] = useState(false);
  const [timeArray, setTimeArray] = useState([]);
  const stateRef = useRef(30*60);
  const [playBell] = useSound(bell, { volume: 0.2 });
  const [play] = useSound(glassClink, { volume: 0.1 });


   useEffect(() => {
    let timeArray = calculateTime(seconds);
    setTimeArray(timeArray);
    }, [seconds]);

  function toggle() {
    setIsActive(!isActive);
  }; 

  function resetSession() {
    setIsActive(false);
    setSeconds(30*60);
    stateRef.current = 1800;    
    Math.floor (( seconds / 60).toFixed(0));
  };

  useEffect(() => {
    if(seconds > 1 && isActive) {
     play();
    }    
  }, [isActive]);

  function dink () {
    if(!isActive) play() 
  };

   
  useEffect(() => {
    let interval = null;
    if ( isActive ) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        if (seconds === 0) {
          setSeconds(stateRef.current)
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  useEffect(()=> {
    if(seconds===1 && isActive) {
     playBell();
    }
  }, [isActive, seconds]);

  function plusMinutes () {
    if (seconds < 3540) {
      setSeconds(seconds => Math.ceil((seconds + 60) - (seconds % 60)));
      stateRef.current = Math.ceil((seconds + 60) - (seconds % 60));
    }
    Math.floor ((stateRef.current / 60).toFixed(0));
  }

  function minusMinutes () {
    if (seconds > 60 && seconds <= 3540 && stateRef.current > 60 ) {
      setSeconds(seconds => Math.floor(seconds - 60 - (seconds % 60)));
      stateRef.current = Math.floor(seconds - 60 - (seconds % 60));
    }
    Math.ceil((stateRef.current / 60).toFixed(0));
  }


 
   return (
    <div className="app">   

       <div className='wrapper'>      

          <h2> cycle timer </h2>

          <div className='session'> 
              <button className='changeMinutes' onClick={minusMinutes}> - </button>
                   <div className={`session-sign-${isActive ? 'active':'inactive'}`}> session </div>
              <button className='changeMinutes' onClick={plusMinutes}> + </button>  

              <div style= {{ margin: '-2vh'}} > {                              
                Math.floor ((stateRef.current / 60).toFixed(0))
              } </div>                
          </div>          

          <section className={`time-${isActive ? 'active':'inactive'}`}>
                <p> {timeArray[1]} </p>
                <span>:</span>
                <p>{timeArray[2]}</p>
          </section>  
                  
          <div className='row'>

            <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={()=>{ toggle();  dink(); } }>
                {isActive ? 'PAUSE' : 'START'}
            </button>

            <button className='button-reset' onClick={resetSession} >
                RESET
            </button>

          </div>
       </div>

    </div>
  );
};


export default Timer;
