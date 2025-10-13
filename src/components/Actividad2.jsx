/**
 * ========================================
 * ACTIVIDAD 2: COMPONENTE, ESTRUCTURA Y RUTA
 * ========================================
 * 
 * Esta actividad demuestra conceptos avanzados de React:
 * 1. Context API para manejo de estado global (tema claro/oscuro)
 * 2. Rutas protegidas con autenticación simulada
 * 3. Componentes reutilizables y hooks personalizados
 * 
 * Objetivo: Aprender a manejar estado global y control de acceso en React.
 */

// Importaciones necesarias
import React, { useState, createContext, useContext } from 'react';  // Hooks de React
import { Link, Routes, Route, Navigate } from 'react-router-dom';    // Navegación y rutas

// ========================================
// CONTEXT API PARA MANEJO DE TEMA
// ========================================

/**
 * CREACIÓN DEL CONTEXTO
 * 
 * createContext() crea un objeto de contexto que permite compartir datos
 * entre componentes sin necesidad de pasar props manualmente (evita "prop drilling")
 */
const ThemeContext = createContext();

/**
 * HOOK PERSONALIZADO: useTheme
 * 
 * Este hook personalizado encapsula la lógica de acceso al contexto del tema.
 * Proporciona una interfaz limpia para consumir el contexto y valida que
 * se esté usando dentro del Provider correspondiente.
 */
const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Validación de seguridad: asegura que el hook se use dentro del Provider
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  
  return context;
};

/**
 * COMPONENTE: ThemeToggle
 * 
 * Componente reutilizable que permite cambiar entre tema claro y oscuro.
 * Utiliza el hook personalizado useTheme para acceder al estado del tema.
 */
const ThemeToggle = () => {
  // Obtenemos el tema actual y la función para cambiarlo desde el contexto
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="d-flex align-items-center gap-3">
      {/* Chip que muestra el tema actual */}
      <span className="accent-chip">Tema: {theme === 'light' ? 'Claro' : 'Oscuro'}</span>
      
      {/* Botón para alternar entre temas */}
      <button 
        className="btn-md"
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
      </button>
    </div>
  );
};

/**
 * COMPONENTE: LoginForm
 * 
 * Formulario de login simulado que demuestra:
 * - Manejo de estado local con useState
 * - Control de formularios en React
 * - Validación básica de credenciales
 * - Comunicación con componente padre mediante props
 */
const LoginForm = ({ onLogin }) => {
  // ========================================
  // ESTADO LOCAL DEL COMPONENTE
  // ========================================
  
  // Estado para las credenciales del usuario
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '' 
  });
  
  // Estado para mostrar mensajes de feedback al usuario
  const [message, setMessage] = useState('');

  // ========================================
  // MANEJO DE EVENTOS
  // ========================================
  
  /**
   * FUNCIÓN: handleSubmit
   * 
   * Maneja el envío del formulario de login.
   * Valida las credenciales y notifica el resultado al componente padre.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
    // Validación simple: admin / 123
    if (credentials.username === 'admin' && credentials.password === '123') {
      onLogin(true);  // Notifica al padre que el login fue exitoso
      setMessage('¡Login exitoso!');
    } else {
      setMessage('Credenciales incorrectas. Usa: admin / 123');
    }
  };

  // ========================================
  // RENDERIZADO DEL FORMULARIO
  // ========================================
  
  return (
    <div className="md-section">
      <h5 className="mb-3">Iniciar Sesión</h5>
      
      {/* Formulario con manejo de eventos */}
      <form onSubmit={handleSubmit}>
        {/* Campo de usuario */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            placeholder="admin"
          />
        </div>
        
        {/* Campo de contraseña */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            placeholder="123"
          />
        </div>
        
        {/* Botón de envío */}
        <button type="submit" className="btn-md">Iniciar Sesión</button>
      </form>
      
      {/* Mensaje de feedback */}
      {message && (
        <div className="md-section mt-3">
          {message}
        </div>
      )}
      
      {/* Información de ayuda */}
      <div className="mt-2">
        <small className="md-muted">
          <strong>Credenciales:</strong> admin / 123
        </small>
      </div>
    </div>
  );
};

/**
 * COMPONENTE: ProtectedContent
 * 
 * Componente que solo es visible para usuarios autenticados.
 * Demuestra cómo acceder al contexto del tema desde cualquier componente.
 */
const ProtectedContent = () => {
  // Accedemos al tema actual desde el contexto
  const { theme } = useTheme();
  
  return (
    <div className="md-section">
      <h5 className="mb-2">🎉 Contenido Protegido</h5>
      <p className="mb-0">Este contenido solo es visible para usuarios autenticados.</p>
      <div className="mt-2">
        <span className="accent-chip">Tema actual: {theme}</span>
      </div>
    </div>
  );
};

/**
 * COMPONENTE: ProtectedRoute
 * 
 * Componente de orden superior (HOC) que protege rutas.
 * Verifica si el usuario está autenticado y:
 * - Si está autenticado: renderiza el contenido protegido
 * - Si no está autenticado: redirige al login
 */
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/actividad2/login" replace />;
};

/**
 * ========================================
 * COMPONENTE PRINCIPAL: Actividad2
 * ========================================
 * 
 * Este es el componente principal que orquesta toda la actividad 2.
 * Demuestra el uso del Context API como Provider y maneja el estado
 * de autenticación para las rutas protegidas.
 */
const Actividad2 = () => {
  // ========================================
  // ESTADO DEL COMPONENTE PRINCIPAL
  // ========================================
  
  // Estado para el tema actual (light/dark)
  const [theme, setTheme] = useState('light');
  
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estados para controlar la visibilidad del código de ejemplo
  const [showCodeA, setShowCodeA] = useState(false);
  const [showCodeB, setShowCodeB] = useState(false);

  // ========================================
  // FUNCIONES DE MANEJO DE ESTADO
  // ========================================
  
  /**
   * FUNCIÓN: toggleTheme
   * 
   * Alterna entre tema claro y oscuro.
   * Usa la forma funcional de setState para garantizar el estado más reciente.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * FUNCIÓN: handleLogin
   * 
   * Maneja el resultado del login desde el componente LoginForm.
   * Recibe un booleano que indica si el login fue exitoso.
   */
  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  /**
   * FUNCIÓN: handleLogout
   * 
   * Cierra la sesión del usuario, revirtiendo el estado de autenticación.
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // ========================================
  // RENDERIZADO DEL COMPONENTE
  // ========================================
  
  return (
    // Provider del Context API que envuelve toda la aplicación
    // Proporciona el tema y la función toggleTheme a todos los componentes hijos
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="activity activity--a2 fade-in">
        {/* 
          ========================================
          HEADER DE LA ACTIVIDAD
          ========================================
          Contiene el título, descripción y chip identificativo
        */}
        <div className="activity-header">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="display-4 mb-1">Actividad 2: Componente, Estructura y Ruta</h1>
              <p className="lead md-muted mb-0">Tema claro/oscuro y rutas protegidas</p>
            </div>
            <span className="accent-chip">A2</span>
          </div>
        </div>

        <div className="activity-content">
          {/* 
            ========================================
            PROPUESTA A: COMPONENTE DE TEMA
            ========================================
            Demuestra el uso del Context API para manejo de estado global
          */}
          <div className="md-section">
            <h4 className="h5 mb-2">Propuesta A: Componente de Tema</h4>
            <p className="mb-3">
              Crear un componente que permita cambiar el tema de una aplicación (claro/oscuro).
              Usa <code>useState</code> para manejar el estado.
            </p>

            {/* Demo interactivo del cambio de tema */}
            <div className="mb-3">
              <ThemeToggle />
            </div>
            
            {/* Vista previa que cambia según el tema */}
            <div className={`p-3 rounded ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
              <h6 className="mb-1">Vista previa</h6>
              <p className="mb-0">Este bloque cambia con el tema seleccionado.</p>
            </div>

            {/* Botón para mostrar/ocultar código de la Propuesta A */}
            <div className="mt-3">
              <button className="btn-md" onClick={() => setShowCodeA(!showCodeA)}>
                {showCodeA ? 'Ocultar' : 'Ver'} Código
              </button>
              {showCodeA && (
                <div className="code-example mt-3">
                  <pre className="mb-0">
{`// Hook de tema con Context
const [theme, setTheme] = useState('light');
const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');`}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* 
            ========================================
            PROPUESTA B: RUTAS PROTEGIDAS
            ========================================
            Demuestra cómo implementar autenticación y rutas protegidas
          */}
          <div className="md-section">
            <h4 className="h5 mb-2">Propuesta B: Rutas Protegidas</h4>
            <p className="mb-3">
              Crea una ruta que requiera iniciar sesión antes de acceder.
            </p>

            {/* Indicador de estado de autenticación */}
            <div className="mb-3">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="accent-chip">✅ Autenticado</span>
                  <button className="btn-md" onClick={handleLogout}>Cerrar sesión</button>
                </div>
              ) : (
                <span className="accent-chip">⚠️ No autenticado</span>
              )}
            </div>

            {/* 
              RUTAS ANIDADAS
              React Router permite definir rutas dentro de componentes.
              Estas rutas son relativas al path actual (/actividad2)
            */}
            <Routes>
              {/* Ruta de login */}
              <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
              
              {/* Ruta protegida que requiere autenticación */}
              <Route 
                path="/protected" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProtectedContent />
                  </ProtectedRoute>
                } 
              />
            </Routes>

            {/* Botón de navegación condicional */}
            <div className="mt-3">
              <Link 
                to={isAuthenticated ? "/actividad2/protected" : "/actividad2/login"}
                className="btn-md"
              >
                {isAuthenticated ? 'Ver Contenido' : 'Ir a Login'}
              </Link>
            </div>

            {/* Botón para mostrar/ocultar código de la Propuesta B */}
            <div className="mt-3">
              <button className="btn-md" onClick={() => setShowCodeB(!showCodeB)}>
                {showCodeB ? 'Ocultar' : 'Ver'} Código
              </button>
              {showCodeB && (
                <div className="code-example mt-3">
                  <pre className="mb-0">
{`// Ruta protegida
const ProtectedRoute = ({ children, isAuthenticated }) => (
  isAuthenticated ? children : <Navigate to="/login" replace />
);`}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* 
            ========================================
            NAVEGACIÓN
            ========================================
            Botones para navegar entre actividades
          */}
          <div className="d-flex gap-2">
            <Link to="/" className="btn-md">← Inicio</Link>
            <Link to="/actividad1" className="btn-md">← Anterior</Link>
            <Link to="/actividad3a" className="btn-md">Siguiente →</Link>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

// Exportamos el componente para que pueda ser usado en el router principal
export default Actividad2;
