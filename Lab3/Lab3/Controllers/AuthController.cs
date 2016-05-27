using Lab3.Models;
using Lab3.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Lab3.Controllers
{
    public class AuthController : Controller
    {
        private Authentication Authen = new Authentication(System.Web.HttpContext.Current);

        [HttpGet]
        public ActionResult Auth()
        {
            return View(new AuthenView());
        }

        [HttpPost]
        public ActionResult Auth(AuthenView view)
        {
            if (ModelState.IsValid)
            {
                var user = Authen.Login(view.Login, view.Password);
                if (user == null)
                {
                    ModelState["Password"].Errors.Add("Неверный логин или пароль");
                    return View();
                }
            }
            return RedirectToAction("Index", "Home");
        }

        public ActionResult Logout()
        {
            Authen.LogOut();
            return RedirectToAction("Auth", "Auth");
        }
    }
}