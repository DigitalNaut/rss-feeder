const handleClick = () => {
  var newTab = browser.tabs.create({
    active: true,
    index: 0,
    pinned: true,
    discarded: false,
    url: "index.html",
  });
  newTab.then(onCreated, onError);
};

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(handleClick);
