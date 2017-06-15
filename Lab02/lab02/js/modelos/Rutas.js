/**
 * Define una colección de rutas
 */
var Rutas = Backbone.Collection.extend({
    model: Ruta,
    initialize: function() {
        this.on("add", function(model, col, opt) {
            console.log('Rutas:add ' + model.id);
        });
        this.on("remove", function(model, col, opt) {
            console.log('Rutas:remove ' + model.id);
        });
        this.on("change", function(model, opt) {
            console.log('Rutas:change ' + model.id);
        });
    }
});