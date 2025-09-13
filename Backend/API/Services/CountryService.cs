using API.Modelos;

namespace API.Services
{
    public class CountryService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CountryService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<List<CountryApiResponse>> BuscarPaisPorNombre(string nombre)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("CountriesAPI");
                var respuesta = await client.GetFromJsonAsync<List<CountryApiResponse>>($"/v3.1/name/{nombre}");

                if (respuesta != null)
                {
                    return respuesta;
                }
                else {
                    return [];
                }
            }
            catch (Exception ex)
            {
                return [];

            }
        }
    }
}
