var time_log_tab_accordion_view;
var AssemblaApp = chrome.extension.getBackgroundPage().AssemblaApp;

AssemblaApp.Views.Time_Log_Accordion = Backbone.View.extend({
    initialize : function(){
        this._timelogViews = [];

        AssemblaApp.getActiveTimeLogs().on("change", function () {
	    this.collection = AssemblaApp.getActiveTimeLogs();
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

	    jQuery(this.el).accordion({ collapsible: true,
					autoHeight: false,
					active: false });

	}
	return this;
    }
});

AssemblaApp.Views.Time_Log_Accordion_Element = Backbone.View.extend({
    render : function() {
        var tmplt = _.template(jQuery("#timelog-accordion").html() );
        jQuery(this.el).append( tmplt({ timelog : this.model.toJSON() }) );

	return this;
    }
});



jQuery(document).ready(function() {

    time_log_tab_accordion_view = new AssemblaApp.Views.Time_Log_Accordion({
	el : "#tabs-3 #previous_time_logs",
	collection : AssemblaApp.getActiveTimeLogs()
    });

    time_log_tab_accordion_view.render();

});

