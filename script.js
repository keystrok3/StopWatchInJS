
/**
 * JS script to run the stopwatch appliation
 * */ 

// control buttons
const startButton = document.getElementById('start-btn');
const reset_lap_Button = document.getElementById('reset-btn');

const timerDisplay = document.querySelector('.timer');

// lap container is where lap counts are recorded
const lapContainer = document.querySelector('.lap-container');


let startTime, currentTime, elapsedTime;

let currentLap; // stores amount of time elapsed after latest pressing of 'lap' button

let clickCount = 0;  // Marks the number of times the start button has been clicked 

let timerRunning = false;


// start stop watch
startButton.addEventListener('click', event => {

    clickCount = clickCount + 1;    

    startTime = Date.now();



    if(clickCount === 1) {  //If click count = 1, means that the Start button has been clicked once and watch is running
        const counter = setInterval(() => {
            currentTime = Date.now();

            elapsedTime = currentTime - startTime;

            if(timerRunning === true && clickCount > 1) {   //means watch is running 
                // will work only if timer is already running, resets timer 
                timerRunning = false;
                clickCount = 0;
                startTime = 0;
                startButton.innerText = 'Start';
                reset_lap_Button.innerText = 'Reset'
                btnStyleReset('Start', 'red', 'Reset', '#bd8787', '#fff')
                return clearInterval(counter)
            };
            
            timerRunning = true;
            
            timerDisplay.innerText = watchDisplay(elapsedTime);
            btnStyleReset('Stop', 'red', 'Lap', '#bd8787', '#fff')

            
        }, 10);
    }

});


// Reset button marks laps while the watch is running, and clears the display when it has stopped
reset_lap_Button.addEventListener('click', event => {

    if(timerRunning === true) {
        currentLap = watchDisplay(elapsedTime);
        
        const div = document.createElement('div');
        div.innerText = "+"+currentLap
        lapContainer.append(div);
    } 
    else {
        timerDisplay.innerText = '00:00.00'
        reset_lap_Button.innerText = 'Lap';

        const lapDivs = lapContainer.querySelectorAll('div');
        lapDivs.forEach(div => div.remove())
    }
});


// Change button colors and text with changing functionalities
function btnStyleReset(startText, startBackground, resetText, resetBackground, resetColor) {
    startButton.innerText = startText
    startButton.style.backgroundColor = startBackground;
    reset_lap_Button.style.backgroundColor = resetBackground;
    reset_lap_Button.style.color = resetColor;
    reset_lap_Button.innerText = resetText;
}


// function to create a display for elapsed time (that is used in a stopwatch)
function watchDisplay(elapsedTime) {
    return `${String(new Date(elapsedTime).getMinutes()).padStart(2, '0')}:\
                ${String(new Date(elapsedTime).getSeconds()).padStart(2, '0')}.\
                ${String(Math.floor(new Date(elapsedTime).getMilliseconds()/10)).padStart(2, '0')}`;
}



