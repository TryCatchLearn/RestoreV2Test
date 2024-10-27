using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    // navigation properties
    public int ProductId { get; set; }

    [JsonIgnore]
    public Product Product { get; set; } = null!;
}
