export interface Jugador {
  id: number;
  nombre: string;
  dorsal: number;
  posicion: string;
  estatura: number;
  edad: number;
  nacionalidad: string;
  equipoId: number;
  equipoNombre?: string;
}

export interface CreateJugador {
  nombre: string;
  dorsal: number;
  posicion: string;
  estatura: number;
  edad: number;
  nacionalidad: string;
  equipoId: number;
}
