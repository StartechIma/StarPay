using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("v1/usuario/login")]
public class LoginController : ControllerBase
{
    private readonly IAutenticacaoService _autenticacaoService;
    private readonly IConfiguration _appSettings;
    private readonly AppDbContext _context;

    public LoginController(IAutenticacaoService autenticacaoService, IConfiguration appSettings, AppDbContext context)
    {
        _autenticacaoService = autenticacaoService;
        _appSettings = appSettings;
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginModel loginModel)
    {
        var usuario = await _autenticacaoService.AutenticarUsuario(loginModel.Email, loginModel.Senha);

        if (usuario == null)
        {
            return Unauthorized("Email e/ou senha incorretos.");
        }

        var token = CreateToken(usuario);

        return Ok(new { message = "Login bem-sucedido.", token = token });
    }

    private string CreateToken(Usuario usuario)
    {
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Nome),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _appSettings["Jwt:Issuer"],
                Audience = _appSettings["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }




}
