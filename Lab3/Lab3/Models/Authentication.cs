using Lab3.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace Lab3.Models
{
    public class Authentication
    {
        private static NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();
        private const string cookieName = "__AUTH_COOKIE";

        public HttpContext httpContext { get; set; }
        public IRepositoryUsers Repository = new IRepositoryUsers();

        public Authentication(HttpContext content)
        {
            httpContext = content;
        }

        public User Login(string userName, string Password)
        {
            User retUser = Repository.GetUser(userName, Password);
            if (retUser != null)
            {
                CreateCookie(userName);
                Repository.UpdateDataStatus(retUser, retUser.typeStatus[0]);
            }
            return retUser;
        }

        private void CreateCookie(string userName)
        {
            var ticket = new FormsAuthenticationTicket(
                  1,
                  userName,
                  DateTime.Now,
                  DateTime.Now.Add(FormsAuthentication.Timeout),
                  false,
                  string.Empty,
                  FormsAuthentication.FormsCookiePath);

            var encTicket = FormsAuthentication.Encrypt(ticket);

            var AuthCookie = new HttpCookie(cookieName)
            {
                Value = encTicket,
                Expires = DateTime.Now.Add(FormsAuthentication.Timeout)
            };
            httpContext.Response.Cookies.Set(AuthCookie);
        }

        public void LogOut()
        {
            var httpCookie = httpContext.Response.Cookies[cookieName];
            if (httpCookie != null)
            {
                httpCookie.Value = string.Empty;
            }
        }

        public User GetUser()
        {
            try
            {
                HttpCookie authCookie = httpContext.Request.Cookies.Get(cookieName);
                if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
                {
                    var ticket = FormsAuthentication.Decrypt(authCookie.Value);
                    return Repository.GetUser(ticket.Name);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                logger.Error("IsAuthen method exeption: " + ex.Message);
                return null;
            }
        }
    }
}