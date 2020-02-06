using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Eonet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace Eonet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private IHttpClientFactory _httpClientFactory;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
        }


        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var client = _httpClientFactory.CreateClient();
            var combinedResult = System.Text.Json.JsonSerializer.Deserialize<Events>(await client.GetStringAsync("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days=30")).events;
            var convertCloseResult = System.Text.Json.JsonSerializer.Deserialize<Events>(await client.GetStringAsync("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days=30&status=closed")).events;
            combinedResult.AddRange(convertCloseResult);
            return Ok(JsonConvert.SerializeObject(combinedResult));
            //var result = await client.GetStringAsync("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events");
            //return Ok(result);
        }

    }
}
