chrome.storage.local.get('cartItems', (obj) => {
  let cartItems = obj.cartItems;
  console.log(obj);
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    chrome.browserAction.setBadgeText({ text: cartItems.length.toString() });
  }
});
