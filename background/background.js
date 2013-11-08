

MyGithubIssues = function(name, pass) {
	this.user = {
		name: name,
		pass: pass,
	};
    this.issues = null;
};
/**
 * Send and receive ajax requests.
 *
 * @param string url
 *   The fully formed url to access.
 * @param string type
 *   Type of access (POST, GET).
 * @params string
 *   Name value pairs just as during a GET request.
 */
MyGithubIssues.prototype.ajax = function(url, type, params) {
    var xhr = new XMLHttpRequest();
    thisMGI = this;
    xhr.onreadystatechange = function () {
        if (this.readyState == this.DONE) {
            // Everything went 'ok'.
            if (this.status == 200) {
                thisMGI.processData(this.responseText);
            }
            // A response header other than 200 (ok) was returned. Remember
            // redirects are transparantly handled by XMLHttpRequest().
            else {
                console.log('Failed to open ' + url);
            }
        }
    },
    xhr.open(type, url, true);
    auth = this.base64Encode();
    xhr.setRequestHeader('Authorization', auth);
    // No post parameters exist, this may be a simple GET.
    if (null === params) {
        xhr.send();
    }
    else {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
};
MyGithubIssues.prototype.base64Encode = function() {
  var tok = this.user.name + ':' + this.user.pass;
  var hash = window.btoa(tok);
  return "Basic " + hash;
};
MyGithubIssues.prototype.getData = function() {
	this.ajax('https://api.github.com/issues', 'GET');
};
MyGithubIssues.prototype.processData = function(response) {
    this.issues = response;
    printValues(this);
};

var MGI = new MyGithubIssues(localStorage['name'], localStorage['password']);

/**
 * Return a reference to the popup window object.
 *
 * @return object|bool
 *   The window object if it exists (open), false otherwise.
 */
function getPopup() {
    var popup = false,
        popups = chrome.extension.getViews({type: "popup"});
    if (popups.length > 0) {
        popup = popups[0];
    }
    return popup;
}

// Fetch information every 5 to 8 minutes.
jQuery('document').ready(function ($) {
    // Poll for updates.
    setInterval(function () {
        MGI.getData();
    }, 5 * 60000);
});

function printValues(mgi) {
    if (popup = getPopup()) {
        popup.printValues(mgi);
    }
}

