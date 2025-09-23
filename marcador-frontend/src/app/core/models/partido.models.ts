export interface PartidoHistorial {
  id: number;
  equipo1: string;
  equipo2: string;
  puntajeEquipo1: number;
  puntajeEquipo2: number;
  fecha: string;
}

export interface PartidoDto {
  id: number;
  equipo1Id: number;
  equipo1Nombre: string;
  equipo2Id: number;
  equipo2Nombre: string;
  puntajeEquipo1: number;
  puntajeEquipo2: number;
  faltasEquipo1: number;
  faltasEquipo2: number;
  cuartoActual: number;
  fechaPartido: string;
}
