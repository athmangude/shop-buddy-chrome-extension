var moment = require('moment');

var currencyConverter = require('./currencyConverter');

/**
 * listen to messages from the content script and respond appropriately
 * @param {callback function with params} (request, sender, sendResponse
 *    @param request {the request object}
 *    @param sender { the sender object }
 *    @param send { callback function to allow sending back a response to the sender }
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(request, sender, sendResponse);

    // check the action on teh request object
    if (request.action === 'GET_DOLLAR_EXCHANGE_RATE') {
        /**
         * The user wants the current exchange rate,
         * 	if we have an exchange rate in storage for the current day
         * 		if the timestamp is less than a day old
         * 			> respond with the exchange rate
         * 		else
         * 			> get a new exchange rate
         *
         * 	if we don't have one
         * 		> Make an http request to get one
         * 		> Save it to storage
         * 		> Respond with the current rate
         */

        // TODO: check if the exchange rate exists in storage and return
        chrome.storage.sync.get('usdExchangeRate', function (results) {
            // there is no exchange rate in storage
            if (!results.usdExchangeRate) {
                // request for an exchange rate
                currencyConverter('USD', 'KES', 1, function (response) {
                    //  save rate to storage
                    chrome.storage.sync.set({
                        usdExchangeRate: {
                            rate: response,
                            updatedAt: new Date(),
                        }
                    }, function () {
                        sendResponse({
                            action: 'GET_DOLLAR_EXCHANGE_RATE',
                            rate: response
                        });
                    });
                });
            } else {
                // check if the exchange rate was updated more than 0 days apart
                if (moment(new Date()).diff(moment(results.usdExchangeRate.updatedAt), 'days') > 0) {
                    // the exchange rate is more than 1 day old
                    // request for an exchange rate
                    currencyConverter('USD', 'KES', 1, function (response) {
                        //  save rate to storage
                        chrome.storage.sync.set({
                            usdExchangeRate: {
                                rate: response,
                                updatedAt: new Date(),
                            }
                        }, function () {
                            sendResponse({
                                action: 'GET_DOLLAR_EXCHANGE_RATE',
                                rate: response
                            });
                        });
                    });
                } else {
                    sendResponse({
                        action: 'GET_DOLLAR_EXCHANGE_RATE',
                        rate: results.usdExchangeRate.rate,
                    });
                }
            }
        });

        return true;
    }
});

/**
 * listen to messages from external pages
 * @param {function} (request, sender, sendResponse) [callback function to respond]
 */
chrome.runtime.onMessageExternal.addListener( function(request, sender, sendResponse) {
    // console.log(request, sender, sendResponse);

    if (sender.url === 'chrome-extension://jllbjccoodgjljdmpijpmkhmdkndamho/window.html') {
        if (request.message === 'GAPI_LOADED') {
            // shopbuddy window is letting us know that GAPI is loaded
            // send message to closest content script to enable login with Google button
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                console.log(tabs);
                // chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                //     console.log(response.farewell);
                // });
            });
        }
    }
});
