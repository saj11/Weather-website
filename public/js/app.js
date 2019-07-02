console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msj-1')
const message2 = document.querySelector('#msj-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading forecast...'

    fetch(`http://localhost:3000/weather?address=${location}`).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
            }else{
                console.log(data.location)
                console.log(data.forecast)

                message1.textContent = data.location
                message2.textContent = data.forecast 
            }
        })
    })
})