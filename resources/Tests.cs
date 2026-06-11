using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class CédulaTests
{
    [TestMethod]
    public void validarCedula_RetornaTrue_CedulaValida()
    {
        Assert.IsTrue(TestsCases.ValidarCedula("38820049815"));
    }
    [TestMethod]
    public void validarCedula_RetornaFalse_CedulaInvalida()
    {
        Assert.IsFalse(TestsCases.ValidarCedula("02368169462"));
    }
    [TestMethod]
    public void validarCedula_RetornaFalse_CedulaConLetras()
    {
        Assert.IsFalse(TestsCases.ValidarCedula("1234567890A"));
    }
    [TestMethod]
    public void validarCedula_RetornaFalse_CedulaPredeterminada()
    {
        Assert.IsFalse(TestsCases.ValidarCedula("string"));
    }
    [TestMethod]
    public void validarCedula_RetornaFalse_CedulaConCaracteresEspeciales()
    {
        Assert.IsFalse(TestsCases.ValidarCedula("1234567890!"));
    }
    [TestMethod]
    public void validarCedula_RetornaTrue_CedulaValida2()
    {
        Assert.IsTrue(TestsCases.ValidarCedula("237-4581468-3"));
    }
}

[TestClass]
public class LoginTests
{
    [TestMethod]
    public void Login_RetornaTrue_CredencialesValidas()
    {
        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Username = "Dalvert",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("150051"),
            Nombre = "Dalvert",
            Status = true
        };
    Assert.IsTrue(TestsCases.LoginValidate("Dalvert", "150051", usuario));
    }
    [TestMethod]
    public void Login_RetornaFalse_CredencialesInvalidas()
    {
        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Username = "Dalvert",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("150051"),
            Nombre = "Dalvert",
            Status = true
        };
        Assert.IsFalse(TestsCases.LoginValidate("Dalvert", "wrongpassword", usuario));
    }
    [TestMethod]
    public void Login_RetornaFalse_UsuarioInexistente()
    {
        Assert.IsFalse(TestsCases.LoginValidate("NonExistentUser", "password", null));
    }
    [TestMethod]
    public void Login_RetornaTrue_CredencialesValidas2()
    {
        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Username = "Equipo",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("NV*2023"),
            Nombre = "Equipo",
            Status = true
        };
        Assert.IsTrue(TestsCases.LoginValidate("Equipo", "NV*2023", usuario));
    }
    [TestMethod]
    public void Alumno_RetornaTrue_DatosValidos()
    {
        var alumno = new Alumno
        {
            Id = Guid.NewGuid(),
            Nombre = "Juan",
            Apellido = "Pérez",
            Sexo = "M",
            FechaNacimiento = new DateTime(2000, 1, 1),
            NumeroIdentificacion = "1234567890",
            CreatedBy = "Admin",
            CreatedAt = DateTime.Now,
            Status = "Activo"
        };
        Assert.IsTrue(TestsCases.AlumnoValidate(alumno.Id.ToString(), alumno.Nombre, alumno.Apellido, alumno.Sexo, alumno.FechaNacimiento, alumno.NumeroIdentificacion, alumno.CreatedBy, alumno.CreatedAt, alumno.Status, alumno));
    }
}

[TestClass]
public class TablasTests
{
    [TestClass]
    public class AlumnoTests
    {
        [TestMethod]
        public void Alumno_RetornaFalse_SexoyNombreInvalidos()
        {
            var alumno = new Alumno
            {
                Id = Guid.NewGuid(),
                Nombre = "Juan",
                Apellido = "Pérez",
                Sexo = "Masculino",
                FechaNacimiento = new DateTime(2000, 1, 1),
                NumeroIdentificacion = "1234567890",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Inactivo"
            };
            Assert.IsFalse(TestsCases.AlumnoValidate(alumno.Id.ToString(), "WrongName", alumno.Apellido, alumno.Sexo, alumno.FechaNacimiento, alumno.NumeroIdentificacion, alumno.CreatedBy, alumno.CreatedAt, alumno.Status, alumno));
        }
        [TestMethod]
        public void Alumno_RetornaFalse_DatosPredeterminados()
        {
            var alumno = new Alumno
            {
                Id = Guid.NewGuid(),
                Nombre = "string",
                Apellido = "string",
                Sexo = "string",
                FechaNacimiento = DateTime.Now.AddYears(1),
                NumeroIdentificacion = "string",
                CreatedBy = "string",
                CreatedAt = DateTime.Now,
                Status = "string"
            };
            Assert.IsFalse(TestsCases.AlumnoValidate(alumno.Id.ToString(), alumno.Nombre, alumno.Apellido, alumno.Sexo, alumno.FechaNacimiento, alumno.NumeroIdentificacion, alumno.CreatedBy, alumno.CreatedAt, alumno.Status, alumno));
        }
        [TestMethod]
        public void Alumno_RetornaFalse_FechaNacimientoFutura()
        {
            var alumno = new Alumno
            {
                Id = Guid.NewGuid(),
                Nombre = "Ana",
                Apellido = "García",
                Sexo = "F",
                FechaNacimiento = DateTime.Now.AddYears(1),
                NumeroIdentificacion = "0987654321",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };
            Assert.IsFalse(TestsCases.AlumnoValidate(alumno.Id.ToString(), alumno.Nombre, alumno.Apellido, alumno.Sexo, alumno.FechaNacimiento, alumno.NumeroIdentificacion, alumno.CreatedBy, alumno.CreatedAt, alumno.Status, alumno));
        }
        [TestMethod]
        public void Alumno_RetornaFalse_FechaNacimientoMuyAntigua()
        {
            var alumno = new Alumno
            {
                Id = Guid.NewGuid(),
                Nombre = "Carlos",
                Apellido = "López",
                Sexo = "M",
                FechaNacimiento = DateTime.Now.AddYears(-150),
                NumeroIdentificacion = "1122334455",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Inactivo"
            };
            Assert.IsFalse(TestsCases.AlumnoValidate(alumno.Id.ToString(), alumno.Nombre, alumno.Apellido, alumno.Sexo, alumno.FechaNacimiento, alumno.NumeroIdentificacion, alumno.CreatedBy, alumno.CreatedAt, alumno.Status, alumno));
        }
        [TestMethod]
        public void Alumno_RetornaTrue_DatosValidos2()
        {
            var alumno = new Alumno
            {
                Id = Guid.NewGuid(),
                Nombre = "María",
                Apellido = "Rodríguez",
                Sexo = "F",
                FechaNacimiento = new DateTime(1995, 5, 15),
                NumeroIdentificacion = "5555555555",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };
            Assert.IsTrue(TestsCases.AlumnoValidate(alumno.Id.ToString(), alumno.Nombre, alumno.Apellido, alumno.Sexo, alumno.FechaNacimiento, alumno.NumeroIdentificacion, alumno.CreatedBy, alumno.CreatedAt, alumno.Status, alumno));
        }
    }

    [TestClass]
    public class CursoTests
    {
        [TestMethod]
        public void Curso_RetornaTrue_DatosValidos()
        {
            var curso = new Curso
            {
                Id = Guid.NewGuid(),
                Nombre = "Primero",
                anio = "2026",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsTrue(TestsCases.CursoValidate(curso.Id.ToString(), curso.Nombre, curso.anio, curso.CreatedBy, curso.CreatedAt, curso.Status, curso));
        }

        [TestMethod]
        public void Curso_RetornaFalse_DatosPredeterminados()
        {
            var curso = new Curso
            {
                Id = Guid.NewGuid(),
                Nombre = "string",
                anio = "string",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "string"
            };

            Assert.IsFalse(TestsCases.CursoValidate(curso.Id.ToString(), curso.Nombre, curso.anio, curso.CreatedBy, curso.CreatedAt, curso.Status, curso));
        }
    }

    [TestClass]
    public class ProfesorTests
    {
        [TestMethod]
        public void Profesor_RetornaTrue_DatosValidos()
        {
            var profesor = new Profesor
            {
                Id = Guid.NewGuid(),
                Nombre = "Pedro",
                Apellido = "Santos",
                Sexo = "M",
                Cedula = "38820049815",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsTrue(TestsCases.ProfesorValidate(profesor.Id.ToString(), profesor.Nombre, profesor.Apellido, profesor.Sexo, profesor.Cedula, profesor.CreatedBy, profesor.CreatedAt, profesor.Status, profesor));
        }

        [TestMethod]
        public void Profesor_RetornaFalse_CedulaInvalida()
        {
            var profesor = new Profesor
            {
                Id = Guid.NewGuid(),
                Nombre = "Pedro",
                Apellido = "Santos",
                Sexo = "M",
                Cedula = "02368169462",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsFalse(TestsCases.ProfesorValidate(profesor.Id.ToString(), profesor.Nombre, profesor.Apellido, profesor.Sexo, profesor.Cedula, profesor.CreatedBy, profesor.CreatedAt, profesor.Status, profesor));
        }

        [TestMethod]
        public void Profesor_RetornaFalse_SexoInvalido()
        {
            var profesor = new Profesor
            {
                Id = Guid.NewGuid(),
                Nombre = "Pedro",
                Apellido = "Santos",
                Sexo = "Masculino",
                Cedula = "38820049815",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsFalse(TestsCases.ProfesorValidate(profesor.Id.ToString(), profesor.Nombre, profesor.Apellido, profesor.Sexo, profesor.Cedula, profesor.CreatedBy, profesor.CreatedAt, profesor.Status, profesor));
        }
    }

    [TestClass]
    public class SeccionTests
    {
        [TestMethod]
        public void Seccion_RetornaTrue_DatosValidos()
        {
            var seccion = new Seccion
            {
                Id = Guid.NewGuid(),
                IdCurso = Guid.NewGuid(),
                Nombre = "A",
                IdProfesorEncargado = Guid.NewGuid(),
                FechaInicio = new DateTime(2026, 1, 10),
                FechaFin = new DateTime(2026, 6, 10),
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsTrue(TestsCases.SeccionValidate(seccion.Id.ToString(), seccion.IdCurso, seccion.Nombre, seccion.IdProfesorEncargado, seccion.FechaInicio, seccion.FechaFin, seccion.CreatedBy, seccion.CreatedAt, seccion.Status, seccion));
        }

        [TestMethod]
        public void Seccion_RetornaFalse_FechaInicioMayorAFechaFin()
        {
            var seccion = new Seccion
            {
                Id = Guid.NewGuid(),
                IdCurso = Guid.NewGuid(),
                Nombre = "A",
                IdProfesorEncargado = Guid.NewGuid(),
                FechaInicio = new DateTime(2026, 6, 10),
                FechaFin = new DateTime(2026, 1, 10),
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsFalse(TestsCases.SeccionValidate(seccion.Id.ToString(), seccion.IdCurso, seccion.Nombre, seccion.IdProfesorEncargado, seccion.FechaInicio, seccion.FechaFin, seccion.CreatedBy, seccion.CreatedAt, seccion.Status, seccion));
        }

        [TestMethod]
        public void Seccion_RetornaFalse_IdCursoVacio()
        {
            var seccion = new Seccion
            {
                Id = Guid.NewGuid(),
                IdCurso = Guid.Empty,
                Nombre = "A",
                IdProfesorEncargado = Guid.NewGuid(),
                FechaInicio = new DateTime(2026, 1, 10),
                FechaFin = new DateTime(2026, 6, 10),
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsFalse(TestsCases.SeccionValidate(seccion.Id.ToString(), seccion.IdCurso, seccion.Nombre, seccion.IdProfesorEncargado, seccion.FechaInicio, seccion.FechaFin, seccion.CreatedBy, seccion.CreatedAt, seccion.Status, seccion));
        }
    }

    [TestClass]
    public class SeccionAlumnoTests
    {
        [TestMethod]
        public void SeccionAlumno_RetornaTrue_DatosValidos()
        {
            var seccionAlumno = new SeccionAlumno
            {
                Id = Guid.NewGuid(),
                IdSeccion = Guid.NewGuid(),
                IdAlumno = Guid.NewGuid(),
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsTrue(TestsCases.SeccionAlumnoValidate(seccionAlumno.Id.ToString(), seccionAlumno.IdSeccion, seccionAlumno.IdAlumno, seccionAlumno.CreatedBy, seccionAlumno.CreatedAt, seccionAlumno.Status, seccionAlumno));
        }

        [TestMethod]
        public void SeccionAlumno_RetornaFalse_IdAlumnoVacio()
        {
            var seccionAlumno = new SeccionAlumno
            {
                Id = Guid.NewGuid(),
                IdSeccion = Guid.NewGuid(),
                IdAlumno = Guid.Empty,
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsFalse(TestsCases.SeccionAlumnoValidate(seccionAlumno.Id.ToString(), seccionAlumno.IdSeccion, seccionAlumno.IdAlumno, seccionAlumno.CreatedBy, seccionAlumno.CreatedAt, seccionAlumno.Status, seccionAlumno));
        }
    }

    [TestClass]
    public class AsignaturaTests
    {
        [TestMethod]
        public void Asignatura_RetornaTrue_DatosValidos()
        {
            var asignatura = new Asignatura
            {
                Id = Guid.NewGuid(),
                Nombre = "Matematica",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsTrue(TestsCases.AsignaturaValidate(asignatura.Id.ToString(), asignatura.Nombre, asignatura.CreatedBy, asignatura.CreatedAt, asignatura.Status, asignatura));
        }

        [TestMethod]
        public void Asignatura_RetornaFalse_DatosPredeterminados()
        {
            var asignatura = new Asignatura
            {
                Id = Guid.NewGuid(),
                Nombre = "string",
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "string"
            };

            Assert.IsFalse(TestsCases.AsignaturaValidate(asignatura.Id.ToString(), asignatura.Nombre, asignatura.CreatedBy, asignatura.CreatedAt, asignatura.Status, asignatura));
        }
    }

    [TestClass]
    public class AsignaturaSeccionTests
    {
        [TestMethod]
        public void AsignaturaSeccion_RetornaTrue_DatosValidos()
        {
            var asignaturaSeccion = new AsignaturaSeccion
            {
                Id = Guid.NewGuid(),
                IdAsignatura = Guid.NewGuid(),
                IdSeccion = Guid.NewGuid(),
                IdProfesor = Guid.NewGuid(),
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsTrue(TestsCases.AsignaturaSeccionValidate(asignaturaSeccion.Id.ToString(), asignaturaSeccion.IdAsignatura, asignaturaSeccion.IdSeccion, asignaturaSeccion.IdProfesor, asignaturaSeccion.CreatedBy, asignaturaSeccion.CreatedAt, asignaturaSeccion.Status, asignaturaSeccion));
        }

        [TestMethod]
        public void AsignaturaSeccion_RetornaFalse_IdAsignaturaVacio()
        {
            var asignaturaSeccion = new AsignaturaSeccion
            {
                Id = Guid.NewGuid(),
                IdAsignatura = Guid.Empty,
                IdSeccion = Guid.NewGuid(),
                IdProfesor = Guid.NewGuid(),
                CreatedBy = "Admin",
                CreatedAt = DateTime.Now,
                Status = "Activo"
            };

            Assert.IsFalse(TestsCases.AsignaturaSeccionValidate(asignaturaSeccion.Id.ToString(), asignaturaSeccion.IdAsignatura, asignaturaSeccion.IdSeccion, asignaturaSeccion.IdProfesor, asignaturaSeccion.CreatedBy, asignaturaSeccion.CreatedAt, asignaturaSeccion.Status, asignaturaSeccion));
        }
    }
}