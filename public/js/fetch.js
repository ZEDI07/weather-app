console.log('this is fetch')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)})
// })
// //console.log(fetch('http://puzzle.mead.io/puzzle'))


const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const para1=document.querySelector('#message-1');
const para2=document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value;
    para1.textContent='loading..' // dont be left null give error ,cant set value of null 
    para2.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            para1.textContent=data.forcastdata
        }else{
            para1.textContent=data.forcastdata
            para2.textContent=data.location
        }
    })
})
})