// AMAZON_PUBLIC_KEY=AKIAIX4VTDIKSWDU3RCA
// AMAZON_SECRET_KEY=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
// PESAPAL_CONSUMER_KEY=2WVcrLQku/h1dgOU0oTUOgTjGYq+Zity
// PESAPAL_CONSUMER_SECRET=sJBZc7yFNon6a1YQfTaXL9IwKUg=

var moment = require('moment');

var currencyConverter = require('./currencyConverter');
var getPricing = require('./pricing');

var apa = require('./apa-client');



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
    switch (request.action) {
        case 'LOOK_UP_AMAZON_ITEMS':
            // only take the first 10 items due to amazon API limitations
            var pricingItems = request.items.slice(0, 10);
            var itemIds = [];
            pricingItems.forEach((item, i) => {
                itemIds.push(item.asin);
            });

            // Create a client
            var client = apa.createClient({
                "awsAccessKeyId" : "AKIAIX4VTDIKSWDU3RCA", // your aws access key id here
                "awsSecretKey" : "ReQt6CWiC2ediNGTzOHNQHb0zsbXZv9Hw1+9gAhT", // your secret key here
                "associateTag" : "no-tag" // your associate tag here
            });

            client.execute('ItemLookup',{
                ItemId: itemIds.toString(),
                ResponseGroup: 'ItemAttributes',
            }, function(err, data){
                if(err) {
                    return console.error(err);
                }

                var aggregatedPricingItems = pricingItems.map((item, i) => {
                    var amazonEquivalent = data.Items.Item.find((amazonItem) => {
                        return amazonItem.ASIN === item.asin;
                    });
                    return Object.assign({}, amazonEquivalent, item);
                });

                var pricedItems = getPricing(aggregatedPricingItems, request.exchangeRate);
                sendResponse(pricedItems);
            });


            return true;
            break;
        case 'GET_DOLLAR_EXCHANGE_RATE':
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
            break;
        default:
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
