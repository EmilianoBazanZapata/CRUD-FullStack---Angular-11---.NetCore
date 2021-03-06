using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//agregamos el using 1.F
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartamentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        //metodo para seleccionar los departamentos
        public JsonResult Get()
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"SELECT DEPARTAMENT_ID,DEPARTAMENT_NAME FROM DEPARTAMENT";
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
        public JsonResult Post(Departament dep)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"INSERT INTO DEPARTAMENT VALUES(@DEPARTAMENTO)";
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
                    myCommand.Parameters.AddWithValue("@DEPARTAMENTO", dep.Departament_Name);
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
        public JsonResult Put(Departament dep)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"UPDATE [dbo].[DEPARTAMENT]
                                   SET [DEPARTAMENT_NAME] = @DEPARTAMENTO
                                 WHERE [DEPARTAMENT_ID] = @ID";
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
                    myCommand.Parameters.AddWithValue("@DEPARTAMENTO", dep.Departament_Name);
                    myCommand.Parameters.AddWithValue("@ID", dep.Deparament_Id);
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

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"DELETE FROM [dbo].[DEPARTAMENT]
                                 WHERE [DEPARTAMENT_ID] = @ID";
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
                    myCommand.Parameters.AddWithValue("@ID", id);
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
        [HttpGet("{date}")]
        //metodo para seleccionar los departamentos
        public JsonResult GetDepartament(string date)
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"Select * From DEPARTAMENT D 
                                where((D.DEPARTAMENT_NAME Like '%' + @DEPARTAMENTO + '%')
                                or(@DEPARTAMENTO is null))";
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
                    myCommand.Parameters.AddWithValue("@DEPARTAMENTO", date);
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
