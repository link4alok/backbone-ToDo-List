/*
* Backbone collection to store the toDoModel models
* 
* Define the Backbone Collection dependencies
* @define
* @params {array} all the dependencies of the Collection with addresses defined in main.js
* @params {function} exports the dependencies to variable that are used in the function block
*/

define([
        //backbone as dependency
        'backbone',
        //toDoModel as dependency that acts as model for this collection
        'models/toDoModel'
    ],
    /*
    * function that creates the collection
    * 
    * @params {object} Backbone is exported for use
    * @params {function} Constructor function denoting a row model
    * @return {function} Constructor function for the collection of model
    */

    function(Backbone, toDoModel){
        'use strict';

        // A Backbone collection extended as tableCollection with following properties
        // model : toDoModel, ie the row model containing li dedicated to a particular toDoitem
        // url : http://localhost:8081/toDoItems, the url at which restify server is supposed to hit

        var tableCollection = Backbone.Collection.extend({
            model: toDoModel,
            url: 'http://localhost:8081/toDoItems',
            /*
            * function that creates new instance of the model
            * 
            * @return {object} returns the new instance of the model
            */
            createNewModel: function() {
                return new this.model();
            },
            /*
            * function that finds all the models with completed attribute as true and destroy them from the collection
            */
            deleteCompleted: function() {
                // searches for the models that have been completed
                var completedCollection = this.where({completed: true});
                //iterate through the completed collection and destroys them
                for (var i=0;i<completedCollection.length;i++) {
                    completedCollection[i].destroy();
                }
            }
        });
        return tableCollection;
    }
);
