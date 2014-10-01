define([
		'backbone'
	],
	function(Backbone){
		'use strict';
		var toDoModel = Backbone.Model.extend({
			defaults: {
				item: '',
				completed: false
			},
			addNewOrEditModel: function(item) {
				this.set('item', item);
				this.set('completed',false );
			},
			toggleCompleted: function() {
				this.set('completed',!(this.get('completed')));
				this.save();
			}
		});
		return toDoModel;
	}
);