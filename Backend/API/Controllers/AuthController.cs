using API.Modelos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;
        private readonly PasswordService _passwordService;
        public AuthController(FirebaseService firebaseService, PasswordService passwordService)
        {
            _firebaseService = firebaseService;
            _passwordService = passwordService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var userRecord = await _firebaseService.CreateUserAsync(request.Email, request.Password);
                var passwordHash = _passwordService.HashPassword((request.Password));

                var user = new Users
                {
                    Id = userRecord.Uid,
                    Email = request.Email,
                    Nombre = request.Name,
                    FechaRegistro = DateTime.UtcNow,
                    PasswordHash = passwordHash
                };
                await _firebaseService.SaveUserProfileAsync(userRecord.Uid, user);

                return Ok(new
                {
                    message = "Usuario registrado exitosamente",
                    userId = userRecord.Uid,
                    email = request.Email,
                    name = request.Name
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al registrar usuario", error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                //Buscar usuarios por correo
                var users = await _firebaseService.GetAllUsersAsync();
                var user = users.FirstOrDefault(u => u.Email == request.Email);

                if (user == null)
                {
                    return Unauthorized(new { message = "Email no encontrado" });
                }

                if (!_passwordService.VerifyPassword(request.Password, user.PasswordHash))
                {
                    return Unauthorized(new { message = "Contrasenia invalida" });
                }

                //Tokenizacion simulada
                return Ok(new
                {
                    message = "Login exitoso",
                    user = new { user.Id, user.Email, user.Nombre},
                    token = user.Id
                });

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error en el login", error = ex.Message });
            }
        }

        [HttpPost("verify-token")]
        public async Task<IActionResult> VerifyToken([FromBody] TokenRequest request)
        {
            try
            {
                var user = await _firebaseService.GetUserProfileAsync<Users>(request.IdToken);

                if (user == null)
                {
                    return Unauthorized(new { message = "Token invalido" });
                }

                return Ok(new
                {
                    message = "Token valido",
                    user = user
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Error al verificar token", error = ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUser(string userId)
        {
            try
            {
                var user = await _firebaseService.GetUserProfileAsync<Users>(userId);
                if (user == null)
                {
                    return NotFound(new { message = "Usuario no encontrado" });
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al obtener usuario", error = ex.Message });
            }
        }
    }
}

