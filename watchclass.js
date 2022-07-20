
/**
 * Stop watch class.
 * State: running, off
 * 
 * off: left button changes state to running and is labelled 'Start'.
 * running: (1) left button changes state to 'off', and is labelled 'Stop';
 * (2) right button labelled 'Lap' and records current stopwatch time every time it is clicked on;
 * (3) setInterval is running in 10 millisecond intervals and every 100th interval is recorded as a second
 * and every 60th second is recorded as 1 minute
 * (4) clicking right button clears setInterval and stops the count
 * 
*/

export class StopWatch {
    constructor() {
        this.running = false;
        this.off = true;
        this.#addBtnListeners()
    }

    #addBtnListeners() {
        document.getElementById('start-btn').addEventListener('click', (event) => {
            event.preventDefault();
            if(this.running === false) {
                this.running = true;
            } else {
                this.running = false
            }
        })
        
    }
}

