function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// TODO: FIX THIS: setting the count on the badge does not work

// todos unmarked count
function setBadge(cartItems) {
  if (chrome.browserAction) {
    chrome.browserAction.setBadgeText({ text: cartItems.length.toString()});
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.cartItems);
    });
    return store;
  };
}
