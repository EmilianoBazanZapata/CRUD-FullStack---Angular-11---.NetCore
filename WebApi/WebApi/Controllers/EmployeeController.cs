﻿using Microsoft.AspNetCore.Http;
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

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        //metodo para seleccionar los departamentos
        public JsonResult Get()
        {
            //genero un string con la consulta hacia la BD
            string Consulta = @"SELECT EMPLOYEE_ID , EMPLOYEE_NAME  , DEPARTAMENT , DATE_OF_JOINING , PHOTO_FILE FROM EMPLOYEE";
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
