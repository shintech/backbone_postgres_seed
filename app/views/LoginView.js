var LoginView = Backbone.Marionette.View.extend({
  tagName: 'div',
  className: 'panel panel-primary',
  template: require('../templates/login-view-template.html')
})

module.exports = LoginView
