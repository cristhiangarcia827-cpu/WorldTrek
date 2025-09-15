using API.Modelos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public UsersController(FirebaseService firebaseService)
        {
            _firebaseService = firebaseService;
        }

        [HttpPost("{userId}/profile")]
        public async Task<IActionResult> GuardarPerfil(string userId, [FromBody] Users perfil)
        {
            if (perfil == null)
                return BadRequest(new { Mensaje = "Datos inválidos." });

            await _firebaseService.SaveUserProfileAsync(userId, perfil);
            return Ok(new { Mensaje = "Perfil guardado correctamente." });
        }

        [HttpGet("{userId}/profile")]
        public async Task<IActionResult> ObtenerPerfil(string userId)
        {
            var perfil = await _firebaseService.GetUserProfileAsync<Users>(userId);

            if (perfil == null)
                return NotFound(new { Mensaje = "Perfil no encontrado." });

            return Ok(perfil);
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodos()
        {
            var usuarios = await _firebaseService.GetAllUsersAsync();
            return Ok(usuarios);
        }
    }
}

