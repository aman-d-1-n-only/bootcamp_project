using AutoMapper;
using BankApi.Entities;
using BankApi.Models;

namespace BankApi.Profiles {
    public class CustomerProfile : Profile {

        public CustomerProfile(){
            CreateMap<Customer,CustomerWithoutAccountDTO>();
            CreateMap<Customer,CustomerDTO>();
            CreateMap<CustomerDTO, Customer>();
            CreateMap<CustomerWithoutAccountDTO,Customer>();
            CreateMap<Customer,RespCustomerDTO>();

        }
    }
}