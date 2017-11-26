var idbSupported = false;
var db;

document.addEventListener("DOMContentLoaded", function () {

    if ("indexedDB" in window) {
        idbSupported = true;
    }

    if (idbSupported) {
        var openRequest = indexedDB.open("employees", 1);

        openRequest.onupgradeneeded = function (e) {
            writeToConsoleScreen('Upgrading');
            console.log("Upgrading...");
        }

        openRequest.onsuccess = function (e) {
            writeToConsoleScreen('Success');
            console.log("Success!");
            db = e.target.result;
        }

        openRequest.onerror = function (e) {
            writeToConsoleScreen('Error');
            console.log("Error");
            console.dir(e);
        }

    }

}, false);