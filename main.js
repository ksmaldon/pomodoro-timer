const timerDisplay = document.getElementById("timer-display");
const intervals = document.getElementById("interval");
const currentInterval = intervals.getElementsByTagName("p");
const counters = document.getElementById("counter-container");
const counter = counters.getElementsByTagName("div");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

let timerId;
let timerIsActive = false;
let shortbreakIsActive = true;
let minutes = 0;
let seconds = 0;
let count = 0;

startBtn.addEventListener("click", timer);
resetBtn.addEventListener('click',reset)

function timer() {

  timerIsActive = !timerIsActive;
  startBtn.textContent = `${timerIsActive ? "Stop" : "Start"}`;
  
  if (timerIsActive) {
    timerId = setInterval(() => {
      if (count <=5) {
        timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`;
        if (seconds === 0) {
          if (minutes !== 0) {
            seconds = 59;
            minutes = minutes - 1;
          } else if (
            minutes === 0 &&
            shortbreakIsActive === false &&
            count < 3
          ) {
            minutes = 5;
            shortbreakIsActive = true;
            count++;
            if (count===1){
                counter[0].classList.add("active")
            }else if(count===2){
                counter[1].classList.add("active")
            }else if(count===3){
                counter[2].classList.add("active")
            }
            console.log("10");
            console.log(count);
            currentInterval[0].classList.remove("active")
            currentInterval[1].classList.add("active")
          } else if (minutes === 0 && shortbreakIsActive && count < 4) {
            minutes = 25;
            
            shortbreakIsActive = false;
            console.log("25");
            currentInterval[0].classList.add("active")
            currentInterval[1].classList.remove("active")
            
          } else {
            minutes = 40;
            count++;
            console.log("30");
            currentInterval[2].classList.add("active")
            currentInterval[1].classList.remove("active")
            counter[3].classList.add("active")
            currentInterval[0].classList.remove("active")
          }
        } else {
          seconds = seconds - 1;
        }
      }else {
        minutes=25;
        seconds=0
        
        startBtn.textContent = "Start"
        clearInterval(timerId)
        
      }
    }, 0.002);
  } else {
    
    clearInterval(timerId);
  }
}

function reset() {
    clearInterval(timerId)
        minutes=25;
        seconds=0
        timerIsActive=false
        startBtn.textContent = `${timerIsActive ? "Stop" : "Start"}`;
        timerDisplay.textContent=`${minutes}:0${seconds}`
        for (let i=0; i <currentInterval.length; i++){
            currentInterval[i].classList.remove("active")
        }
        for (let i=0; i <count; i++){
            counter[i].classList.remove("active")
        }
}