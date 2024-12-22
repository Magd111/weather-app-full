// apiKey = 113e9aa7019a4b3b8f5164944242212
//  http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7 
//https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=113e9aa7019a4b3b8f5164944242212

const search = document.getElementById("search")




search.addEventListener("input" , function(e){
getData(e.target.value)
})





async function getData(cityName){
    if (cityName.length>2) {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=113e9aa7019a4b3b8f5164944242212`)
        const data = await res.json()    
        console.log(data);
        display(data)
    }
    
}



// let date = new Date('2024-12-22') //منجيب منه التاريخ بالارقام بالايام بالشهور بالنسة
// console.log(date.getDate()); // يوم كام في الشهر
// console.log(date.getMonth()+1); // شهر كام في السنة
// console.log(date.getFullYear()); // السنة

// let dayName = date.toLocaleDateString('en-us', { weekday: 'long' });
// console.log(dayName); // اسم اليوم

// let monthName = date.toLocaleDateString('en-us' , {month:'long'})
// console.log(monthName); // اسم الشهر



function display(data){
/////////////////today//////////////
let dateToday = new Date(data.current.last_updated)
console.log(dateToday.getDate());
document.getElementById("day1").innerHTML = dateToday.toLocaleDateString('en-us' , {weekday:'long'})
document.querySelector(".date").innerHTML = `${dateToday.getDate()} ${dateToday.toLocaleDateString('en-us' , {month:'long'})}`
document.querySelector(".location").innerHTML = data.location.name
document.querySelector(".num").innerHTML = data.current.temp_c
document.getElementById("icon1").setAttribute('src', `https:${data.current.condition.icon}`)
document.querySelector(".custom").innerHTML = data.current.condition.text
document.getElementById("humidity").innerHTML = data.current.humidity + '%'
document.getElementById("wind-speed").innerHTML = data.current.wind_kph + 'km/h'
document.getElementById("wind-dir").innerHTML = data.current.wind_dir
///////////////next 2 days/////////////////
let cartona = '';
for (let i = 1 ; i <= 2 ; i++){
    let dateNext = new Date(data.forecast.forecastday[i].date)
    console.log(dateNext);
    cartona =`
    <div class="forecast-header">
              <div class="day" id="day2">${dateNext.toLocaleDateString('en-us' , {weekday:'long'})}</div>
          </div>
          <div class="forecast-content">
              <div ></div>
              <img class="forecast-icon w-25 h-50" id="icon2" src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="forecast-icon">
              <div class="degree" id="degree1">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
              <small class="small1">${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</small>
              <div class="custom" id="custom1">${data.forecast.forecastday[i].day.condition.text}</div>
          </div>
    `
    document.querySelectorAll(".nextDay")[i-1].innerHTML =cartona; // i-1 because we are looping from 1 to 2 so the index is 0 and
}
}

if (navigator.geolocation) { // تحديد اذا كان الجهاز يدعم الموقع ولا لأ
    // console.log("allow"); // يدعم 
    navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos); // موقع الجهاز
        let lat = pos.coords.latitude
        let lon = pos.coords.longitude
        getData(`${lat}, ${lon}`)
    })
}



// else{
//     console.log("not allow"); // لا يدعم
    
// }



const links = document.querySelectorAll(".nav-link");

for( let i = 0 ; i<links.length ; i++){ // لازالة و اضافة active لل navbar
    links[i].addEventListener("click" , function(){
        links.forEach(function(link){ // لازالة active 
            link.classList.remove("active")
        })
        links[i].classList.add("active"); // لاضافة active
        
    })
}