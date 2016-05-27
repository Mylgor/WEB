using Lab3.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Lab3.Controllers
{
    public class HomeController : Controller
    {
        private Authentication Authen = new Authentication(System.Web.HttpContext.Current);

        public ActionResult Index()
        {
            User user = Authen.GetUser();
            return View(user);
        }
    }
}