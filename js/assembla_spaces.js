
var AssemblaApp = chrome.extension.getBackgroundPage().AssemblaApp;

jQuery(document).ready(function() {

   // When clicking a space link, (wiki, files, time, etc) - Open a new tab for it
   jQuery('.space-link').click(function() {
	   chrome.tabs.create({url: jQuery(this).attr('href')});
   });

   // Grab the spaces in assembla, retrieved from the background page.


   // Populate select for spaces with assemblaSpaces
    jQuery.each(AssemblaApp.getSpaces(), function(i, item) {
	jQuery('#assembla-spaces').append('<option value="' + item.id + '">' + item.name + '</option>');
    });

   // Implementing chosen for spaces
   jQuery('#assembla-spaces').show().chosen({no_results_text: "No projects found matching "});

   // On the selection of a space, load the appropriate tickets
   jQuery('#assembla-spaces').live('change', function() {
	jQuery('#assembla-tickets').remove();

        // Loads the tickets for space_id
        jQuery.ajax({
	    cache: true,
	    async: true,
	    dataType: 'json',
	    url: 'http://danlamanna.com/assembla.php?tickets=true&space_id=' + jQuery('#assembla-spaces option:selected').val(),
	    success: function(resp) {
                // Get the space urls, wiki, files, etc
                jQuery.ajax({
	            url: 'http://danlamanna.com/assembla.php?get_space_urls=true&space_id=' + jQuery('#assembla-spaces option:selected').val(),
	            cache: true,
                    async: true,
                    dataType: 'json',
                    success: function(respo) {
	               jQuery('.space-link').each(function() {
	                   jQuery(this).attr('href', respo[jQuery(this).data('urlkey')]);
		       });

		       jQuery('#space-links').show();
                    }
                });

                // Start building the select box with tickets
		var ticketsSelect = '<select id="assembla-tickets">';

		jQuery.each(resp, function(i, item) {
		    var excerpt = item;
		    ticketsSelect += '<option value="' + i + '">' + i + ': ' + excerpt + '</option>';
		});

		ticketsSelect += '</select>';

		// Only add it if there are options
		if (ticketsSelect.indexOf('option') != -1) {
		    jQuery('body').append(ticketsSelect);

		    jQuery('#assembla-tickets').chosen({no_results_text: "No tickets found matching "});
		}
          }
        }); // jQuery.ajax
   }); // jQuery('#assembla-spaces').live('change')
});

