function getSelectionText(){
    var selectedText = ""
    if (window.getSelection){
        selectedText = window.getSelection().toString()
    }
    return selectedText
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
            var thetext = getSelectionText()
            if (thetext.length > 0){
                console.log(thetext)
            }
      }
    }
  );
