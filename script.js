document.addEventListener("DOMContentLoaded", function () {
    var elem = document.querySelector("input[type='text']");
    elem.oninput = () => {
        elem.style.width = (elem.value.length + 1) + 'ch';
    }
});

// TODO: append to background?
/*//weather
navigator.geolocation.getCurrentPosition((pos) => {
    //console.log(pos.coords.accuracy);
})
// feed to https://forecast.weather.gov/MapClick.php?lat=38.301180000000045&lon=-77.45932999999997*/

/* 
fetch("resources/tabs/" + name + ".html").then((response) => {
    return response.text().then((text) => {
        document.getElementById("content").innerHTML = text;
    });
});
*/

//modify precip path by wind speed, pick rand left/right
//sun rays, dust, wind, rain, snow