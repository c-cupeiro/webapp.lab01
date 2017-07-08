/**
 * Define una colección de rutas
 */
var Rutas = Backbone.Collection.extend({
    url: '/misrutas/rutas',
    model: Ruta,
    initialize: function() {
        this.on("add", function(model, col, opt) {
            console.log('Rutas:add ' + model.id);
            model.save();
        });
        this.on("remove", function(model, col, opt) {
            console.log('Rutas:remove ' + model.id);
            model.destroy({ silent: true });
        });
        this.on("change", function(model, opt) {
            console.log('Rutas:change ' + model.id);
            if (model.changedAttributes().id) return;
            model.save();
        });
        this.fetch();
    }
});