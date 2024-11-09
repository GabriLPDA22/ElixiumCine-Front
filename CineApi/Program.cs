using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Configurar servicios
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend",
        policy =>
        {
            policy.WithOrigins("http://127.0.0.1:5500", "https://127.0.0.1:5500")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configuración de Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Comentar HTTPS Redirection para evitar problemas con SSL en localhost
// app.UseHttpsRedirection();

// Aplicar la política de CORS
app.UseCors("PermitirFrontend");

// Lista temporal para almacenar usuarios
var users = new List<User>();

// Endpoint para registrar un nuevo usuario
app.MapPost("/register", (User newUser) =>
{
    users.Add(newUser);
    return Results.Created("/register", newUser);
}).WithName("RegisterUser");

// Endpoint para iniciar sesión
app.MapPost("/login", (User loginUser) =>
{
    var user = users.FirstOrDefault(u => u.Username == loginUser.Username && u.Password == loginUser.Password);
    if (user == null)
    {
        return Results.Unauthorized();
    }
    return Results.Ok("Inicio de sesión exitoso");
}).WithName("LoginUser");

app.Run();

// Definición del registro User
record User(string Username, string Password);
