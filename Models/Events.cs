using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eonet.Models
{
    public class Events
    {
        public string title { get; set; }
        public string description { get; set; }
        public string link { get; set; }
        public List<Event> events { get; set; }
    }
}
