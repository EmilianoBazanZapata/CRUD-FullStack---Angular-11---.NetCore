--CREATE DATABASE EmployeeDB

--CREATE TABLE DEPARTAMENT(
--DEPARTAMENT_ID INT IDENTITY(1,1),
--DEPARTAMENT_NAME NVARCHAR(500)
--)



--INSERT INTO DEPARTAMENT VALUES('IT')
--INSERT INTO DEPARTAMENT VALUES('SUPPORT')

--SELECT *
--FROM DEPARTAMENT

CREATE TABLE EMPLOYEE
(
EMPLOYEE_ID INT IDENTITY(1,1),
EMPLOYEE_NAME NVARCHAR(50),
DEPARTAMENT NVARCHAR(50),
DATE_OF_JOINING DATE ,
PHOTO_FILE NVARCHAR(500),
)


INSERT INTO EMPLOYEE VALUES('SAM','IT','2021-06-01','anonimous.png')

SELECT *
FROM EMPLOYEE