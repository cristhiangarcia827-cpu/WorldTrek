using API.Modelos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public TripsController(FirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        [HttpPost]
        public async Task<IActionResult> CrearViaje([FromBody] Viaje viaje)
        {
            if (viaje == null || string.IsNullOrEmpty(viaje.UsuarioId))
                return BadRequest(new { Mensaje = "El viaje debe incluir un UsuarioId válido." });

            var id = await _firebaseService.SaveViajeAsync(viaje);
            return Ok(new { Id = id, Mensaje = "Viaje creado correctamente" });
        }

        [HttpGet("user/{usuarioId}")]
        public async Task<IActionResult> ObtenerViajesUsuario(string usuarioId)
        {
            var viajes = await _firebaseService.GetViajesByUsuarioAsync(usuarioId);
            return Ok(viajes);
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodos()
        {
            var viajes = await _firebaseService.GetAllViajesAsync();
            return Ok(viajes);
        }

        [HttpPut("{viajeId}")]
        public async Task<IActionResult> ActualizarViaje(string viajeId, [FromBody] Viaje viaje)
        {
            if (viaje == null)
                return BadRequest(new { Mensaje = "Datos inválidos." });

            var actualizado = await _firebaseService.UpdateViajeAsync(viajeId, viaje);

            if (!actualizado)
                return NotFound(new { Mensaje = "Viaje no encontrado." });

            return Ok(new { Mensaje = "Viaje actualizado correctamente." });
        }

        [HttpDelete("{viajeId}")]
        public async Task<IActionResult> EliminarViaje(string viajeId)
        {
            var eliminado = await _firebaseService.DeleteViajeAsync(viajeId);

            if (!eliminado)
                return NotFound(new { Mensaje = "Viaje no encontrado." });

            return Ok(new { Mensaje = "Viaje eliminado correctamente." });
        }
    }
}
