﻿using AutoMapper;
using PCBuilder.Repository.Models;
using PCBuilder.Repository.Repository;
using PCBuilder.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Services.Service
{
    public interface ICategoryServices
    {
        Task<ServiceResponse<List<CategoryDTO>>> GetCategoriesAsync();
        Task<ServiceResponse<CategoryDTO>> GetCategoryByIdAsync(int id);
        Task<ServiceResponse<CategoryDTO>> CreateCategoryAsync(CategoryDTO categoryDTO);
        Task<ServiceResponse<CategoryDTO>> UpdateCategoryAsync(int id, CategoryDTO categoryDTO);
        Task<ServiceResponse<bool>> DeleteCategoryAsync(int id);
    }
    public class CategoryServices : ICategoryServices
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryServices(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<CategoryDTO>>> GetCategoriesAsync()
        {
            ServiceResponse<List<CategoryDTO>> response = new ServiceResponse<List<CategoryDTO>>();

            try
            {
                var categories = await _categoryRepository.GetAllCategoriesAsync();
                var categoryDTOs = _mapper.Map<List<CategoryDTO>>(categories);

                response.Data = categoryDTOs;
                response.Success = true;
                response.Message = "OK";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<CategoryDTO>> GetCategoryByIdAsync(int id)
        {
            ServiceResponse<CategoryDTO> response = new ServiceResponse<CategoryDTO>();

            try
            {
                var category = await _categoryRepository.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    response.Success = false;
                    response.Message = "Category not found.";
                    return response;
                }

                var categoryDTO = _mapper.Map<CategoryDTO>(category);

                response.Data = categoryDTO;
                response.Success = true;
                response.Message = "OK";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<CategoryDTO>> CreateCategoryAsync(CategoryDTO categoryDTO)
        {
            ServiceResponse<CategoryDTO> response = new ServiceResponse<CategoryDTO>();

            try
            {
                var category = _mapper.Map<Category>(categoryDTO);
                var createdCategory = await _categoryRepository.CreateCategoryAsync(category);
                var createdCategoryDTO = _mapper.Map<CategoryDTO>(createdCategory);

                response.Data = createdCategoryDTO;
                response.Success = true;
                response.Message = "Category created successfully.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<CategoryDTO>> UpdateCategoryAsync(int id, CategoryDTO categoryDTO)
        {
            ServiceResponse<CategoryDTO> response = new ServiceResponse<CategoryDTO>();

            try
            {
                var category = await _categoryRepository.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    response.Success = false;
                    response.Message = "Category not found.";
                    return response;
                }

                category.Name = categoryDTO.Name; // Update the category properties

                var updatedCategory = await _categoryRepository.UpdateCategoryAsync(category);
                var updatedCategoryDTO = _mapper.Map<CategoryDTO>(updatedCategory);
                response.Data = updatedCategoryDTO;
                response.Success = true;
                response.Message = "Category updated successfully.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<bool>> DeleteCategoryAsync(int id)
        {
            ServiceResponse<bool> response = new ServiceResponse<bool>();

            try
            {
                var category = await _categoryRepository.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    response.Success = false;
                    response.Message = "Category not found.";
                    return response;
                }
                var categoryDTO = await _categoryRepository.DeleteCategoryAsync(id);

                response.Data = true;
                response.Success = true;
                response.Message = "Category deleted successfully.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }


    } 
}
