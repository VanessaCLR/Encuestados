/*
 * Vista administrador
 */
class VistaAdministrador {
  constructor(modelo, controlador, elementos) {
    this.modelo = modelo;
    this.controlador = controlador;
    this.elementos = elementos;
  

    this.modelo.preguntaAgregada.suscribir(() => {
      this.reconstruirLista();
    });
  
    this.modelo.preguntaEliminada.suscribir(() => {
      this.reconstruirLista();
    });

    this.modelo.preguntasBorradas.suscribir(() =>{
      this.reconstruirLista();
    })

    this.modelo.preguntaEditada.suscribir(()=>{
      this.reconstruirLista();
    })
  }

  
  //lista
  inicializar() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios

    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  }

  construirElementoPregunta (pregunta) {
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    let nuevoItem = $("<li/>", {
      class: "list-group-item",
      id: pregunta.id,
      texto: pregunta.textoPregunta
    });
    let interiorItem = $(".d-flex");
    let titulo = interiorItem.find("h5");
    titulo.text(pregunta.textoPregunta);
    interiorItem.find("small").text(pregunta.cantidadPorRespuesta.map(resp => " " + resp.textoRespuesta));
    nuevoItem.html($(".d-flex").html());
    return nuevoItem;
  }

  reconstruirLista () {
    let lista = this.elementos.lista;
    lista.html("");
    let preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  }

  configuracionDeBotones () {
    let e = this.elementos;
    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(() => {
      let value = e.pregunta.val();
      let respuestas = [];

      $('[name="option[]"]').each(function () {
        let respuesta = $(this).val();
        if (respuesta.length > 0) {
          respuestas.push({
            textoRespuesta: respuesta,
            cantidad: 0
          });
        }
      });
      this.limpiarFormulario();
      this.controlador.agregarPregunta(value, respuestas);
    });

    e.botonBorrarPregunta.click(() => {
    
      let id = parseInt($(".list-group-item.active").attr("id"));
      this.controlador.borrarPregunta(id);
   
    })

    e.borrarTodo.click(()=> {
      this.controlador.borrarTodo()
    })
    
    e.botonEditarPregunta.click(()=>{
      let id = parseInt($(".list-group-item.active").attr("id"));
      let textoPregunta = prompt("Editar Pregunta");
      this.controlador.editarPregunta(id, textoPregunta);
    })
  }

  limpiarFormulario(){
    $(".form-group.answer.has-feedback.has-success").remove();
  }

}


