var localStorage = window.localStorage;

function storageAvailable() {
  try {
    let storageTest = "__storage_test__";
    storage.setItem(storageTest, storageTest);
    storage.removeItem(storageTest);
    return true;
  } catch (event) {
    return (
      event instanceof DOMException &&
      // everything except Firefox
      (event.code === 22 ||
        // Firefox
        event.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        event.name === "QuotaExceededError" ||
        // Firefox
        event.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function StorageManager() {
  function writeData() {
    if (storageAvailable()) {
      return true;
    } else return false;
  }

  function readData() {
    if (storageAvailable()) {
      return true;
    } else return false;
  }
}

export default StorageManager;
