using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//agregamos el using 1.G
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebApi.Models;
//agregamos otro using para poder trabajar con fotos 
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        //manejo empleados 
        private readonly IConfiguration _configuration;
        //manejo fotos
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration , IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        //metodo para seleccionar los departamentos
        public JsonResult Get()
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"SELECT EMPLOYEE_ID , EMPLOYEE_NAME  , 
                                DEPARTAMENT , CONVERT(NVARCHAR(50),DATE_OF_JOINING,120) AS DATE_OF_JOINING , PHOTO_FILE FROM EMPLOYEE";
            //CREO UNA INSTANCIA NUEVA DE UN DATATABLE
            DataTable tb = new DataTable();
            //creo una variable reader para capturar los datos
            SqlDataReader MyReader;
            //TOMO LA CADENA CONEXXION QUE SE UBICA EN APPSETINGS.JSON
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");


            using (SqlConnection sqlcon = new SqlConnection(sqlDataSource))
            {

                sqlcon.Open();
                using (SqlCommand myCommand = new SqlCommand(Consulta, sqlcon))
                {
                    MyReader = myCommand.ExecuteReader();
                    //la tabla la cargo con los datos obtenidos de mi select 
                    tb.Load(MyReader);
                    //cierro las conexiones
                    MyReader.Close();
                    sqlcon.Close();
                }
            }
            //cargo mi elemento json con el contenido de mi tb
            return new JsonResult(tb);
        }
        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"INSERT INTO [dbo].[EMPLOYEE]
                                       ([EMPLOYEE_NAME]
                                       ,[DEPARTAMENT]
                                       ,[DATE_OF_JOINING]
                                       ,[PHOTO_FILE])
                                 VALUES
                                       (@NOMBRE
                                       ,@DEPARTAMENTO
                                       ,@FECHADEINGRESO
                                       ,@FOTO)";
            //CREO UNA INSTANCIA NUEVA DE UN DATATABLE
            DataTable tb = new DataTable();
            //creo una variable reader para capturar los datos
            SqlDataReader MyReader;
            //TOMO LA CADENA CONEXXION QUE SE UBICA EN APPSETINGS.JSON
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");


            using (SqlConnection sqlcon = new SqlConnection(sqlDataSource))
            {

                sqlcon.Open();
                using (SqlCommand myCommand = new SqlCommand(Consulta, sqlcon))
                {
                    myCommand.Parameters.AddWithValue("@NOMBRE", emp.Employee_Name);
                    myCommand.Parameters.AddWithValue("@DEPARTAMENTO", emp.Departament);
                    myCommand.Parameters.AddWithValue("@FECHADEINGRESO", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@FOTO", emp.Photo_File_Name);
                    MyReader = myCommand.ExecuteReader();
                    //la tabla la cargo con los datos obtenidos de mi sentencia
                    tb.Load(MyReader);
                    //cierro las conexiones
                    MyReader.Close();
                    sqlcon.Close();
                }
            }
            //cargo mi elemento json con el contenido de mi tb
            return new JsonResult("Added Succesfully");
        }
        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"UPDATE [dbo].[EMPLOYEE]
                                   SET [EMPLOYEE_NAME] = @NOMBRE
                                      ,[DEPARTAMENT] = @DEPARTAMENTO
                                      ,[DATE_OF_JOINING] = @FECHADEINGRESO
                                      ,[PHOTO_FILE] = @FOTO
                                 WHERE [EMPLOYEE_ID] = @ID";
            //CREO UNA INSTANCIA NUEVA DE UN DATATABLE
            DataTable tb = new DataTable();
            //creo una variable reader para capturar los datos
            SqlDataReader MyReader;
            //TOMO LA CADENA CONEXXION QUE SE UBICA EN APPSETINGS.JSON
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection sqlcon = new SqlConnection(sqlDataSource))
            {

                sqlcon.Open();
                using (SqlCommand myCommand = new SqlCommand(Consulta, sqlcon))
                {
                    myCommand.Parameters.AddWithValue("@NOMBRE", emp.Employee_Name);
                    myCommand.Parameters.AddWithValue("@DEPARTAMENTO", emp.Departament);
                    myCommand.Parameters.AddWithValue("@FECHADEINGRESO", emp.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@FOTO", emp.Photo_File_Name);
                    myCommand.Parameters.AddWithValue("@ID", emp.EmployeeId);
                    MyReader = myCommand.ExecuteReader();
                    //la tabla la cargo con los datos obtenidos de mi sentencia
                    tb.Load(MyReader);
                    //cierro las conexiones
                    MyReader.Close();
                    sqlcon.Close();
                }
            }
            //cargo mi elemento json con el contenido de mi tb
            return new JsonResult("Updated Succesfully");
        }
        [HttpDelete]
        public JsonResult Delete(Employee emp)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"DELETE FROM [dbo].[EMPLOYEE]
                                WHERE [EMPLOYEE_ID] = @ID";
            //CREO UNA INSTANCIA NUEVA DE UN DATATABLE
            DataTable tb = new DataTable();
            //creo una variable reader para capturar los datos
            SqlDataReader MyReader;
            //TOMO LA CADENA CONEXXION QUE SE UBICA EN APPSETINGS.JSON
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (SqlConnection sqlcon = new SqlConnection(sqlDataSource))
            {

                sqlcon.Open();
                using (SqlCommand myCommand = new SqlCommand(Consulta, sqlcon))
                {
                    myCommand.Parameters.AddWithValue("@ID", emp.EmployeeId);
                    MyReader = myCommand.ExecuteReader();
                    //la tabla la cargo con los datos obtenidos de mi sentencia
                    tb.Load(MyReader);
                    //cierro las conexiones
                    MyReader.Close();
                    sqlcon.Close();
                }
            }
            //cargo mi elemento json con el contenido de mi tb
            return new JsonResult("Deleted Succesfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile() 
        {
            try
            {
                var HttpRequest = Request.Form;
                var PostedFile = HttpRequest.Files[0];
                string FileName = PostedFile.FileName;
                var PhysicalPath = _env.ContentRootPath + "/Photos/" + FileName;
                using (var stream = new FileStream(PhysicalPath,FileMode.Create)) 
                {
                    PostedFile.CopyTo(stream);
                }
                return new JsonResult(FileName);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllDepartamentsNames")]
        [HttpGet]
        public JsonResult GetAllDepartaments()
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"SELECT DEPARTAMENT_NAME
                                FROM DEPARTAMENT";
            //CREO UNA INSTANCIA NUEVA DE UN DATATABLE
            DataTable tb = new DataTable();
            //creo una variable reader para capturar los datos
            SqlDataReader MyReader;
            //TOMO LA CADENA CONEXXION QUE SE UBICA EN APPSETINGS.JSON
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");


            using (SqlConnection sqlcon = new SqlConnection(sqlDataSource))
            {

                sqlcon.Open();
                using (SqlCommand myCommand = new SqlCommand(Consulta, sqlcon))
                {
                    MyReader = myCommand.ExecuteReader();
                    //la tabla la cargo con los datos obtenidos de mi select 
                    tb.Load(MyReader);
                    //cierro las conexiones
                    MyReader.Close();
                    sqlcon.Close();
                }
            }
            //cargo mi elemento json con el contenido de mi tb
            return new JsonResult(tb);
        }

    }
}
