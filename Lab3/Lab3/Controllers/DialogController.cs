using Lab3.Models;
using Lab3.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Lab3.Controllers
{
    public class DialogController : ApiController
    {
        private IRepositoryUsers rep = new IRepositoryUsers();

        // GET: api/Dialog
        public IEnumerable<IAnswerApi> Get()
        {
            User[] users = rep.GetAllUser();
            IAnswerApi[] result = new IAnswerApi[users.Count<User>()];
            int i = 0;
            foreach (User user in users)
            {
                result[i] = new IAnswerApi();
                result[i].Id = user.Id;
                result[i].Login = user.Login;
                result[i].Status = user.Status;
                i++;
            }
            
            return result;
        }

        // GET: api/Dialog/5
        public IAnswerApi Get(int id)
        {
            User user = rep.GetUser(id);
            IAnswerApi result = new IAnswerApi();

            if (user != null)
            {
                result.Id = user.Id;
                result.Login = user.Login;
                result.Status = user.Status;
            }
            return result;
        }

        // POST: api/Dialog
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Dialog/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Dialog/5
        public void Delete(int id)
        {
        }
    }
}
