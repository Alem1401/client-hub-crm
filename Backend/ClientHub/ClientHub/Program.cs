using ClientHub.Data;
using ClientHub.Interfaces;
using ClientHub.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Angular dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAgentRepository, AgentRepository>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<ICarInsuranceRepository, CarInsuranceRepository>();
builder.Services.AddScoped<IPropertyInsuranceRepository, PropertyInsuranceRepository>();
builder.Services.AddScoped<IInsuranceRepository,InsuranceRepository>();
builder.Services.AddScoped<IAnalyticsRepository, AnalyticsRepository>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowAngularDevClient");

app.UseAuthorization();

app.MapControllers();

// Seed database with sample data
await SeedData.SeedAsync(app.Services, app.Environment);

app.Run();
