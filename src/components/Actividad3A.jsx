/**
 * ========================================
 * ACTIVIDAD 3A: DESTINOS TURÍSTICOS
 * ========================================
 * 
 * Esta actividad demuestra conceptos avanzados de React:
 * 1. Navegación con React Router (useParams, Routes, Route, Navigate)
 * 2. Validación de props con PropTypes
 * 3. Componentes de React Bootstrap para UI
 * 4. Manejo de rutas dinámicas y 404
 * 5. Estructura de datos compleja y renderizado condicional
 * 6. Uso de Container, Row, Col para layout responsivo
 * 
 * Objetivo: Crear una aplicación de destinos turísticos con navegación
 * y validación de propiedades usando React Bootstrap.
 */

// Importaciones necesarias
import React from 'react';                                    // Biblioteca principal de React
import { Link, Routes, Route, useParams, Navigate } from 'react-router-dom';  // Navegación y rutas
import PropTypes from 'prop-types';                          // Validación de props
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';  // Componentes de Bootstrap

// ========================================
// DATOS DE DESTINOS TURÍSTICOS
// ========================================

/**
 * ARRAY DE DESTINOS
 * 
 * Contiene información detallada de destinos turísticos de todo el mundo.
 * Cada destino es un objeto con propiedades que serán validadas con PropTypes.
 * Los datos incluyen información básica, imágenes, atracciones y detalles de viaje.
 */
const destinosData = [
  { 
    id: 1, 
    nombre: 'París, Francia', 
    imagen: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400', 
    descripcion: 'La Ciudad de la Luz, famosa por la Torre Eiffel, el Louvre y su rica cultura.', 
    atracciones: ['Torre Eiffel', 'Museo del Louvre', 'Notre-Dame', 'Champs-Élysées'], 
    clima: 'Templado', 
    mejorEpoca: 'Abril - Octubre', 
    precio: '€€€' 
  },
  { 
    id: 2, 
    nombre: 'Tokio, Japón', 
    imagen: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', 
    descripcion: 'Una mezcla perfecta de tradición y modernidad en el corazón de Asia.', 
    atracciones: ['Senso-ji Temple', 'Shibuya Crossing', 'Palacio Imperial', 'Tsukiji Market'], 
    clima: 'Subtropical', 
    mejorEpoca: 'Marzo - Mayo, Septiembre - Noviembre', 
    precio: '€€€€' 
  },
  { 
    id: 3, 
    nombre: 'Nueva York, USA', 
    imagen: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', 
    descripcion: 'La Gran Manzana, la ciudad que nunca duerme con sus rascacielos icónicos.', 
    atracciones: ['Estatua de la Libertad', 'Central Park', 'Times Square', 'Empire State Building'], 
    clima: 'Continental', 
    mejorEpoca: 'Abril - Junio, Septiembre - Noviembre', 
    precio: '€€€€' 
  },
  { 
    id: 4, 
    nombre: 'Roma, Italia', 
    imagen: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400', 
    descripcion: 'La Ciudad Eterna, cuna de la civilización occidental y el arte clásico.', 
    atracciones: ['Coliseo', 'Vaticano', 'Fontana di Trevi', 'Foro Romano'], 
    clima: 'Mediterráneo', 
    mejorEpoca: 'Abril - Junio, Septiembre - Octubre', 
    precio: '€€€' 
  },
  { 
    id: 5, 
    nombre: 'Sídney, Australia', 
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 
    descripcion: 'La ciudad más grande de Australia con su famosa Ópera y puerto natural.', 
    atracciones: ['Ópera de Sídney', 'Harbour Bridge', 'Bondi Beach', 'Royal Botanic Gardens'], 
    clima: 'Oceánico', 
    mejorEpoca: 'Septiembre - Noviembre, Marzo - Mayo', 
    precio: '€€€€' 
  },
  { 
    id: 6, 
    nombre: 'Barcelona, España', 
    imagen: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400', 
    descripcion: 'Capital de Cataluña, famosa por la arquitectura de Gaudí y su vibrante cultura.', 
    atracciones: ['Sagrada Familia', 'Park Güell', 'Las Ramblas', 'Casa Batlló'], 
    clima: 'Mediterráneo', 
    mejorEpoca: 'Mayo - Junio, Septiembre - Octubre', 
    precio: '€€' 
  }
];

// ========================================
// COMPONENTES DE LA APLICACIÓN
// ========================================

/**
 * COMPONENTE: DestinoCard
 * 
 * Componente reutilizable que renderiza una tarjeta de destino turístico.
 * Utiliza componentes de React Bootstrap (Card, Col) para un diseño responsivo.
 * Demuestra el uso de PropTypes para validar las propiedades recibidas.
 * 
 * Props:
 * - destino: Objeto con información del destino (requerido)
 */
const DestinoCard = ({ destino }) => {
  return (
    // Columna responsiva: 6 columnas en md, 4 en lg
    <Col md={6} lg={4} className="mb-4">
      {/* Tarjeta de Bootstrap con altura completa */}
      <Card className="h-100">
        {/* Imagen del destino con estilos inline para controlar dimensiones */}
        <Card.Img 
          variant="top" 
          src={destino.imagen} 
          alt={destino.nombre} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        
        {/* Cuerpo de la tarjeta con flexbox para distribución vertical */}
        <Card.Body className="d-flex flex-column">
          {/* Título del destino */}
          <Card.Title className="text-primary">{destino.nombre}</Card.Title>
          
          {/* Descripción del destino */}
          <Card.Text className="text-muted small">{destino.descripcion}</Card.Text>
          
          {/* Chips informativos con flexbox para distribución horizontal */}
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="accent-chip">{destino.clima}</span>
            <span className="accent-chip">{destino.precio}</span>
          </div>
          
          {/* Botón de navegación a detalles */}
          <Link to={`/actividad3a/destino/${destino.id}`} className="btn-md mt-3">
            Ver Detalles
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

/**
 * VALIDACIÓN DE PROPTYPES PARA DestinoCard
 * 
 * Define los tipos y requisitos de las props que recibe el componente.
 * PropTypes ayuda a detectar errores durante el desarrollo y documenta
 * la interfaz del componente. En este caso, valida que destino sea un objeto
 * con propiedades específicas y tipos correctos.
 */
DestinoCard.propTypes = {
  destino: PropTypes.shape({
    id: PropTypes.number.isRequired,           // ID único del destino
    nombre: PropTypes.string.isRequired,       // Nombre del destino
    imagen: PropTypes.string.isRequired,       // URL de la imagen
    descripcion: PropTypes.string.isRequired,  // Descripción del destino
    clima: PropTypes.string.isRequired,        // Tipo de clima
    precio: PropTypes.string.isRequired        // Rango de precios
  }).isRequired
};

/**
 * COMPONENTE: DestinoDetalle
 * 
 * Componente que muestra información detallada de un destino específico.
 * Utiliza useParams para obtener el ID del destino desde la URL.
 * Demuestra renderizado condicional y redirección con Navigate.
 * Usa componentes de React Bootstrap para un layout responsivo.
 */
const DestinoDetalle = () => {
  // ========================================
  // OBTENCIÓN DE PARÁMETROS DE LA URL
  // ========================================
  
  // useParams extrae parámetros dinámicos de la URL
  // En este caso, extrae el 'id' de la ruta '/destino/:id'
  const { id } = useParams();
  
  // ========================================
  // BÚSQUEDA DEL DESTINO
  // ========================================
  
  // Busca el destino que coincida con el ID de la URL
  // parseInt convierte el string del parámetro a número
  const destino = destinosData.find(d => d.id === parseInt(id));
  
  // ========================================
  // RENDERIZADO CONDICIONAL
  // ========================================
  
  // Si no se encuentra el destino, redirige a la página 404
  if (!destino) return <Navigate to="/actividad3a/not-found" replace />;

  // Si se encuentra el destino, muestra los detalles
  return (
    <Container className="mt-3">
      <Row>
        {/* Columna de imagen */}
        <Col md={6}>
          <img 
            src={destino.imagen} 
            alt={destino.nombre} 
            className="img-fluid rounded" 
            style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
          />
        </Col>
        
        {/* Columna de información detallada */}
        <Col md={6}>
          {/* Header con título y precio */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h1 className="h3 mb-0">{destino.nombre}</h1>
            <span className="accent-chip">{destino.precio}</span>
          </div>
          
          {/* Descripción del destino */}
          <p className="md-muted">{destino.descripcion}</p>
          
          {/* Información básica en grid responsivo */}
          <div className="md-section">
            <h6 className="mb-2">Información</h6>
            <Row>
              <Col sm={6}>
                <p className="mb-1"><strong>Clima:</strong> {destino.clima}</p>
                <p className="mb-1"><strong>Mejor época:</strong> {destino.mejorEpoca}</p>
              </Col>
              <Col sm={6}>
                <p className="mb-1"><strong>Atracciones:</strong> {destino.atracciones.length}</p>
              </Col>
            </Row>
          </div>
          
          {/* Lista de atracciones principales */}
          <div className="md-section">
            <h6 className="mb-2">Principales Atracciones</h6>
            <ul className="mb-0">
              {destino.atracciones.map((atraccion, index) => (
                <li key={index}>{atraccion}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

/**
 * COMPONENTE: NotFound
 * 
 * Componente que se muestra cuando se accede a una ruta inválida.
 * Utiliza el componente Alert de React Bootstrap para mostrar el error.
 * Demuestra el manejo de errores 404 en aplicaciones React.
 */
const NotFound = () => (
  <Container className="mt-4 text-center">
    {/* Alert de Bootstrap con variante de peligro */}
    <Alert variant="danger">
      <Alert.Heading>Destino no encontrado</Alert.Heading>
      <p>El destino turístico que buscas no existe.</p>
      
      {/* Botones de navegación con flexbox */}
      <div className="d-flex justify-content-center gap-2">
        <Link to="/actividad3a" className="btn-md">Volver</Link>
        <Link to="/" className="btn-md">Inicio</Link>
      </div>
    </Alert>
  </Container>
);

/**
 * ========================================
 * COMPONENTE PRINCIPAL: Actividad3A
 * ========================================
 * 
 * Este es el componente principal que orquesta toda la actividad 3A.
 * Demuestra el uso de React Router con rutas anidadas y el renderizado
 * de listas de componentes con validación de props.
 */
const Actividad3A = () => {
  return (
    <div className="activity activity--a3a fade-in">
      {/* 
        ========================================
        HEADER DE LA ACTIVIDAD
        ========================================
        Contiene el título, descripción y chip identificativo
      */}
      <div className="activity-header">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="display-4 mb-1">Actividad 3A: Destinos Turísticos</h1>
            <p className="lead md-muted mb-0">Lista, rutas y validación de props</p>
          </div>
          <span className="accent-chip">A3A</span>
        </div>
      </div>

      <div className="activity-content">
        {/* 
          ========================================
          CONSIGNAS DE LA ACTIVIDAD
          ========================================
          Lista los objetivos que debe cumplir la aplicación
        */}
        <div className="md-section">
          <h4 className="h5 mb-2">Consignas</h4>
          <ul className="mb-0">
            <li>Lista de destinos con imagen y nombre</li>
            <li>Ruta específica con detalles</li>
            <li>Validación de props con PropTypes</li>
            <li>Componente NotFound para rutas inválidas</li>
          </ul>
        </div>

        {/* 
          ========================================
          DEMO INTERACTIVO
          ========================================
          Contiene las rutas anidadas de la aplicación
        */}
        <div className="md-section">
          <h4 className="h5 mb-3">Demo Interactivo</h4>
          
          {/* 
            RUTAS ANIDADAS
            React Router permite definir rutas dentro de componentes.
            Estas rutas son relativas al path actual (/actividad3a)
          */}
          <Routes>
            {/* Ruta principal: lista de destinos */}
            <Route 
              path="/" 
              element={
                <Row>
                  {/* Mapeo de destinos a componentes DestinoCard */}
                  {destinosData.map(destino => (
                    <DestinoCard key={destino.id} destino={destino} />
                  ))}
                </Row>
              } 
            />
            
            {/* Ruta de detalle: información específica de un destino */}
            <Route path="/destino/:id" element={<DestinoDetalle />} />
            
            {/* Ruta 404: destino no encontrado */}
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </div>

        {/* 
          ========================================
          NAVEGACIÓN
          ========================================
          Botones para navegar entre actividades
        */}
        <div className="d-flex gap-2">
          <Link to="/" className="btn-md">← Inicio</Link>
          <Link to="/actividad2" className="btn-md">← Anterior</Link>
          <Link to="/actividad3b" className="btn-md">Siguiente →</Link>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda ser usado en el router principal
export default Actividad3A;
