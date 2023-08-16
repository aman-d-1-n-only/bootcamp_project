using BankApi.Models;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Text;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/admin")]

    public class AdminController : ControllerBase
    {

        private readonly IBankRepository _bankRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AdminController(IBankRepository bankRepository, IMapper mapper , IConfiguration configuration)
        {
            _bankRepository = bankRepository ?? throw new ArgumentNullException(nameof(BankRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));

        }

        [HttpPost, Route("signUp")]
        public async Task<IActionResult> AdminSignUp(AdminDTO newAdmin)
        {
            //Implementation Here
            var admin = _mapper.Map<Admin>(newAdmin);
            await _bankRepository.AddAdminAsync(admin);
            await _bankRepository.SaveChangesAsync();
            var respAdmin = _mapper.Map<AdminDTO>(admin);
            return Ok(respAdmin);
        }

        [HttpPost, Route("login")]
        public ActionResult<String> AdminLogin(AdminDTO newAdmin)
        {   
            // var admin = await _bankRepository.GetAdminAsync(newAdmin);
            // if( admin == NULL ){
            //     return NotFound("No such user found.");
            // }

            // var securityKey = new SymmetricSecurityKey(
            //     Encoding.ASCII.GetBytes(_configuration["Authentication:SecretForKey"])
            // );
            // var signingCredentials = new SigningCredential(securityKey, SecuringAlgorithms.HmacSha256);
            // // var claimsForToken = new List<Claim>();
            // // claimsForToken.Add()

            // //Implementation Here
            return NoContent();
        }


    }
}