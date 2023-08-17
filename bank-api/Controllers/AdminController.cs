using BankApi.Models;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using System.Text;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

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
        public async Task<IActionResult> AdminSignUp(AdminDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //Implementation Here
            var admin = _mapper.Map<Admin>(user);
            await _bankRepository.AddAdminAsync(admin);
            await _bankRepository.SaveChangesAsync();
            var respAdmin = _mapper.Map<AdminDTO>(admin);
            return Ok(respAdmin);
        }

        [HttpPost, Route("login")]
        public async Task<ActionResult<String>> AdminLogin(AdminDTO user )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var admin = await _bankRepository.GetAdminAsync(user);
            if( admin == null ){
                return NotFound("No such user found.");
            }

            var securityKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(_configuration["Authentication:SecretForKey"])
            );
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claimsForToken = new List<Claim>();
            claimsForToken.Add( new Claim("sub" , admin.Id.ToString()));
            claimsForToken.Add( new Claim("username" , admin.Username));

            var jwtSecurityToken = new JwtSecurityToken(
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claimsForToken,
                DateTime.UtcNow, //ValidityStart
                DateTime.UtcNow.AddHours(1), //ValidityEnd
                signingCredentials);

            var tokenToReturn = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            return Ok(tokenToReturn);
        }


    }
}