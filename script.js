const TIMER = document.querySelector('#timer')

const STATE = {
    defaultText: 'INICIANDO EM BREVE',
    currentTick: 0,
    counter: 300
}

document.addEventListener("DOMContentLoaded", ev => {

    let url = new URLSearchParams(document.URL);
    let timer;

    if(url.has("time"))
        STATE.counter = Number.parseFloat(url.get("time"))

    let element = document.querySelector('.main_text');
    let parent = element.parentElement;

    for (let i = 0; i <= 10; i++) {
        parent.appendChild(element.cloneNode(true))
    }

    const MAIN = document.querySelectorAll('.main_text')

    let handler = async () => {

        MAIN.forEach(el => {
            let h1 = document.createElement("h1");
            h1.innerHTML = STATE.defaultText.charAt(STATE.currentTick).replace(" ", "&nbsp;")
            el.appendChild(h1)
        })

        STATE.currentTick++;

        if (STATE.currentTick > STATE.defaultText.length) {

            clearInterval(timer)

            setTimeout(() => {
                MAIN.forEach(el => {
                    el.innerHTML = ""
                })

                timer = setInterval(handler, 200);
            }, 1000)

            STATE.currentTick = 0;

        }

    }

    timer = setInterval(handler, 200);

    let counter = setInterval(() => {

        let minutes = Math.floor(STATE.counter / 60);
        let seconds = STATE.counter % 60;
        STATE.counter--;
        if (STATE.counter >= 0) {
            TIMER.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        } else {
            TIMER.innerText = '00:00';
            clearInterval(counter)
        }

    }, 1000)

})