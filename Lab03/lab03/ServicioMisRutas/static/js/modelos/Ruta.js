/**
 * Clase que implementa rutas individuales
 */
var Ruta = Backbone.Model.extend({
    urlRoot: '/misrutas/rutas',
    initialize: function() {
        if (!this.has("posiciones")) this.set('posiciones', []);
        if (!this.has("fecha")) this.set('fecha', Date());
    },
    defaults: {
        titulo: 'Undefined',
        visible: 'on',
        color: '#000000'
    }
});