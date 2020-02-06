using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Eonet.Models;

namespace Eonet.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class EventController : ControllerBase
    {
        private IHttpClientFactory _httpClientFactory;

        public EventController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost]
        public async Task<ActionResult> Post(Event model)
        {
            var client = _httpClientFactory.CreateClient();
            var url = string.Concat("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events/" + model.id);
            var result = JsonSerializer.Deserialize<Event>(await client.GetStringAsync(url));
            return Ok(result);
        }
    }
}
