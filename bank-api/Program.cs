using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using BankApi.Contexts;
using BankApi.Services;
using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB Injection
builder.Services.AddDbContext<BankApiContext>( dbContextOptions => dbContextOptions.UseSqlite("Data Source = BankDB.db"));

// Repository Injection
builder.Services.AddScoped<IBankRepository,BankRepository>();

//Automapper Injection
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Cors SetUp
builder.Services.AddCors();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});

//Jwt Token Authentication
builder.Services.AddAuthentication( "Bearer" ).AddJwtBearer( options => {
    options.TokenValidationParameters = new() {
        ValidateIssuer = true ,
        ValidateAudience = true ,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Authentication:Issuer"],
        ValidAudience = builder.Configuration["Authentication:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey( Encoding.ASCII.GetBytes(builder.Configuration["Authentication:SecretForKey"]))
    };
});


var app = builder.Build();
app.UseCors();
app.UseCors("AllowOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
