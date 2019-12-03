

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let location = search.value;
    let url = `/weather?address=${location}`

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error;
                    } else {

                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                        messageThree.innerHTML =`It's ${data.now.temp}&deg;C with a ${data.now.precip}% chance to rain.`
                        messageFour.innerHTML = `Today's temperature will range from ${data.maxmin.tempMax}&deg;C to ${data.maxmin.tempMin}&deg;C.`
                        if(data.atm.storm === '???'){
                            messageFive.innerHTML = `The atmospheric pressure is ${data.atm.pressure}mb.`
                        } else {
                            messageFive.innerHTML = `The atmospheric pressure is ${data.atm.pressure}mb and the nearest storm is ${data.atm.storm}km away.`
                        }
                        
                    }
                })
        })
})