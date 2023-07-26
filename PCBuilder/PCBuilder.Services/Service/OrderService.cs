using AutoMapper;
using PCBuilder.Repository.Model;
using PCBuilder.Repository.Repository;
using PCBuilder.Services.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCBuilder.Services.Service
{
    public interface IOrderServices
    {
        Task<ServiceResponse<OrderDTO>> GetOrderById(int orderId);
        Task<ServiceResponse<List<OrderDTO>>> GetAllOrders();
        Task<ServiceResponse<OrderDTO>> CreateOrder(OrderDTO orderDTO);
        Task<ServiceResponse<OrderDTO>> UpdateOrder(int id, OrderDTO orderDTO);
        Task<ServiceResponse<bool>> DeleteOrder(int orderId);

        Task<ServiceResponse<OrderPaymentDTO>> CreateOrderWithPayment(OrderPaymentDTO orderPaymentDTO);
    }
    public class OrderService : IOrderServices
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IPaymentRepository _paymentRepository;

        public OrderService(IOrderRepository orderRepository, IMapper mapper, IPaymentRepository paymentRepository)
        {
            this._orderRepository = orderRepository;
            this._mapper = mapper;
            this._paymentRepository = paymentRepository;
        }

        public async Task<ServiceResponse<OrderDTO>> GetOrderById(int orderId)
        {
            ServiceResponse<OrderDTO> response = new ServiceResponse<OrderDTO>();

            try
            {
                var order = await _orderRepository.GetOrderByIdAsync(orderId);

                if (order == null)
                {
                    response.Success = false;
                    response.Message = "Order not found.";
                    return response;
                }

                var OrderDTO = _mapper.Map<OrderDTO>(order);

                response.Data = OrderDTO;
                response.Success = true;
                response.Message = "Order retrieved successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<List<OrderDTO>>> GetAllOrders()
        {
            ServiceResponse<List<OrderDTO>> response = new ServiceResponse<List<OrderDTO>>();

            try
            {
                var orders = await _orderRepository.GetAllOrdersAsync();
                var orderDTOs = _mapper.Map<List<OrderDTO>>(orders);

                response.Data = orderDTOs;
                response.Success = true;
                response.Message = "Order retrieved successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<OrderDTO>> CreateOrder(OrderDTO orderDTO)
        {
            ServiceResponse<OrderDTO> response = new ServiceResponse<OrderDTO>();

            try
            {
                var order = _mapper.Map<Order>(orderDTO);
                var createdOrder = await _orderRepository.CreateOrderAsync(order);
                var createdOrderDTO = _mapper.Map<OrderDTO>(createdOrder);

                response.Data = createdOrderDTO;
                response.Success = true;
                response.Message = "Order create successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }
        

        public async Task<ServiceResponse<OrderDTO>> UpdateOrder(int id, OrderDTO orderDTO)
        {
            ServiceResponse<OrderDTO> response = new ServiceResponse<OrderDTO>();

            try
            {
                var existingOrder = await _orderRepository.GetOrderByIdAsync(id);

                if (existingOrder == null)
                {
                    response.Success = false;
                    response.Message = "Order not found.";
                    return response;
                }
                var updatedOrder = _mapper.Map(orderDTO, existingOrder);
                var savedOrder = await _orderRepository.UpdateOrderAsync(updatedOrder);
                var savedOrderDTO = _mapper.Map<OrderDTO>(savedOrder);

                response.Data = savedOrderDTO;
                response.Success = true;
                response.Message = "Order update successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<bool>> DeleteOrder(int orderId)
        {
            ServiceResponse<bool> response = new ServiceResponse<bool>();

            try
            {
                var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId);

                if (existingOrder == null)
                {
                    response.Success = false;
                    response.Message = "Order not found.";
                    return response;
                }

                var success = await _orderRepository.DeleteOrderAsync(orderId);

                response.Data = success;
                response.Success = true;
                response.Message = "Order delete successfully";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }

            return response;
        }

        public async Task<ServiceResponse<OrderPaymentDTO>> CreateOrderWithPayment(OrderPaymentDTO orderPaymentDTO)
        {
            ServiceResponse<OrderPaymentDTO> response = new ServiceResponse<OrderPaymentDTO>();


            try
            {
                

                var payment = _mapper.Map<Payment>(orderPaymentDTO.PaymentDTO);
                var paymentDTO = await _paymentRepository.CreatePaymentAsync(payment);
                var createPayment = _mapper.Map<PaymentDTO>(paymentDTO);

                orderPaymentDTO.PaymentDTO = createPayment;
                orderPaymentDTO.PaymentId = createPayment.Id;

                var orderPayment = _mapper.Map<Order>(orderPaymentDTO);
                var orderDTO = await _orderRepository.CreateOrderAsync(orderPayment);
                var createOrder = _mapper.Map<OrderPaymentDTO>(orderDTO);
                createOrder.PaymentDTO = createPayment;


                response.Data = createOrder;
                response.Success = true;
                response.Message = "Order create successfully";


            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Error";
                response.ErrorMessages = new List<string> { ex.Message };
            }
            return  response;
        }
    }
}
