import { useState, useEffect } from "react";

const API_URL = "http://localhost:5107";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [SeccionAlumnos, setSeccionAlumnos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturasSecciones, setAsignaturasSecciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchFields, setSearchFields] = useState({
    id: "",
    nombre: "",
    apellido: "",
    identificacion: "",
    sexo: "",
    status: ""
  });
  const [cursoSearchFields, setCursoSearchFields] = useState({
    id: "",
    nombre: "",
    anio: "",
    status: ""
  });
  const [seccionSearchFields, setSeccionSearchFields] = useState({
    id: "",
    IdCurso: "",
    IdProfesorEncargado: "",
    Nombre: "",
    FechaInicio: "",
    FechaFin: "",
    Status: ""
  });
  const [seccionAlumnosSearchFields, setSeccionAlumnosSearchFields] = useState({
    id: "",
    IdSeccion: "",
    IdAlumno: "",
    Status: ""
  });
  const [profesorSearchFields, setProfesorSearchFields] = useState({
    id: "",
    nombre: "",
    apellido: "",
    Sexo: "",
    Cedula: "",
    Status: ""
  });
  const [asignaturaSearchFields, setAsignaturaSearchFields] = useState({ 
    id: "", 
    nombre: "", 
    status: "" 
  });
  const [asignaturaSeccionSearchFields, setAsignaturaSeccionSearchFields] = useState({
    id: "", 
    idAsignatura: "", 
    idSeccion: "", 
    idProfesor: "", 
    status: ""
  });
  const [editSearchId, setEditSearchId] = useState("");
  const [editCursoSearchId, setEditCursoSearchId] = useState("");
  const [editSeccionSearchId, setEditSeccionSearchId] = useState("");
  const [editSeccionAlumnosSearchId, setEditSeccionAlumnosSearchId] = useState("");
  const [editProfesorSearchId, setEditProfesorSearchId] = useState("");
  const [editAsignaturaSearchId, setEditAsignaturaSearchId] = useState("");
  const [editAsignaturaSeccionSearchId, setEditAsignaturaSeccionSearchId] = useState("");
  const [dashboardUser, setDashboardUser] = useState(localStorage.getItem("loginUsername") ?? "");
  const [editingId, setEditingId] = useState(null);
  const [editingCursoId, setEditingCursoId] = useState(null);
  const [editingSeccionId, setEditingSeccionId] = useState(null);
  const [editingSeccionAlumnosId, setEditingSeccionAlumnosId] = useState(null);
  const [editingProfesorId, setEditingProfesorId] = useState(null);
  const [editingAsignaturaId, setEditingAsignaturaId] = useState(null);
  const [editingAsignaturaSeccionId, setEditingAsignaturaSeccionId] = useState(null);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);
  const [cursoToDelete, setCursoToDelete] = useState(null);
  const [seccionToDelete, setSeccionToDelete] = useState(null);
  const [seccionAlumnosToDelete, setSeccionAlumnosToDelete] = useState(null);
  const [profesorToDelete, setProfesorToDelete] = useState(null);
  const [asignaturaToDelete, setAsignaturaToDelete] = useState(null);
  const [asignaturaSeccionToDelete, setAsignaturaSeccionToDelete] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    fechaNacimiento: "",
    numeroIdentificacion: "",
    status: "Activo",
    createdBy: "",
    createdAt: ""
  });
  const [cursoFormData, setCursoFormData] = useState({
    nombre: "",
    anio: "",
    status: "Activo",
    createdBy: "",
    createdAt: ""
  });
  const [seccionFormData, setSeccionFormData] = useState({
    IdCurso: "",
    IdProfesorEncargado: "",
    Nombre: "",
    FechaInicio: "",
    FechaFin: "",
    Status: "Activo",
    createdBy: "",
    createdAt: ""
  });
  const [seccionAlumnosFormData, setSeccionAlumnosFormData] = useState({
    IdSeccion: "",
    IdAlumno: "",
    Status: "Activo",
    createdBy: "",
    createdAt: ""
  });
  const [profesorFormData, setProfesorFormData] = useState({
    nombre: "",
    apellido: "",
    Sexo: "",
    Cedula: "",
    Status: "Activo",
    createdBy: "",
    createdAt: ""
  });
  const [asignaturaFormData, setAsignaturaFormData] = useState({
    id: "", 
    nombre: "", 
    status: "Activo", 
    createdBy: "", 
    createdAt: ""
  });
  const [asignaturaSeccionFormData, setAsignaturaSeccionFormData] = useState({
    id: "", 
    idAsignatura: "", 
    idSeccion: "", 
    idProfesor: "", 
    status: "Activo", 
    createdBy: "", 
    createdAt: ""
  });

  const token = localStorage.getItem("apiToken");
  const authHeader = token?.startsWith("Bearer ") ? token : `Bearer ${token}`;

  const getApiError = async (response, fallbackMessage) => {
    const text = await response.text();

    if (response.status === 401) {
      localStorage.removeItem("apiToken");
      return "Token inválido o expirado. Inicie sesión otra vez.";
    }

    return text || fallbackMessage;
  };

  const fetchAlumnos = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Alumnos`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al cargar alumnos"));
      }

      const data = await response.json();
      setAlumnos(Array.isArray(data) ? data : []);
      setMessage("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCursos = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Cursos`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al cargar cursos"));
      }

      const data = await response.json();
      setCursos(Array.isArray(data) ? data : []);
      setMessage("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSecciones = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Secciones`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al cargar secciones"));
      }

    const data = await response.json();
    setSecciones(Array.isArray(data) ? data : []);
    setMessage("");
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

const fetchSeccionAlumnos = async () => {
  setLoading(true);
  setMessage("");
  try {
    const response = await fetch(`${API_URL}/api/SeccionAlumnos`, {
      headers: {
        Authorization: token ? authHeader : "",
      },
    });

    if (!response.ok) {
      throw new Error(await getApiError(response, "Error al cargar seccion alumnos"));
    }

    const data = await response.json();
    setSeccionAlumnos(Array.isArray(data) ? data : []);
    setMessage("");
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

const fetchProfesores = async () => {
  setLoading(true);
  setMessage("");
  try {
    const response = await fetch(`${API_URL}/api/Profesores`, {
      headers: {
        Authorization: token ? authHeader : "",
      },
    });

    if (!response.ok) {
      throw new Error(await getApiError(response, "Error al cargar profesores"));
    }

    const data = await response.json();
    setProfesores(Array.isArray(data) ? data : []);
    setMessage("");
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

const fetchAsignaturas = async () => {
  setLoading(true);
  setMessage("");
  try {
    const response = await fetch(`${API_URL}/api/Asignaturas`, { 
      headers: { Authorization: token ? authHeader : "" } 
    });

    if (!response.ok) {
      throw new Error(await getApiError(response, "Error al cargar asignaturas"));
    }

    const data = await response.json();
    setAsignaturas(Array.isArray(data) ? data : []);
  } catch (error) {
    setMessage(`Error: ${error.message}`);
    setAsignaturas([]);
  } finally {
    setLoading(false);
  }
};

const fetchAsignaturasSecciones = async () => {
  setLoading(true);
  setMessage("");
  try {
    const response = await fetch(`${API_URL}/api/AsignaturaSeccion`, { 
      headers: { Authorization: token ? authHeader : "" } 
    });

    if (!response.ok) {
      throw new Error(await getApiError(response, "Error al cargar asignaturas por sección"));
    }

    const data = await response.json();
    setAsignaturasSecciones(Array.isArray(data) ? data : []);
  } catch (error) {
    setMessage(`Error: ${error.message}`);
    setAsignaturasSecciones([]);
  } finally {
    setLoading(false);
  }
};

  const updateSearchField = (field, value) => {
    setSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateCursoSearchField = (field, value) => {
    setCursoSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateSeccionSearchField = (field, value) => {
    setSeccionSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateSeccionAlumnosSearchField = (field, value) => {
    setSeccionAlumnosSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateProfesorSearchField = (field, value) => {
    setProfesorSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateAsignaturaSearchField = (field, value) => {
    setAsignaturaSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateAsignaturaSeccionSearchField = (field, value) => {
    setAsignaturaSeccionSearchFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const clearSearchFields = () => {
    setSearchFields({
      id: "",
      nombre: "",
      apellido: "",
      identificacion: "",
      sexo: "",
      status: ""
    });
  };

  const clearCursoSearchFields = () => {
    setCursoSearchFields({
      id: "",
      nombre: "",
      anio: "",
      status: ""
    });
  };

  const clearSeccionSearchFields = () => {
    setSeccionSearchFields({
      id: "",
      IdCurso: "",
      IdProfesorEncargado: "",
      nombre: "",
      FechaInicio: "",
      FechaFin: "",
      status: ""
    });
  };

  const clearSeccionAlumnosSearchFields = () => {
    setSeccionAlumnosSearchFields({
      id: "",
      IdSeccion: "",
      IdAlumno: "",
      status: ""
    });
  };

  const clearProfesorSearchFields = () => {
    setProfesorSearchFields({
      id: "",
      nombre: "",
      apellido: "",
      cedula: "",
      sexo: "",
      status: ""
    });
  };

  const clearAsignaturaSearchFields = () => {
    setAsignaturaSearchFields({
      id: "",
      nombre: "",
      status: ""
    });
  };

  const clearAsignaturaSeccionSearchFields = () => {
    setAsignaturaSeccionSearchFields({
      id: "",
      idAsignatura: "",
      idSeccion: "",
      idProfesor: "",
      status: ""
    });
  };

  const searchAlumnos = async (e, field) => {
    e.preventDefault();

    const rawValue = searchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/Alumnos/${rawValue.trim()}`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            })
          : await fetch(`${API_URL}/api/Alumnos`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar alumnos"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((alumno) => {
              const fieldValue = {
                nombre: alumno.nombre,
                apellido: alumno.apellido,
                identificacion: alumno.numeroIdentificacion,
                sexo: alumno.sexo,
                status: alumno.status,
              }[field];

              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];

      setAlumnos(results);
      clearSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setAlumnos([]);
    } finally {
      setLoading(false);
    }
  };

  const searchCursos = async (e, field) => {
    e.preventDefault();

    const rawValue = cursoSearchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/Cursos/${rawValue.trim()}`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            })
          : await fetch(`${API_URL}/api/Cursos`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar cursos"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((curso) => {
              const fieldValue = {
                nombre: curso.nombre,
                anio: curso.anio,
                status: curso.status,
              }[field];

              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];

      setCursos(results);
      clearCursoSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setCursos([]);
    } finally {
      setLoading(false);
    }
  };

  const searchSecciones = async (e, field) => {
    e.preventDefault();

    const rawValue = seccionSearchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/Secciones/${rawValue.trim()}`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            })
          : await fetch(`${API_URL}/api/Secciones`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar secciones"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((seccion) => {
              const fieldValue = {
                IdCurso: seccion.IdCurso,
                IdProfesorEncargado: seccion.IdProfesorEncargado,
                nombre: seccion.nombre,
                FechaInicio: seccion.FechaInicio,
                FechaFin: seccion.FechaFin,
                status: seccion.status,
              }[field];

              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];

      setSecciones(results);
      clearSeccionSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setSecciones([]);
    } finally {
      setLoading(false);
    }
  };

  const searchSeccionAlumnos = async (e, field) => {
    e.preventDefault();
    
    const rawValue = seccionAlumnosSearchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/SeccionAlumnos/${rawValue.trim()}`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            })
          : await fetch(`${API_URL}/api/SeccionAlumnos`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            });
            
      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar seccion alumnos"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((seccionAlumno) => {
              const fieldValue = {
                IdSeccion: seccionAlumno.IdSeccion,
                IdAlumno: seccionAlumno.IdAlumno,
                Status: seccionAlumno.Status,
              }[field];
              
              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];
          
      setSeccionAlumnos(results);
      clearSeccionAlumnosSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setSeccionAlumnos([]);
    } finally {
      setLoading(false);
    }
  };

  const searchProfesores = async (e, field) => {
    e.preventDefault();

    const rawValue = profesorSearchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/Profesores/${rawValue.trim()}`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            })
          : await fetch(`${API_URL}/api/Profesores`, {
              headers: {
                Authorization: token ? authHeader : "",
              },
            });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar profesores"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((profesor) => {
              const fieldValue = {
                Id: profesor.Id,
                Nombre: profesor.Nombre,
                Apellido: profesor.Apellido,
                Cedula: profesor.Cedula,
                Sexo: profesor.Sexo,
                Status: profesor.Status,
              }[field];

              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];

      setProfesores(results);
      clearProfesorSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setProfesores([]);
    } finally {
      setLoading(false);
    }
  };

  const searchAsignaturas = async (e, field) => {
    e.preventDefault();

    const rawValue = asignaturaSearchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/Asignaturas/${rawValue.trim()}`, { headers: { Authorization: token ? authHeader : "" } })
          : await fetch(`${API_URL}/api/Asignaturas`, { headers: { Authorization: token ? authHeader : "" } });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar asignaturas"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((a) => {
              const fieldValue = { nombre: a.nombre, status: a.status }[field];
              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];

      setAsignaturas(results);
      clearAsignaturaSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setAsignaturas([]);
    } finally {
      setLoading(false);
    }
  };

  const searchAsignaturaSecciones = async (e, field) => {
    e.preventDefault();

    const rawValue = asignaturaSeccionSearchFields[field] ?? "";
    if (!rawValue.trim()) {
      setMessage("Ingrese un valor para buscar");
      return;
    }

    const query = rawValue.trim().toLowerCase();
    setLoading(true);
    setMessage("");

    try {
      const response =
        field === "id"
          ? await fetch(`${API_URL}/api/AsignaturaSeccion/${rawValue.trim()}`, { headers: { Authorization: token ? authHeader : "" } })
          : await fetch(`${API_URL}/api/AsignaturaSeccion`, { headers: { Authorization: token ? authHeader : "" } });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al buscar asignatura-secciones"));
      }

      const data = await response.json();
      const results =
        field === "id"
          ? [data]
          : Array.isArray(data)
          ? data.filter((s) => {
              const fieldValue = {
                idAsignatura: s.idAsignatura || s.idAsignatura,
                idSeccion: s.idSeccion || s.idSeccion,
                idProfesor: s.idProfesor || s.idProfesor,
                status: s.status,
              }[field];

              return String(fieldValue ?? "").toLowerCase().includes(query);
            })
          : [];

      setAsignaturasSecciones(results);
      clearAsignaturaSeccionSearchFields();
      setMessage(results.length > 0 ? "Resultado encontrado" : "No se encontraron resultados");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setAsignaturasSecciones([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditById = async (e) => {
    e.preventDefault();
    if (!editSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/Alumnos/${editSearchId}`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Alumno no encontrado"));
      }

      const data = await response.json();
      setEditSearchId("");
      handleEdit(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditCursoById = async (e) => {
    e.preventDefault();
    if (!editCursoSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/Cursos/${editCursoSearchId}`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Curso no encontrado"));
      }

      const data = await response.json();
      setEditCursoSearchId("");
      handleEditCurso(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditSeccionById = async (e) => {
    e.preventDefault();
    if (!editSeccionSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/Secciones/${editSeccionSearchId}`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Sección no encontrada"));
      }

      const data = await response.json();
      setEditSeccionSearchId("");
      handleEditSeccion(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditSeccionAlumnosById = async (e) => {
    e.preventDefault();
    if (!editSeccionAlumnosSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/SeccionAlumnos/${editSeccionAlumnosSearchId}`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Sección-Alumno no encontrada"));
      }

      const data = await response.json();
      setEditSeccionAlumnosSearchId("");
      handleEditSeccionAlumnos(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditProfesorById = async (e) => {
    e.preventDefault();
    if (!editProfesorSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_URL}/api/Profesores/${editProfesorSearchId}`, {
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Profesor no encontrado"));
      }

      const data = await response.json();
      setEditProfesorSearchId("");
      handleEditProfesor(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditAsignaturaById = async (e) => {
    e.preventDefault();
    if (!editAsignaturaSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/Asignaturas/${editAsignaturaSearchId}`, {
        headers: { Authorization: token ? authHeader : "" },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Asignatura no encontrada"));
      }

      const data = await response.json();
      setEditAsignaturaSearchId("");
      handleEditAsignatura(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchEditAsignaturaSeccionById = async (e) => {
    e.preventDefault();
    if (!editAsignaturaSeccionSearchId.trim()) {
      setMessage("Ingrese un ID válido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/AsignaturaSeccion/${editAsignaturaSeccionSearchId}`, {
        headers: { Authorization: token ? authHeader : "" },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Asignatura-Sección no encontrada"));
      }

      const data = await response.json();
      setEditAsignaturaSeccionSearchId("");
      handleEditAsignaturaSeccion(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingId ? `${API_URL}/api/Alumnos/${editingId}` : `${API_URL}/api/Alumnos`;
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? {
            id: editingId,
            nombre: formData.nombre,
            apellido: formData.apellido,
            sexo: formData.sexo,
            fechaNacimiento: formData.fechaNacimiento,
            numeroIdentificacion: formData.numeroIdentificacion,
            status: formData.status,
            createdBy: formData.createdBy || dashboardUser.trim(),
            createdAt: formData.createdAt || new Date().toISOString(),
          }
        : {
            nombre: formData.nombre,
            apellido: formData.apellido,
            sexo: formData.sexo,
            fechaNacimiento: formData.fechaNacimiento,
            numeroIdentificacion: formData.numeroIdentificacion,
            status: formData.status,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingId ? "actualizar" : "crear"} alumno`));
      }

      setMessage(`Alumno ${editingId ? "actualizado" : "creado"} correctamente`);
      setFormData({ nombre: "", apellido: "", sexo: "M", fechaNacimiento: "", numeroIdentificacion: "", status: "Activo", createdBy: "", createdAt: "" });
      setEditingId(null);
      await fetchAlumnos();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCurso = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingCursoId ? `${API_URL}/api/Cursos/${editingCursoId}` : `${API_URL}/api/Cursos`;
      const method = editingCursoId ? "PUT" : "POST";
      const body = editingCursoId
        ? {
            id: editingCursoId,
            nombre: cursoFormData.nombre,
            anio: cursoFormData.anio,
            status: cursoFormData.status,
            createdBy: cursoFormData.createdBy || dashboardUser.trim(),
            createdAt: cursoFormData.createdAt || new Date().toISOString(),
          }
        : {
            nombre: cursoFormData.nombre,
            anio: cursoFormData.anio,
            status: cursoFormData.status,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingCursoId ? "actualizar" : "crear"} curso`));
      }

      setMessage(`Curso ${editingCursoId ? "actualizado" : "creado"} correctamente`);
      setCursoFormData({ nombre: "", anio: "", status: "Activo", createdBy: "", createdAt: "" });
      setEditingCursoId(null);
      await fetchCursos();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSeccion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingSeccionId ? `${API_URL}/api/Secciones/${editingSeccionId}` : `${API_URL}/api/Secciones`;
      const method = editingSeccionId ? "PUT" : "POST";
      const body = editingSeccionId
        ? {
          id: editingSeccionId,
          IdCurso: seccionFormData.idCurso,
          IdProfesorEncargado: seccionFormData.idProfesorEncargado,
          Nombre: seccionFormData.nombre,
          FechaInicio: seccionFormData.fechaInicio,
          FechaFin: seccionFormData.fechaFin,
          Status: seccionFormData.status,
          createdBy: seccionFormData.createdBy || dashboardUser.trim(),
          createdAt: seccionFormData.createdAt || new Date().toISOString()
        }
      : {
          IdCurso: seccionFormData.idCurso,
          IdProfesorEncargado: seccionFormData.idProfesorEncargado,
          Nombre: seccionFormData.nombre,
          FechaInicio: seccionFormData.fechaInicio,
          FechaFin: seccionFormData.fechaFin,
          Status: seccionFormData.status
        };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingSeccionId ? "actualizar" : "crear"} sección`));
      }

      setMessage(`Sección ${editingSeccionId ? "actualizada" : "creada"} correctamente`);
      setSeccionFormData({ IdCurso: "", IdProfesorEncargado: "", Nombre: "", FechaInicio: "", FechaFin: "", Status: "", createdBy: "", createdAt: "" });
      setEditingSeccionId(null);
      await fetchSecciones();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSeccionAlumnos = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingSeccionAlumnosId ? `${API_URL}/api/SeccionAlumnos/${editingSeccionAlumnosId}` : `${API_URL}/api/SeccionAlumnos`;
      const method = editingSeccionAlumnosId ? "PUT" : "POST";
      const body = editingSeccionAlumnosId
        ? {
          id: editingSeccionAlumnosId,
          IdSeccion: seccionAlumnosFormData.idSeccion,
          IdAlumno: seccionAlumnosFormData.idAlumno,
          Status: seccionAlumnosFormData.status,
          createdBy: seccionAlumnosFormData.createdBy || dashboardUser.trim(),
          createdAt: seccionAlumnosFormData.createdAt || new Date().toISOString()
        }
      : {
          IdSeccion: seccionAlumnosFormData.idSeccion,
          IdAlumno: seccionAlumnosFormData.idAlumno,
          Status: seccionAlumnosFormData.status
        };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingSeccionAlumnosId ? "actualizar" : "crear"} sección-alumno`));
      }

      setMessage(`Sección-Alumno ${editingSeccionAlumnosId ? "actualizada" : "creada"} correctamente`);
      setSeccionAlumnosFormData({ idSeccion: "", idAlumno: "", status: "", createdBy: "", createdAt: "" });
      setEditingSeccionAlumnosId(null);
      await fetchSeccionAlumnos();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfesor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingProfesorId ? `${API_URL}/api/Profesores/${editingProfesorId}` : `${API_URL}/api/Profesores`;
      const method = editingProfesorId ? "PUT" : "POST";
      const body = editingProfesorId
        ? {
          id: editingProfesorId,
          Nombre: profesorFormData.nombre,
          Apellido: profesorFormData.apellido,
          Sexo: profesorFormData.sexo,
          Cedula: profesorFormData.cedula,
          Status: profesorFormData.status,
          createdBy: profesorFormData.createdBy || dashboardUser.trim(),
          createdAt: profesorFormData.createdAt || new Date().toISOString()
        }
      : {
          Nombre: profesorFormData.nombre,
          Apellido: profesorFormData.apellido,
          Sexo: profesorFormData.sexo,
          Cedula: profesorFormData.cedula,
          Status: profesorFormData.status
        };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingProfesorId ? "actualizar" : "crear"} profesor`));
      }

      setMessage(`Profesor ${editingProfesorId ? "actualizado" : "creado"} correctamente`);
      setProfesorFormData({ nombre: "", apellido: "", sexo: "", cedula: "", status: "", createdBy: "", createdAt: "" });
      setEditingProfesorId(null);
      await fetchProfesores();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAsignatura = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingAsignaturaId ? `${API_URL}/api/Asignaturas/${editingAsignaturaId}` : `${API_URL}/api/Asignaturas`;
      const method = editingAsignaturaId ? "PUT" : "POST";
      const body = editingAsignaturaId
        ? {
            id: editingAsignaturaId,
            nombre: asignaturaFormData.nombre,
            status: asignaturaFormData.status,
            createdBy: asignaturaFormData.createdBy || dashboardUser.trim(),
            createdAt: asignaturaFormData.createdAt || new Date().toISOString(),
          }
        : {
            nombre: asignaturaFormData.nombre,
            status: asignaturaFormData.status,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingAsignaturaId ? "actualizar" : "crear"} asignatura`));
      }

      setMessage(`Asignatura ${editingAsignaturaId ? "actualizada" : "creada"} correctamente`);
      setAsignaturaFormData({ id: "", nombre: "", status: "Activo", createdBy: "", createdAt: "" });
      setEditingAsignaturaId(null);
      await fetchAsignaturas();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAsignaturaSeccion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editingAsignaturaSeccionId ? `${API_URL}/api/AsignaturaSeccion/${editingAsignaturaSeccionId}` : `${API_URL}/api/AsignaturaSeccion`;
      const method = editingAsignaturaSeccionId ? "PUT" : "POST";
      const body = editingAsignaturaSeccionId
        ? {
            id: editingAsignaturaSeccionId,
            idAsignatura: asignaturaSeccionFormData.idAsignatura,
            idSeccion: asignaturaSeccionFormData.idSeccion,
            idProfesor: asignaturaSeccionFormData.idProfesor,
            status: asignaturaSeccionFormData.status,
            createdBy: asignaturaSeccionFormData.createdBy || dashboardUser.trim(),
            createdAt: asignaturaSeccionFormData.createdAt || new Date().toISOString(),
          }
        : {
            idAsignatura: asignaturaSeccionFormData.idAsignatura,
            idSeccion: asignaturaSeccionFormData.idSeccion,
            idProfesor: asignaturaSeccionFormData.idProfesor,
            status: asignaturaSeccionFormData.status,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? authHeader : "",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, `Error al ${editingAsignaturaSeccionId ? "actualizar" : "crear"} asignatura-sección`));
      }

      setMessage(`Asignatura-Sección ${editingAsignaturaSeccionId ? "actualizada" : "creada"} correctamente`);
      setAsignaturaSeccionFormData({ idAsignatura: "", idSeccion: "", idProfesor: "", status: "Activo", createdBy: "", createdAt: "" });
      setEditingAsignaturaSeccionId(null);
      await fetchAsignaturasSecciones();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Alumnos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar alumno"));
      }

      setMessage("Alumno eliminado correctamente");
      setAlumnoToDelete(null);
      await fetchAlumnos();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCurso = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Cursos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar curso"));
      }

      setMessage("Curso eliminado correctamente");
      setCursoToDelete(null);
      await fetchCursos();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeccion = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Secciones/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar sección"));
      }

      setMessage("Sección eliminada correctamente");
      setSeccionToDelete(null);
      await fetchSecciones();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeccionAlumnos = async (id) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/SeccionAlumnos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar sección-alumno"));
      }

      setMessage("Sección-Alumno eliminada correctamente");
      setSeccionAlumnosToDelete(null);
      await fetchSeccionAlumnos();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfesor = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Profesores/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? authHeader : "",
        },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar profesor"));
      }

      setMessage("Profesor eliminado correctamente");
      setProfesorToDelete(null);
      await fetchProfesores();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsignatura = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/Asignaturas/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? authHeader : "" },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar asignatura"));
      }

      setMessage("Asignatura eliminada correctamente");
      setAsignaturaToDelete(null);
      await fetchAsignaturas();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsignaturaSeccion = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/AsignaturaSeccion/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? authHeader : "" },
      });

      if (!response.ok) {
        throw new Error(await getApiError(response, "Error al eliminar asignatura-sección"));
      }

      setMessage("Asignatura-Sección eliminada correctamente");
      setAsignaturaSeccionToDelete(null);
      await fetchAsignaturasSecciones();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (alumno) => {
    setFormData({
      nombre: alumno.nombre || "",
      apellido: alumno.apellido || "",
      sexo: alumno.sexo || "M",
      fechaNacimiento: alumno.fechaNacimiento ? alumno.fechaNacimiento.split("T")[0] : "",
      numeroIdentificacion: alumno.numeroIdentificacion || "",
      status: alumno.status || "Activo",
      createdBy: alumno.createdBy || "",
      createdAt: alumno.createdAt || ""
    });
    setEditingId(alumno.id);
    setActiveSection("crear");
  };

  const handleEditCurso = (curso) => {
    setCursoFormData({
      nombre: curso.nombre || "",
      anio: curso.anio || "",
      status: curso.status || "Activo",
      createdBy: curso.createdBy || "",
      createdAt: curso.createdAt || ""
    });
    setEditingCursoId(curso.id);
    setActiveSection("crearCurso");
  };

  const handleEditSeccion = (seccion) => {
    setSeccionFormData({
      IdCurso: seccion.IdCurso || "",
      IdProfesorEncargado: seccion.IdProfesorEncargado || "",
      Nombre: seccion.Nombre || "",
      FechaInicio: seccion.FechaInicio ? seccion.FechaInicio.split("T")[0] : "",
      FechaFin: seccion.FechaFin ? seccion.FechaFin.split("T")[0] : "",
      Status: seccion.Status || "",
      createdBy: seccion.createdBy || "",
      createdAt: seccion.createdAt || ""
    });
    setEditingSeccionId(seccion.id);
    setActiveSection("crearSeccion");
  };

  const handleEditSeccionAlumnos = (seccionAlumno) => {
    setSeccionAlumnosFormData({
      IdSeccion: seccionAlumno.IdSeccion || "",
      IdAlumno: seccionAlumno.IdAlumno || "",
      Status: seccionAlumno.Status || "",
      createdBy: seccionAlumno.createdBy || "",
      createdAt: seccionAlumno.createdAt || ""
    });
    setEditingSeccionAlumnosId(seccionAlumno.id);
    setActiveSection("crearSeccionAlumnos");
  }

  const handleEditProfesor = (profesor) => {
    setProfesorFormData({
      nombre: profesor.Nombre || "",
      apellido: profesor.Apellido || "",
      sexo: profesor.Sexo || "",
      cedula: profesor.Cedula || "",
      status: profesor.Status || "",
      createdBy: profesor.createdBy || "",
      createdAt: profesor.createdAt || ""
    });
    setEditingProfesorId(profesor.Id);
    setActiveSection("crearProfesor");
  };

  const handleEditAsignatura = (asignatura) => {
    setAsignaturaFormData({
      id: asignatura.id || "",
      nombre: asignatura.nombre || "",
      status: asignatura.status || "Activo",
      createdBy: asignatura.createdBy || "",
      createdAt: asignatura.createdAt || "",
    });
    setEditingAsignaturaId(asignatura.id);
    setActiveSection("crearAsignatura");
  };

  const handleEditAsignaturaSeccion = (item) => {
    setAsignaturaSeccionFormData({
      id: item.id || "",
      idAsignatura: item.idAsignatura || item.idAsignatura || "",
      idSeccion: item.idSeccion || item.idSeccion || "",
      idProfesor: item.idProfesor || item.idProfesor || "",
      status: item.status || "Activo",
      createdBy: item.createdBy || "",
      createdAt: item.createdAt || "",
    });
    setEditingAsignaturaSeccionId(item.id);
    setActiveSection("crearAsignaturaSeccion");
  };

  const resetForm = () => {
    setFormData({ nombre: "", apellido: "", sexo: "M", fechaNacimiento: "", numeroIdentificacion: "", status: "Activo", createdAt: "" });
    setEditingId(null);
    setEditSearchId("");
  };

  const resetCursoForm = () => {
    setCursoFormData({ nombre: "", anio: "", status: "Activo", createdAt: "" });
    setEditingCursoId(null);
    setEditCursoSearchId("");
  };

  const resetSeccionForm = () => {
    setSeccionFormData({ IdCurso: "", IdProfesorEncargado: "", Nombre: "", FechaInicio: "", FechaFin: "", Status: "" });
    setEditingSeccionId(null);
    setEditSeccionSearchId("");
  };

  const resetSeccionAlumnosForm = () => {
    setSeccionAlumnosFormData({ IdSeccion: "", IdAlumno: "", Status: "" });
    setEditingSeccionAlumnosId(null);
    setEditSeccionAlumnosSearchId("");
  };

  const resetProfesorForm = () => {
    setProfesorFormData({ nombre: "", apellido: "", sexo: "", cedula: "", status: "" });
    setEditingProfesorId(null);
    setEditProfesorSearchId("");
  };

  const resetAsignaturaForm = () => {
    setAsignaturaFormData({ id: "", nombre: "", status: "Activo", createdBy: "", createdAt: "" });
    setEditingAsignaturaId(null);
    setEditAsignaturaSearchId("");
  };

  const resetAsignaturaSeccionForm = () => {
    setAsignaturaSeccionFormData({ id: "", idAsignatura: "", idSeccion: "", idProfesor: "", status: "Activo", createdBy: "", createdAt: "" });
    setEditingAsignaturaSeccionId(null);
    setEditAsignaturaSeccionSearchId("");
  };

  const handleDashboardUserChange = (value) => {
    setDashboardUser(value);

    if (value.trim()) {
      localStorage.setItem("loginUsername", value.trim());
      return;
    }

    localStorage.removeItem("loginUsername");
    setActiveSection(null);
    setAlumnos([]);
    setCursos([]);
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  const buttonStyle = {
    padding: "12px 24px",
    margin: "8px",
    backgroundColor: "#333333",
    color: "#e0e0e0",
    border: "1px solid #555555",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    minWidth: "120px",
    transition: "background-color 0.2s"
  };

  const sectionsDisabled = !dashboardUser.trim();
  const sectionButtonStyle = {
    ...buttonStyle,
    opacity: sectionsDisabled ? 0.5 : 1,
    cursor: sectionsDisabled ? "not-allowed" : "pointer"
  };

  const sectionStyle = {
    border: "1px solid #444444",
    borderRadius: "4px",
    padding: "20px",
    marginTop: "20px",
    backgroundColor: "#2a2a2a",
    color: "#e0e0e0"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #444444",
    borderRadius: "4px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#333333",
    color: "#e0e0e0"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#ffffff"
  };

  return (
    <main style={{
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#1a1a1a",
      color: "#e0e0e0",
      minHeight: "100vh"
    }}>
      <h1 style={{
        fontSize: "48px",
        textAlign: "center",
        marginBottom: "40px",
        color: "#ffffff",
        marginTop: "0"
      }}>Dashboard</h1>

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Usuario</h2>
        <div style={{ maxWidth: "500px" }}>
          <label style={labelStyle}>Usuario:</label>
          <input
            type="text"
            value={dashboardUser}
            onChange={(e) => handleDashboardUserChange(e.target.value)}
            placeholder="Ingrese el usuario que llenará CreatedBy"
            style={inputStyle}
          />
          {sectionsDisabled && (
            <p style={{ color: "#ffcc66", marginTop: 0 }}>
              Debe llenar el usuario antes de abrir una sección.
            </p>
          )}
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Alumnos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("ver");
              resetForm();
              fetchAlumnos();
            }}
            style={sectionButtonStyle}
          >
            Ver
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("buscar");
              resetForm();
              setAlumnos([]);
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("crear");
              resetForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("editar");
              resetForm();
              setAlumnos([]);
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("eliminar");
              resetForm();
              fetchAlumnos();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Cursos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("verCursos");
              resetCursoForm();
              fetchCursos();
            }}
            style={sectionButtonStyle}
          >
            Ver
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("buscarCursos");
              resetCursoForm();
              setCursos([]);
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("crearCurso");
              resetCursoForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("editarCurso");
              resetCursoForm();
              setCursos([]);
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("eliminarCurso");
              resetCursoForm();
              fetchCursos();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      {message && (
        <div style={{
          padding: "12px",
          marginTop: "15px",
          backgroundColor: message.includes("Error") ? "#3d2020" : "#203d20",
          border: `1px solid ${message.includes("Error") ? "#cc6666" : "#66cc66"}`,
          borderRadius: "4px",
          color: message.includes("Error") ? "#ff9999" : "#99ff99"
        }}>
          {message}
        </div>
      )}

      {activeSection === "ver" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Todos los Alumnos</h2>
          {loading ? (
            <p style={{ color: "#e0e0e0" }}>Cargando...</p>
          ) : alumnos.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No hay alumnos</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Apellido</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Identificación</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Sexo</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Fecha de Nacimiento</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0", wordBreak: "break-all" }}>{alumno.id}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.apellido}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.numeroIdentificacion }</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.sexo}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.fechaNacimiento ? new Date(alumno.fechaNacimiento).toLocaleDateString() : ""}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.createdAt ? new Date(alumno.createdAt).toLocaleString() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "buscar" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar Alumno</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchAlumnos(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input
                type="text"
                value={searchFields.id}
                onChange={(e) => updateSearchField("id", e.target.value)}
                placeholder="ID completo del alumno"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar ID
              </button>
            </form>

            <form onSubmit={(e) => searchAlumnos(e, "nombre")}>
              <label style={labelStyle}>Buscar por nombre:</label>
              <input
                type="text"
                value={searchFields.nombre}
                onChange={(e) => updateSearchField("nombre", e.target.value)}
                placeholder="Nombre"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar nombre
              </button>
            </form>

            <form onSubmit={(e) => searchAlumnos(e, "apellido")}>
              <label style={labelStyle}>Buscar por apellido:</label>
              <input
                type="text"
                value={searchFields.apellido}
                onChange={(e) => updateSearchField("apellido", e.target.value)}
                placeholder="Apellido"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar apellido
              </button>
            </form>

            <form onSubmit={(e) => searchAlumnos(e, "identificacion")}>
              <label style={labelStyle}>Buscar por identificación:</label>
              <input
                type="text"
                value={searchFields.identificacion}
                onChange={(e) => updateSearchField("identificacion", e.target.value)}
                placeholder="Número de identificación"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar identificación
              </button>
            </form>

            <form onSubmit={(e) => searchAlumnos(e, "sexo")}>
              <label style={labelStyle}>Buscar por sexo:</label>
              <select
                value={searchFields.sexo}
                onChange={(e) => updateSearchField("sexo", e.target.value)}
                style={inputStyle}
              >
                <option value="">Seleccione sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar sexo
              </button>
            </form>

            <form onSubmit={(e) => searchAlumnos(e, "status")}>
              <label style={labelStyle}>Buscar por estado:</label>
              <select
                value={searchFields.status}
                onChange={(e) => updateSearchField("status", e.target.value)}
                style={inputStyle}
              >
                <option value="">Seleccione estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar estado
              </button>
            </form>
          </div>
          {alumnos.length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #444444", padding: "15px", borderRadius: "4px", backgroundColor: "#333333" }}>
              {alumnos.map((alumno) => (
                <div key={alumno.id} style={{ color: "#e0e0e0", wordBreak: "break-word" }}>
                  <p><strong style={{ color: "#ffffff" }}>ID:</strong> {alumno.id}</p>
                  <p><strong style={{ color: "#ffffff" }}>Nombre:</strong> {alumno.nombre}</p>
                  <p><strong style={{ color: "#ffffff" }}>Apellido:</strong> {alumno.apellido}</p>
                  <p><strong style={{ color: "#ffffff" }}>Identificación:</strong> {alumno.numeroIdentificacion}</p>
                  <p><strong style={{ color: "#ffffff" }}>Sexo:</strong> {alumno.sexo}</p>
                  <p><strong style={{ color: "#ffffff" }}>Fecha de Nacimiento:</strong> {alumno.fechaNacimiento ? new Date(alumno.fechaNacimiento).toLocaleDateString() : "-"}</p>
                  <p><strong style={{ color: "#ffffff" }}>CreatedBy:</strong> {alumno.createdBy}</p>
                  <p><strong style={{ color: "#ffffff" }}>CreatedAt:</strong> {alumno.createdAt ? new Date(alumno.createdAt).toLocaleString() : "-"}</p>
                  <p><strong style={{ color: "#ffffff" }}>Estado:</strong> {alumno.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "crear" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>{editingId ? "Editar Alumno" : "Crear Nuevo Alumno"}</h2>
          <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Nombre:</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Apellido:</label>
              <input
                type="text"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Sexo:</label>
              <select
                value={formData.sexo}
                onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="M" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Masculino</option>
                <option value="F" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Femenino</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Fecha de Nacimiento:</label>
              <input
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Número de Identificación:</label>
              <input
                type="text"
                value={formData.numeroIdentificacion}
                onChange={(e) => setFormData({ ...formData, numeroIdentificacion: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="Activo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Activo</option>
                <option value="Inactivo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Inactivo</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Creado por:</label>
              <input
                type="text"
                value={formData.createdBy}
                onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
                placeholder="Usuario que creó el registro"
                style={inputStyle}
              />
            </div>
            {formData.createdAt && (
              <div>
                <label style={labelStyle}>Creado en:</label>
                <input type="text" value={formData.createdAt ? new Date(formData.createdAt).toLocaleString() : ""} disabled style={inputStyle} />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#28a745",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {editingId ? "Actualizar" : "Crear"}
            </button>
          </form>
        </div>
      )}

      {activeSection === "editar" && !editingId && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar Alumno</h2>
          <form onSubmit={fetchEditById} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>ID del Alumno:</label>
              <input
                type="text"
                value={editSearchId}
                onChange={(e) => setEditSearchId(e.target.value)}
                placeholder="Ingrese el ID del alumno a editar"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#0066cc",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              Buscar para editar
            </button>
          </form>
        </div>
      )}

      {activeSection === "eliminar" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar Alumno</h2>
          {alumnos.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando alumnos...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione un alumno para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Apellido</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Número de identificación</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Sexo</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Fecha de nacimiento</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.id}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{alumno.apellido}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0", textAlign: "center" }}>{alumno.numeroIdentificacion}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0", textAlign: "center" }}>{alumno.sexo}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0", textAlign: "center" }}>{alumno.fechaNacimiento ? new Date(alumno.fechaNacimiento).toLocaleDateString() : ""}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0", textAlign: "center" }}>{alumno.status}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button
                          onClick={() => setAlumnoToDelete(alumno)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#cc0000",
                            color: "#e0e0e0",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer"
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {alumnoToDelete && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#4d2626",
              border: "1px solid #cc6666",
              borderRadius: "4px",
              color: "#ff9999"
            }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación del alumno:</strong></p>
                <p><strong>Nombre:</strong> {alumnoToDelete.nombre}</p>
                <p><strong>Apellido:</strong> {alumnoToDelete.apellido}</p>
                <p><strong>Identificación:</strong> {alumnoToDelete.numeroIdentificacion}</p>
                <p><strong>Sexo:</strong> {alumnoToDelete.sexo}</p>
                <p><strong>Fecha de Nacimiento:</strong> {alumnoToDelete.fechaNacimiento ? new Date(alumnoToDelete.fechaNacimiento).toLocaleDateString() : "-"}</p>
                <p><strong>Creado por:</strong> {alumnoToDelete.createdBy}</p>
                <p><strong>Estado:</strong> {alumnoToDelete.status}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDelete(alumnoToDelete.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    marginRight: "10px",
                    backgroundColor: "#cc0000",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  Confirmar Eliminación
                </button>
                <button
                  onClick={() => setAlumnoToDelete(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#555555",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Secciones</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("VerSecciones");
              resetSeccionForm();
              fetchSecciones();
            }}
            style={sectionButtonStyle}
          >
            Ver
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("BuscarSecciones");
              resetSeccionForm();
              setSecciones([]);
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("crearSeccion");
              resetSeccionForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("editarSeccion");
              resetSeccionForm();
              setSecciones([]);
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("eliminarSeccion");
              resetSeccionForm();
              fetchSecciones();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      {activeSection === "verCursos" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Todos los Cursos</h2>
          {loading ? (
            <p style={{ color: "#e0e0e0" }}>Cargando...</p>
          ) : cursos.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No hay cursos</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Año</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((curso) => (
                    <tr key={curso.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0", wordBreak: "break-all" }}>{curso.id}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.anio}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{new Date(curso.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "buscarCursos" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar Curso</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchCursos(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input
                type="text"
                value={cursoSearchFields.id}
                onChange={(e) => updateCursoSearchField("id", e.target.value)}
                placeholder="ID completo del curso"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar ID
              </button>
            </form>

            <form onSubmit={(e) => searchCursos(e, "nombre")}>
              <label style={labelStyle}>Buscar por nombre:</label>
              <input
                type="text"
                value={cursoSearchFields.nombre}
                onChange={(e) => updateCursoSearchField("nombre", e.target.value)}
                placeholder="Nombre del curso"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar nombre
              </button>
            </form>

            <form onSubmit={(e) => searchCursos(e, "anio")}>
              <label style={labelStyle}>Buscar por año:</label>
              <input
                type="text"
                value={cursoSearchFields.anio}
                onChange={(e) => updateCursoSearchField("anio", e.target.value)}
                placeholder="Año del curso"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar año
              </button>
            </form>
          </div>
          {cursos.length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #444444", padding: "15px", borderRadius: "4px", backgroundColor: "#333333" }}>
              {cursos.map((curso) => (
                <div key={curso.id} style={{ color: "#e0e0e0", wordBreak: "break-word" }}>
                  <p><strong style={{ color: "#ffffff" }}>ID:</strong> {curso.id}</p>
                  <p><strong style={{ color: "#ffffff" }}>Nombre:</strong> {curso.nombre}</p>
                  <p><strong style={{ color: "#ffffff" }}>Año:</strong> {curso.anio}</p>
                  <p><strong style={{ color: "#ffffff" }}>Estado:</strong> {curso.status}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado por:</strong> {curso.createdBy}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado en:</strong> {new Date(curso.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "crearCurso" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>{editingCursoId ? "Editar Curso" : "Crear Nuevo Curso"}</h2>
          <form onSubmit={handleSubmitCurso} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Nombre:</label>
              <input
                type="text"
                value={cursoFormData.nombre}
                onChange={(e) => setCursoFormData({ ...cursoFormData, nombre: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Año:</label>
              <input
                type="text"
                value={cursoFormData.anio}
                onChange={(e) => setCursoFormData({ ...cursoFormData, anio: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select
                value={cursoFormData.status}
                onChange={(e) => setCursoFormData({ ...cursoFormData, status: e.target.value })}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="Activo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Activo</option>
                <option value="Inactivo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Inactivo</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#28a745",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {editingCursoId ? "Actualizar" : "Crear"}
            </button>
          </form>
        </div>
      )}

      {activeSection === "editarCurso" && !editingCursoId && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar Curso</h2>
          <form onSubmit={fetchEditCursoById} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>ID del Curso:</label>
              <input
                type="text"
                value={editCursoSearchId}
                onChange={(e) => setEditCursoSearchId(e.target.value)}
                placeholder="Ingrese el ID del curso a editar"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Nombre del Curso:</label>
              <input
                type="text"
                value={editCursoSearchNombre}
                onChange={(e) => setEditCursoSearchNombre(e.target.value)}
                placeholder="Ingrese el nombre del curso a editar"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Año del Curso:</label>
              <input
                type="text"
                value={editCursoSearchAnio}
                onChange={(e) => setEditCursoSearchAnio(e.target.value)}
                placeholder="Ingrese el año del curso a editar"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select
                value={editCursoSearchStatus}
                onChange={(e) => setEditCursoSearchStatus(e.target.value)}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="Activo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Activo</option>
                <option value="Inactivo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Inactivo</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#0066cc",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              Buscar para editar
            </button>
          </form>
        </div>
      )}

      {activeSection === "eliminarCurso" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar Curso</h2>
          {cursos.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando cursos...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione un curso para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Año</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((curso) => (
                    <tr key={curso.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.anio}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.status}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button
                          onClick={() => setCursoToDelete(curso)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#cc0000",
                            color: "#e0e0e0",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer"
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {cursoToDelete && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#4d2626",
              border: "1px solid #cc6666",
              borderRadius: "4px",
              color: "#ff9999"
            }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación del curso:</strong></p>
                <p><strong>Nombre:</strong> {cursoToDelete.nombre}</p>
                <p><strong>Año:</strong> {cursoToDelete.anio}</p>
                <p><strong>Estado:</strong> {cursoToDelete.status}</p>
                <p><strong>Creado por:</strong> {cursoToDelete.createdBy}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDeleteCurso(cursoToDelete.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    marginRight: "10px",
                    backgroundColor: "#cc0000",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  Confirmar Eliminación
                </button>
                <button
                  onClick={() => setCursoToDelete(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#555555",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Secciones</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("VerSecciones");
              resetSeccionForm();
              fetchSecciones();
            }}
            style={sectionButtonStyle}
          >
            Ver
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("BuscarSecciones");
              resetSeccionForm();
              setSecciones([]);
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("crearSeccion");
              resetSeccionForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("editarSeccion");
              resetSeccionForm();
              setSecciones([]);
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("eliminarSeccion");
              resetSeccionForm();
              fetchSecciones();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      {activeSection === "VerSecciones" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Secciones</h2>
          {loading ? (
            <p style={{ color: "#e0e0e0" }}>Cargando...</p>
          ) : secciones.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No hay secciones</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdCurso</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdProfesor</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>FechaInicio</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>FechaFin</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {secciones.map((seccion) => (
                    <tr key={seccion.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0", wordBreak: "break-all" }}>{seccion.id}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.idCurso}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.idProfesorEncargado}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.fechaInicio ? new Date(seccion.fechaInicio).toLocaleDateString() : ""}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.fechaFin ? new Date(seccion.fechaFin).toLocaleDateString() : ""}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.createdAt ? new Date(seccion.createdAt).toLocaleString() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "BuscarSecciones" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar Sección</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchSecciones(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input
                type="text"
                value={seccionSearchFields.id}
                onChange={(e) => updateSeccionSearchField("id", e.target.value)}
                placeholder="ID completo de la sección"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar ID
              </button>
            </form>

            <form onSubmit={(e) => searchSecciones(e, "nombre")}>
              <label style={labelStyle}>Buscar por nombre:</label>
              <input
                type="text"
                value={seccionSearchFields.nombre}
                onChange={(e) => updateSeccionSearchField("nombre", e.target.value)}
                placeholder="Nombre de la sección"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar nombre
              </button>
            </form>

            <form onSubmit={(e) => searchSecciones(e, "curso")}>
              <label style={labelStyle}>Buscar por curso:</label>
              <input
                type="text"
                value={seccionSearchFields.curso}
                onChange={(e) => updateSeccionSearchField("curso", e.target.value)}
                placeholder="Nombre del curso"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar curso
              </button>
            </form>

            <form onSubmit={(e) => searchSecciones(e, "anio")}>
              <label style={labelStyle}>Buscar por año:</label>
              <input
                type="text"
                value={seccionSearchFields.anio}
                onChange={(e) => updateSeccionSearchField("anio", e.target.value)}
                placeholder="Año de la sección"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar año
              </button>
            </form>
          </div>
          {secciones.length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #444444", padding: "15px", borderRadius: "4px", backgroundColor: "#333333" }}>
              {secciones.map((seccion) => (
                <div key={seccion.id} style={{ color: "#e0e0e0", wordBreak: "break-word" }}>
                  <p><strong style={{ color: "#ffffff" }}>ID:</strong> {seccion.id}</p>
                  <p><strong style={{ color: "#ffffff" }}>IdCurso:</strong> {seccion.IdCurso}</p>
                  <p><strong style={{ color: "#ffffff" }}>IdProfesorEncargado:</strong> {seccion.IdProfesorEncargado}</p>
                  <p><strong style={{ color: "#ffffff" }}>Nombre:</strong> {seccion.Nombre}</p>
                  <p><strong style={{ color: "#ffffff" }}>FechaInicio:</strong> {seccion.FechaInicio ? new Date(seccion.FechaInicio).toLocaleDateString() : ""}</p>
                  <p><strong style={{ color: "#ffffff" }}>FechaFin:</strong> {seccion.FechaFin ? new Date(seccion.FechaFin).toLocaleDateString() : ""}</p>
                  <p><strong style={{ color: "#ffffff" }}>Estado:</strong> {seccion.Status}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado por:</strong> {seccion.createdBy}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado en:</strong> {seccion.createdAt ? new Date(seccion.createdAt).toLocaleString() : ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "crearSeccion" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>{editingSeccionId ? "Editar Sección" : "Crear Nueva Sección"}</h2>
          <form onSubmit={handleSubmitSeccion} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Nombre:</label>
              <input
                type="text"
                value={seccionFormData.nombre}
                onChange={(e) => setSeccionFormData({ ...seccionFormData, nombre: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle}>Curso:</label>
              <input
                type="text"
                value={seccionFormData.cursoNombre}
                onChange={(e) => setSeccionFormData({ ...seccionFormData, cursoNombre: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Año:</label>
              <input
                type="text"
                value={seccionFormData.anio}
                onChange={(e) => setSeccionFormData({ ...seccionFormData, anio: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select
                value={seccionFormData.status}
                onChange={(e) => setSeccionFormData({ ...seccionFormData, status: e.target.value })}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="Activo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Activo</option>
                <option value="Inactivo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Inactivo</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#28a745",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {editingSeccionId ? "Actualizar" : "Crear"}
            </button>
          </form>
        </div>
      )}

      {activeSection === "editarSeccion" && !editingSeccionId && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar Sección</h2>
          <form onSubmit={fetchEditSeccionById} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>ID de la Sección:</label>
              <input
                type="text"
                value={editSeccionSearchId}
                onChange={(e) => setEditSeccionSearchId(e.target.value)}
                placeholder="Ingrese el ID de la sección a editar"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#0066cc",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              Buscar para editar
            </button>
          </form>
        </div>
      )}

      {activeSection === "eliminarSeccion" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar Sección</h2>
          {secciones.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando secciones...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione una sección para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Curso perteneciente</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Profesor</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {secciones.map((seccion) => (
                    <tr key={seccion.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.idCurso}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.idProfesorEncargado}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.status}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button
                          onClick={() => setSeccionToDelete(seccion)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#cc0000",
                            color: "#e0e0e0",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer"
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {seccionToDelete && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#4d2626",
              border: "1px solid #cc6666",
              borderRadius: "4px",
              color: "#ff9999"
            }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación de la sección:</strong></p>
                <p><strong>Nombre:</strong> {seccionToDelete.nombre || seccionToDelete.Nombre}</p>
                <p><strong>Curso:</strong> {seccionToDelete.IdCurso || seccionToDelete.idCurso || seccionToDelete.cursoNombre}</p>
                <p><strong>Profesor encargado:</strong> {seccionToDelete.IdProfesorEncargado || seccionToDelete.idProfesorEncargado}</p>
                <p><strong>Fecha inicio:</strong> {seccionToDelete.FechaInicio ? new Date(seccionToDelete.FechaInicio).toLocaleDateString() : seccionToDelete.fechaInicio ? new Date(seccionToDelete.fechaInicio).toLocaleDateString() : "-"}</p>
                <p><strong>Fecha fin:</strong> {seccionToDelete.FechaFin ? new Date(seccionToDelete.FechaFin).toLocaleDateString() : seccionToDelete.fechaFin ? new Date(seccionToDelete.fechaFin).toLocaleDateString() : "-"}</p>
                <p><strong>Estado:</strong> {seccionToDelete.Status || seccionToDelete.status}</p>
                <p><strong>Creado por:</strong> {seccionToDelete.createdBy}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDeleteSeccion(seccionToDelete.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    marginRight: "10px",
                    backgroundColor: "#cc0000",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  Confirmar Eliminación
                </button>
                <button
                  onClick={() => setSeccionToDelete(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#555555",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>SeccionAlumnos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={seccionAlumnosDisabled}
            onClick={() => {
              setActiveSection("VerSeccionAlumnos");
              resetSeccionAlumnoForm();
              fetchSeccionAlumnos();
            }}
            style={sectionButtonStyle}
          >
            ver
          </button>
          <button
            disabled={seccionAlumnosDisabled}
            onClick={() => {
              setActiveSection("BuscarSeccionAlumnos");
              resetSeccionAlumnoForm();
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={seccionAlumnosDisabled}
            onClick={() => {
              setActiveSection("crearSeccionAlumno");
              resetSeccionAlumnoForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={seccionAlumnosDisabled}
            onClick={() => {
              setActiveSection("editarSeccionAlumno");
              resetSeccionAlumnoForm();
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={seccionAlumnosDisabled}
            onClick={() => {
              setActiveSection("eliminarSeccionAlumno");
              resetSeccionAlumnoForm();
              fetchSeccionAlumnos();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      {activeSection === "VerSeccionAlumnos" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Todos los SeccionAlumnos</h2>
          {loading ? (
            <p style={{ color: "#e0e0e0" }}>Cargando...</p>
          ) : seccionAlumnos.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No hay seccionAlumnos</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdSeccion</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdAlumno</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {seccionAlumnos.map((seccionAlumno) => (
                    <tr key={seccionAlumno.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{seccionAlumno.id}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{seccionAlumno.idSeccion}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{seccionAlumno.idAlumno}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{seccionAlumno.creadoPor}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{new Date(seccionAlumno.creadoEn).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "BuscarSeccionAlumnos" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar SeccionAlumno</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchSeccionAlumnos(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input
                type="text"
                value={seccionAlumnoSearchFields.id}
                onChange={(e) => updateSeccionAlumnoSearchField("id", e.target.value)}
                placeholder="ID completo del seccionAlumno"
                style={inputStyle}
              />
            </form>
          </div>
        </div>
      )}
      
      {activeSection === "crearSeccionAlumno" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Crear Nuevo SeccionAlumno</h2>
          <form onSubmit={handleSubmitSeccionAlumno} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Id Sección:</label>
              <input
                type="text"
                value={seccionAlumnoFormData.idSeccion}
                onChange={(e) => setSeccionAlumnoFormData({ ...seccionAlumnoFormData, idSeccion: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Id Alumno:</label>
              <input
                type="text"
                value={seccionAlumnoFormData.idAlumno}
                onChange={(e) => setSeccionAlumnoFormData({ ...seccionAlumnoFormData, idAlumno: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={submitButtonStyle}>
              Crear SeccionAlumno
            </button>
          </form>
        </div>
      )}

      {activeSection === "editarSeccionAlumno" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar SeccionAlumno</h2>
          <form onSubmit={handleEditSeccionAlumno} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Id SeccionAlumno:</label>
              <input
                type="text"
                value={seccionAlumnoFormData.id}
                onChange={(e) => setSeccionAlumnoFormData({ ...seccionAlumnoFormData, id: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Id Sección:</label>
              <input
                type="text"
                value={seccionAlumnoFormData.idSeccion}
                onChange={(e) => setSeccionAlumnoFormData({ ...seccionAlumnoFormData, idSeccion: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Id Alumno:</label>
              <input
                type="text"
                value={seccionAlumnoFormData.idAlumno}
                onChange={(e) => setSeccionAlumnoFormData({ ...seccionAlumnoFormData, idAlumno: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select
                value={seccionAlumnoFormData.status}
                onChange={(e) => setSeccionAlumnoFormData({ ...seccionAlumnoFormData, status: e.target.value })}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="Activo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Activo</option>
                <option value="Inactivo" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Inactivo</option>
              </select>
            </div>
            <button type="submit" style={submitButtonStyle}>
              Actualizar SeccionAlumno
            </button>
          </form>
        </div>
      )}

      {activeSection === "eliminarSeccionAlumno" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar SeccionAlumno</h2>
          {seccionAlumnos.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando seccionAlumnos...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione un seccionAlumno para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdSeccion</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdAlumno</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {seccionAlumnos.map((seccionAlumno) => (
                    <tr key={seccionAlumno.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccionAlumno.idSeccion}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccionAlumno.idAlumno}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccionAlumno.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>
                        <button
                          onClick={() => handleDeleteSeccionAlumno(seccionAlumno.id)}
                          style={deleteButtonStyle}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {seccionAlumnoToDelete && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#4d2626",
              border: "1px solid #cc6666",
              borderRadius: "4px",
              color: "#ff9999"
            }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación de la relación Sección-Alumno:</strong></p>
                <p><strong>IdSeccion:</strong> {seccionAlumnoToDelete.idSeccion || seccionAlumnoToDelete.IdSeccion}</p>
                <p><strong>IdAlumno:</strong> {seccionAlumnoToDelete.idAlumno || seccionAlumnoToDelete.IdAlumno}</p>
                <p><strong>Estado:</strong> {seccionAlumnoToDelete.status || seccionAlumnoToDelete.Status}</p>
                <p><strong>Creado por:</strong> {seccionAlumnoToDelete.createdBy}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDeleteSeccionAlumno(seccionAlumnoToDelete.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    marginRight: "10px",
                    backgroundColor: "#cc0000",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  Confirmar Eliminación
                </button>
                <button
                  onClick={() => setSeccionAlumnoToDelete(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#555555",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      
      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Asignaturas</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("verAsignaturas");
              resetAsignaturaForm();
              fetchAsignaturas();
            }}
            style={sectionButtonStyle}
          >
            Ver
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("buscarAsignaturas");
              resetAsignaturaForm();
              setAsignaturas([]);
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("crearAsignatura");
              resetAsignaturaForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("editarAsignatura");
              resetAsignaturaForm();
              setAsignaturas([]);
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={sectionsDisabled}
            onClick={() => {
              setActiveSection("eliminarAsignatura");
              resetAsignaturaForm();
              fetchAsignaturas();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      {activeSection === "verAsignaturas" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Todas las Asignaturas</h2>
          {loading ? (
            <p style={{ color: "#e0e0e0" }}>Cargando...</p>
          ) : asignaturas.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No hay asignaturas</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturas.map((a) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.id}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.createdAt ? new Date(a.createdAt).toLocaleString() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "buscarAsignaturas" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar Asignatura</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchAsignaturas(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input type="text" value={asignaturaSearchFields.id} onChange={(e) => updateAsignaturaSearchField("id", e.target.value)} placeholder="ID completo" style={inputStyle} />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>Buscar ID</button>
            </form>
            <form onSubmit={(e) => searchAsignaturas(e, "nombre")}>
              <label style={labelStyle}>Buscar por nombre:</label>
              <input type="text" value={asignaturaSearchFields.nombre} onChange={(e) => updateAsignaturaSearchField("nombre", e.target.value)} placeholder="Nombre" style={inputStyle} />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>Buscar nombre</button>
            </form>
            <form onSubmit={(e) => searchAsignaturas(e, "status")}>
              <label style={labelStyle}>Buscar por estado:</label>
              <select value={asignaturaSearchFields.status} onChange={(e) => updateAsignaturaSearchField("status", e.target.value)} style={inputStyle}>
                <option value="">Seleccione estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>Buscar estado</button>
            </form>
          </div>
          {asignaturas.length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #444444", padding: "15px", borderRadius: "4px", backgroundColor: "#333333" }}>
              {asignaturas.map((a) => (
                <div key={a.id} style={{ color: "#e0e0e0", wordBreak: "break-word" }}>
                  <p><strong style={{ color: "#ffffff" }}>ID:</strong> {a.id}</p>
                  <p><strong style={{ color: "#ffffff" }}>Nombre:</strong> {a.nombre}</p>
                  <p><strong style={{ color: "#ffffff" }}>Estado:</strong> {a.status}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado por:</strong> {a.createdBy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "crearAsignatura" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>{editingAsignaturaId ? "Editar Asignatura" : "Crear Nueva Asignatura"}</h2>
          <form onSubmit={handleSubmitAsignatura} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Nombre:</label>
              <input type="text" value={asignaturaFormData.nombre} onChange={(e) => setAsignaturaFormData({ ...asignaturaFormData, nombre: e.target.value })} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select value={asignaturaFormData.status} onChange={(e) => setAsignaturaFormData({ ...asignaturaFormData, status: e.target.value })} style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Creado por:</label>
              <input type="text" value={asignaturaFormData.createdBy} onChange={(e) => setAsignaturaFormData({ ...asignaturaFormData, createdBy: e.target.value })} placeholder="Usuario que creó el registro" style={inputStyle} />
            </div>
            {asignaturaFormData.createdAt && (
              <div>
                <label style={labelStyle}>Creado en:</label>
                <input type="text" value={asignaturaFormData.createdAt ? new Date(asignaturaFormData.createdAt).toLocaleString() : ""} disabled style={inputStyle} />
              </div>
            )}
            <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#28a745", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>{editingAsignaturaId ? "Actualizar" : "Crear"}</button>
          </form>
        </div>
      )}

      {activeSection === "editarAsignatura" && !editingAsignaturaId && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar Asignatura</h2>
          <form onSubmit={fetchEditAsignaturaById} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>ID de Asignatura:</label>
              <input type="text" value={editAsignaturaSearchId} onChange={(e) => setEditAsignaturaSearchId(e.target.value)} placeholder="Ingrese el ID de la asignatura a editar" style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>Buscar para editar</button>
          </form>
        </div>
      )}

      {activeSection === "eliminarAsignatura" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar Asignatura</h2>
          {asignaturas.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando asignaturas...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione una asignatura para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturas.map((a) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{a.status}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button onClick={() => setAsignaturaToDelete(a)} style={{ padding: "6px 12px", backgroundColor: "#cc0000", color: "#e0e0e0", border: "none", borderRadius: "3px", cursor: "pointer" }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {asignaturaToDelete && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#4d2626", border: "1px solid #cc6666", borderRadius: "4px", color: "#ff9999" }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación de la asignatura:</strong></p>
                <p><strong>Nombre:</strong> {asignaturaToDelete.nombre}</p>
                <p><strong>Estado:</strong> {asignaturaToDelete.status}</p>
                <p><strong>Creado por:</strong> {asignaturaToDelete.createdBy}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleDeleteAsignatura(asignaturaToDelete.id)} disabled={loading} style={{ padding: "8px 16px", marginRight: "10px", backgroundColor: "#cc0000", color: "#e0e0e0", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>Confirmar Eliminación</button>
                <button onClick={() => setAsignaturaToDelete(null)} style={{ padding: "8px 16px", backgroundColor: "#555555", color: "#e0e0e0", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Asignatura-Sección</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button disabled={sectionsDisabled} onClick={() => { setActiveSection("VerAsignaturaSecciones"); resetAsignaturaSeccionForm(); fetchAsignaturasSecciones(); }} style={sectionButtonStyle}>Ver</button>
          <button disabled={sectionsDisabled} onClick={() => { setActiveSection("BuscarAsignaturaSecciones"); resetAsignaturaSeccionForm(); setAsignaturasSecciones([]); }} style={sectionButtonStyle}>Buscar</button>
          <button disabled={sectionsDisabled} onClick={() => { setActiveSection("crearAsignaturaSeccion"); resetAsignaturaSeccionForm(); }} style={sectionButtonStyle}>Crear</button>
          <button disabled={sectionsDisabled} onClick={() => { setActiveSection("editarAsignaturaSeccion"); resetAsignaturaSeccionForm(); setAsignaturasSecciones([]); }} style={sectionButtonStyle}>Editar</button>
          <button disabled={sectionsDisabled} onClick={() => { setActiveSection("eliminarAsignaturaSeccion"); resetAsignaturaSeccionForm(); fetchAsignaturasSecciones(); }} style={sectionButtonStyle}>Eliminar</button>
        </div>
      </div>

      {activeSection === "VerAsignaturaSecciones" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Todas las Asignatura-Sección</h2>
          {loading ? (<p style={{ color: "#e0e0e0" }}>Cargando...</p>) : asignaturasSecciones.length === 0 ? (<p style={{ color: "#e0e0e0" }}>No hay registros</p>) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Asignatura</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Sección</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Profesor</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturasSecciones.map((s) => (
                    <tr key={s.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.id}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.idAsignatura}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.idSeccion}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.idProfesor}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.createdAt ? new Date(s.createdAt).toLocaleString() : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "BuscarAsignaturaSecciones" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar Asignatura-Sección</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchAsignaturaSecciones(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input type="text" value={asignaturaSeccionSearchFields.id} onChange={(e) => updateAsignaturaSeccionSearchField("id", e.target.value)} placeholder="ID completo" style={inputStyle} />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>Buscar ID</button>
            </form>
            <form onSubmit={(e) => searchAsignaturaSecciones(e, "idAsignatura")}>
              <label style={labelStyle}>Buscar por IdAsignatura:</label>
              <input type="text" value={asignaturaSeccionSearchFields.idAsignatura} onChange={(e) => updateAsignaturaSeccionSearchField("idAsignatura", e.target.value)} placeholder="IdAsignatura" style={inputStyle} />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>Buscar</button>
            </form>
            <form onSubmit={(e) => searchAsignaturaSecciones(e, "idSeccion")}>
              <label style={labelStyle}>Buscar por IdSeccion:</label>
              <input type="text" value={asignaturaSeccionSearchFields.idSeccion} onChange={(e) => updateAsignaturaSeccionSearchField("idSeccion", e.target.value)} placeholder="IdSeccion" style={inputStyle} />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>Buscar</button>
            </form>
          </div>
          {asignaturasSecciones.length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #444444", padding: "15px", borderRadius: "4px", backgroundColor: "#333333" }}>
              {asignaturasSecciones.map((s) => (
                <div key={s.id} style={{ color: "#e0e0e0", wordBreak: "break-word" }}>
                  <p><strong style={{ color: "#ffffff" }}>ID:</strong> {s.id}</p>
                  <p><strong style={{ color: "#ffffff" }}>IdAsignatura:</strong> {s.idAsignatura}</p>
                  <p><strong style={{ color: "#ffffff" }}>IdSeccion:</strong> {s.idSeccion}</p>
                  <p><strong style={{ color: "#ffffff" }}>IdProfesor:</strong> {s.idProfesor}</p>
                  <p><strong style={{ color: "#ffffff" }}>Estado:</strong> {s.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "crearAsignaturaSeccion" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>{editingAsignaturaSeccionId ? "Editar Asignatura-Sección" : "Crear Nueva Asignatura-Sección"}</h2>
          <form onSubmit={handleSubmitAsignaturaSeccion} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Id Asignatura:</label>
              <input type="text" value={asignaturaSeccionFormData.idAsignatura} onChange={(e) => setAsignaturaSeccionFormData({ ...asignaturaSeccionFormData, idAsignatura: e.target.value })} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Id Sección:</label>
              <input type="text" value={asignaturaSeccionFormData.idSeccion} onChange={(e) => setAsignaturaSeccionFormData({ ...asignaturaSeccionFormData, idSeccion: e.target.value })} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Id Profesor:</label>
              <input type="text" value={asignaturaSeccionFormData.idProfesor} onChange={(e) => setAsignaturaSeccionFormData({ ...asignaturaSeccionFormData, idProfesor: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Estado:</label>
              <select value={asignaturaSeccionFormData.status} onChange={(e) => setAsignaturaSeccionFormData({ ...asignaturaSeccionFormData, status: e.target.value })} style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Creado por:</label>
              <input type="text" value={asignaturaSeccionFormData.createdBy} onChange={(e) => setAsignaturaSeccionFormData({ ...asignaturaSeccionFormData, createdBy: e.target.value })} placeholder="Usuario que creó el registro" style={inputStyle} />
            </div>
            {asignaturaSeccionFormData.createdAt && (<div><label style={labelStyle}>Creado en:</label><input type="text" value={asignaturaSeccionFormData.createdAt ? new Date(asignaturaSeccionFormData.createdAt).toLocaleString() : ""} disabled style={inputStyle} /></div>)}
            <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#28a745", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>{editingAsignaturaSeccionId ? "Actualizar" : "Crear"}</button>
          </form>
        </div>
      )}

      {activeSection === "editarAsignaturaSeccion" && !editingAsignaturaSeccionId && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar Asignatura-Sección</h2>
          <form onSubmit={fetchEditAsignaturaSeccionById} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>ID:</label>
              <input type="text" value={editAsignaturaSeccionSearchId} onChange={(e) => setEditAsignaturaSeccionSearchId(e.target.value)} placeholder="Ingrese el ID a editar" style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>Buscar para editar</button>
          </form>
        </div>
      )}

      {activeSection === "eliminarAsignaturaSeccion" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar Asignatura-Sección</h2>
          {asignaturasSecciones.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando registros...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione un registro para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdAsignatura</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>IdSeccion</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Estado</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturasSecciones.map((s) => (
                    <tr key={s.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.idAsignatura}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.idSeccion}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{s.status}</td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <button onClick={() => setAsignaturaSeccionToDelete(s)} style={{ padding: "6px 12px", backgroundColor: "#cc0000", color: "#e0e0e0", border: "none", borderRadius: "3px", cursor: "pointer" }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {asignaturaSeccionToDelete && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#4d2626", border: "1px solid #cc6666", borderRadius: "4px", color: "#ff9999" }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación del registro:</strong></p>
                <p><strong>IdAsignatura:</strong> {asignaturaSeccionToDelete.idAsignatura}</p>
                <p><strong>IdSeccion:</strong> {asignaturaSeccionToDelete.idSeccion}</p>
                <p><strong>Estado:</strong> {asignaturaSeccionToDelete.status}</p>
                <p><strong>Creado por:</strong> {asignaturaSeccionToDelete.createdBy}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleDeleteAsignaturaSeccion(asignaturaSeccionToDelete.id)} disabled={loading} style={{ padding: "8px 16px", marginRight: "10px", backgroundColor: "#cc0000", color: "#e0e0e0", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}>Confirmar Eliminación</button>
                <button onClick={() => setAsignaturaSeccionToDelete(null)} style={{ padding: "8px 16px", backgroundColor: "#555555", color: "#e0e0e0", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      )}


      <div style={{ ...sectionStyle, backgroundColor: "#1f1f1f", borderColor: "#444444" }}>
        <h2 style={{ color: "#ffffff" }}>Profesores</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
          <button
            disabled={profesoresDisabled}
            onClick={() => {
              setActiveSection("VerProfesores");
              resetProfesorForm();
              fetchProfesores();
            }}
            style={sectionButtonStyle}
          > 
            ver
          </button>
          <button
            disabled={profesoresDisabled}
            onClick={() => {
              setActiveSection("BuscarProfesores");
              resetProfesorForm();
            }}
            style={sectionButtonStyle}
          >
            Buscar
          </button>
          <button
            disabled={profesoresDisabled}
            onClick={() => {
              setActiveSection("crearProfesor");
              resetProfesorForm();
            }}
            style={sectionButtonStyle}
          >
            Crear
          </button>
          <button
            disabled={profesoresDisabled}
            onClick={() => {
              setActiveSection("editarProfesor");
              resetProfesorForm();
            }}
            style={sectionButtonStyle}
          >
            Editar
          </button>
          <button
            disabled={profesoresDisabled}
            onClick={() => {
              setActiveSection("eliminarProfesor");
              resetProfesorForm();
              fetchProfesores();
            }}
            style={sectionButtonStyle}
          >
            Eliminar
          </button>
        </div>
      </div>

      {activeSection === "VerProfesores" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Ver Todos los Profesores</h2>
          {loading ? (
            <p style={{ color: "#e0e0e0" }}>Cargando...</p>
          ) : profesores.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>No hay profesores</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Id</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Apellido</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Sexo</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Cédula</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {profesores.map((profesor) => (
                    <tr key={profesor.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{profesor.id}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{profesor.nombre}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{profesor.apellido}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{profesor.sexo}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{profesor.cedula}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{profesor.creadoPor}</td>
                      <td style={{ padding: "10px", textAlign: "left", color: "#e0e0e0" }}>{new Date(profesor.creadoEn).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeSection === "BuscarProfesores" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Buscar Profesor</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            <form onSubmit={(e) => searchProfesores(e, "id")}>
              <label style={labelStyle}>Buscar por ID:</label>
              <input
                type="text"
                value={profesorSearchFields.id}
                onChange={(e) => updateProfesorSearchField("id", e.target.value)}
                placeholder="ID completo del profesor"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar ID
              </button>
            </form>

            <form onSubmit={(e) => searchProfesores(e, "nombre")}>
              <label style={labelStyle}>Buscar por nombre:</label>
              <input
                type="text"
                value={profesorSearchFields.nombre}
                onChange={(e) => updateProfesorSearchField("nombre", e.target.value)}
                placeholder="Nombre del profesor"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar nombre
              </button>
            </form>

            <form onSubmit={(e) => searchProfesores(e, "apellido")}>
              <label style={labelStyle}>Buscar por apellido:</label>
              <input
                type="text"
                value={profesorSearchFields.apellido}
                onChange={(e) => updateProfesorSearchField("apellido", e.target.value)}
                placeholder="Apellido del profesor"
                style={inputStyle}
              />
              <button type="submit" disabled={loading} style={{ ...buttonStyle, backgroundColor: "#0066cc" }}>
                Buscar apellido
              </button>
            </form>
          </div>
          {profesores.length > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #444444", padding: "15px", borderRadius: "4px", backgroundColor: "#333333" }}>
              {profesores.map((profesor) => (
                <div key={profesor.id} style={{ color: "#e0e0e0", wordBreak: "break-word" }}>
                  <p><strong style={{ color: "#ffffff" }}>ID:</strong> {profesor.id}</p>
                  <p><strong style={{ color: "#ffffff" }}>Nombre:</strong> {profesor.nombre}</p>
                  <p><strong style={{ color: "#ffffff" }}>Apellido:</strong> {profesor.apellido}</p>
                  <p><strong style={{ color: "#ffffff" }}>Sexo:</strong> {profesor.sexo}</p>
                  <p><strong style={{ color: "#ffffff" }}>Cédula:</strong> {profesor.cedula}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado por:</strong> {profesor.creadoPor}</p>
                  <p><strong style={{ color: "#ffffff" }}>Creado en:</strong> {new Date(profesor.creadoEn).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSection === "crearProfesor" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>{editingProfesorId ? "Editar Profesor" : "Crear Nuevo Profesor"}</h2>
          <form onSubmit={handleSubmitProfesor} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>Nombre:</label>
              <input
                type="text"
                value={profesorFormData.nombre}
                onChange={(e) => setProfesorFormData({ ...profesorFormData, nombre: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Apellido:</label>
              <input
                type="text"
                value={profesorFormData.apellido}
                onChange={(e) => setProfesorFormData({ ...profesorFormData, apellido: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Sexo:</label>
              <select
                value={profesorFormData.sexo}
                onChange={(e) => setProfesorFormData({ ...profesorFormData, sexo: e.target.value })}
                style={{ ...inputStyle, appearance: "none", paddingRight: "30px" }}
              >
                <option value="Masculino" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Masculino</option>
                <option value="Femenino" style={{ backgroundColor: "#333333", color: "#e0e0e0" }}>Femenino</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Cédula:</label>
              <input
                type="text"
                value={profesorFormData.cedula}
                onChange={(e) => setProfesorFormData({ ...profesorFormData, cedula: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Creado por:</label>
              <input
                type="text"
                value={profesorFormData.createdBy}
                onChange={(e) => setProfesorFormData({ ...profesorFormData, createdBy: e.target.value })}
                placeholder="Usuario que creó el registro"
                style={inputStyle}
              />
            </div>
            {profesorFormData.createdAt && (
              <div>
                <label style={labelStyle}>Creado en:</label>
                <input type="text" value={profesorFormData.createdAt ? new Date(profesorFormData.createdAt).toLocaleString() : ""} disabled style={inputStyle} />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#28a745",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {editingProfesorId ? "Actualizar" : "Crear"}
            </button>
          </form>
        </div>
      )}

      {activeSection === "editarProfesor" && !editingProfesorId && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Editar Profesor</h2>
          <form onSubmit={fetchEditProfesorById} style={{ maxWidth: "500px" }}>
            <div>
              <label style={labelStyle}>ID del Profesor:</label>
              <input
                type="text"
                value={editProfesorSearchId}
                onChange={(e) => setEditProfesorSearchId(e.target.value)}
                placeholder="Ingrese el ID del profesor a editar"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                backgroundColor: "#0066cc",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              Buscar para editar
            </button>
          </form>
        </div>
      )}

      {activeSection === "eliminarProfesor" && (
        <div style={sectionStyle}>
          <h2 style={{ color: "#ffffff" }}>Eliminar Profesor</h2>
          {profesores.length === 0 ? (
            <p style={{ color: "#e0e0e0" }}>Cargando profesores...</p>
          ) : (
            <>
              <p style={{ marginBottom: "15px", color: "#e0e0e0" }}>Seleccione un profesor para eliminar:</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "2px solid #444444" }}>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Nombre</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Apellido</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Sexo</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Cédula</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {profesores.map((profesor) => (
                    <tr key={profesor.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{profesor.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{profesor.apellido}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{profesor.sexo}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{profesor.cedula}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>
                        <button
                          onClick={() => handleDeleteProfesor(profesor.id)}
                          style={{
                            backgroundColor: "#dc3545",
                            color: "#ffffff",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer"
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {profesorToDelete && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#4d2626",
              border: "1px solid #cc6666",
              borderRadius: "4px",
              color: "#ff9999"
            }}>
              <div style={{ color: "#ffffff" }}>
                <p style={{ margin: 0 }}><strong>Confirme eliminación del profesor:</strong></p>
                <p><strong>Nombre:</strong> {profesorToDelete.nombre}</p>
                <p><strong>Apellido:</strong> {profesorToDelete.apellido}</p>
                <p><strong>Sexo:</strong> {profesorToDelete.sexo}</p>
                <p><strong>Cédula:</strong> {profesorToDelete.cedula}</p>
                <p><strong>Estado:</strong> {profesorToDelete.status}</p>
                <p><strong>Creado por:</strong> {profesorToDelete.createdBy}</p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDeleteProfesor(profesorToDelete.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 16px",
                    marginRight: "10px",
                    backgroundColor: "#cc0000",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  Confirmar Eliminación
                </button>
                <button
                  onClick={() => setProfesorToDelete(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#555555",
                    color: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}



    </main>
  );
}