using API.RequestHelpers;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ImageController : BaseApiController
    {
        private readonly Cloudinary _cloudinary;
        public ImageController(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("signature")]
        public IActionResult GetSignature()
        {
            var timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds();
            var parameters = new Dictionary<string, object>
        {
            { "timestamp", timestamp.ToString() },
            { "folder", "rs-test" },
            { "upload_preset", "restore-test" }
        };

            var signature = _cloudinary.Api.SignParameters(parameters);

            return Ok(new
            {
                timestamp,
                signature
            });
        }
    }
}
