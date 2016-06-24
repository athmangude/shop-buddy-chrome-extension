require('./currencyConverter');

/**
 * listen to messages from the content script and respond appropriately
 * @param {callback function with params} (request, sender, sendResponse
 *    @param request {the request object}
 *    @param sender { the sender object }
 *    @param send { callbacj function to allow sending back a response to the sender }
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // check the action on teh request object
    if (request.action === 'GET_DOLLAR_EXCHANGE_RATE') {
        /**
         * The user wants the current exchange rate,
         * 	> if we have an exchange rate in storage for the current day
         * 		> respond with the exchange rate
         * 	> if we don't have one
         * 		> Make an http request to get one
         * 		> Save it to storage
         * 		> Respond with the current rate
         */

        console.log(request, sender, sendResponse);

        sendResponse({
            action: 'GET_DOLLAR_EXCHANGE_RATE',
            rate: 101.27
        });

    }
});
