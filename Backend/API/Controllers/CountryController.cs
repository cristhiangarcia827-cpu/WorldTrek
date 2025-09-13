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
        public CountryController(CountryService countryService)
        {
           _countryService = countryService;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCountryByName(string name)
        {
            var respuesta = await _countryService.BuscarPaisPorNombre(name);
            return Ok(respuesta);
        }
    }
}
