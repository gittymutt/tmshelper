function listenForClicks() {

  document.addEventListener("click", (e) => {

    function makePresent(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "makePresent"
        });
    }

    function campusAssign(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "campusAssign"
        });
    }

    function fillIn(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {
          command: "fillIn",
          textBoxContent: document.getElementsByClassName('textarea')[0].value
        });
    }

    function enableSelect(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "enableSelect"
        });
    }

    function helpBox(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "helpBox"
        });
    }

    function reportError(error) {
      console.error(`Could not do it: ${error}`);
    }

    if (e.target.classList.contains("make-present")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(makePresent)
        .catch(reportError);
    }
    else if (e.target.classList.contains("campus-assign")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(campusAssign)
        .catch(reportError);
    }
    else if (e.target.classList.contains("fill-in")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(fillIn)
        .catch(reportError);
    }
    else if (e.target.classList.contains("enable-select")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(enableSelect)
        .catch(reportError);
    }
    else if (e.target.classList.contains("help-box")) {
      var creating = browser.windows.create(
        { width: 200,
          height: 600,
          left: 500,
          top: 100,
          url: "help.html"
        }
      );
    }
  });
}

function reportExecuteScriptError(error) {
  console.error(`Failed to execute TMSHelper content script: ${error.message}`);
}

browser.tabs.executeScript({file: "browser-polyfill.min.js"});
browser.tabs.executeScript({file: "content_script.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
