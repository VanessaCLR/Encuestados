/*
 * Vista usuario
 */
class VistaUsuario {
  constructor(modelo, controlador, elementos) {
    this.modelo = modelo;
    this.controlador = controlador;
    this.elementos = elementos;
    
    this.modelo.preguntaAgregada.suscribir(() =>{
      this.reconstruirLista();
    });

    this.modelo.preguntaEliminada.suscribir(() =>{
      this.reconstruirLista();
    });

    this.modelo.preguntaVotada.suscribir(() =>{
      this.reconstruirLista();
      this.reconstruirGrafico();
    });
  }


  //muestra la lista por pantalla y agrega el manejo del boton agregar
  inicializar() {

    this.reconstruirLista();
    
    let elementos = this.elementos;
    
    elementos.botonAgregar.click(() => {
      this.agregarVotos();
    });

    this.reconstruirGrafico();
  }

  //reconstruccion de los graficos de torta
  reconstruirGrafico() {
    //obtiene las preguntas del local storage
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(clave => {
      var listaParaGrafico = [[clave.textoPregunta, "Cantidad"]];
      var respuestas = clave.cantidadPorRespuesta;
      respuestas.forEach((elemento)=>{
        listaParaGrafico.push([elemento.textoRespuesta, elemento.cantidad]);
      });
      this.dibujarGrafico(clave.textoPregunta, listaParaGrafico);
    });
  }

  reconstruirLista() {
    var listaPreguntas = this.elementos.listaPreguntas;
    listaPreguntas.html("");
    var preguntas = this.modelo.preguntas;
    preguntas.forEach((clave) => {
      //completar
      //agregar a listaPreguntas un elemento div con valor "clave.textoPregunta", texto "clave.textoPregunta", id "clave.id"}
    listaPreguntas.append($("<div>", {
      value: clave.textoPregunta,
      text: clave.textoPregunta,
      id: clave.id
    }));
      var respuestas = clave.cantidadPorRespuesta;
      this.mostrarRespuestas(listaPreguntas, respuestas, clave);
    });
    
  }

  //muestra respuestas
  mostrarRespuestas(listaPreguntas, respuestas, clave) {
    respuestas.forEach((elemento) => {
      listaPreguntas.append(
        $("<input>", {
          type: "radio",
          value: elemento.textoRespuesta,
          name: clave.id
        })
      );
      listaPreguntas.append(
        $("<label>", {
          for: elemento.textoRespuesta,
          text: elemento.textoRespuesta
        })
      );
    });
  }

  agregarVotos(){
    var e = this.elementos;
    e.botonAgregar.click(()=>{
      var contexto = this;
    $('#preguntas').find('div').each(function(){
        var nombrePregunta = $(this).attr('value');
          var id = $(this).attr('id');
        var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
        $('input[name=' + id + ']').prop('checked',false);
        contexto.controlador.agregarVoto(nombrePregunta,respuestaSeleccionada);
      });
    }); 
  }

  dibujarGrafico(nombre, respuestas) {
    var seVotoAlgunaVez = false;
    for(var i=1;i<respuestas.length;++i){
      if(respuestas[i][1]>0){
        seVotoAlgunaVez = true;
      }
    }
    var contexto = this;
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(respuestas);

      var options = {
        title: nombre,
        is3D: true,
      };
      var ubicacionGraficos = contexto.elementos.graficosDeTorta;
      var id = (nombre.replace(/\W/g, '')).split(' ').join('')+'_grafico';
      if($('#'+id).length){$('#'+id).remove()}
      var div = document.createElement('div');
      ubicacionGraficos.append(div);
      div.id = id;
      div.style.width = '400';
      div.style.height = '300px';
      var chart = new google.visualization.PieChart(div);
      if(seVotoAlgunaVez){
        chart.draw(data, options);
      }
    }
    
  }
}



