﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PCBuilder.Repository;
using PCBuilder.Repository.Repository;
using PCBuilder.Repository.Models;
using PCBuilder.Services;
using PCBuilder.Services.Service;
using PCBuilder.Services.DTO;
using System.Reflection.PortableExecutable;

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
                options.UseSqlServer(Configuration.GetConnectionString("Data Source=ec2-3-84-219-144.compute-1.amazonaws.com;Initial Catalog=PcBuilding;Persist Security Info=True;User ID=sa;Password=swp12345@;TrustServerCertificate=True"));
            });

            //Add Automapper
            services.AddAutoMapper(typeof(MappingConfig));

            // Add dependency injection
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPCRepository, PCRepository>();

            services.AddScoped<IUserServices, UserServices>();
            services.AddScoped<IPCServices, PCServices>();

            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IBrandServices, BrandServices>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryServices, CategoryServices>();


        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {

                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(/*c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                }*/);
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
