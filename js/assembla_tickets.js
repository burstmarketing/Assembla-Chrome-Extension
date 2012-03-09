jQuery(document).ready(function() {

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
});