var Marionette = require("marionette");

var Controller = Marionette.Object.extend({
  
  initialize: function(options){
    
    this.app = options.app;
    
  }
});

module.exports = Controller;