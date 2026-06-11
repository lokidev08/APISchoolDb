using Microsoft.AspNetCore.Mvc;
    
    
public static class TestsCases
{
    public static bool ValidarCedula(string? cedula)
    {
        if (string.IsNullOrWhiteSpace(cedula) || cedula == "string")
        {
            return false;
        }
        cedula = cedula.Replace("-", "").Trim();
        if (cedula.Length != 11 || !cedula.All(char.IsDigit))
        {
            return false;
        }
        if (cedula.Distinct().Count() == 1)
        {
            return false;
        }
        int suma = 0;
        int[] multiplicadores = { 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 };
        for (int i = 0; i < 10; i++)
        {
            int valor = (cedula[i] - '0') * multiplicadores[i];
            if (valor > 9)
            {
                valor = (valor / 10) + (valor % 10);
            }
            suma += valor;
        }
        int digitoVerificador = (10 - (suma % 10)) % 10;
        return digitoVerificador == cedula[10] - '0';
    }
    public static bool LoginValidate(string username, string password, Usuario? usuario)
    {
        if (usuario == null)
        {
            return false;
        }

        if (usuario.Username != username)
        {
            return false;
        }

        return BCrypt.Net.BCrypt.Verify(password, usuario.PasswordHash);
    }
    public static bool AlumnoValidate(string Id, string Nombre, string Apellido, string Sexo, DateTime FechaNacimiento, string NumeroIdentificacion, string CreatedBy, DateTime CreatedAt, string Status, Alumno? alumno)
    {
        if (string.IsNullOrWhiteSpace(alumno.Nombre) || string.IsNullOrWhiteSpace(alumno.Apellido) || string.IsNullOrWhiteSpace(alumno.Sexo) || string.IsNullOrWhiteSpace(alumno.NumeroIdentificacion) || string.IsNullOrWhiteSpace(alumno.Status))
        {
            return false;
        }
        if (alumno.Nombre == "string" || alumno.Apellido == "string" || alumno.NumeroIdentificacion == "string" || alumno.Status == "string")
        {
            return false;
        }
        if (alumno.Sexo != "M" && alumno.Sexo != "F")
        {
            return false;
        }
        if (alumno.Status != "Activo" && alumno.Status != "Inactivo")
        {
            return false;
        }
        if (alumno.FechaNacimiento >= DateTime.Now)
        {
            return false;
        }
        if (alumno.FechaNacimiento <= DateTime.Now.AddYears(-100))
        {
            return false;
        }
        if (alumno.NumeroIdentificacion != NumeroIdentificacion)
        {
            return false;
        }
        return true;
    }

    public static bool CursoValidate(string Id, string Nombre, string anio, string CreatedBy, DateTime CreatedAt, string Status, Curso? curso)
    {
        if (curso == null)
        {
            return false;
        }
        if (string.IsNullOrWhiteSpace(curso.Nombre) || string.IsNullOrWhiteSpace(curso.anio) || string.IsNullOrWhiteSpace(curso.Status))
        {
            return false;
        }
        if (curso.Nombre == "string" || curso.anio == "string" || curso.Status == "string")
        {
            return false;
        }
        if (curso.Status != "Activo" && curso.Status != "Inactivo")
        {
            return false;
        }
        return curso.Id.ToString() == Id && curso.Nombre == Nombre && curso.anio == anio;
    }

    public static bool ProfesorValidate(string Id, string Nombre, string Apellido, string Sexo, string Cedula, string CreatedBy, DateTime CreatedAt, string Status, Profesor? profesor)
    {
        if (profesor == null)
        {
            return false;
        }
        if (string.IsNullOrWhiteSpace(profesor.Nombre) || string.IsNullOrWhiteSpace(profesor.Apellido) || string.IsNullOrWhiteSpace(profesor.Sexo) || string.IsNullOrWhiteSpace(profesor.Cedula) || string.IsNullOrWhiteSpace(profesor.Status))
        {
            return false;
        }
        if (profesor.Nombre == "string" || profesor.Apellido == "string" || profesor.Sexo == "string" || profesor.Cedula == "string" || profesor.Status == "string")
        {
            return false;
        }
        if (profesor.Sexo != "M" && profesor.Sexo != "F")
        {
            return false;
        }
        if (profesor.Status != "Activo" && profesor.Status != "Inactivo")
        {
            return false;
        }
        if (!ValidarCedula(profesor.Cedula))
        {
            return false;
        }
        return profesor.Id.ToString() == Id && profesor.Nombre == Nombre && profesor.Apellido == Apellido && profesor.Cedula == Cedula;
    }

    public static bool SeccionValidate(string Id, Guid IdCurso, string Nombre, Guid IdProfesorEncargado, DateTime FechaInicio, DateTime FechaFin, string CreatedBy, DateTime CreatedAt, string Status, Seccion? seccion)
    {
        if (seccion == null)
        {
            return false;
        }
        if (string.IsNullOrWhiteSpace(seccion.Nombre) || seccion.IdCurso == Guid.Empty || seccion.IdProfesorEncargado == Guid.Empty || string.IsNullOrWhiteSpace(seccion.Status))
        {
            return false;
        }
        if (seccion.Nombre == "string" || seccion.Status == "string")
        {
            return false;
        }
        if (seccion.Status != "Activo" && seccion.Status != "Inactivo")
        {
            return false;
        }
        if (seccion.FechaInicio >= seccion.FechaFin)
        {
            return false;
        }
        return seccion.Id.ToString() == Id && seccion.IdCurso == IdCurso && seccion.Nombre == Nombre && seccion.IdProfesorEncargado == IdProfesorEncargado;
    }

    public static bool SeccionAlumnoValidate(string Id, Guid IdSeccion, Guid IdAlumno, string CreatedBy, DateTime CreatedAt, string Status, SeccionAlumno? seccionAlumno)
    {
        if (seccionAlumno == null)
        {
            return false;
        }
        if (seccionAlumno.IdSeccion == Guid.Empty || seccionAlumno.IdAlumno == Guid.Empty || string.IsNullOrWhiteSpace(seccionAlumno.Status))
        {
            return false;
        }
        if (seccionAlumno.Status == "string")
        {
            return false;
        }
        if (seccionAlumno.Status != "Activo" && seccionAlumno.Status != "Inactivo")
        {
            return false;
        }
        return seccionAlumno.Id.ToString() == Id && seccionAlumno.IdSeccion == IdSeccion && seccionAlumno.IdAlumno == IdAlumno;
    }

    public static bool AsignaturaValidate(string Id, string Nombre, string CreatedBy, DateTime CreatedAt, string Status, Asignatura? asignatura)
    {
        if (asignatura == null)
        {
            return false;
        }
        if (string.IsNullOrWhiteSpace(asignatura.Nombre) || string.IsNullOrWhiteSpace(asignatura.Status))
        {
            return false;
        }
        if (asignatura.Nombre == "string" || asignatura.Status == "string")
        {
            return false;
        }
        if (asignatura.Status != "Activo" && asignatura.Status != "Inactivo")
        {
            return false;
        }
        return asignatura.Id.ToString() == Id && asignatura.Nombre == Nombre;
    }

    public static bool AsignaturaSeccionValidate(string Id, Guid IdAsignatura, Guid IdSeccion, Guid IdProfesor, string CreatedBy, DateTime CreatedAt, string Status, AsignaturaSeccion? asignaturaSeccion)
    {
        if (asignaturaSeccion == null)
        {
            return false;
        }
        if (asignaturaSeccion.IdAsignatura == Guid.Empty || asignaturaSeccion.IdSeccion == Guid.Empty || string.IsNullOrWhiteSpace(asignaturaSeccion.Status))
        {
            return false;
        }
        if (asignaturaSeccion.Status == "string")
        {
            return false;
        }
        if (asignaturaSeccion.Status != "Activo" && asignaturaSeccion.Status != "Inactivo")
        {
            return false;
        }
        return asignaturaSeccion.Id.ToString() == Id && asignaturaSeccion.IdAsignatura == IdAsignatura && asignaturaSeccion.IdSeccion == IdSeccion && asignaturaSeccion.IdProfesor == IdProfesor;
    }
}
