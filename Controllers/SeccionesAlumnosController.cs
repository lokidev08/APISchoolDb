using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APISchool.Data;
using APISchool;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace APISchool.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeccionesAlumnosController : ControllerBase
{
    private readonly ColegioDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SeccionesAlumnosController(ColegioDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SeccionAlumno>>> Get()
    {
        return await _context.SeccionesAlumnos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SeccionAlumno>> Get(Guid id)
    {
        var sa = await _context.SeccionesAlumnos.FindAsync(id);
        if (sa == null) return NotFound();
        return sa;
    }

    [HttpPost]
    public async Task<ActionResult<SeccionAlumno>> Post(SeccionAlumnoCreateRequest request)
    {
        var username = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value ?? "Sistema";

        var sa = new SeccionAlumno
        {
            IdSeccion = request.IdSeccion,
            IdAlumno = request.IdAlumno,
            CreatedBy = username,
            Status = request.Status
        };

        if (sa.IdSeccion == Guid.Empty || sa.IdAlumno == Guid.Empty || string.IsNullOrWhiteSpace(sa.Status))
        {
            return BadRequest("Faltan campos obligatorios");
        }
        if (sa.Status == "string")
        {
            return BadRequest("Valores de prueba no permitidos");
        }
        if (sa.Status != "Activo" && sa.Status != "Inactivo")
        {
            return BadRequest("Status debe ser 'Activo' o 'Inactivo'");
        }

        var seccion = await _context.Secciones.FindAsync(sa.IdSeccion);
        if (seccion == null) return BadRequest("Seccion no existe");

        var alumno = await _context.Alumnos.FindAsync(sa.IdAlumno);
        if (alumno == null) return BadRequest("Alumno no existe");

        if (await _context.SeccionesAlumnos.AnyAsync(s => s.IdSeccion == sa.IdSeccion && s.IdAlumno == sa.IdAlumno))
        {
            return BadRequest("El alumno ya esta inscrito en esta seccion");
        }

        _context.SeccionesAlumnos.Add(sa);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = sa.Id }, sa);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, SeccionAlumno sa)
    {
        if (id != sa.Id) return BadRequest();
        if (sa.IdSeccion == Guid.Empty || sa.IdAlumno == Guid.Empty || string.IsNullOrWhiteSpace(sa.CreatedBy) || string.IsNullOrWhiteSpace(sa.Status))
        {
            return BadRequest("Faltan campos obligatorios");
        }
        if (sa.CreatedBy == "string" || sa.Status == "string")
        {
            return BadRequest("Valores de prueba no permitidos");
        }
        if (sa.Status != "Activo" && sa.Status != "Inactivo")
        {
            return BadRequest("Status debe ser 'Activo' o 'Inactivo'");
        }

        var seccion = await _context.Secciones.FindAsync(sa.IdSeccion);
        if (seccion == null) return BadRequest("Seccion no existe");

        var alumno = await _context.Alumnos.FindAsync(sa.IdAlumno);
        if (alumno == null) return BadRequest("Alumno no existe");

        _context.Entry(sa).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.SeccionesAlumnos.AnyAsync(e => e.Id == id)) return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var sa = await _context.SeccionesAlumnos.FindAsync(id);
        if (sa == null) return NotFound();
        _context.SeccionesAlumnos.Remove(sa);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
