using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using cine_web_app.back_end.Models;

namespace cine_web_app.back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        [HttpGet]
        [Route("GetPeliculas")]
        public IActionResult GetPeliculas()
        {
            var peliculas = new List<Pelicula>
            {
                new Pelicula
                {
                    Titulo = "Spider-Man: No Way Home",
                    Descripcion = "Cuando la identidad de Spider-Man es revelada, Peter Parker busca ayuda en Doctor Strange, desatando una fractura en el multiverso que trae villanos de otras dimensiones. Ahora, deberá enfrentarse a su mayor desafío y descubrir lo que realmente significa ser Spider-Man.",
                    FechaEstreno = new DateTime(2021, 12, 17),
                    Genero = "Sci-fi",
                    Duracion = "1 hora 55 minutos",
                    Calificacion = 8.2,
                    Imagen = "/cine_web_app/front-end/images/Banner-Spiderman-no-way-home.jpg", // Imagen de fondo (banner)
                    Cartel = "/cine_web_app/front-end/images/Spiderman-No-Way-Home-Cartel.jpg", // Imagen del carrusel
                    Sesiones = new Dictionary<string, List<Sesion>>
                    {
                        { "2024-11-11", new List<Sesion>
                            {
                                new Sesion { Hora = "16:30", Sala = "10", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "18:05", Sala = "8", EsISense = false, EsVOSE = true },
                                new Sesion { Hora = "20:15", Sala = "7", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "22:30", Sala = "5", EsISense = true, EsVOSE = true }
                            }
                        },
                        { "2024-11-12", new List<Sesion>
                            {
                                new Sesion { Hora = "15:30", Sala = "3", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "17:45", Sala = "9", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "19:50", Sala = "6", EsISense = true, EsVOSE = true },
                                new Sesion { Hora = "22:10", Sala = "2", EsISense = false, EsVOSE = true }
                            }
                        },
                        { "2024-11-13", new List<Sesion>
                            {
                                new Sesion { Hora = "16:00", Sala = "10", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "18:10", Sala = "8", EsISense = false, EsVOSE = true },
                                new Sesion { Hora = "20:25", Sala = "5", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "23:00", Sala = "3", EsISense = true, EsVOSE = true }
                            }
                        },
                        { "2024-11-14", new List<Sesion> // Jueves
                            {
                                new Sesion { Hora = "14:45", Sala = "4", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "17:00", Sala = "7", EsISense = true, EsVOSE = true },
                                new Sesion { Hora = "19:30", Sala = "2", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "21:50", Sala = "10", EsISense = true, EsVOSE = false }
                            }
                        },
                        { "2024-11-15", new List<Sesion> // Viernes
                            {
                                new Sesion { Hora = "16:45", Sala = "5", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "19:00", Sala = "3", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "21:30", Sala = "8", EsISense = true, EsVOSE = true },
                                new Sesion { Hora = "23:45", Sala = "6", EsISense = false, EsVOSE = true }
                            }
                        },
                        { "2024-11-16", new List<Sesion> // Sábado
                            {
                                new Sesion { Hora = "13:30", Sala = "10", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "16:00", Sala = "8", EsISense = false, EsVOSE = true },
                                new Sesion { Hora = "19:15", Sala = "5", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "22:20", Sala = "3", EsISense = false, EsVOSE = true }
                            }
                        },
                        { "2024-11-17", new List<Sesion> // Domingo
                            {
                                new Sesion { Hora = "14:00", Sala = "7", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "17:20", Sala = "9", EsISense = true, EsVOSE = true },
                                new Sesion { Hora = "20:30", Sala = "2", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "23:00", Sala = "10", EsISense = true, EsVOSE = true }
                            }
                        }
                    }
                },
                new Pelicula
                {
                    Titulo = "X-Men Apocalypse",
                    Descripcion = "Apocalypse, el primer y más poderoso mutante, despierta tras miles de años y, decepcionado con el mundo actual, decide acabar con la humanidad para instaurar un nuevo orden. Reuniendo a un grupo de mutantes poderosos, incluidos Magneto, Psylocke, Storm y Angel, planea destruir el mundo como lo conocemos.",
                    FechaEstreno = new DateTime(2016, 5, 27),
                    Genero = "Sci-fi",
                    Duracion = "2 horas 24 minutos",
                    Calificacion = 7.0,
                    Imagen = "/cine_web_app/front-end/images/X-Men_Apocalypse_Banner.jpg", // Asegúrate de que esta ruta es correcta
                    Cartel = "/cine_web_app/front-end/images/X-MEN_Apocalypse.jpg", // Imagen del carrusel
                    Sesiones = new Dictionary<string, List<Sesion>>
                    {
                        { "2024-11-11", new List<Sesion>
                            {
                                new Sesion { Hora = "15:00", Sala = "1", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "17:30", Sala = "3", EsISense = false, EsVOSE = true },
                                new Sesion { Hora = "20:00", Sala = "2", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "22:30", Sala = "4", EsISense = true, EsVOSE = true }
                            }
                        },
                        { "2024-11-12", new List<Sesion>
                            {
                                new Sesion { Hora = "16:00", Sala = "7", EsISense = false, EsVOSE = true },
                                new Sesion { Hora = "18:45", Sala = "9", EsISense = true, EsVOSE = false },
                                new Sesion { Hora = "21:00", Sala = "5", EsISense = true, EsVOSE = true }
                            }
                        },
                        { "2024-11-13", new List<Sesion>
                            {
                                new Sesion { Hora = "14:30", Sala = "6", EsISense = false, EsVOSE = false },
                                new Sesion { Hora = "17:00", Sala = "3", EsISense = true, EsVOSE = true },
                                new Sesion { Hora = "20:00", Sala = "10", EsISense = false, EsVOSE = false }
                            }
                        },
                        // Otros días de sesiones aquí...
                    }
                }
            };

            return Ok(peliculas);
        }
    }
}





