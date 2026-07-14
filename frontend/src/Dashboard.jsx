import { useState, useEffect } from "react";

const API_URL = "http://localhost:5107";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [secciones, setSecciones] = useState([]);
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
  const [editSearchId, setEditSearchId] = useState("");
  const [editCursoSearchId, setEditCursoSearchId] = useState("");
  const [editSeccionSearchId, setEditSeccionSearchId] = useState("");
  const [dashboardUser, setDashboardUser] = useState(localStorage.getItem("loginUsername") ?? "");
  const [editingId, setEditingId] = useState(null);
  const [editingCursoId, setEditingCursoId] = useState(null);
  const [editingSeccionId, setEditingSeccionId] = useState(null);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);
  const [cursoToDelete, setCursoToDelete] = useState(null);
  const [seccionToDelete, setSeccionToDelete] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    sexo: "M",
    fechaNacimiento: "",
    numeroIdentificacion: "",
    status: "Activo",
    createdAt: ""
  });

  const [cursoFormData, setCursoFormData] = useState({
    nombre: "",
    anio: "",
    status: "Activo",
    createdAt: ""
  });

  const [seccionFormData, setSeccionFormData] = useState({
    IdCurso: "",
    IdProfesorEncargado: "",
    Nombre: "",
    FechaInicio: "",
    FechaFin: "",
    Status: ""
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
            createdBy: dashboardUser.trim(),
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
      setFormData({ nombre: "", apellido: "", sexo: "M", fechaNacimiento: "", numeroIdentificacion: "", status: "Activo", createdAt: "" });
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
            createdBy: dashboardUser.trim(),
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
      setCursoFormData({ nombre: "", anio: "", status: "Activo", createdAt: "" });
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
          createdBy: dashboardUser.trim(),
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
      setSeccionFormData({ IdCurso: "", IdProfesorEncargado: "", Nombre: "", FechaInicio: "", FechaFin: "", Status: "" });
      setEditingSeccionId(null);
      await fetchSecciones();
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

  const handleEdit = (alumno) => {
    setFormData({
      nombre: alumno.nombre || "",
      apellido: alumno.apellido || "",
      sexo: alumno.sexo || "M",
      fechaNacimiento: alumno.fechaNacimiento ? alumno.fechaNacimiento.split("T")[0] : "",
      numeroIdentificacion: alumno.numeroIdentificacion || "",
      status: alumno.status || "Activo",
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
      Status: seccion.Status || ""
    });
    setEditingSeccionId(seccion.id);
    setActiveSection("crearSeccion");
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
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Creado en</th>
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
                      <td style={{ padding: "10px", color: "#e0e0e0", textAlign: "center" }}>{alumno.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0", textAlign: "center" }}>{alumno.createdAt ? new Date(alumno.createdAt).toLocaleString() : ""}</td>
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
              <p style={{ color: "#ffffff" }}><strong>¿Está seguro de que desea eliminar a {alumnoToDelete.nombre} {alumnoToDelete.apellido}?</strong></p>
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
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
                    <th style={{ padding: "10px", textAlign: "center", color: "#ffffff" }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cursos.map((curso) => (
                    <tr key={curso.id} style={{ borderBottom: "1px solid #444444" }}>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.nombre}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.anio}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.status}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{curso.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{new Date(curso.createdAt).toLocaleString()}</td>
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
              <p style={{ color: "#ffffff" }}><strong>¿Está seguro de eliminar el curso {cursoToDelete.nombre} ({cursoToDelete.anio})?</strong></p>
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
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado por</th>
                    <th style={{ padding: "10px", textAlign: "left", color: "#ffffff" }}>Creado en</th>
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
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.createdBy}</td>
                      <td style={{ padding: "10px", color: "#e0e0e0" }}>{seccion.createdAt ? new Date(seccion.createdAt).toLocaleString() : "-"}</td>
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
              <p style={{ color: "#ffffff" }}><strong>¿Está seguro de eliminar la sección {seccionToDelete.nombre} ({seccionToDelete.IdCurso})?</strong></p>
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
    </main>
  );
}