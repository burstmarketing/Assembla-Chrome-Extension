
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
	jQuery('#tabs-2 #assembla-spaces').append('<option value="' + item.id + '">' + item.name + '</option>');
    });

   // Implementing chosen for spaces
   jQuery('#tabs-2 #assembla-spaces').show()

   // On the selection of a space, load the appropriate tickets
   jQuery('#tabs-2 #assembla-spaces').live('change', function() {
       var space_id = jQuery("#tabs-2 #assembla-spaces option:selected").val();
       var space = AssemblaApp.getSpace( space_id );
       jQuery('#tabs-2 #ticket-div').empty();

       // add stuff for links etc.
       var space_id = jQuery("#tabs-2 #assembla-spaces option:selected").val();
       jQuery('#tabs-2 #space-links').show();


       jQuery('#tabs-2 .space-link').each(function() {
	   jQuery(this).attr('href', AssemblaApp.getSpaceBaseUrl( space.wiki_name + "/" + jQuery(this).data('urlkey')));
       });

       if( space.active_tickets.length ){
	   var ticketSelect = jQuery('<select id="assembla-tickets">');

	   jQuery.each(space.active_tickets, function(i, item) {
	       ticketSelect.append( jQuery('<option>').val( item.id)
				    .text( item.number + ': ' + item.summary) );
	   });

	   jQuery('#tabs-2 #ticket-div').append(ticketSelect).append("<a class='gototicket' href='#'>Go to Ticket</a>");
       } else {
	   jQuery('#tabs-2 #ticket-div').append( jQuery("<p id='assembla-tickets'>No Active Tickets for this Space</p>") );
       }

   }); // jQuery('#assembla-spaces').live('change')




    jQuery('#tabs-2 #assembla-tickets').live('change', function() {
	var space_id = jQuery('#tabs-2 #assembla-spaces option:selected').val();
	var ticketid = jQuery('#tabs-2 #assembla-tickets option:selected').val();

	chrome.tabs.create({url: "http://" + AssemblaApp.getSpaceBaseUrl( AssemblaApp.getWikiName(space_id) ) + "/tickets/" + AssemblaApp.getTicketNumber(ticketid) });

	return false;
    });

    jQuery("body").delegate("#tabs-2 a.gototicket", "click", function(){

	var space_id = jQuery('#tabs-2 #assembla-spaces option:selected').val();
	var ticketid = jQuery('#tabs-2 #assembla-tickets option:selected').val();

	chrome.tabs.create({url: "http://" + AssemblaApp.getSpaceBaseUrl( AssemblaApp.getWikiName(space_id) ) + "/tickets/" + AssemblaApp.getTicketNumber(ticketid) });

	return false;



    });



});

