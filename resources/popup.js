// saves options to chrome.storage
function save_options() {
  var bool = document.getElementById("options-input").checked;
  chrome.storage.sync.set({
    optionsEnabled: bool,
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
    optionsEnabled: false,
  }, function(items) {
    document.getElementById("options-input").checked = items.optionsEnabled;
  });
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("options-input").addEventListener("click", save_options);