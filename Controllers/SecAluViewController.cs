using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APISchool.Data;
using APISchool;

namespace APISchool.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SecAluViewController : ControllerBase
{
    private readonly ColegioDbContext _context;

    public SecAluViewController(ColegioDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlumnoSeccionView>>> Get()
    {
        var secAluCur = await _context.SecAluCur.ToListAsync();
        return secAluCur;
    }

}