using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Lab3.Models.Repository
{
    public class IRepositoryUsers : DbContext
    {
        private Lab3_database db = new Lab3_database();

        public User GetUser(string login, string password)
        {
            if (db.Users != null)
            {
                foreach (User elem in db.Users)
                {
                    if (elem.Login == login && elem.Password == password)
                    {
                        return elem;
                    }
                }
            }
            return null;
        }

        public User GetUser(string login)
        {
            if (db.Users != null)
            {
                foreach (User elem in db.Users)
                {
                    if (elem.Login == login)
                    {
                        return elem;
                    }
                }
            }
            return null;
        }

        public User GetUser(int id)
        {
            if (db.Users != null)
            {
                foreach (User elem in db.Users)
                {
                    if (elem.Id == id)
                    {
                        return elem;
                    }
                }
            }
            return null;
        }





        public User[] GetAllUser()
        {
            int i = 0;
            User[] users = new User[db.Users.Count<User>()];
            foreach (User user in db.Users)
            {
                users[i++] = user;
            }
            return users;
        }

        public bool IsOnline(string login)
        {
            User user = GetUser(login);
            if (user == null)
                return false;

            if (user.Status == user.typeStatus[0])
                return true;
            else
                return false;
        }

        public void UpdateDataStatus(User curUser, string status)
        {
            int id = curUser.Id;
            db.Users.Remove(curUser);
            db.SaveChanges();

            curUser.Id = id;
            curUser.Status = status;
            db.Users.Add(curUser);
            db.SaveChanges();
        }
    }
}