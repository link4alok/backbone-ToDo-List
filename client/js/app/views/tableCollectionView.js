define([
		'backbone',
		'handlebars',
		'jquery',
		'views/tableRowModelView',
		'text!templates/tableCollectionTemplate.html'
	],
	function(Backbone,Handlebars,$,TableRowModelView,tableCollectionTemplate){
		'use strict';
		var tableCollectionView = Backbone.View.extend({
			tagName: 'main',
			events: {
				'click #btnSubmit': 'createNewToDo',
				'click #btnDelete': 'deleteCompleted',
				'focus #placeHolderText': 'hidePlaceholder',
				'blur #inputText': 'showPlaceHolder'
			},
			hidePlaceholder: function() {
				this.$el.find('#placeHolderText')
					.css('display','none');
				this.$el.find('#inputText')
					.css('display','inline-block').val('').focus();
			},
			showPlaceHolder: function() {
				if (this.$el.find('#inputText').val() === '') {
					this.makePlaceholdeVisible();
				}
			},
			makePlaceholdeVisible: function() {
				this.$el.find('#placeHolderText')
					.css('display','inline-block')
					.val('Enter To Do Item')
					.css('opacity','0.5');
				this.$el.find('#inputText')
					.css('display','none');
			},
			initialize: function() {
				this.listenTo(this.collection,'add',this.render);
				this.compiledTemplate = Handlebars.compile(tableCollectionTemplate);
				this.collection.fetch();
			},
			render : function() {
				this.$el.html(this.compiledTemplate({}));
				var ul = this.$el.find('ul');
				this.collection.each(function(m) {
					var tableRowModelViewObj = new TableRowModelView({
						model : m
					});
					ul.append(tableRowModelViewObj.render().$el);
				});
				this.makePlaceholdeVisible();
				return this;
			},
			createNewToDo: function() {
				var newModel = this.collection.createNewModel(),
					newItem = this.$el.find('#inputText').val();
				newModel.addNewOrEditModel(newItem);
				this.collection.create(newModel);
			},
			deleteCompleted: function() {
				this.collection.deleteCompleted();
			}
		});
		return tableCollectionView;
	}
);