
// Setup initial values when popup is first opened.
jQuery('document').ready(function($) {
    var background = chrome.extension.getBackgroundPage();
    var MGI = background.MGI;
    if (!localStorage['name'] || !localStorage['password']) {
        var body = jQuery('body');
        body.html('<p>Please first enter your credentials under chrome settings, extensions</p><p>After saving configuration it may take up to 60 seconds for data to display.</p>');
        return;
    }
    MGI.getData();
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
        html="";
        html = html + '<p><a target="_blank" href="' + issue['html_url'] + '">' + issue['title'] + '</a></p>';        
    }
    jQuery('div.issue-container div.content').html(html); 
}
