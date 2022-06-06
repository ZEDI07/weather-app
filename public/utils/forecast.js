const request = require('request');
const forcast=(latitude,longitude,location,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=ff4de23b23773295cca87f821438cd9a&query="+latitude+','+longitude;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('location not found',undefined)
        }else{ 
        const stringdata=response.body.current;     
        console.log(stringdata);
        callback(undefined,'its is currently '+stringdata.temperature+' degrees and '+stringdata.weather_descriptions+' weather in '+location)
     
    }
         //const stringdata=JSON.parse(response.body.current);    
     })
    
}
module.exports=forcast;

