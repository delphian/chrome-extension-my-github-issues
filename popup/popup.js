
// Setup initial values when popup is first opened.
jQuery('document').ready(function($) {
    var background = chrome.extension.getBackgroundPage();
    var AstroEmpires = background.AstroEmpires;
    if (!localStorage['name'] || !localStorage['password']) {
        var body = jQuery('body');
        body.html('<p>Please first enter your credentials under chrome settings, extensions</p><p>After saving configuration it may take up to 60 seconds for data to display.</p>');
        return;
    }



});

/**
 * Update the statistics.
 */
function printValues(mgi) {
    var issues = eval('(' + mgi.issues + ')');
    var length = issues.length,
        issue = null,
        html = '';

    for (var i = 0; i < length; i++) {
        issue = issues[i];
        html = html + '<p>' + issue['title'] + '</p>';
    }
    jQuery('div.issue-container div.content').html(html); 
}
