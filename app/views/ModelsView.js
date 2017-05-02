import ModelView from './ModelView'

const ModelsView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: ModelView
})

export default ModelsView
