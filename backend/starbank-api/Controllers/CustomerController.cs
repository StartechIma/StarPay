

using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace starbank_api.Domain.Models;


[ApiController]
[Route("v1/customer")]
public class CustomerController : ControllerBase
{
    private readonly StarDbContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _appSettings;




    public CustomerController(StarDbContext context, IMapper mapper, IConfiguration appSettings)
    {
        _context = context;
        _mapper = mapper;
        _appSettings = appSettings;
    }





    [HttpGet("{id}")]
    // [Authorize]
    public async Task<ActionResult<CustomerResponseDto>> GetCustomer(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
        {
            return NotFound();
        }
        CustomerResponseDto customerResponse = _mapper.Map<CustomerResponseDto>(customer);
        return Ok(customerResponse);
    }

}
