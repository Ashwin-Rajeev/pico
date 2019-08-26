function addData() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "add_data" });
    });
}

function downloadData() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "download_file" });
    });
}

function clearSelection() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "clear_selection" });
    });
}

function addFileType() {
    var file = document.getElementById("file");
    var value = file.options[file.selectedIndex].value;
    file.options[file.selectedIndex].selected = true;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "file_type_selection", payload: value });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button1").addEventListener("click", addData);
    document.getElementById("button2").addEventListener("click", downloadData);
    document.getElementById("button3").addEventListener("click", clearSelection);
    document.getElementById("file").addEventListener("click", addFileType);
});
