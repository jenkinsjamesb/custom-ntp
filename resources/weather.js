var canvas, ctx;
var w = window.innerWidth, h = window.innerHeight;

var NUM_FLAKES = 1000;        //Number of snowflakes in the array
var MIN_RADIUS = w / 3000;    //Min radius of one flake
var MAX_RADIUS = w / 1000;     //Max radius of one flake
var WIND = 2 * Math.random() > 0.5 ? -1:1;
var store = [];
var oldTime;
var rain = Math.random() > 0.5;

rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class Circle {
    radius = 0;
    theta = 0;
    color = "#000";
    x = 0;
    y = 0;

    constructor(radius) {
        this.radius = radius;
    }

    setColor(color) {
        this.color = color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    draw() {
        let oldStyle = ctx.fillStyle;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill()
        ctx.fillStyle = oldStyle;
    }
}

callback = (timestamp) => {
    ctx.fillRect(0,0,w,h);
    store.forEach((elem) => {

        let dX = Math.sin(elem.theta);
        let dY = Math.sqrt(elem.radius);
        
        if (rain) {
            dX /= 10;
            dY = Math.sqrt(elem.radius) * 10;
            elem.setColor("#77d")
        }

        dX += 1 / elem.radius + WIND;
        dY += Math.abs(WIND) / 2;
        
        elem.move(dX, dY);
        elem.theta += Math.random() * 0.05;
        
        if (elem.y > h + elem.radius) {
            elem.setPosition(rand(-w / 3, w * (4 / 3))  + (-WIND * (h / dY)), rand(-h, 0));
        }
        elem.draw()
    })
    setTimeout(() => {
        window.requestAnimationFrame(callback)
    }, 1000 / 24 - (timestamp - oldTime))
}

getWeather = () => {
    let lat, lon;
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude, lon = pos.coords.longitude;

        let url = "https://forecast.weather.gov/MapClick.php?lat=" + lat + "&lon=" + lon + "*/"
        fetch(url)
            .then(response => response.text())
            .then(data => {
                var doc = new DOMParser().parseFromString(data, 'text/html');
                console.log(doc);
            });
    });
}

main = () => {
    canvas = document.getElementById('bg-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = "#333";
    ctx.fillRect(0,0,w,h);
    ctx.save();

    //getWeather(); pain

    for (let i = 0; i < NUM_FLAKES; i++) {
        var c = new Circle(rand(MIN_RADIUS, MAX_RADIUS));
        c.setPosition(rand(-w / 3, w * (4 / 3)), rand(-h, 0));
        c.theta = rand(-1000, 1000);
        c.setColor("#fff")
        store.push(c);
    }
    
    window.requestAnimationFrame(callback);
}

main();