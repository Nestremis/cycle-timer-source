function calculateTime (seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600 )) / 60 );
    seconds = seconds - (hours * 3600) - (minutes * 60 );

    let hoursFormat = hours < 10 ? `0${hours}`: hours;
    let minutesFormat = minutes < 10 ? `0${minutes}`: minutes;
    let secondsFormat = seconds < 10 ? `0${seconds}` : seconds;

    return[
      hoursFormat, 
      minutesFormat,
      secondsFormat
    ]
  }

  export default calculateTime;