using System;
using System.Collections.Generic;
using cine_web_app.back_end.Models;


namespace cine_web_app.back_end.Models
{
    public class Pelicula
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaEstreno { get; set; }
        public string Genero { get; set; }
        public string Duracion { get; set; }
        public double Calificacion { get; set; }
        public string Imagen { get; set; }
        public string Cartel {get; set;}
        public Dictionary<string, List<Sesion>> Sesiones { get; set; }
    }
}
