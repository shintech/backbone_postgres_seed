import Marionette from 'marionette'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options.app
  }
})

module.exports = Controller
