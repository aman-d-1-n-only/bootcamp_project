using AutoMapper;
using BankApi.Entities;
using BankApi.Models;

namespace BankApi.Profiles
{
    public class AccountProfile : Profile
    {

        public AccountProfile()
        {
            CreateMap<Account, AccountDTO>();
            CreateMap<AccountDTO, Account>();
            CreateMap<Account,RespAccountDTO>();
            CreateMap<UpdateAccountDTO, Account>();


        }
    }
}