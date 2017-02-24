import Backbone from 'backbone'
import Marionette from 'marionette'
import RootView from './views/RootView'
import Router from './router'

const App = Marionette.Application.extend({
  region: 'body',
  onStart: function () {
    this.view = new RootView()
    this.showView(this.view)
    this.Router = new Router({ app: this })
    Backbone.history.start()
  }
})

export default App
