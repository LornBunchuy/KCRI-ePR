using KCRI_ePR.Data;
using KCRI_ePR.Models.Login;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KCRI_ePR.Controllers
{
    public class AuthController : Controller
    {
        private readonly PasswordHasher<string> _passwordHasher;
        private readonly ApplicationDbContext _context;
        private readonly GlobalData _globalData;
        public AuthController(ApplicationDbContext context, GlobalData globalData)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<string>();
            _globalData = globalData;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AuthLogin([FromBody] UserModel data)
        {
            if (data == null) {
                return Ok(400);
            }
            USRModel user = _context.USR.SingleOrDefault(u => u.UserName == data.Username);
            if (user == null)
            {
                return Ok(400);
            }
            var verificationResult = _passwordHasher.VerifyHashedPassword(data.Username, user.PWD, data.Password);
            if (verificationResult == PasswordVerificationResult.Success)
            {
                _globalData.UserCode = user.UserCode;
                _globalData.Password = user.PWD;   
                _globalData.Username = user.UserName;   
                return Ok(200);
            }
            return Ok(400);
        }
        public IActionResult ChangePassword()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AuthChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = _context.USR.SingleOrDefault(u => u.UserName == model.Username);
            if (user == null)
            {
                return Ok(400);
            }
            var verifyResult = _passwordHasher.VerifyHashedPassword(model.Username, user.PWD, model.Password);
            if (verifyResult != PasswordVerificationResult.Success)
            {
                return Ok("400");
            }
            var newHashedPassword = _passwordHasher.HashPassword(model.Username, model.NewPassword);
            user.PWD = newHashedPassword;
            _context.USR.Update(user);
            await _context.SaveChangesAsync();
            return Ok(200);
        }
    }
}
