
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
       var space_id = jQuery("#assembla-spaces option:selected").val();
       jQuery('#assembla-tickets').remove();


       AssemblaApp.getActiveTicketsForSpace( space_id, function(data){

	   // add stuff for links etc.

	   var ticketSelect = jQuery('<select id="assembla-tickets">');

	   jQuery.each(data, function(i, item) {
	       ticketSelect.append( jQuery('<option>').val( item.id)
				    .text( item.number + ': ' + item.summary) );
	   });

	   // Only add it if there are options
	   if (ticketSelect.find("option")) {
	       jQuery('body').append(ticketSelect);
	       jQuery('#assembla-tickets').chosen({no_results_text: "No tickets found matching "});
	   } else {
	       jQuery('body').append( jQuery("<p id='assembla-tickets'>No Active Tickets for this Space</p>") );
	   }


       });

/*
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

          }
        }); // jQuery.ajax
  */
	}); // jQuery('#assembla-spaces').live('change')
});

