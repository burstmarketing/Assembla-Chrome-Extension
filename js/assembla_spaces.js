var ticket_tab_accordion_view;
var AssemblaApp = chrome.extension.getBackgroundPage().AssemblaApp;


AssemblaApp.Views.Ticket_Tab_Accordion = Backbone.View.extend({
    initialize : function(){
        this._ticketViews = [];

        AssemblaApp.dispatcher.on("bootstrapActiveSpaces:loaded", function () {
	    this.collection = AssemblaApp.getActiveTickets();
            this.render();
        }, this);

    },
    render : function() {
	
	jQuery(this.el).empty();
	
	if( this.collection.length ){
	    this.collection.each( function(ticket){
		var view =  new AssemblaApp.Views.Ticket_Accordion_Element({
		    el : this.el,
		    model : ticket
		});
		this._ticketViews.push(view);
		view.render();
		
            }, this );
	    
	    jQuery(this.el).accordion({ collapsible: true,
					autoHeight: false,
					active: false });
	} else {
	    jQuery(this.el).html( "<div class='loader-bar'></div>" );
	}
    },
    
});

AssemblaApp.Views.Ticket_Accordion_Element = Backbone.View.extend({
    render : function() {
        var t = _.extend({}, this.model.attributes);

        t.date_string = "";
        t.date_class = "";
        if( this.model.get("due_date") ){
            var d = new Date(this.model.get("due_date"));
            var current_date = new Date();
            t.date_string = ( parseInt(d.getUTCMonth()) + 1 ) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
            t.date_class = (d < current_date) ? "past_due" : '';
        }

        t.estimate = ( parseInt(this.model.get("estimate")) ) ? this.model.get("estimate") : "";

        var tmplt = _.template(jQuery("#ticket-accordion").html() );
        jQuery(this.el).append( tmplt({ ticket : t }) );
    }
});



jQuery(document).ready(function() {
			      
    // When clicking a space link, (wiki, files, time, etc) - Open a new tab for it
    jQuery('.space-link').live( "click", function() {
	chrome.tabs.create({url: "http://" + jQuery(this).attr('href')});
	return false;
    });

    ticket_tab_accordion_view = new AssemblaApp.Views.Ticket_Tab_Accordion({ 
	el : "#tabs-1 #ticket-div", 
	collection : AssemblaApp.getActiveTickets()
    });

    ticket_tab_accordion_view.render();


/*
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
	   jQuery(this).attr('href', AssemblaApp.getSpaceBaseUrl( space.get("wiki_name") + "/" + jQuery(this).data('urlkey')));
       });

       if( space.get("active_tickets").length ){
	   var ticketSelect = jQuery('<select id="assembla-tickets">');

	   jQuery.each(space.get("active_tickets"), function(i, item) {
	       ticketSelect.append( jQuery('<option>').val( item.id)
				    .text( item.get("number") + ': ' + item.get("summary")) );
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

*/

});

