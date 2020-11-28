console.log('Client Side JS loaded!!!')

// fetch('http://localhost:3000/weather?address=Mumbai').then((response) => {
//     response.json().then((data) => {
//         //console.log(data.error)
//         if(data.error){
//             console.log(data.error)
//         }else{
             
//             console.log(data.Location)
//             console.log(data.Forecast)
        
//         }   
//     })
// })

const weatherform = document.querySelector("form")
const search = document.querySelector("input")
weatherform.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputval = search.value
    const fetchurl = 'http://localhost:3000/weather?address=' + search.value
    //console.log(fetchurl)
    //console.log(inputval)
    const message = document.querySelector("#MSG1")
    message.textContent = "Loading..."
    fetch(fetchurl).then((response) => {
        response.json().then((data) => {
            //console.log(data.error)
                if(data.error){
                    message.textContent = data.error
                    //console.log(data.error)
                }else{
                    message.textContent = 'Temperature forecast in ' +  data.Location + ' is ' + data.Forecast
                    //console.log(data.Location)
                    //console.log(data.Forecast)
                
                }   
        })
    })
})