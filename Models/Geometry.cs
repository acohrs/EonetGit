using System;
using System.Collections.Generic;

namespace Eonet.Models
{
    public class Geometry
    {
        public DateTime date { get; set; }
        public string type { get; set; }
        public List<object> coordinates { get; set; }
    }
}