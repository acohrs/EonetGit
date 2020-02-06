using Eonet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Eonet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private IHttpClientFactory _httpClientFactory;

        public CategoryController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var client = _httpClientFactory.CreateClient();
            var convertResult = JsonSerializer.Deserialize<Events>(await client.GetStringAsync("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")).events;
            var sortedResult = convertResult.OrderBy(y => y.categories.First().title).ToList();
            return Ok(sortedResult);

        }
    }
}
