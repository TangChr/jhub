// JSONP
// ----
function jsonp(url, callback) {
    jhub.__jsonp_callback = function(result) {
        callback(result);
    };
    var head   = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('src', url+'?callback=jhub.__jsonp_callback');
    head.appendChild(script);
    head.removeChild(script);
}