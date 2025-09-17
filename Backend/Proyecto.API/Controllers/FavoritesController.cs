using Microsoft.AspNetCore.Mvc;
using Proyecto.API.Models;
using Proyecto.API.Services;

namespace Proyecto.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public FavoritesController()
        {
            _firebaseService = new FirebaseService();
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteCountry fav)
        {
            var id = await _firebaseService.AddFavoriteAsync(fav);
            return Ok(new { Message = "País agregado a favoritos", FavoriteId = id });
        }

        [HttpDelete("{userId}/{countryCode}")]
        public async Task<IActionResult> RemoveFavorite(string userId, string countryCode)
        {
            await _firebaseService.RemoveFavoriteAsync(userId, countryCode);
            return Ok(new { Message = "País eliminado de favoritos" });
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetFavorites(string userId)
        {
            var favs = await _firebaseService.GetFavoritesAsync(userId);
            return Ok(favs);
        }
    }
}
