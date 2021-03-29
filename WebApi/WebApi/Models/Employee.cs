using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Employee_Name { get; set; }
        public string DateOfJoining { get; set; }
        public string Departament { get; set; }
        public string Photo_File_Name { get; set; }
    }
}
