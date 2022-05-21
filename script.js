document.addEventListener("DOMContentLoaded", function () {
    // listener for dynamic search bar
    var elem = document.querySelector("input[type='text']");
    elem.oninput = () => {
        elem.style.width = (elem.value.length + 1) + 'ch';
    }

    chrome.storage.sync.get({ optionsEnabled: false }, function(result) {
        optionsEnabled = result.optionsEnabled;

        if (optionsEnabled) {
            document.getElementById("options").style.display = "flex";
        }
    });

    chrome.storage.sync.get({ customImage: "" }, function(result) {
        customImage = result.customImage;
                
    });

    // import background
    chrome.storage.sync.get({ weatherEnabled: false }, function(result) {
        weatherEnabled = result.weatherEnabled;

        if (weatherEnabled) {
            var script = document.createElement("script");
            script.src = "resources/weather.js"
            document.head.appendChild(script)
        }
    });
});

function save_options() {
var bool = document.getElementById("weather-input").checked;
var str = document.getElementById("image-input");
chrome.storage.sync.set({
    weatherEnabled: bool,
    customImage: str
}, function() {
    var status = document.getElementById('status');
    status.textContent = 'Saved.';
    setTimeout(function() {
    status.textContent = '';
    }, 1500);
});
}

// restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
chrome.storage.sync.get({
    weatherEnabled: false,
    customImage: ""
}, function(items) {
    document.getElementById("weather-input").checked = items.weatherEnabled;
    try {
        document.getElementById("image").src = URL.createObjectURL(items.customImage.files);
    } catch {

    }
});
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("weather-input").addEventListener("click", save_options);
document.getElementById("image-input").addEventListener("input", save_options);

document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("weather-input").checked = false;
    document.getElementById("image-input").value = "";
    save_options();
});