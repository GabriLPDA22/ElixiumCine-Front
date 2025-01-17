export interface Pelicula {
    id: number;
    titulo: string;
    descripcion: string;
    fechaEstreno: string;
    genero: string;
    duracion: string;
    calificacion: number;
    imagen: string;
    cartel: string;
    director: string;
    actores: string;
    edadRecomendada: number;
    imagenEdadRecomendada: string;
    enCartelera: boolean;
    enVentaAnticipada: boolean;
    sesiones: {
        [cine: string]: {
            [fecha: string]: Sesion[];
        };
    };
}

export interface Sesion {
    id: number;
    hora: string;
    idioma: string;
    precio: number;
}
