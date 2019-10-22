chrome.commands.onCommand.addListener(function(command) {
  if (command === "add_data") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "add_data" });
    });
  } else if (command === "download_data") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "download_file" });
    });
  } else if (command === "clear_data") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "clear_selection" });
    });
  } else if (command === "clear_specific") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "clear_specific_selection" });
    });
  }
});
