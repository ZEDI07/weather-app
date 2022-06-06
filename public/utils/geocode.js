const request=require('request');

const geocode=(location,callback)=>{
    const geourl ='http://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1Ijoic2VsZG9uY29vcGVyIiwiYSI6ImNsMnlzYTZtNTE4aDYza21wZ3BraDY0bWYifQ.vKeLN2D1Ybc8nHZqx9BF4w&limit=1';
    request({url:geourl,json:true},(error,response)=>{
        if(error){
            callback('unable to connect',undefined)
        }else if(response.body.features.length==0){ 
            callback('please check the location',undefined);
        }else{
            callback(undefined,{
            longitude:response.body.features[0].center[0],
            latitude:response.body.features[0].center[1],
            location:response.body.features[0].place_name
            })
           //console.log(response.body) 
        }}  
    )
}
module.exports=geocode;

