/**
 * ========================================
 * ACTIVIDAD 1: ESTILOS EN REACT
 * ========================================
 * 
 * Esta actividad demuestra dos formas principales de aplicar estilos en React:
 * 1. Estilos en línea directos (inline styles)
 * 2. Objetos de estilos (style objects)
 * 
 * Objetivo: Aprender las diferencias entre ambos enfoques y cuándo usar cada uno.
 */

// Importaciones necesarias
import React, { useState } from 'react';  // useState para manejar el estado de los botones
import { Link } from 'react-router-dom';  // Link para navegación entre páginas

/**
 * COMPONENTE PRINCIPAL: Actividad1
 * 
 * Este componente renderiza toda la actividad 1, incluyendo:
 * - Header con título y descripción
 * - Dos propuestas de estilos (A y B)
 * - Demos interactivos
 * - Código de ejemplo
 * - Navegación
 */
const Actividad1 = () => {
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  // Estado para controlar la visibilidad del código de la Propuesta A
  const [showCodeA, setShowCodeA] = useState(false);
  
  // Estado para controlar la visibilidad del código de la Propuesta B
  const [showCodeB, setShowCodeB] = useState(false);

  // ========================================
  // RENDERIZADO DEL COMPONENTE
  // ========================================
  
  return (
    <div className="activity activity--a1 fade-in">
      {/* 
        ========================================
        HEADER DE LA ACTIVIDAD
        ========================================
        Contiene el título, descripción y chip identificativo
      */}
      <div className="activity-header">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="display-4 mb-1">Actividad 1: Estilos</h1>
            <p className="lead md-muted mb-0">Estilos en línea y objetos de estilo</p>
          </div>
          <span className="accent-chip">A1</span> {/* Chip identificativo con color pastel */}
        </div>
      </div>

      <div className="activity-content">
        {/* 
          ========================================
          INFORMACIÓN DE LA ACTIVIDAD
          ========================================
          Sección que explica el propósito de la actividad
        */}
        <div className="md-section">
          <h3 className="h5 mb-2">Propósito</h3>
          <p className="mb-0">
            Practicar la aplicación de estilos en React mediante estilos en línea y objetos de estilo.
          </p>
        </div>

        {/* 
          ========================================
          PROPUESTA A: ESTILOS EN LÍNEA DIRECTOS
          ========================================
          Demuestra cómo aplicar estilos directamente en el atributo style
        */}
        <div className="md-section">
          <h4 className="h5 mb-2">Propuesta A: Estilos en Línea Directos</h4>
          <p className="mb-3">
            A partir del siguiente componente StyleMe, agrega estilos en línea al elemento h1 para que tenga
            background "lightblue" y color "darkred".
          </p>

          {/* 
            CÓDIGO ORIGINAL SIN ESTILOS
            Muestra el código base que el estudiante debe modificar
          */}
          <div className="code-example">
            <h6>Código Original:</h6>
            <pre className="mb-0">
{`import React from "react";
import ReactDOM from "react-dom";

const StyleMe = <h1>Please style me! I am so bland!</h1>;

ReactDOM.render(StyleMe, document.getElementById("root"));`}
            </pre>
          </div>

          {/* 
            DEMO INTERACTIVO
            Muestra el resultado visual de aplicar estilos en línea
            Los estilos se aplican directamente en el atributo style del JSX
          */}
          <div className="interactive-demo">
            <h6 className="mb-3">Resultado Interactivo:</h6>
            <h1 
              style={{
                backgroundColor: 'lightblue',  // Propiedad CSS en camelCase
                color: 'darkred',             // Los valores son strings
                padding: '20px',              // Espaciado interno
                borderRadius: '10px',         // Bordes redondeados
                textAlign: 'center',          // Centrar texto
                margin: '20px 0'              // Margen vertical
              }}
            >
              Please style me! I am so bland!
            </h1>
          </div>

          {/* 
            BOTÓN PARA MOSTRAR/OCULTAR CÓDIGO
            Usa el estado showCodeA para controlar la visibilidad
          */}
          <div className="mt-3">
            {/*
              Botón que alterna la visibilidad del bloque de código de la Propuesta A.
              - onClick: invierte el estado booleano `showCodeA` llamando a `setShowCodeA(!showCodeA)`.
              - Texto del botón: muestra "Ocultar" cuando `showCodeA` es true (el código está visible),
                o "Ver" cuando `showCodeA` es false (el código está oculto).
              - Más abajo en el componente se usa `showCodeA` para renderizar condicionalmente
                el bloque de solución: `{showCodeA && ( ... )}`.
            */}
            <button 
              className="btn-md"
              onClick={() => setShowCodeA(!showCodeA)}
            >
              {showCodeA ? 'Ocultar' : 'Ver'} Código de la Solución
            </button>
            
            {/* 
              CÓDIGO DE LA SOLUCIÓN
              Se muestra condicionalmente basado en el estado showCodeA
            */}
            {showCodeA && (
              <div className="code-example mt-3">
                <h6>Solución:</h6>
                <pre className="mb-0">
{`import React from "react";
import ReactDOM from "react-dom";

// Aplicamos estilos en línea directamente en el elemento h1
const StyleMe = (
  <h1 
    style={{
      backgroundColor: 'lightblue',  // Fondo azul claro
      color: 'darkred',             // Color de texto rojo oscuro
      padding: '20px',              // Espaciado interno
      borderRadius: '10px',         // Bordes redondeados
      textAlign: 'center',          // Centrar texto
      margin: '20px 0'              // Margen vertical
    }}
  >
    Please style me! I am so bland!
  </h1>
);

ReactDOM.render(StyleMe, document.getElementById("root"));`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* 
          ========================================
          PROPUESTA B: OBJETO DE ESTILOS
          ========================================
          Demuestra cómo usar objetos de JavaScript para organizar estilos
        */}
        <div className="md-section">
          <h4 className="h5 mb-2">Propuesta B: Objeto de Estilos</h4>
          <p className="mb-3">
            Aplicar estilos en línea en React puede resultar molesto si se desea usar más que solo unos pocos estilos.
            Una alternativa más agradable es almacenar un objeto de estilo en una variable e inyectar esa variable en JSX.
          </p>
          <p className="mb-3">
            A partir del componente StyleMe de la actividad anterior, declara una nueva constante llamada
            <code> styles</code> y asigna los estilos background "lightblue" y color "darkred" al elemento h1.
          </p>

          {/* Código original (igual que en la Propuesta A) */}
          <div className="code-example">
            <h6>Código Original:</h6>
            <pre className="mb-0">
{`import React from "react";
import ReactDOM from "react-dom";

const StyleMe = <h1>Please style me! I am so bland!</h1>;

ReactDOM.render(StyleMe, document.getElementById("root"));`}
            </pre>
          </div>

          {/* 
            DEMO INTERACTIVO CON OBJETO DE ESTILOS
            Usa una función inmediatamente invocada (IIFE) para crear el objeto de estilos
            y aplicarlo al elemento h1
          */}
          <div className="interactive-demo">
            <h6 className="mb-3">Resultado Interactivo:</h6>
            {(() => {
              // Declaramos el objeto de estilos como una constante
              const styles = {
                backgroundColor: 'lightblue',  // Fondo azul claro
                color: 'darkred',             // Color de texto rojo oscuro
                padding: '20px',              // Espaciado interno
                borderRadius: '10px',         // Bordes redondeados
                textAlign: 'center',          // Centrar texto
                margin: '20px 0',             // Margen vertical
                border: '2px solid #007bff',  // Borde azul adicional
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Sombra sutil
              };

              // Retornamos el JSX con los estilos aplicados
              return (
                <h1 style={styles}>
                  Please style me! I am so bland!
                </h1>
              );
            })()}
          </div>

          {/* Botón para mostrar/ocultar código de la Propuesta B */}
          <div className="mt-3">
            <button 
              className="btn-md"
              onClick={() => setShowCodeB(!showCodeB)}
            >
              {showCodeB ? 'Ocultar' : 'Ver'} Código de la Solución
            </button>
            
            {/* Código de la solución para la Propuesta B */}
            {showCodeB && (
              <div className="code-example mt-3">
                <h6>Solución:</h6>
                <pre className="mb-0">
{`import React from "react";
import ReactDOM from "react-dom";

// Declaramos un objeto de estilos como constante
const styles = {
  backgroundColor: 'lightblue',  // Fondo azul claro
  color: 'darkred',             // Color de texto rojo oscuro
  padding: '20px',              // Espaciado interno
  borderRadius: '10px',         // Bordes redondeados
  textAlign: 'center',          // Centrar texto
  margin: '20px 0',             // Margen vertical
  border: '2px solid #007bff',  // Borde azul
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Sombra sutil
};

// Aplicamos los estilos usando el objeto
const StyleMe = <h1 style={styles}>Please style me! I am so bland!</h1>;

ReactDOM.render(StyleMe, document.getElementById("root"));`}
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
          <Link to="/actividad2" className="btn-md">Siguiente →</Link>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default Actividad1;
