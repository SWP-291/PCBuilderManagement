using System;
using System.Collections.Generic;

namespace PCBuilder.Repository.Models;

public partial class PcComponent
{
    public int Id { get; set; }

    public int ComponentId { get; set; }

    public int PcId { get; set; }

    public bool? Status { get; set; }

    public virtual Component Component { get; set; } = null!;

    public virtual Pc Pc { get; set; } = null!;
}
