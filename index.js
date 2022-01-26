
const express = require('express');
const fetch =require('node-fetch');
require('dotenv').config();
const app = express();
const key= process.env.APIKEY;
console.log(process.env.APIKEY)
app.listen(3000,()=>console.log("listening at 3000"));
app.use(express.static('public'));


app.get('/',(request,response)=>{
    response.send("hello there pal")
})

app.get('/weather/:city', async (request,response)=>{
    const city = request.params.city;
    try{
    const api_url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log("here we are:",json["coord"]);


    let lat= json["coord"]["lat"];
    let lon= json["coord"]["lon"];
    const api_url2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutley,hourly,current,alerts&appid=${key}`)
    const fetchresp2 = await api_url2;
    let use_json = await fetchresp2.json()
    response.json(use_json);}
    catch(error){
        console.log("something went wrong ")

    }
})