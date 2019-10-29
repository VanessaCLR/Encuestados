/*
 * Modelo
 */
class Modelo {
  constructor(preguntas, ultimoId) {
    this.preguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
    this.ultimoId = 0;
    this.preguntaAgregada = new Evento(this);
    this.preguntaEliminada = new Evento(this);
    this.preguntasBorradas = new Evento(this);
    this.preguntaEditada = new Evento(this);
    this.preguntaVotada = new Evento (this);
  }


  obtenerUltimoId() {
    let ultimoId = 0;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id > ultimoId) {
        ultimoId = this.preguntas[i].id;
      }
    }
    return ultimoId;
  }

  agregarPregunta(nombre, respuestas) {
    let id = this.obtenerUltimoId();
    id++;
    let nuevaPregunta = {
      textoPregunta: nombre,
      id: id,
      cantidadPorRespuesta: respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  }

  borrarPregunta(id) {
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();
  }

  borrarTodo() {
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  }

  editarPregunta(id, textoPregunta) {
    let preguntaEditada = this.preguntas.find(pregunta => pregunta.id === id);
    if (preguntaEditada) {
      preguntaEditada.textoPregunta = textoPregunta;
      this.guardar();
      this.preguntaEditada.notificar();
    }
  }

  agregarVoto(nombrePregunta, respuestaSeleccionada){
    if(respuestaSeleccionada!=null){
      let preguntaVotada = this.preguntas.find(preguntas => preguntas.textoPregunta === nombrePregunta); 
 
      let arregloDeRespuestas = preguntaVotada.cantidadPorRespuesta;
      console.log(arregloDeRespuestas);
      let respuestaAumentar = arregloDeRespuestas.find(respuestas => respuestas.textoRespuesta === respuestaSeleccionada);
          respuestaAumentar.cantidad++;
   
      this.guardar();
      this.preguntaVotada.notificar();
    }
  }

  //se guardan las preguntas
  guardar() {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  }

}
