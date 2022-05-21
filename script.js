document.addEventListener("DOMContentLoaded", function () {
    // listener for dynamic search bar
    var elem = document.querySelector("input[type='text']");
    elem.oninput = () => {
        elem.style.width = (elem.value.length + 1) + 'ch';
    }

    // import background
    weatherEnabled = false;
    if (weatherEnabled) {
        var script = document.createElement("script");
        script.src = "resources/weather.js"
        document.head.appendChild(script)
    };
});