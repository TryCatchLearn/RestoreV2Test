using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty; // identity will validate this
}
