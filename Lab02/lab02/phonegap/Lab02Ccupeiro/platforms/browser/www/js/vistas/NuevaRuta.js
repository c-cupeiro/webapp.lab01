var NuevaRuta = Backbone.View.extend({
    initialize: function() {
        this.grabando = false;
        this.timerReloj = null;
        this.timerGps = null;
        this.contadorReloj = null;
        this.render();
    },
    empezarRuta: function() {
        this.model = new Ruta();
        console.log('empezarRuta(' + this.model.id + ')');

        //recuperar titulo de la ruta
        var titulo = this.$('#txtTitulo').val();
        if (!titulo || titulo.length == 0) titulo = "Default";
        this.model.set("titulo", titulo);

        //comenzar grabacion de ruta (timers, ...)
        this.grabando = true;
        this.contadorReloj = 0;
        var self = this;
        this.timerReloj = setInterval(function() {
            self.contadorReloj++;
            self.render();
        }, 1000);
        this.timerGps = setInterval(function() {
            self.leerGps();
        }, 1000);

        //pintar vista
        this.render();
    },
    pararRuta: function() {
        console.log('pararRuta(' + this.model.id + ')');

        this.grabando = false;

        //parar timers
        clearInterval(this.timerReloj);
        clearInterval(this.timerGps);

        //guardar ruta
        this.collection.add(this.model);
        //limpiar modelo
        this.model = null;
        //pintar vista
        this.render();
    },
    leerGps: function() {
        //init
        window.inc = typeof(inc) == 'undefined' ? 0.00005 : window.inc;
        window.lat = typeof(lat) == 'undefined' ? 38.695015 : window.lat;
        window.lng = typeof(lng) == 'undefined' ? -0.476049 : window.lng;
        window.dir = typeof(dir) == 'undefined' ? Math.floor((Math.random() * 4)) : window.dir;
        // numbers 0,1,2,3 (0 up, 1 right, 2 down, 3 left)

        // generate direction (randomly)
        // it is more likely to follow the previous direction
        var nuevaDir = Math.floor((Math.random() * 4)); // numbers 0,1,2,3
        if (nuevaDir != (dir + 2) % 4) dir = nuevaDir;

        switch (dir) {
            case 0: //up
                lat += inc;
                break;
            case 1: //right
                lng += inc;
                break;
            case 2: //down
                lat -= inc;
                break;
            case 3: //left
                lng -= inc;
                break;
            default:
        }

        var pos = { lat: lat, lng: lng };

        // add new position to the route
        var posiciones = this.model.get('posiciones');
        posiciones.push(pos);
        this.model.set('posiciones', posiciones);
    },
    render: function() {
        if (this.grabando) {
            this.$('#txtTitulo').val(this.model.get('titulo')).textinput('refresh');
            // show panel - change button text
            this.$('#btGrabar').val('Parar').button('refresh');
            this.$('#lblInfo').text('Guardando ruta ' + this.model.get('titulo') + '...');
            var minutos = parseInt(this.contadorReloj / 60);
            var segundos = this.contadorReloj % 60;
            var horas = parseInt(minutos / 60);
            minutos = minutos % 60;
            this.$('#lblReloj').text("" + (horas < 10 ? "0" : "") + horas + ":" +
                (minutos < 10 ? "0" : "") + minutos + ":" +
                (segundos < 10 ? "0" : "") + segundos);
            this.$('#pnInfo').css('visibility', 'visible');
        } else {
            this.$('#btGrabar').val('Empezar ruta').button('refresh');
            this.$('#pnInfo').css('visibility', 'hidden');
        }
    },
    events: {
        'click #btGrabar': function() {
            if (this.grabando) this.pararRuta();
            else this.empezarRuta();
        }
    }
});