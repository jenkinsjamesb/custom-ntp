var settings = {
    visible: false,
    enableWeather: false,
    urlHolder: "",
    customImg: "resources/thumb.png",
    customColors: {
        bg: "",
        fg: "",
        accent: "",
        fringe: "",
        text: ""
    }
};

let toggleSettings = async () => {
    settings.visible = !settings.visible;
    [].forEach.call(document.getElementsByClassName("settings"), (elem) => elem.style.display = settings.visible ? "inherit":"none");
}

// Saves options to chrome.storage
const save_options = async () => {
    var enableWeather = document.getElementById("weather-input").checked;
    var customImg = settings.customImg;
    var customColors = {
      bg: document.getElementById("bg-input").value,
      fg: document.getElementById("fg-input").value,
      accent: document.getElementById("accent-input").value,
      fringe: document.getElementById("fringe-input").value,
      text: document.getElementById("text-input").value
    };
    chrome.storage.sync.set({
      enableWeather: enableWeather,
      customImg: customImg,
      customColors: customColors
    });
}
  
// Restores radio button states using the preferences stored in chrome.storage.
const restore_options = async () => {
    return new Promise(resolve => {
        chrome.storage.sync.get({
            enableWeather: false,
            customImg: "resources/thumb.png",
            customColors: {
                bg: "",
                fg: "",
                accent: "",
                fringe: "",
                text: ""
            }
        }, items => {
            settings.enableWeather = items.enableWeather;
            document.getElementById("weather-input").checked = items.enableWeather;
            settings.customImg = items.customImg
            document.getElementById("image").src = items.customImg;
            Object.assign(settings.customColors, items.customColors);
            document.getElementById("bg-input").value = items.customColors.bg;
            document.getElementById("fg-input").value = items.customColors.fg;
            document.getElementById("accent-input").value = items.customColors.accent;
            document.getElementById("fringe-input").value = items.customColors.fringe;
            document.getElementById("text-input").value = items.customColors.text;
            resolve();
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    // Restore options & custom CSS
    await restore_options();
    let root = document.querySelector(":root");
    root.style.setProperty("--color-bg", settings.customColors.bg);
    root.style.setProperty("--color-fg", settings.customColors.fg);
    root.style.setProperty("--color-accent", settings.customColors.accent);
    root.style.setProperty("--color-fringe", settings.customColors.fringe);
    root.style.setProperty("--color-text", settings.customColors.text);

    // Imports background if necessary
    if (settings.enableWeather) {
        let weather = document.createElement("script");
        weather.src = "resources/weather.js";
        document.getElementById("container").appendChild(weather);
    }

    // Handles search bar length
    var elem = document.getElementById("search-input");
    elem.oninput = () => {
        elem.style.width = (elem.value.length + 1) + 'ch';
    }

    // Handles image input
    document.getElementById("image-input").oninput = (e) => {
        let url = URL.createObjectURL(e.target.files[0]);
        document.createElement("img").src = url;
        settings.customImg = url;
    }

    document.getElementById("reset-image").onclick = () => {
        settings.customImg = "resources/thumb.png";
        document.getElementById("image-input").value = "";
    }

    // Handles corner button actions
    let sButton = document.getElementById("settings-toggle");
    let rButton = document.getElementById("refresh-button");
    sButton.addEventListener("click", () => {
        toggleSettings();
        if (settings.visible) {
            sButton.innerText = "Save";
            rButton.innerText = "Cancel"
            sButton.classList.add("active");
            rButton.classList.add("active");
        }
        else {
            save_options();
            sButton.innerText = "\u2699";
            rButton.innerText = "\u27f3";
            sButton.classList.remove("active");
            rButton.classList.remove("active");
            location.reload();
        }
    });

    rButton.addEventListener("click", () => {
        if (document.getElementById("refresh-button").classList.contains("active")) {
            toggleSettings();
            sButton.innerText = "\u2699";
            rButton.innerText = "\u27f3";
            sButton.classList.remove("active");
            rButton.classList.remove("active");
        } else location.reload();
    });
});