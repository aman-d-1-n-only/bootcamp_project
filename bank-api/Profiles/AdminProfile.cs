using AutoMapper;
using BankApi.Entities;
using BankApi.Models;

namespace BankApi.Profiles
{
    public class AdminProfile : Profile
    {

        public AdminProfile()
        {
            CreateMap<AdminDTO, Admin>();
            CreateMap<Admin, AdminDTO>();


        }
    }
}