                // <!-- WEATHER INPUT  -->
                var userLocation=document.getElementById("userLocation");
                var converter=document.getElementById("converter");
                var weatherIcon=document.querySelector(".weather-icon");
                var temperature=document.querySelector(".temperature");
                var feelsLike=document.querySelector(".feelsLike");
                var description=document.querySelector(".description");
                var date=document.querySelector(".date");
                var city=document.querySelector(".city");
                
                
                
                
                                // <!-- /* WEATHER OUTPUT GROUP  */ -->
                
                var HValue=document.getElementById("HValue");
                var WValue=document.getElementById("WValue");
                var SRValue=document.getElementById("SRValue");
                var SSValue=document.getElementById("SSValue");
                var CValue=document.getElementById("CValue");
                var UVValue=document.getElementById("UVValue");
                var PValue=document.getElementById("PValue");
                
                
                                // <!-- WEEKLY details  -->
                
                var forecast=document.querySelector(".forecast")
                
                                // google-->openweather Api -->hamberger(API)-->API doc-->
                                // Current weather data-->API call-->Copy link and remove lat,lon and 
                                // add appid(privatekey)-->after private key add(&q=)
                
                                // my key: dab389c15d15e8ccac171a870ad544d3
                WEATHER_API_ENDPOINT=`https://api.openweathermap.org/data/2.5/weather?appid=a5bb4718b30b6f58f58697997567fffa&q=`;
                
                                // SAME url copy upto ==https://api.openweathermap.org/data/2.5/ and add onecall
                
                
                WEATHER_DATA_ENDPOINT=`https://api.openweathermap.org/data/2.5/onecall?appid=a5bb4718b30b6f58f58697997567fffa&exclude=minutely&units=metric&`;
                                // function to find the location 
                
                function findUserLocation(){
                                forecast.innerHTML="";
                
                
                                // alert("finding location")
                
                                //gives the defaulted place as london 
                                //but we need to give it by specific in search so removed london in 47th line
                                // fetch(WEATHER_API_ENDPOINT+"london")
                
                    fetch(WEATHER_API_ENDPOINT+userLocation.value)
                    .then((response)=>response.json())
                    .then((data)=>{
                                 //console.log(data);//to all the data
                
                        if(data.cod!=""&& data.cod!=200){
                                //1.if we not gave any city
                                //2.not found city
                            alert(data.message);
                            return;
                        }
                        
                                // console.log(data.coord.lon,data.coord.lat);//after adding line no 59 cmt me
                        console.log(data);
                                //city.innerHTML=data.name+"to show the country name in output
                                //","+speechSynthesis.country; to add country
                        city.innerHTML=data.name+","+data.sys.country;
                
                        //TO SHOW THE ICON OF THE WEATHER
                
                                //openweatherimages-->scroll down-->How to get icon URL--copy url   
                                // direct link= https://openweathermap.org/img/wn/10d@2x.png
                                // ${data.weather[0].icon}==>>to show the dynamic as per the time
                        weatherIcon.style.background=`url( https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
                
                                // passing coordinates to 2nd api 
                        fetch(WEATHER_DATA_ENDPOINT+`lon=${data.coord.lon}&lat=${data.coord.lat}`)
                        .then((response)=>response.json())
                        .then((data)=>{
                            console.log(data);
                
                        //TO ADD THE TEMPERATURE
                        temperature.innerHTML=tempConverter(data.current.temp);
                
                                feelsLike.innerHTML="feelsLike "+data.current.feels_like;
                
                                description.innerHTML=
                                        `<i class=fa-brands fa-cloudversify"></i> &nbsp;`+
                                         data.current.weather[0].description;
                                
                                HValue.innerHTML=Math.round(data.current.humidity)+"<span>%</span>"
                                WValue.innerHTML=Math.round(data.current.wind_speed)+"<span>m/s</span>"
                
                                const options={
                                        weekday:"long",
                                        month:"long",
                                        day:"numeric",
                                        hour:"numeric",
                                        minute:"numeric",
                                        hour12:true,
                                };
                                date.innerHTML= getLongFormateDateTime(data.current.dt,data.timezone_offset,options);
                
                                const options1={
                                        hour:"numeric",
                                        minutes:"numeric",
                                        hour12:true,
                                };
                
                                SRValue.innerHTML="sunrise"+" "+getLongFormateDateTime(data.current.sunrise,data.timezone_offset,options1);
                                SSValue.innerHTML="sunset"+" "+getLongFormateDateTime(data.current.sunset,data.timezone_offset,options1);
                
                                CValue.innerHTML=data.current.clouds+"<span>%</span>";
                                UVValue.innerHTML=data.current.uvi;
                                PValue.innerHTML=data.current.pressure+"<span>hpa</span>"
                
                                data.daily.forEach((weather) => {
                                        let div=document.createElement("div");
                
                                        //to append imgs in THIS WEEK
                                const options={
                                        weekday:"long",
                                        month:"long",
                                        day:"numeric"
                                                
                                }
                                //to remove time as am-pm
                                let daily=getLongFormateDateTime(weather.dt,0,options).split("at")
                                        div.innerHTML=daily[0]
                                        div.innerHTML+=`<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>`
                                        // for every new time we need to clear imgs so set null at user fun 
                                        
                                        div.innerHTML+=`<p class="forecast-description">${weather.weather[0].description}</p>`
                                        forecast.append(div)
                                        
                                });
                
                                
                                
                
                                
                        });
                    });
                    
                
                }
                
                //time format for SSVALUE and SRVALUE
                function formatUnixTime(dtValue,offSet,options={}){
                        const date=new Date((dtValue+offSet)*1000);
                        return date.toLocaleTimeString([],{timeZone:"UTC",...options});
                }
                
                function getLongFormateDateTime(dtValue,offSet,options){
                        return formatUnixTime(dtValue,offSet,options)
                }
                function tempConverter(temp){
                        let tempValue = Math.round(temp);
                        console.log(tempValue);
                        
                        let message = "";
                        if(converter.Value == "°C"){
                          
                          message = "<span>" + "\xB0C</span>";
                        } else {
                                let ctoF = (tempValue * 9/5) + 32;
                          message = ctoF + "<span>" + "\xB0F</span>";
                        }
                        return message;
                      }