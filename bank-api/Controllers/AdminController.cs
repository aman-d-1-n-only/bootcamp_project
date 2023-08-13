using BankApi.Models;
using BankApi.Services;
using BankApi.Entities;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace BankApi.Controllers
{
    [ApiController]
    [Route("api/admin")]

    public class AdminController : ControllerBase
    {

        private readonly IBankRepository _bankRepository;
        private readonly IMapper _mapper;

        public AdminController(IBankRepository bankRepository, IMapper mapper)
        {
            _bankRepository = bankRepository ?? throw new ArgumentNullException(nameof(BankRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

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
        public IActionResult AdminLogin(AdminDTO admin)
        {

            //Implementation Here
            return NoContent();
        }


    }
}