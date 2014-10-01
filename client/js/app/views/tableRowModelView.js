define([
		'backbone',
		'handlebars',
		'text!templates/tableRowTemplate.html'
	],
	function(Backbone,Handlebars,tableRowTemplate){
		'use strict';
		var tableRowModelView = Backbone.View.extend({
			tagName:'li',
			events: {
				'click input:checkbox' : 'changeStatus',
				'blur span' : 'saveModel',
				'dblclick span' : 'btnUpdateToDo'
			},
			initialize: function() {
				this.compiledTemplate = Handlebars.compile(tableRowTemplate);
				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.removeToDo);
			},
			saveModel : function() {
				var newItem = this.$el.find('span').text();
				this.model.addNewOrEditModel(newItem);
				this.$el.find('span').attr('class',this.model.get('completed')?'completed':'normalText');
				this.$el.find('input:checkbox').attr('checked',this.model.get('completed'));
				this.model.save();
			},
			changeStatus: function() {
				this.model.toggleCompleted();
			},
			btnUpdateToDo: function() {
				this.$el.find('span').attr('contentEditable',true);
				this.$el.find('span').focus();
				this.$el.find('span').attr('class','normalText');
				this.$el.find('input:checkbox').attr('checked',false);
			},
			render : function() {
				this.$el.html(this.compiledTemplate(this.model.toJSON()));
				this.$el.find('span').attr('class',this.model.get('completed')?'completed':'normalText');
				this.$el.find('input:checkbox').attr('checked',this.model.get('completed'));
				return this;
			},
			removeToDo : function() {
				this.$el.remove();
			}
		});
		return tableRowModelView;
	}
);