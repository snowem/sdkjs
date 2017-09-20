// declare SnowSDK namespace
(function(window, undefined) {
   var SnowSDK = {};

   if (window.SnowSDK) {
      return;
   }

   function loadScript(url, callback) {
      var script = document.createElement('script');
      script.async = true;
      script.src = url;
      var entry = document.getElementsByTagName('script')[0];
      entry.parentNode.insertBefore(script, entry);

      console.log("loading script: " + url);
      script.onload = script.onreadystatechange = function() {
         var rdyState = script.readyState;
         if (!rdyState || /complete|loaded/.test(script.readyState)) {
            console.log("script loaded: " + url);
            callback();
            script.onload = null;
            script.onreadystatechange = null;
         }
      }
   }

   function getBaseUrl(filename) {
      var scriptElements = document.getElementsByTagName('script');
      for (var i = 0; i < scriptElements.length; i++) {
         var source = scriptElements[i].src;
         if (source.indexOf(filename) > -1) {
            var location = source.substring(0, source.indexOf(filename)) + filename;
            return location;
         }
      }
      return false;
   }      

   SnowSDK.init = function(callback) {
      var url = getBaseUrl("snowsdk.js").replace("snowsdk.js","snowcore.js");
      loadScript(url,callback);
   }
   window.SnowSDK = SnowSDK;
   
   // call user-defined callback if needed
   if (typeof window.snowAsyncInit === 'function') {
      window.snowAsyncInit();
   }

})(this);



