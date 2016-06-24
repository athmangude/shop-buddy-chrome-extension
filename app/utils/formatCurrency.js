export const commaSeparate2dp = (number) => {
    var number = Number(number).toFixed(2);
    // separate thousands with commas, format numbers to specified decimal place
    var n = number.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
        return p<0 || i<p ? ($0+',') : $0;
    });
}
