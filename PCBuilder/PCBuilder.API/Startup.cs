﻿using Microsoft.EntityFrameworkCore;
using PCBuilder.Repository.Repository;
using PCBuilder.Repository.Model;
using PCBuilder.Services.Service;
using PCBuilder.Services.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace PCBuilder.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen();
            //Add DbContext
            services.AddDbContext<PcBuildingContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("ConnectionString"));
            });

            //Add Automapper
            services.AddAutoMapper(typeof(MappingConfig));
            // Add Cors
            services.AddCors();

            // Add dependency injection
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPCRepository, PCRepository>();

            services.AddScoped<IUserServices, UserServices>();
            services.AddScoped<IPCServices, PCServices>();

            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IBrandServices, BrandServices>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryServices, CategoryServices>();

            services.AddScoped<IComponentRepository, ComponentRepository>();
            services.AddScoped<IComponentServices, ComponentServices>();

            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderServices, OrderServices>();

            services.AddScoped<IPcComponentRepository, PcComponentRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();

            services.AddScoped<IGoogleServices, GoogleServices>();

            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IPaymentServices, PaymentServices>();

            // handle login/sign up with jwt
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false; // Chỉ sử dụng HTTPS trong môi trường thực tế
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["JwtSettings:Issuer"],
                        ValidAudience = Configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.ASCII.GetBytes(Configuration["JwtSettings:SecretKey"])
                        ),
                        ClockSkew = TimeSpan.Zero
                    };
                })
                 .AddGoogle(options =>
                 {
                     options.ClientId = "YourGoogleClientId";
                     options.ClientSecret = "YourGoogleClientSecret";
                 });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI( /*c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                }*/
                );
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseCors(
                builder =>
                    builder
                        .WithOrigins("http://localhost:3000", "https://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
            );

            app.UseHttpsRedirection();
            app.UseRouting();

            // xac thuc va phan quyen
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
