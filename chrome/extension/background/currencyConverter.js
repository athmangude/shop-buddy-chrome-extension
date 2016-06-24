// https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("USDKES")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
var $ = require('jquery');

function currencyConverter(currencyFrom,currencyTo,currencyInput, callback){
    var yqlBaseUrl = "https://query.yahooapis.com/v1/public/yql";
    var yqlQuery = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("'+currencyFrom+currencyTo+'")';
    var yqlQueryUrl = yqlBaseUrl + "?q=" + yqlQuery + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    $.get( yqlQueryUrl, function( response ) {
        return callback(response.query.results.rate.Rate);
    });
}

module.exports = currencyConverter;
