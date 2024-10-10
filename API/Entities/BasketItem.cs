namespace API.Entities;

public class BasketItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }

    // nav properties
    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public int BasketId { get; set; }
    public Basket Basket { get; set; } = null!;
}