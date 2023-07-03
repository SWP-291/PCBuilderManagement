using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PCBuilder.Repository;
using PCBuilder.Repository.Repository;
using PCBuilder.Repository.Model;
using PCBuilder.Services;
using PCBuilder.Services.Service;
using PCBuilder.Services.DTO;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Components;
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
                options.UseSqlServer(Configuration.GetConnectionString("Data Source=trongps-server.database.windows.net;Initial Catalog=PcBuilding;Persist Security Info=True;User ID=swp;Password=GNBUbgCAZ857m2;TrustServerCertificate=True"));
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

            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IPaymentServices, PaymentServices>();

            // handle login/sign up with jwt
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
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
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JwtSettings:SecretKey"])),
                    ClockSkew = TimeSpan.Zero
                };
            });


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
            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:3000")
                       .AllowAnyHeader()
                       .AllowAnyMethod());

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
