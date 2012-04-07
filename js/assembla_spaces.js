var ticket_tab_accordion_view;
var AssemblaApp = chrome.extension.getBackgroundPage().AssemblaApp;

AssemblaApp.Views.Spaces_Tab = Backbone.View.extend({
    initialize : function() {
	this.ticket_list = new AssemblaApp.Views.Ticket_Tab_Accordion({});

	AssemblaApp.getActiveSpaces().on( "change", function () {
	    this.collection = AssemblaApp.getActiveSpaces();
            this.render();
        }, this);

    },

    render : function() {
	jQuery(this.el).empty();
	if( this.collection.length ){
            var tmplt = _.template(jQuery("#spaces-tab").html() );
            jQuery(this.el).append( tmplt({ spaces : this.collection.toJSON() }) );
	} else {
	    jQuery(this.el).html( "<div class='loader-bar'></div>" );
	}
	return this;
    },

    events : {
	"change #assembla-spaces" : "spaceSelect"
    },

    spaceSelect : function(){
	var space_id = jQuery("#tabs-2 #assembla-spaces option:selected").val();
	if( space_id != 0 ){
	    var space = this.collection.get(space_id);

	    var tmplt = _.template(jQuery("#spaces-tab-space").html() );
            jQuery("#ticket-finder").html( tmplt({ space : space.toJSON() }) );

	    if( space.getTickets().length ){

		this.ticket_list.setElement("#spaces-tab-ticket-div");
		this.ticket_list.collection = space.getTickets()
		this.ticket_list.render();

		jQuery("#spaces-tab-ticket-div").accordion({ collapsible: true,
							     autoHeight: false,
							     active: false });


	    } else {
		jQuery("#spaces-tab-ticket-div").html("<p>No Active Tickets for this Space.</p>");
	    }

	} else {
	    jQuery("#ticket-finder").empty();
	}
    }



})



AssemblaApp.Views.Ticket_Tab_Accordion = Backbone.View.extend({
    initialize : function(){
        this._ticketViews = [];

        AssemblaApp.getActiveSpaces().on("change", function () {
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
	return this;
    },

});

AssemblaApp.Views.Ticket_Accordion_Element = Backbone.View.extend({
    render : function() {
        var t = _.extend({}, this.model.attributes);

        t.date_string = "";
        t.date_class = "";
        if( this.model.getDueDate() ){
            var d = new Date(this.model.getDueDate());
            var current_date = new Date();
            t.date_string = ( parseInt(d.getUTCMonth()) + 1 ) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
            t.date_class = (d < current_date) ? "past_due" : '';
        }


	t.space_name = AssemblaApp.getActiveSpaces().get(t.space_id).get('name');
	t.space_wiki_name = AssemblaApp.getSpaceBaseUrl( AssemblaApp.getActiveSpaces().get(t.space_id).get("wiki_name") );

        t.estimate = ( parseInt(this.model.get("estimate")) ) ? this.model.get("estimate") : "";

        var tmplt = _.template(jQuery("#ticket-accordion").html() );
        jQuery(this.el).append( tmplt({ ticket : t }) );

	return this;
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

    spaces_tab = new AssemblaApp.Views.Spaces_Tab({
	el : "#tabs-2",
	collection : AssemblaApp.getActiveSpaces()
    });



    ticket_tab_accordion_view.render();
    spaces_tab.render();



});

