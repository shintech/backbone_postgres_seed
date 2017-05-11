import ModelView from './ModelView'

const ModelsView = Backbone.Marionette.CollectionView.extend({
  tagName: 'tbody',
  childView: ModelView
})

export default ModelsView
