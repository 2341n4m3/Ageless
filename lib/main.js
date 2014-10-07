var contextMenu = require("sdk/context-menu");
var buttons = require('sdk/ui/button/action');
var { Hotkey } = require("sdk/hotkeys");
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");


exports.main = function (options, callbacks) {
    if (options.loadReason === 'install') {
        require("sdk/tabs").open(data.url("installation.html"));
   }
};

var hotKey = Hotkey({
  combo: "control-alt-y",
  onPress: function() {
    handleClick();
  }
});

var button = buttons.ActionButton({
        id: "watch-age-restricted-youTube-video",
        label: "Watch age restricted video on YouTube",
        icon: {
            "16": "./images/icon-16.png",
            "32": "./images/icon-32.png",
            "64": "./images/icon-64.png"
        },
        onClick: handleClick
    });

var contextMenu = contextMenu.Item({
        label: "Watch age restricted video on YouTube",
        context: contextMenu.URLContext("*.youtube.com"),
        contentScript: 'self.on("click", function () { self.postMessage(); });',
        onMessage: function () {
            handleClick();
        }
    });

function handleClick() {
    var activeTabUrl = tabs.activeTab.url;
    var regexp = /www\.youtube\.com\/watch\?v=([\w-_]*)/;
 
    if (regexp.test(activeTabUrl) === true) {
	tabs.open("https://www.youtube.com/embed/" + activeTabUrl.match(regexp)[1] + "?autoplay=1");
    }
}
