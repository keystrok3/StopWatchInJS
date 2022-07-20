
/**
 * JS script to run the stopwatch appliation
 * */ 

// control buttons
const startButton = document.getElementById('start-btn');
const reset_lap_Button = document.getElementById('reset-btn');

// stop watch displays
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const centiSeconds = document.querySelector('.centiseconds');

// lap container is where lap counts are recorded
const lapContainer = document.querySelector('.lap-container');


let centisecs = 0, secs = 0, mins = 0;
let clickCount = 0, timerRunning = false;

let currentLap; // stores amount of time elapsed after latest pressing of 'lap' button


// start stop watch
startButton.addEventListener('click', event => {

    clickCount = clickCount + 1;

    if(clickCount === 1) {
        const counter = setInterval(() => {

            if(timerRunning === true && clickCount > 1) {
                // will work only if timer is already running, resets timer 
                timerRunning = false;
                clickCount = 0;
                startButton.innerText = 'Start';
                reset_lap_Button.innerText = 'Reset'
                btnStyleReset('Start', 'red', 'Reset', '#bd8787', '#fff')
                return clearInterval(counter)
            };
            
            timerRunning = true;
            centisecs = centisecs + 1;
            
            padWithZeros(minutes, seconds, centiSeconds, mins, secs, centisecs);
    
            btnStyleReset('Stop', 'red', 'Lap', '#bd8787', '#fff')

            if(centisecs === 100) {
                centisecs = 0;
                secs = secs + 1;
            }
    
            if(secs === 60) {
                secs = 0;
                mins = mins + 1;
            }
        }, 10);
    }

});


reset_lap_Button.addEventListener('click', event => {

    if(timerRunning === true) {
        currentLap = `${new String(mins).padStart(2, '0')}: \
                                ${new String(secs).padStart(2, '0')}.${new String(centisecs).padStart(2, '0') + ':'}`;
        
        const div = document.createElement('div');
        div.innerText = "+"+currentLap
        lapContainer.append(div);
    } 
    else {
        minutes.innerText = 0;
        seconds.innerText = 0;
        centiSeconds.innerText = 0;
        padWithZeros(minutes, seconds, centiSeconds, 0, 0, 0);
        reset_lap_Button.innerText = 'Lap';

        const lapDivs = lapContainer.querySelectorAll('div');
        lapDivs.forEach(div => div.remove())
    }
});



// Pad numbers displayed with a leading zero 
function padWithZeros(minutes, seconds, centiseconds, mins, secs, centisecs) {
    // The first 3 arguments are HTML elements taking the values, 
    // next 3 are values to be padded
    centiseconds.innerText = new String(centisecs).padStart(2, '0');
    seconds.innerText = new String(secs).padStart(2, '0') + '.';
    minutes.innerText = new String(mins).padStart(2, '0') + ':';
}



// Change button colors and text with changing functionalities
function btnStyleReset(startText, startBackground, resetText, resetBackground, resetColor) {
    startButton.innerText = startText
    startButton.style.backgroundColor = startBackground;
    reset_lap_Button.style.backgroundColor = resetBackground;
    reset_lap_Button.style.color = resetColor;
    reset_lap_Button.innerText = resetText;
}



