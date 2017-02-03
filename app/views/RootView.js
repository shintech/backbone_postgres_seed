var NavigationView = require("./NavigationView");

var RootView = Backbone.Marionette.View.extend({
  className: 'main',
  template: require("../templates/root-view-template.html"),
  regions: {
    header: {
      el: "#header-view"
    },
    main: {
      el: "#main-view"
    }
  },
  initialize: function(){
    this.render();
  },
  onRender: function(){
    this.showChildView('header', new NavigationView({ title: "Default" }));
  }
});

module.exports = RootView;