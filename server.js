import express from "express"
import cors from "cors"
import bodyParser from "body-parser";

const PORT  = process.env.PORT || 5000;
const API_KEY = "abd5b74d1a49c60c01eea7a6ac989799";
// url = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const app = express();
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json())



app.get("/", (req, res) =>{
    res.json({cod : 404})
})

app.get("/:city", (req, res)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${API_KEY}`;
    fetch(url).then(res =>{
        return res.json();
    }).then(data =>{
        console.log(data);
        let obj = {};
        if(data.cod == 200)
        {
            obj.weather = data.weather[0].main;
            obj.icon = data.weather[0].icon;
            obj.temp = data.main.temp - 273.15;
            obj.tempMin = data.main.temp_min - 273.15;
            obj.tempMax = data.main.temp_max - 273.15;
            obj.humidity = data.main.humidity;
            obj.coord = {
                lon : data.coord.lon,
                lat : data.coord.lat
            }
        }
        obj.city = req.params.city;
        obj.cod = data.cod;
        res.json(obj);
    })
    
})

app.listen(PORT, ()=>{
    console.log("listening on porst " + PORT);

})