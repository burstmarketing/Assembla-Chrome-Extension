jQuery(document).ready(function() {

    var lastChosenSpaceId   = null;
    var lastChosenTicketNum = null;

    var assemblaSpaces = chrome.extension.getBackgroundPage().assemblaSpaces;

    jQuery.each(assemblaSpaces, function(i, item) {
	var selected = (i == lastChosenSpaceId) ? ' selected' : '';

	jQuery('#assembla-spaces').append('<option value="' + i + '"' + selected + '>' + item + '</option>');
    }); 
    
    jQuery('#assembla-spaces').show().chosen({no_results_text: "No projects found matching "});


    var activeTickets = chrome.extension.getBackgroundPage().activeTickets;

    jQuery('#toggle-active-tickets').click(function() {
	jQuery('#active-tickets').append('<ul>');

	jQuery.each(activeTickets, function(i, item) {
	    jQuery('#active-tickets').append('<li>' + item.summary + '</li>');;
	});

	jQuery('#active-tickets').append('</ul>');

	jQuery('#active-tickets').toggle();

	jQuery('#ticket-finder').toggle();
    });
    
    // On the selection of a space, load the appropriate tickets    
    jQuery('#assembla-spaces').live('change', function() {
	jQuery('#assembla-tickets').remove();

	lastChosenSpaceId = jQuery('#assembla-spaces option:selected').val();
	
	jQuery.ajax({
	    cache: true,
	    async: true,
	    dataType: 'json',
	    url: 'http://danlamanna.com/assembla.php?tickets=true&space_id=' + jQuery('#assembla-spaces option:selected').val(),
	    success: function(resp) {
		var ticketsSelect = '<select id="assembla-tickets">';
		
		jQuery.each(resp, function(i, item) {
		    var excerpt = jps_shortString(item, 50);
		    ticketsSelect += '<option value="' + i + '">' + i + ': ' + excerpt.summary + '</option>';
		});
		
		ticketsSelect += '</select>';
		
		// Only add it if there are options
		if (ticketsSelect.indexOf('option') != -1) {
		    jQuery('body').append(ticketsSelect);

		    jQuery('#assembla-tickets').chosen({no_results_text: "No tickets found matching "});
		}		
		
		// On the selection of a ticket, open a new tab with the ticket
		jQuery('#assembla-tickets').live('change', function() {
		    var spaceId   = jQuery('#assembla-spaces option:selected').val();
		    var ticketNum = jQuery('#assembla-tickets option:selected').val();

		    jQuery.ajax({
			cache: true,
			async: true,
			dataType: 'json',
			url: 'http://danlamanna.com/assembla.php?ticket_url=true&space_id=' + spaceId + '&ticket_num=' + ticketNum, 
			success: function(resp) {
			    chrome.tabs.create({url: resp.url});
			}
		    });		
		});
	    }   
	});
    });
});