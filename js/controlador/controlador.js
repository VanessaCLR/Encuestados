/*
 * Controlador
 */
class Controlador {

  constructor(modelo) {
    this.modelo = modelo;
  }
  agregarPregunta(pregunta, respuestas) {
    if (pregunta) {
      this.modelo.agregarPregunta(pregunta, respuestas);
    }
  }
  borrarPregunta(id) {
    this.modelo.borrarPregunta(id);
  }

  borrarTodo() {
    this.modelo.borrarTodo();
  }
  editarPregunta(id, textoPregunta) {
    if (textoPregunta) {
      this.modelo.editarPregunta(id, textoPregunta);
    }
  }
  agregarVoto(nombrePregunta, respuestaSeleccionada) {
    if (nombrePregunta && respuestaSeleccionada) {
      this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
    }
  }
}
