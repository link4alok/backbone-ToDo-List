require.config({
	baseUrl:'/js/vendor',
	paths : {
		'models' : '/js/app/models',
		'collections' : '/js/app/collections',
		'views' :'/js/app/views',
		'templates' : '/js/app/pages'
	},
	shim :{
		underscore: {
			exports: '_'
		},
		handlebars : {
			exports : 'Handlebars'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});
require([
		'jquery',
		'collections/tableCollection',
		'views/tableCollectionView'
	],
	function($, TableCollection, TableCollectionView){
		'use strict';
		// It facillitates in cross origin server request while working with lt-ie9
		$.support.cors = true;
		//create instance of tableCollection function
		var tableCollectionObj = new TableCollection();
		// create instance of tableCollectionView using tableCollectionObj as collection for the view
		var tableCollectionViewObj =new TableCollectionView({
			collection : tableCollectionObj
		});
		// render the view to get $el and that is appended to the body
		tableCollectionViewObj.render().$el.appendTo($('body'));
	}
);