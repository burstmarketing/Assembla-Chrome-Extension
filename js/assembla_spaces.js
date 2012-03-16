
var AssemblaApp = chrome.extension.getBackgroundPage().AssemblaApp;

jQuery(document).ready(function() {

   // When clicking a space link, (wiki, files, time, etc) - Open a new tab for it
   jQuery('.space-link').click(function() {
       chrome.tabs.create({url: "http://" + jQuery(this).attr('href')});
       return false;
   });

   // Grab the spaces in assembla, retrieved from the background page.


   // Populate select for spaces with assemblaSpaces
    jQuery.each(AssemblaApp.getActiveSpaces(), function(i, item) {
	jQuery('#assembla-spaces').append('<option value="' + item.id + '">' + item.name + '</option>');
    });

   // Implementing chosen for spaces
   jQuery('#assembla-spaces').show()

   // On the selection of a space, load the appropriate tickets
   jQuery('#assembla-spaces').live('change', function() {
       var space_id = jQuery("#assembla-spaces option:selected").val();

       jQuery('#assembla-tickets').remove();


       AssemblaApp.getActiveTicketsForSpace( space_id, function(data){

	   // add stuff for links etc.
	   var space_id = jQuery("#assembla-spaces option:selected").val();
	   jQuery('#space-links').show();


	   jQuery('.space-link').each(function() {
		   jQuery(this).attr('href', AssemblaApp.getSpaceBaseUrl( AssemblaApp.getWikiName(space_id) + "/" + jQuery(this).data('urlkey')));
	   });

	   if (data.length) {
	       var ticketSelect = jQuery('<select id="assembla-tickets">');

	       jQuery.each(data, function(i, item) {
		   ticketSelect.append( jQuery('<option>').val( item.id)
					.text( item.number + ': ' + item.summary) );
	       });

	       // Only add it if there are options

	       jQuery('body').append(ticketSelect).append("<a class='gototicket' href='#'>Go to Ticket</a>")
	   } else {
	       jQuery('body').append( jQuery("<p id='assembla-tickets'>No Active Tickets for this Space</p>") );
	   }
       });
   }); // jQuery('#assembla-spaces').live('change')




    jQuery('#assembla-tickets').live('change', function() {
	var space_id = jQuery('#assembla-spaces option:selected').val();
	var ticketid = jQuery('#assembla-tickets option:selected').val();

	chrome.tabs.create({url: "http://" + AssemblaApp.getSpaceBaseUrl( AssemblaApp.getWikiName(space_id) ) + "/tickets/" + AssemblaApp.getTicketNumber(ticketid) });

	return false;
    });

    jQuery("body").delegate("a.gototicket", "click", function(){

	var space_id = jQuery('#assembla-spaces option:selected').val();
	var ticketid = jQuery('#assembla-tickets option:selected').val();

	chrome.tabs.create({url: "http://" + AssemblaApp.getSpaceBaseUrl( AssemblaApp.getWikiName(space_id) ) + "/tickets/" + AssemblaApp.getTicketNumber(ticketid) });

	return false;



    });



});

