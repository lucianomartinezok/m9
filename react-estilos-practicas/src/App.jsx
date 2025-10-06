import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importar componentes de actividades
import Actividad1 from './components/Actividad1';
import Actividad2 from './components/Actividad2';
import Actividad3A from './components/Actividad3A';
import Actividad3B from './components/Actividad3B';

// Componente de la sidebar
function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/actividad1', label: 'Act. 1', icon: '🎨' },
    { path: '/actividad2', label: 'Act. 2', icon: '🔧' },
    { path: '/actividad3a', label: 'Act. 3A', icon: '🌍' },
    { path: '/actividad3b', label: 'Act. 3B', icon: '🍽️' }
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">PFA 9</h2>
          <button className="sidebar-close" onClick={toggleSidebar}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.path} className="sidebar-item">
                <Link 
                  to={item.path} 
                  className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={toggleSidebar}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

// Componente de la página principal
function HomePage() {
  return (
    <div className="container">
      {/* Header minimalista */}
      <header className="mb-3">
        <h1 className="display-4">PFA 9 · Estilos en React</h1>
        <p className="lead md-muted mb-0">Prácticas Formativas Autogestionadas · DGHPEF</p>
      </header>

      {/* Introducción */}
      <section className="md-section">
        <h2 className="h4 mb-2">Introducción</h2>
        <p>
          Los estilos en un proyecto React son fundamentales para definir la apariencia y la experiencia visual de la
          aplicación, permitiendo que los componentes sean atractivos y fáciles de usar. Esto se puede lograr mediante CSS,
          estilos en línea o librerías como Styled Components, React-Bootstrap, MUI entre otros.
        </p>
        <p>
          Los <strong>PropTypes</strong> ayudan a validar las propiedades pasadas a un componente, asegurando el tipo de datos correcto
          y mejorando la robustez del código. Las <strong>rutas</strong> permiten la navegación entre vistas, organizando la estructura de
          la aplicación y mejorando la experiencia del usuario.
        </p>
      </section>

      {/* Objetivos */}
      <section className="md-section">
        <h2 className="h4 mb-2">Objetivos</h2>
        <ul className="mb-0">
          <li>Aplicar estilos de manera efectiva para mejorar la estética de los componentes.</li>
          <li>Gestionar rutas para facilitar la navegación dentro de la aplicación.</li>
          <li>Practicar renderizado condicional y validación de propiedades con PropTypes.</li>
        </ul>
      </section>

      {/* Actividades */}
      <section className="md-section">
        <h2 className="h4 mb-2">Actividades</h2>
        <ul className="activity-list">
          <li className="activity-item">
            <div>
              <div className="activity-title">Actividad 1 · Estilos</div>
              <p className="activity-desc mb-0">Estilos en línea y objetos de estilo.</p>
            </div>
            <Link to="/actividad1" className="btn-md btn-link">Abrir</Link>
          </li>
          <li className="activity-item">
            <div>
              <div className="activity-title">Actividad 2 · Componente, estructura y ruta</div>
              <p className="activity-desc mb-0">Tema claro/oscuro y rutas protegidas.</p>
            </div>
            <Link to="/actividad2" className="btn-md btn-link">Abrir</Link>
          </li>
          <li className="activity-item">
            <div>
              <div className="activity-title">Actividad 3A · Destinos turísticos</div>
              <p className="activity-desc mb-0">Lista, detalles por ruta y PropTypes.</p>
            </div>
            <Link to="/actividad3a" className="btn-md btn-link">Abrir</Link>
          </li>
          <li className="activity-item">
            <div>
              <div className="activity-title">Actividad 3B · Restaurantes</div>
              <p className="activity-desc mb-0">Lista, menú detallado y navegación.</p>
            </div>
            <Link to="/actividad3b" className="btn-md btn-link">Abrir</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

// Componente principal de la aplicación
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Botón para abrir sidebar en móvil */}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Contenido principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/actividad1" element={<Actividad1 />} />
            <Route path="/actividad2" element={<Actividad2 />} />
            <Route path="/actividad3a" element={<Actividad3A />} />
            <Route path="/actividad3b" element={<Actividad3B />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;