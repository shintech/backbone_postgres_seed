import ModelsView from './ModelsView'
import Pagurbate from 'pagurbate'

const TableView = Backbone.Marionette.View.extend({
  tagName: 'div',
  template: require('../templates/table-view-template.html'),
  className: 'panel panel-primary',
  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    },
    footer: {
      el: '.panel-footer'
    }
  },
  events: {
    'mouseover .table-header': 'mouseoverHeader',
    'mouseout .table-header': 'mouseoutHeader',
    'mouseover .table-row': 'mouseoverRow',
    'mouseout .table-row': 'mouseoutRow'
  },

  initialize: function (options) {
    this.pageData = options.pageData
    this.panelHeading = options.panelHeading
  },

  serializeData: function () {
    return {
      'panelHeading': this.panelHeading
    }
  },

  onRender: function () {
    this.showChildView('body', new ModelsView({ collection: this.collection }))
    this.showChildView('footer', new Pagurbate({ pageData: this.pageData }))
  },

  mouseoverHeader: function (event) {
    $(event.currentTarget).css({'background-color': 'lightgrey', 'cursor': 'pointer'})
  },

  mouseoutHeader: function (event) {
    $(event.currentTarget).css('background-color', 'rgb(231, 231, 230)')
  },

  mouseoverRow: function (event) {
    $(event.currentTarget).css({'background-color': 'rgb(255, 255, 117)', 'cursor': 'pointer'})
  },

  mouseoutRow: function (event) {
    $(event.currentTarget).css('background-color', '')
  }
})

export default TableView
