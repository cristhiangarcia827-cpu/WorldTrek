using Microsoft.AspNetCore.Mvc;
using Proyecto.API.Models;
using Proyecto.API.Services;

namespace Proyecto.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TripsController : ControllerBase
    {
        private readonly FirebaseService _firebaseService;

        public TripsController()
        {
            _firebaseService = new FirebaseService();
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrip([FromBody] Trip trip)
        {
            if (trip.Estado != "Planificado" && trip.Estado != "Completado")
                return BadRequest(new { message = "Estado inválido. Use Planificado o Completado." });

            var id = await _firebaseService.AddTripAsync(trip);
            return Ok(new { Message = "Viaje creado", TripId = id });
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetTrips(string userId)
        {
            var trips = await _firebaseService.GetTripsAsync(userId);
            return Ok(trips);
        }

        [HttpPut("{tripId}")]
        public async Task<IActionResult> UpdateTrip(string tripId, [FromBody] Trip trip)
        {
            if (trip.Estado != "Planificado" && trip.Estado != "Completado")
                return BadRequest(new { message = "Estado inválido. Use Planificado o Completado." });

            await _firebaseService.UpdateTripAsync(tripId, trip);
            return Ok(new { Message = "Viaje actualizado" });
        }

        [HttpDelete("{tripId}")]
        public async Task<IActionResult> DeleteTrip(string tripId)
        {
            await _firebaseService.DeleteTripAsync(tripId);
            return Ok(new { Message = "Viaje eliminado" });
        }
    }
}
