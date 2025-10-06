/**
 * ========================================
 * ACTIVIDAD 3B: RESTAURANTES
 * ========================================
 * 
 * Esta actividad demuestra conceptos avanzados de React:
 * 1. Navegación con React Router (useParams, Routes, Route, Navigate)
 * 2. Validación de props con PropTypes
 * 3. Componentes de React Bootstrap para UI (ListGroup, Badge)
 * 4. Manejo de rutas dinámicas y 404
 * 5. Estructura de datos compleja con arrays anidados
 * 6. Renderizado de listas con componentes interactivos
 * 
 * Objetivo: Crear una aplicación de restaurantes con menús detallados,
 * información de contacto y navegación usando React Bootstrap.
 */

// Importaciones necesarias
import React from 'react';                                    // Biblioteca principal de React
import { Link, Routes, Route, useParams, Navigate } from 'react-router-dom';  // Navegación y rutas
import PropTypes from 'prop-types';                          // Validación de props
import { Container, Row, Col, Card, Button, Alert, Badge, ListGroup } from 'react-bootstrap';  // Componentes de Bootstrap

// ========================================
// DATOS DE RESTAURANTES
// ========================================

/**
 * ARRAY DE RESTAURANTES
 * 
 * Contiene información detallada de restaurantes con menús completos.
 * Cada restaurante es un objeto con propiedades que serán validadas con PropTypes.
 * Los datos incluyen información básica, menús con precios, ubicación y calificaciones.
 * 
 * Estructura de cada restaurante:
 * - id: Identificador único
 * - nombre: Nombre del restaurante
 * - imagen: URL de la imagen
 * - descripcion: Descripción del restaurante
 * - ubicacion: Dirección física
 * - telefono: Número de contacto
 * - horario: Horarios de atención
 * - precio: Rango de precios (€ a €€€€)
 * - especialidad: Tipo de cocina
 * - menu: Array de objetos con platos (nombre, precio, descripcion)
 * - rating: Calificación numérica (1-5)
 */
const restaurantesData = [
  { 
    id: 1, 
    nombre: 'El Gourmet Argentino', 
    imagen: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', 
    descripcion: 'Cocina argentina tradicional con un toque moderno. Especialistas en carnes y vinos.', 
    ubicacion: 'Av. Corrientes 1234, Buenos Aires', 
    telefono: '+54 11 1234-5678', 
    horario: 'Lun-Dom: 12:00-24:00', 
    precio: '€€€', 
    especialidad: 'Carnes', 
    menu: [ 
      { nombre: 'Bife de Chorizo', precio: '$4500', descripcion: 'Corte premium con papas fritas' }, 
      { nombre: 'Empanadas de Carne', precio: '$800', descripcion: '6 unidades caseras' }, 
      { nombre: 'Asado de Tira', precio: '$3800', descripcion: 'Para 2 personas' }, 
      { nombre: 'Ensalada César', precio: '$2200', descripcion: 'Con pollo y aderezo especial' }, 
      { nombre: 'Tiramisú', precio: '$1800', descripcion: 'Postre italiano casero' } 
    ], 
    rating: 4.8 
  },
  { 
    id: 2, 
    nombre: 'Sushi Zen', 
    imagen: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', 
    descripcion: 'Auténtica cocina japonesa con ingredientes frescos importados directamente de Japón.', 
    ubicacion: 'Av. Santa Fe 5678, Buenos Aires', 
    telefono: '+54 11 2345-6789', 
    horario: 'Mar-Dom: 19:00-01:00', 
    precio: '€€€€', 
    especialidad: 'Sushi', 
    menu: [ 
      { nombre: 'Sashimi Mixto', precio: '$5200', descripcion: '12 piezas de pescado fresco' }, 
      { nombre: 'Roll California', precio: '$2800', descripcion: '8 piezas con cangrejo' }, 
      { nombre: 'Ramen Tonkotsu', precio: '$3500', descripcion: 'Sopa de cerdo tradicional' }, 
      { nombre: 'Gyoza', precio: '$1800', descripcion: '6 empanadillas al vapor' }, 
      { nombre: 'Mochi de Matcha', precio: '$1200', descripcion: 'Postre japonés tradicional' } 
    ], 
    rating: 4.9 
  },
  { 
    id: 3, 
    nombre: 'Pizza Napoletana', 
    imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', 
    descripcion: 'Pizza auténtica napolitana con horno de leña y ingredientes importados de Italia.', 
    ubicacion: 'Defensa 901, San Telmo', 
    telefono: '+54 11 3456-7890', 
    horario: 'Lun-Dom: 18:00-02:00', 
    precio: '€€', 
    especialidad: 'Pizza', 
    menu: [ 
      { nombre: 'Margherita', precio: '$2800', descripcion: 'Tomate, mozzarella, albahaca' }, 
      { nombre: 'Quattro Stagioni', precio: '$3200', descripcion: '4 estaciones de ingredientes' }, 
      { nombre: 'Diavola', precio: '$3000', descripcion: 'Tomate, mozzarella, salame picante' }, 
      { nombre: 'Prosciutto e Funghi', precio: '$3500', descripcion: 'Jamón crudo y hongos' }, 
      { nombre: 'Tiramisú', precio: '$1500', descripcion: 'Postre italiano clásico' } 
    ], 
    rating: 4.7 
  },
  { 
    id: 4, 
    nombre: 'Café Tortoni', 
    imagen: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', 
    descripcion: 'Histórico café porteño fundado en 1858. Tradición, cultura y gastronomía en un solo lugar.', 
    ubicacion: 'Av. de Mayo 825, Monserrat', 
    telefono: '+54 11 4567-8901', 
    horario: 'Lun-Dom: 08:00-20:00', 
    precio: '€€', 
    especialidad: 'Café', 
    menu: [ 
      { nombre: 'Café con Leche', precio: '$800', descripcion: 'Café tradicional argentino' }, 
      { nombre: 'Medialunas', precio: '$1200', descripcion: '6 unidades recién horneadas' }, 
      { nombre: 'Tostado Mixto', precio: '$1800', descripcion: 'Jamón y queso en pan casero' }, 
      { nombre: 'Churros con Chocolate', precio: '$1500', descripcion: '4 churros con chocolate caliente' }, 
      { nombre: 'Torta de Chocolate', precio: '$2000', descripcion: 'Porción de torta casera' } 
    ], 
    rating: 4.5 
  },
  { 
    id: 5, 
    nombre: 'La Parrilla del Puerto', 
    imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', 
    descripcion: 'Parrilla tradicional con vista al río. Especialistas en pescados y mariscos frescos.', 
    ubicacion: 'Puerto Madero, Buenos Aires', 
    telefono: '+54 11 5678-9012', 
    horario: 'Lun-Dom: 12:00-23:00', 
    precio: '€€€', 
    especialidad: 'Parrilla', 
    menu: [ 
      { nombre: 'Parrillada de Mariscos', precio: '$6500', descripcion: 'Para 2 personas' }, 
      { nombre: 'Salmón a la Plancha', precio: '$4200', descripcion: 'Con vegetales asados' }, 
      { nombre: 'Ceviche de Corvina', precio: '$2800', descripcion: 'Pescado fresco marinado' }, 
      { nombre: 'Langostinos al Ajillo', precio: '$3800', descripcion: '6 unidades grandes' }, 
      { nombre: 'Flan Casero', precio: '$1200', descripcion: 'Con dulce de leche' } 
    ], 
    rating: 4.6 
  },
  { 
    id: 6, 
    nombre: 'Burgers & Co', 
    imagen: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', 
    descripcion: 'Hamburguesas gourmet con ingredientes premium y opciones vegetarianas.', 
    ubicacion: 'Palermo Soho, Buenos Aires', 
    telefono: '+54 11 6789-0123', 
    horario: 'Lun-Dom: 19:00-02:00', 
    precio: '€€', 
    especialidad: 'Hamburguesas', 
    menu: [ 
      { nombre: 'Classic Burger', precio: '$2500', descripcion: 'Carne, lechuga, tomate, cebolla' }, 
      { nombre: 'BBQ Bacon', precio: '$3200', descripcion: 'Con panceta y salsa BBQ' }, 
      { nombre: 'Veggie Deluxe', precio: '$2800', descripcion: 'Hamburguesa vegetariana' }, 
      { nombre: 'Papas Fritas', precio: '$1200', descripcion: 'Porción grande con ketchup' }, 
      { nombre: 'Milkshake de Vainilla', precio: '$1800', descripcion: 'Batido cremoso' } 
    ], 
    rating: 4.4 
  }
];

// ========================================
// COMPONENTES DE LA APLICACIÓN
// ========================================

/**
 * COMPONENTE: RestauranteCard
 * 
 * Componente reutilizable que renderiza una tarjeta de restaurante.
 * Utiliza componentes de React Bootstrap (Card, Col) para un diseño responsivo.
 * Demuestra el uso de PropTypes para validar las propiedades recibidas.
 * Incluye información de calificación, especialidad y ubicación.
 * 
 * Props:
 * - restaurante: Objeto con información del restaurante (requerido)
 */
const RestauranteCard = ({ restaurante }) => {
  return (
    // Columna responsiva: 6 columnas en md, 4 en lg
    <Col md={6} lg={4} className="mb-4">
      {/* Tarjeta de Bootstrap con altura completa */}
      <Card className="h-100">
        {/* Imagen del restaurante con estilos inline para controlar dimensiones */}
        <Card.Img 
          variant="top" 
          src={restaurante.imagen} 
          alt={restaurante.nombre} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        
        {/* Cuerpo de la tarjeta con flexbox para distribución vertical */}
        <Card.Body className="d-flex flex-column">
          {/* Header con nombre y calificación */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{restaurante.nombre}</Card.Title>
            <span className="accent-chip">⭐ {restaurante.rating}</span>
          </div>
          
          {/* Descripción del restaurante */}
          <Card.Text className="text-muted small">{restaurante.descripcion}</Card.Text>
          
          {/* Chips informativos con flexbox para distribución horizontal */}
          <div className="mt-auto d-flex justify-content-between align-items-center mb-2">
            <span className="accent-chip">{restaurante.especialidad}</span>
            <span className="accent-chip">{restaurante.precio}</span>
          </div>
          
          {/* Ubicación del restaurante */}
          <div className="small text-muted mb-2">📍 {restaurante.ubicacion}</div>
          
          {/* Botón de navegación a detalles */}
          <Link to={`/actividad3b/restaurante/${restaurante.id}`} className="btn-md w-100">
            Ver Menú y Detalles
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

/**
 * VALIDACIÓN DE PROPTYPES PARA RestauranteCard
 * 
 * Define los tipos y requisitos de las props que recibe el componente.
 * PropTypes ayuda a detectar errores durante el desarrollo y documenta
 * la interfaz del componente. En este caso, valida que restaurante sea un objeto
 * con propiedades específicas y tipos correctos.
 */
RestauranteCard.propTypes = {
  restaurante: PropTypes.shape({
    id: PropTypes.number.isRequired,           // ID único del restaurante
    nombre: PropTypes.string.isRequired,       // Nombre del restaurante
    imagen: PropTypes.string.isRequired,       // URL de la imagen
    descripcion: PropTypes.string.isRequired,  // Descripción del restaurante
    ubicacion: PropTypes.string.isRequired,    // Dirección del restaurante
    especialidad: PropTypes.string.isRequired, // Tipo de cocina
    precio: PropTypes.string.isRequired,       // Rango de precios
    rating: PropTypes.number.isRequired        // Calificación numérica
  }).isRequired
};

/**
 * COMPONENTE: RestauranteDetalle
 * 
 * Componente que muestra información detallada de un restaurante específico.
 * Utiliza useParams para obtener el ID del restaurante desde la URL.
 * Demuestra renderizado condicional, redirección con Navigate y el uso de ListGroup
 * para mostrar menús estructurados.
 * Usa componentes de React Bootstrap para un layout responsivo.
 */
const RestauranteDetalle = () => {
  // ========================================
  // OBTENCIÓN DE PARÁMETROS DE LA URL
  // ========================================
  
  // useParams extrae parámetros dinámicos de la URL
  // En este caso, extrae el 'id' de la ruta '/restaurante/:id'
  const { id } = useParams();
  
  // ========================================
  // BÚSQUEDA DEL RESTAURANTE
  // ========================================
  
  // Busca el restaurante que coincida con el ID de la URL
  // parseInt convierte el string del parámetro a número
  const restaurante = restaurantesData.find(r => r.id === parseInt(id));
  
  // ========================================
  // RENDERIZADO CONDICIONAL
  // ========================================
  
  // Si no se encuentra el restaurante, redirige a la página 404
  if (!restaurante) return <Navigate to="/actividad3b/not-found" replace />;

  // Si se encuentra el restaurante, muestra los detalles
  return (
    <Container className="mt-3">
      {/* Primera fila: imagen e información básica */}
      <Row>
        {/* Columna de imagen */}
        <Col md={6}>
          <img 
            src={restaurante.imagen} 
            alt={restaurante.nombre} 
            className="img-fluid rounded" 
            style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
          />
        </Col>
        
        {/* Columna de información detallada */}
        <Col md={6}>
          {/* Header con nombre y calificación */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h1 className="h3 mb-0">{restaurante.nombre}</h1>
            <span className="accent-chip">⭐ {restaurante.rating}</span>
          </div>
          
          {/* Descripción del restaurante */}
          <p className="md-muted">{restaurante.descripcion}</p>
          
          {/* Información de contacto y detalles en grid responsivo */}
          <div className="md-section">
            <h6 className="mb-2">Información</h6>
            <Row>
              <Col sm={6}>
                <p className="mb-1">
                  <strong>📍 Ubicación:</strong><br />
                  {restaurante.ubicacion}
                </p>
                <p className="mb-1">
                  <strong>📞 Teléfono:</strong><br />
                  {restaurante.telefono}
                </p>
              </Col>
              <Col sm={6}>
                <p className="mb-1">
                  <strong>🕒 Horario:</strong><br />
                  {restaurante.horario}
                </p>
                <p className="mb-1">
                  <strong>💰 Precio:</strong> {restaurante.precio}
                </p>
                <p className="mb-1">
                  <strong>🍽️ Especialidad:</strong> {restaurante.especialidad}
                </p>
              </Col>
            </Row>
          </div>
          
          {/* Botones de acción interactivos */}
          <div className="d-flex gap-2 mb-3">
            <button className="btn-md">📞 Llamar</button>
            <button className="btn-md">❤️ Favoritos</button>
            <button className="btn-md">📍 Cómo llegar</button>
          </div>
        </Col>
      </Row>

      {/* Segunda fila: menú del restaurante */}
      <Row className="mt-4">
        <Col>
          <h3 className="h5 mb-3">🍽️ Menú del Restaurante</h3>
          
          {/* ListGroup de Bootstrap para mostrar el menú de forma estructurada */}
          <ListGroup>
            {restaurante.menu.map((item, index) => (
              <ListGroup.Item 
                key={index} 
                className="d-flex justify-content-between align-items-start"
              >
                {/* Información del plato */}
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.nombre}</div>
                  <small className="text-muted">{item.descripcion}</small>
                </div>
                
                {/* Precio del plato */}
                <span className="accent-chip ms-2">{item.precio}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
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
      <Alert.Heading>Restaurante no encontrado</Alert.Heading>
      <p>El restaurante que buscas no existe.</p>
      
      {/* Botones de navegación con flexbox */}
      <div className="d-flex justify-content-center gap-2">
        <Link to="/actividad3b" className="btn-md">Volver</Link>
        <Link to="/" className="btn-md">Inicio</Link>
      </div>
    </Alert>
  </Container>
);

/**
 * ========================================
 * COMPONENTE PRINCIPAL: Actividad3B
 * ========================================
 * 
 * Este es el componente principal que orquesta toda la actividad 3B.
 * Demuestra el uso de React Router con rutas anidadas y el renderizado
 * de listas de componentes con menús detallados.
 */
const Actividad3B = () => {
  return (
    <div className="activity activity--a3b fade-in">
      {/* 
        ========================================
        HEADER DE LA ACTIVIDAD
        ========================================
        Contiene el título, descripción y chip identificativo
      */}
      <div className="activity-header">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="display-4 mb-1">Actividad 3B: Restaurantes</h1>
            <p className="lead md-muted mb-0">Lista, menús y detalles</p>
          </div>
          <span className="accent-chip">A3B</span>
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
            <li>Lista de restaurantes con imagen y nombre</li>
            <li>Ruta específica con detalles y menú</li>
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
            Estas rutas son relativas al path actual (/actividad3b)
          */}
          <Routes>
            {/* Ruta principal: lista de restaurantes */}
            <Route 
              path="/" 
              element={
                <Row>
                  {/* Mapeo de restaurantes a componentes RestauranteCard */}
                  {restaurantesData.map(restaurante => (
                    <RestauranteCard key={restaurante.id} restaurante={restaurante} />
                  ))}
                </Row>
              } 
            />
            
            {/* Ruta de detalle: información específica de un restaurante */}
            <Route path="/restaurante/:id" element={<RestauranteDetalle />} />
            
            {/* Ruta 404: restaurante no encontrado */}
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
          <Link to="/actividad3a" className="btn-md">← Anterior</Link>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda ser usado en el router principal
export default Actividad3B;
