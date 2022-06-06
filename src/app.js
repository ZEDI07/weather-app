const path=require('path');
const request=require('request');
const express = require('express');         
const app=express();
const hbs=require('hbs');
const geocode=require('../public/utils/geocode')
const forcast=require('../public/utils/forecast')

/*server configuration::
    now we are serving pages from static directory 
    we need directory path and filename 
    __dirname >> gives directory path
    __filename >> gives filepath
    we have path module and join function to combine path and filename and send to server
    join >> comibine path of directory and filename
*/
console.log(__dirname);
console.log(__filename);

const publicpath=path.join(__dirname,'../public');
const templatepath=path.join(__dirname,'../templates/views')   //fetching views folder path 
app.use(express.static(publicpath)) 
const hbspath=path.join(__dirname,'../templates/partials');
// app.use >>
//express.static(give path) >> static for static pages

//setting view engine
app.set('view engine','hbs')   //assign hbs as a view engine
app.set('views',templatepath)  //asign views path in views
hbs.registerPartials(hbspath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prabhat kumar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        author:'xyz'
    })
})
app.get('/weather',(req,res)=>{  
    if(!req.query.address){
    return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{ 
    // object distructuring >> inplace of object name (response) we can use object properties 
    // default parameters >> {} its an empty objec3i t for runtime error handling ,bydefault if no value provided in object parameters
    // if latitude have undefined value will give run time error , blank object handle this error and execute code 
    // we can use default value to any function parameter
    if(error){
           return res.send({error})
        }
        forcast(latitude,longitude,location,(error,forcastdata)=>{
            if(error){
               return res.send({error})
            }
            res.send({
                forcastdata,
                location,
                address:req.query.address
            })
        })

    })
    // res.render('weather',{   
    //     title:'Weather',                       // sending json data 
    //     forcast:'it is rainy weather outside',
    //     location :req.query.address
    // })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        address:req.query.address,
        
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help'
    })
})

app.get('*',(req,res)=>{
    res.render('Error404',{
        errorcomment:'this page not found'
    })
})
/*here we are trying to serve html and json data to server for that we use .GET method of express
    take two arguments in .get >> first is route of that page
                               >> second is a function which take two arguments one for taking request another for send response
    res.send>> send() to send response to server on given page
    */
// app.get('/about',(req,res)=>{
//     res.send('<h1>WEATHER APP</h1>');
    
// })
// app.get('/weather',(req,res)=>{     
//     res.send({                          // sending json data 
//         forcast:'it is rainy weather outside',
//         location :'kanpur'
//     })
// })

app.listen(3000,()=>{                   // configure server port ,use listen function to give port number and a function for any functionality 
    console.log('server is running')
})



 
