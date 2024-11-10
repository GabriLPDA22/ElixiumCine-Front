using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using cine_web_app.back_end.Models;


namespace cine_web_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private static List<Usuario> usuarios = new List<Usuario>();
        private readonly PasswordHasher<Usuario> passwordHasher = new PasswordHasher<Usuario>();

        [HttpPost("register")]
        public IActionResult Register([FromBody] Usuario nuevoUsuario)
        {
            if (usuarios.Any(u => u.Correo == nuevoUsuario.Correo))
            {
                return BadRequest("El correo ya está en uso.");
            }

            nuevoUsuario.Id = usuarios.Count + 1;
            nuevoUsuario.ContraseñaHash = passwordHasher.HashPassword(nuevoUsuario, nuevoUsuario.ContraseñaHash);
            usuarios.Add(nuevoUsuario);

            return Ok("Usuario registrado exitosamente.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            var usuarioExistente = usuarios.FirstOrDefault(u => u.Correo == usuario.Correo);
            if (usuarioExistente == null)
            {
                return Unauthorized("Correo o contraseña incorrectos.");
            }

            var resultado = passwordHasher.VerifyHashedPassword(usuarioExistente, usuarioExistente.ContraseñaHash, usuario.ContraseñaHash);
            if (resultado == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Correo o contraseña incorrectos.");
            }

            return Ok("Inicio de sesión exitoso.");
        }
    }
}
