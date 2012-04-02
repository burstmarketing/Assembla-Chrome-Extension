var time_log_tab_accordion_view;
var AssemblaApp = chrome.extension.getBackgroundPage().AssemblaApp;

AssemblaApp.Views.Time_Log_Accordion = Backbone.View.extend({
    initialize : function(){
        this._timelogViews = [];

        AssemblaApp.getTimeLogs().on("change", function () {
	    this.collection = AssemblaApp.TimeLogs();
            this.render();
        }, this);

    },

    render : function() {
	jQuery(this.el).empty();
	if( this.collection.length ){
	    this.collection.each( function(timelog){
		var view =  new AssemblaApp.Views.Time_Log_Accordion_Element({
		    el : this.el,
		    model : timelog
		});
		this._timelogViews.push(view);
		view.render();

            }, this );

	    //  we're not garunteed that the space and ticket for each
	    //  timelog will be in our cached spaces so we render them
	    //  with loading spinners and then set the actual values using
	    //  the 'with'  functions which should load the correct content
	    //  immediately if the space/ticket is in the cache,  or call
	    //  out to the API to get the right space/ticket info.

	    // set up an element variable to be passed into all the
	    // 'with' function closures.
	    var element = this.el;

	    // 'this' referes to the space model

	    this.collection.each( function(tl){
		AssemblaApp.withSpace( tl.get("space_id"), function(){
		    // 'this' referes to the ticket model
		    this.withTicket( tl.get("ticket_number"), function(){
			jQuery(element).find("h3." + tl.get("id") + " span.timelog-name" ).empty()
			    .html( this.get("number") + ": " + this.get("summary"));

		    });
		});
	    }, this );

	    jQuery(this.el).accordion({ collapsible: true,
					autoHeight: false,
					active: false });

	}
	return this;
    }
});

AssemblaApp.Views.Time_Log_Accordion_Element = Backbone.View.extend({
    render : function() {
	var tl = this.model.toJSON();

	tl.ticket_name = "<img src='img/ajax-loader-spinner-small.gif'/>";


        var tmplt = _.template(jQuery("#timelog-accordion").html() );
        jQuery(this.el).append( tmplt({ timelog : tl }) );


	return this;
    }
});



jQuery(document).ready(function() {

    time_log_tab_accordion_view = new AssemblaApp.Views.Time_Log_Accordion({
	el : "#tabs-3 #previous_time_logs",
	collection : AssemblaApp.getTimeLogs()
    });

    time_log_tab_accordion_view.render();

});

