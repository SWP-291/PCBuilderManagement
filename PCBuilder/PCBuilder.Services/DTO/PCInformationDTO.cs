using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Services.DTO
{
    public class PCInformationDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public List<ComponentsInPC> Components { get; set; }
        public string Image { get; set; }
    }
}
