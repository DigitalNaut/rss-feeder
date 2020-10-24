var localStorage = window.localStorage;

function StorageTest() {
  try {
    let storageTest = "__storage_test__";
    localStorage.setItem(storageTest, storageTest);
    localStorage.removeItem(storageTest);
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
      localStorage &&
      localStorage.length !== 0
    );
  }
}

function SafeWrite(name, data) {
  if (StorageTest()) {
    return localStorage.setItem(name, JSON.stringify(data));
  } else return false;
}

function SafeRead(name) {
  if (StorageTest()) {
    let content = localStorage.getItem(name);
    console.log("Reading from storage: Trying to parse content of type", typeof content);
    
    if (
      content === "undefined" ||
      content === "null" ||
      content === undefined ||
      content === null
      ) {
        console.log("and it failed for being a", content);
      } else {
        console.log("and it succeeded:", content.slice(0, 60), "...");
      return JSON.parse(content);
    }
  }

  return false;
}

module.exports = {
  SafeWrite,
  SafeRead,
};
