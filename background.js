chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    if (command == "add_data") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "add_data" });
        });
    } else if (command == "download_data") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "download_file" });
        });
    }
});