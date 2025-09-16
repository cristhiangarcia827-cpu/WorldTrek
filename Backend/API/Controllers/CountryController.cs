using API.Modelos;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly CountryService _countryService;
        private readonly FirebaseService _firebaseService;
        public CountryController(CountryService countryService, FirebaseService firebaseService)
        {
           _countryService = countryService;
           _firebaseService = firebaseService;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCountryByName(string name)
        {
            var respuesta = await _countryService.BuscarPaisPorNombre(name);
            return Ok(respuesta);
        }

        [HttpGet("favoritos/{userId}")]
        public async Task<IActionResult> GetFavoritos(string userId)
        {
            var favoritos = await _firebaseService.GetFavoritosByUsuarioAsync(userId);
            return Ok(favoritos);
        }

        [HttpPost("favoritos")]
        public async Task<IActionResult> AddFavorito([FromBody] Favorito favorito)
        {
            var id = await _firebaseService.SaveFavoritoAsync(favorito);
            return Ok(new { id });
        }

        [HttpDelete("favoritos/{favoritoId}")]
        public async Task<IActionResult> DeleteFavorito(string favoritoId)
        {
            var eliminado = await _firebaseService.DeleteFavoritoAsync(favoritoId);
            return Ok(new { eliminado });
        }
    }
}
