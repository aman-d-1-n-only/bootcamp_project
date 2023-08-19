using AutoMapper;
using BankApi.Entities;
using BankApi.Models;

namespace BankApi.Profiles
{
    public class TransactionProfile : Profile
    {

        public TransactionProfile()
        {
            CreateMap<TransactionDTO, Transaction>();
            CreateMap<Transaction, TransactionDTO>();
        }
    }
}