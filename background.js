const tabCreateProperties = {
    active: true,
    index: 0,
    pinned: true,
    discarded: false,
    url: '/index.js'
  };
  
  const handleClick = () => {
    browser.tabs.create(tabCreateProperties).then(onCreated, onError);
  };
  
  function onCreated(tab) {
    console.log(`Created new tab: ${tab.id}`);
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  browser.browserAction.onClicked.addListener(handleClick);
  