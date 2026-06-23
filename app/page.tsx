"use client";

import { useState, useEffect } from "react";

// Inyección de estilos de tipografías premium y parches de color blindados
const EstilosTipografia = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
    
    .font-lab-titulo {
      font-family: 'Playfair Display', serif;
    }
    .font-lab-texto {
      font-family: 'Inter', sans-serif;
    }
  `}</style>
);

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  destacado: boolean;
  descBreve: string;
  mecanismo: string;
  research: string;
  dosis: string;
  imagen: string;
};

const PRODUCTOS: Producto[] = [
  { 
    id: 1, 
    nombre: "Retatrutide 10mg", 
    precio: 190, 
    stock: 14,
    destacado: true,
    descBreve: "Agonista triple avanzado para optimización metabólica y control de peso celular.",
    mecanismo: "Activa los receptores de GLP-1, GIP y glucagón de manera simultánea para un enfoque metabólico de triple objetivo.",
    research: "Promueve una pérdida de tejido graso significativa y la regulación profunda de los mecanismos del apetito, ofreciendo una alternativa clínica para pacientes que han alcanzado un plateau con terapias duales.",
    dosis: "Protocolo inicial de 0.5mg por vía subcutánea una vez por semana. Incrementos paulatinos de 0.5mg a 1mg cada 2 o 4 semanas según tolerancia. Conservar en entorno refrigerado tras su reconstitución.",
    imagen: "/retatrutide.png"
  },
  { 
    id: 2, 
    nombre: "Retatrutide 30mg", 
    precio: 360, 
    stock: 8,
    destacado: true,
    descBreve: "Fórmula de alta concentración para protocolos extendidos de optimización.",
    mecanismo: "Activación sinérgica de los tres receptores incretínicos principales (GLP-1/GIP/Glucagón) para maximizar el gasto energético.",
    research: "Diseñado para fases avanzadas de recomposición corporal y estudios de resistencia metabólica en sujetos con adaptaciones previas.",
    dosis: "Administración semanal vía subcutánea. Reconstituir estrictamente con agua bacteriostática. La dosis de mantenimiento recomendada oscila entre 1mg y 3mg semanales.",
    imagen: "/retatrutide.png"
  },
  { 
    id: 3, 
    nombre: "CJC-1295 / Ipamorelin 5mg/5mg", 
    precio: 120, 
    stock: 22,
    destacado: true,
    descBreve: "Sinergia de péptidos liberadores de hormona de crecimiento de acción biológica selectiva.",
    mecanismo: "El análogo de GHRH (CJC-1295 sin DAC) y el secretagogo GHRP (Ipamorelin) estimulan pulsos naturales de GH sin alterar los niveles de cortisol o prolactina.",
    research: "Estudiado para la mejora de la composición corporal, el desarrollo de masa magra y la aceleración de los procesos de recuperación celular.",
    dosis: "Dosis estándar aplicada de 1 a 3 veces al día en estado de ayuno prolongado (mínimo 30 minutos antes de la ingesta de alimentos o 90 minutos después).",
    imagen: "/cjc.png"
  },
  { 
    id: 4, 
    nombre: "Glow (GHK-Cu / BPC-157 / TB-500)", 
    precio: 190, 
    stock: 5,
    destacado: false,
    descBreve: "Fórmula maestra regenerativa orientada a la síntesis de colágeno y antienvejecimiento celular.",
    mecanismo: "Fusión molecular que aprovecha las propiedades de miogénesis y remodelación tisular del péptido de cobre junto a las capacidades de reparación del BPC y TB.",
    research: "Evidencia clínica orientada a la aceleración de la cicatrización cutánea, la renovación de la elasticidad de la dermis y el estímulo folicular capilar.",
    dosis: "Aplicación subcutánea o intradérmica localizada. Protocolo diario de mantenimiento o doble dosis en fases de recuperación cutánea activa.",
    imagen: "/glow.png"
  },
  { 
    id: 5, 
    nombre: "MOTS-c 40mg", 
    precio: 160, 
    stock: 11,
    destacado: false,
    descBreve: "Péptido de origen mitocondrial regulador del metabolismo energético y la longevidad.",
    mecanismo: "Involucrado de forma directa en la homeostasis de la glucosa celular y la amplificación de la sensibilidad a la insulina a nivel muscular.",
    research: "Asociado al incremento de la resistencia física en el ejercicio y la prevención de la disfunción metabólica vinculada al envejecimiento.",
    dosis: "Protocolo de 5mg a 15mg por dosis por vía subcutánea, administrado de 2 a 3 veces por semana, idealmente en horario matutino previo al entrenamiento.",
    imagen: "/motsc.png"
  },
  { 
    id: 6, 
    nombre: "Wolverine (BPC-157 / TB-500)", 
    precio: 160, 
    stock: 0, 
    destacado: true,
    descBreve: "Complejo avanzado para la reparación acelerada del sistema osteoarticular y conectivo.",
    mecanismo: "Modulación de las vías inflamatorias y estímulo de la angiogénesis para la formación de nuevos vasos sanguíneos en tejidos de baja irrigación.",
    research: "Eficacia demostrada en la recuperación de desgarros musculares, distensiones de ligamentos, tendinopatías crónicas y salud de la barrera intestinal.",
    dosis: "Administración subcutánea (perilesional) o intramuscular profunda. Frecuencia recomendada de 1 a 2 veces al día durante ciclos de 4 a 6 semanas.",
    imagen: "/wolverine.png"
  },
  { 
    id: 7, 
    nombre: "Tesamorelin / Ipamorelin 10mg/10mg", 
    precio: 150, 
    stock: 19,
    destacado: false,
    descBreve: "Protocolo premium de reducción de tejido adiposo visceral y soporte celular.",
    mecanismo: "El análogo de GHRH Tesamorelin actúa de manera específica sobre la reducción de grasa ectópica y visceral profunda, potenciado por la acción del Ipamorelin.",
    research: "Altamente efectivo para fases estrictas de recomposición estética y optimización del perfil lipídico sin generar picos glucémicos.",
    dosis: "Inyección subcutánea en la zona abdominal antes de dormir o inmediatamente al despertar, manteniendo un ayuno estricto post-aplicación.",
    imagen: "/tesamorelin.png"
  },
  { 
    id: 8, 
    nombre: "Agua Bacteriostática 30ml", 
    precio: 30, 
    stock: 50,
    destacado: false,
    descBreve: "Solución estéril con agente bacteriostático para la correcta preservación de péptidos.",
    mecanismo: "Contiene alcohol bencílico al 0.9% para inhibir el crecimiento bacteriano dentro del vial tras su perforación inicial.",
    research: "Estándar de laboratorio requerido para la reconstitución segura y el mantenimiento de la estabilidad de compuestos liofilizados.",
    dosis: "Utilizar la cantidad exacta recomendada según el mapa de dilución del péptido (comúnmente entre 1mL y 3mL por vial). Mantener el remanente refrigerado.",
    imagen: "/bacwater.png"
  },
];

export default function Home() {
  const [carrito, setCarrito] = useState<{ id: number; nombre: string; precio: number; cantidad: number }[]>([]);
  const [vista, setVista] = useState<"inicio" | "catalogo" | "about" | "contacto" | "carrito" | "detalle">("inicio");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [indexCarrusel, setIndexCarrusel] = useState(0);

  const destacados = PRODUCTOS.filter(p => p.destacado);

  useEffect(() => {
    if (vista === "inicio") {
      const interval = setInterval(() => {
        setIndexCarrusel((prev) => (prev + 1) % destacados.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [vista, destacados.length]);

  const agregarAlCarrito = (producto: Producto) => {
    if (producto.stock === 0) return;
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
      }
      return [...prev, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }];
    });
    alert(`✅ ¡Agregaste ${producto.nombre} al pedido!`);
  };

  const verDetalleProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setVista("detalle");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sumarCantidad = (id: number) => {
    setCarrito((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)));
  };

  const avanzarRestarCantidad = (id: number) => {
    setCarrito((prev) => prev.map((item) => (item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item)));
  };

  const eliminarProducto = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const comprarPorWhatsApp = () => {
    if (carrito.length === 0) return;
    const numeroWhatsApp = "5493815450641"; 
    let mensaje = "🔬 *NUEVO PEDIDO - PEPTI AGE* 🔬%0A%0A";
    carrito.forEach((item) => { mensaje += `▪️ ${item.cantidad}x ${item.nombre} (U$S ${item.precio * item.cantidad})%0A`; });
    mensaje += `%0A💰 *TOTAL: U$S ${totalCarrito}*%0A%0AHola! Me gustaría coordinar el pago y envío de este pedido.`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#050F24] font-lab-texto text-slate-100 pb-32 relative overflow-x-hidden selection:bg-[#D4AF37]/30">
      <EstilosTipografia />
      
      {/* MENÚ DE NAVEGACIÓN COMPATIBLE */}
      <header className="bg-[#050F24]/90 backdrop-blur-md text-white py-6 sticky top-0 z-50 border-b border-white/10 shadow-2xl">
        <div className="container mx-auto max-w-5xl px-6 flex justify-between items-center">
          <button onClick={() => setVista("inicio")} className="text-2xl md:text-3xl font-lab-titulo font-bold tracking-[0.2em] text-[#D4AF37] bg-transparent border-none cursor-pointer">
            PEPTI AGE
          </button>
          
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase font-medium text-slate-300">
            <button onClick={() => setVista("inicio")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "inicio" ? "text-[#D4AF37]" : ""}`}>Inicio</button>
            <button onClick={() => setVista("catalogo")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "catalogo" ? "text-[#D4AF37]" : ""}`}>Productos</button>
            <button onClick={() => setVista("about")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "about" ? "text-[#D4AF37]" : ""}`}>Nosotros</button>
            <button onClick={() => setVista("contacto")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "contacto" ? "text-[#D4AF37]" : ""}`}>Contacto</button>
          </nav>
          
          <button onClick={() => setVista("carrito")} className="bg-transparent text-[#D4AF37] hover:text-[#050F24] hover:bg-[#D4AF37] px-6 py-2.5 rounded font-semibold text-xs tracking-widest uppercase border border-[#D4AF37] transition-all duration-300 flex items-center gap-2">
            🛒 PEDIDO ({cantidadItems})
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL */}
      <div className="md:hidden bg-[#0A1630] py-4 px-6 flex justify-around border-b border-white/10 text-xs tracking-wider font-medium text-slate-300">
        <button onClick={() => setVista("inicio")} className="bg-transparent border-none">Inicio</button>
        <button onClick={() => setVista("catalogo")} className="bg-transparent border-none">Productos</button>
        <button onClick={() => setVista("about")} className="bg-transparent border-none">Nosotros</button>
        <button onClick={() => setVista("contacto")} className="bg-transparent border-none">Contacto</button>
      </div>

      {/* ==================== VISTA 1: INICIO ==================== */}
      {vista === "inicio" && (
        <div className="space-y-24">
          {/* BIENVENIDA */}
          <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-7xl font-lab-titulo font-bold tracking-wide text-white leading-tight">
              PEPTI AGE <span className="text-[#D4AF37] block mt-4 font-normal italic text-2xl md:text-5xl tracking-[0.15em]">BIENESTAR MOLECULAR</span>
            </h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: '#e2e8f0' }}>
              Péptidos liofilizados de grado de investigación con estándares de máxima pureza para optimización biológica.
            </p>
            <div className="pt-4">
              <button onClick={() => setVista("catalogo")} className="bg-[#D4AF37] text-[#050F24] font-semibold tracking-widest text-xs uppercase px-10 py-4 rounded shadow-xl hover:bg-transparent hover:text-white border border-[#D4AF37] transition-all duration-300">
                Ver Catálogo Oficial
              </button>
            </div>
          </section>

          {/* POR QUÉ ELEGIRNOS */}
          <section className="py-24 bg-[#08142D] border-y border-white/10 px-6">
            <div className="container mx-auto max-w-5xl text-center space-y-16">
              <div>
                <span className="text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-2">Beneficios de Laboratorio</span>
                <h2 className="text-3xl md:text-5xl font-lab-titulo font-light tracking-wide text-white">EXCELENCIA EN INVESTIGACIÓN</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                <div className="bg-[#050F24] p-8 rounded-xl border border-white/10 space-y-4 shadow-xl">
                  <span className="text-3xl block">💎</span>
                  <h4 className="font-lab-titulo text-xl text-[#D4AF37] font-semibold">Pureza 99%+ Garantizada</h4>
                  <p className="text-sm font-light leading-relaxed" style={{ color: '#cbd5e1' }}>Cada lote es sometido a estrictos análisis analíticos de espectrometría de masas y HPLC en laboratorios externos certificados.</p>
                </div>
                <div className="bg-[#050F24] p-8 rounded-xl border border-white/10 space-y-4 shadow-xl">
                  <span className="text-3xl block">📦</span>
                  <h4 className="font-lab-titulo text-xl text-[#D4AF37] font-semibold">Importación Directa USA</h4>
                  <p className="text-sm font-light leading-relaxed" style={{ color: '#cbd5e1' }}>Distribución e importación directa, resguardada de manera estricta bajo protocolos de cadena de frío continuo.</p>
                </div>
                <div className="bg-[#050F24] p-8 rounded-xl border border-white/10 space-y-4 shadow-xl">
                  <span className="text-3xl block">🔬</span>
                  <h4 className="font-lab-titulo text-xl text-[#D4AF37] font-semibold">Certificación Científica</h4>
                  <p className="text-sm font-light leading-relaxed" style={{ color: '#cbd5e1' }}>Transparencia absoluta. Fichas descriptivas y especificaciones basadas rigurosamente en literatura científica internacional.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CARRUSEL DE COMPUESTOS DESTACADOS */}
          <section className="py-12 px-6 container mx-auto max-w-4xl text-center space-y-12">
            <div>
              <span className="text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-2">Selección Especial</span>
              <h2 className="text-3xl md:text-4xl font-lab-titulo font-light text-white">COMPUESTOS DESTACADOS</h2>
            </div>
            
            <div className="bg-[#0A1630] p-8 md:p-12 rounded-2xl border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center gap-10 text-left relative transition-all duration-500">
              {/* CUADRO DE IMAGEN EN PAUSA VACÍO */}
              <div className="w-36 h-36 flex-shrink-0 bg-transparent rounded-xl border border-[#D4AF37]/40 flex items-center justify-center text-center p-2 text-[10px] text-[#D4AF37] tracking-widest font-mono uppercase">
                [ Vial Box ]
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="font-lab-titulo text-2xl font-bold text-[#D4AF37]">{destacados[indexCarrusel].nombre}</h3>
                  <span className="font-mono text-xl font-medium" style={{ color: '#ffffff' }}>U$S {destacados[indexCarrusel].precio}</span>
                </div>
                <p className="text-base font-normal leading-relaxed" style={{ color: '#e2e8f0' }}>{destacados[indexCarrusel].descBreve}</p>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => verDetalleProducto(destacados[indexCarrusel])} className="bg-transparent hover:bg-white/5 text-white py-2.5 px-6 rounded border border-white/30 text-xs tracking-widest uppercase transition-colors">
                    Ver Detalles
                  </button>
                  <button onClick={() => agregarAlCarrito(destacados[indexCarrusel])} className="bg-[#D4AF37] text-[#050F24] font-bold py-2.5 px-6 rounded text-xs tracking-widest uppercase border-none cursor-pointer">
                    Añadir al Pedido
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-6 flex gap-2">
                {destacados.map((_, i) => (
                  <button key={i} onClick={() => setIndexCarrusel(i)} className={`w-2.5 h-2.5 rounded-full p-0 border-none cursor-pointer transition-all ${i === indexCarrusel ? "bg-[#D4AF37] w-5" : "bg-white/20"}`}></button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ==================== VISTA 2: CATÁLOGO CON STOCK INCLUIDO ==================== */}
      {vista === "catalogo" && (
        <section className="py-24 px-6 container mx-auto max-w-4xl space-y-16">
          <div className="text-center">
            <span className="text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-2">Gama de Investigación</span>
            <h2 className="text-3xl md:text-5xl font-lab-titulo font-light text-white">TODOS LOS PÉPTIDOS</h2>
          </div>

          <div className="flex flex-col gap-12">
            {PRODUCTOS.map((prod) => (
              <div key={prod.id} className="bg-[#0A1630] p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-8 items-center shadow-xl transition-all duration-300 hover:border-[#D4AF37]/30">
                
                {/* CUADRO DE IMAGEN EN PAUSA VACÍO */}
                <div className="w-32 h-32 flex-shrink-0 bg-transparent rounded-xl border border-white/20 flex items-center justify-center text-center p-2 text-[10px] text-slate-500 tracking-wider font-mono uppercase">
                  [ Vial Box ]
                </div>

                <div className="flex-1 w-full flex flex-col text-left space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <h4 className="font-lab-titulo text-2xl font-bold text-[#D4AF37]">{prod.nombre}</h4>
                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      {prod.stock === 0 ? (
                        <span className="text-[10px] tracking-widest uppercase font-bold text-red-400 bg-red-400/10 px-2.5 py-1 rounded border border-red-400/30">Sin Stock</span>
                      ) : (
                        <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/30">Disponible ({prod.stock})</span>
                      )}
                      <span className="font-mono text-xl font-medium" style={{ color: '#ffffff' }}>U$S {prod.precio}</span>
                    </div>
                  </div>
                  
                  <p className="text-base font-normal leading-relaxed" style={{ color: '#e2e8f0' }}>{prod.descBreve}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 gap-4">
                    <button onClick={() => verDetalleProducto(prod)} className="text-xs font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-wider bg-transparent border-none cursor-pointer">
                      Ver Especificaciones Ficha →
                    </button>
                    <button 
                      onClick={() => agregarAlCarrito(prod)} 
                      disabled={prod.stock === 0}
                      className={`font-bold py-2.5 px-6 rounded text-xs tracking-widest uppercase transition-all border ${prod.stock === 0 ? "border-white/10 text-slate-600 bg-transparent cursor-not-allowed" : "border-[#D4AF37] bg-[#D4AF37] text-[#050F24] hover:bg-transparent hover:text-[#D4AF37]"}`}
                    >
                      {prod.stock === 0 ? "Agotado" : "Añadir al Pedido"}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== VISTA 3: FICHA DE DETALLE INDIVIDUAL COMPLETA ==================== */}
      {vista === "detalle" && productoSeleccionado && (
        <section className="py-24 px-6 container mx-auto max-w-4xl">
          <button onClick={() => setVista("catalogo")} className="text-xs font-semibold tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors mb-8 bg-transparent border-none cursor-pointer">
            ← Volver al Catálogo
          </button>

          <div className="bg-[#0A1630] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl space-y-12">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start border-b border-white/10 pb-10">
              {/* CUADRO DE IMAGEN EN PAUSA VACÍO */}
              <div className="w-48 h-48 bg-transparent rounded-xl border border-white/20 flex items-center justify-center text-center p-2 text-xs text-slate-500 tracking-wider font-mono uppercase flex-shrink-0">
                [ Vial Box ]
              </div>
              
              <div className="flex-1 w-full space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-3xl md:text-4xl font-lab-titulo font-bold text-[#D4AF37]">{productoSeleccionado.nombre}</h2>
                  <span className="font-mono text-3xl font-medium" style={{ color: '#ffffff' }}>U$S {productoSeleccionado.precio}</span>
                </div>
                <div>
                  {productoSeleccionado.stock === 0 ? (
                    <span className="text-xs tracking-widest uppercase font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded border border-red-400/20">Agotado Temporalmente</span>
                  ) : (
                    <span className="text-xs tracking-widest uppercase font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded border border-emerald-400/20">Unidades en Reserva Logística: {productoSeleccionado.stock}</span>
                  )}
                </div>
                <p className="text-lg font-normal leading-relaxed pt-2" style={{ color: '#e2e8f0' }}>{productoSeleccionado.descBreve}</p>
                <div className="pt-4">
                  <button 
                    onClick={() => agregarAlCarrito(productoSeleccionado)} 
                    disabled={productoSeleccionado.stock === 0}
                    className={`w-full sm:w-auto font-bold py-3.5 px-10 rounded text-xs tracking-widest uppercase transition-all ${productoSeleccionado.stock === 0 ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5" : "bg-[#D4AF37] text-[#050F24] hover:bg-transparent hover:text-[#D4AF37] border border-[#D4AF37]"}`}
                  >
                    {productoSeleccionado.stock === 0 ? "Sin Suministro" : "Reservar este compuesto"}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-left space-y-10 pt-4">
              <div className="space-y-3">
                <h4 className="text-xs tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">Mecanismo Molecular de Acción</h4>
                <div className="bg-[#050F24] p-6 rounded-xl border border-white/5 text-base font-light leading-relaxed" style={{ color: '#e2e8f0' }}>
                  {productoSeleccionado.mecanismo}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">Información de Investigación y Datos Clínicos</h4>
                <div className="bg-[#050F24] p-6 rounded-xl border border-white/5 text-base font-light leading-relaxed" style={{ color: '#e2e8f0' }}>
                  {productoSeleccionado.research}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs tracking-[0.25em] font-semibold text-[#D4AF37] uppercase">Pautas de Reconstitución y Protocolo de Dosificación</h4>
                <div className="bg-[#050F24] p-6 rounded-xl border border-white/5 text-base font-light leading-relaxed" style={{ color: '#e2e8f0' }}>
                  {productoSeleccionado.dosis}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== VISTA 4: NOSOTROS ==================== */}
      {vista === "about" && (
        <section className="py-24 px-6 container mx-auto max-w-3xl text-left">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-2">Trayectoria y Confianza</span>
            <h2 className="text-3xl md:text-5xl font-lab-titulo font-light text-white">QUIÉNES SOMOS</h2>
          </div>
          <div className="bg-[#0A1630] p-8 rounded-2xl border border-white/10 space-y-6 font-normal text-base leading-relaxed shadow-2xl" style={{ color: '#e2e8f0' }}>
            <p>
              En <strong className="text-white font-medium">Pepti Age</strong> nos dedicamos a la distribución de péptidos liofilizados de grado de investigación con los más altos estándares de pureza del mercado, actuando como canal logístico directo de laboratorios consolidados en Estados Unidos como <strong className="text-[#D4AF37]">RxWellHealth</strong>.
            </p>
            <p>
              Nuestra misión principal es brindar herramientas confiables y transparentes para la comunidad científica y de salud en Argentina. No añadimos rellenos, aditivos ni alteramos las composiciones originales de fábrica; entregamos pureza biológica bajo auditoría médica constante.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center pt-6 border-t border-white/10">
              <div className="p-5 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-2xl font-lab-titulo font-bold text-[#D4AF37]">99.8%</span>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Pureza Analítica</p>
              </div>
              <div className="p-5 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-2xl font-lab-titulo font-bold text-[#D4AF37]">100%</span>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Origen Certificado</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== VISTA 5: CONTACTO ==================== */}
      {vista === "contacto" && (
        <section className="py-24 px-6 container mx-auto max-w-xl text-left">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-2">Canal Abierto</span>
            <h2 className="text-3xl md:text-5xl font-lab-titulo font-light text-white">COMUNICATE CON NOSOTROS</h2>
          </div>
          <div className="bg-[#0A1630] p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
            <p className="font-normal text-center leading-relaxed text-sm" style={{ color: '#e2e8f0' }}>
              Si sos profesional de la salud, investigador científico o necesitas asistencia logística masiva con la adquisición y dosificación, ponte en contacto directo con nuestros asesores.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-xl">📲</span>
                <div>
                  <h5 className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">Soporte WhatsApp Oficial</h5>
                  <p className="text-white text-sm font-mono font-light">+54 9 381 545-0641</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-xl">📍</span>
                <div>
                  <h5 className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">Puntos de Distribución</h5>
                  <p className="text-slate-300 text-sm font-light">Tucumán / Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button onClick={() => window.open("https://wa.me/5493815450641", "_blank")} className="w-full bg-[#D4AF37] text-[#050F24] font-bold text-xs tracking-[0.2em] py-4 rounded uppercase border-none cursor-pointer hover:opacity-90 transition-opacity">
                Abrir Mensaje de WhatsApp
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ==================== VISTA 6: CARRITO DE COMPRAS ==================== */}
      {vista === "carrito" && (
        <section className="py-24 px-6 container mx-auto max-w-2xl min-h-[60vh] text-left">
          <button onClick={() => setVista("catalogo")} className="text-xs font-semibold tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors mb-8 bg-transparent border-none cursor-pointer">
            ← Volver a Productos
          </button>
          <h2 className="text-3xl font-lab-titulo font-bold text-white mb-8">Tu Selección de Pedido</h2>

          {carrito.length === 0 ? (
            <div className="bg-[#0A1630] p-12 rounded-xl border border-white/10 text-center text-slate-400 shadow-xl">
              <p className="text-base font-light mb-6">Tu carrito científico se encuentra vacío.</p>
              <button onClick={() => setVista("catalogo")} className="bg-transparent text-[#D4AF37] hover:text-[#050F24] hover:bg-[#D4AF37] font-semibold py-2.5 px-6 rounded border border-[#D4AF37] text-xs tracking-widest uppercase transition-all">
                Explorar Compuestos
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#0A1630] rounded-xl border border-white/10 divide-y divide-white/10 overflow-hidden shadow-2xl">
                {carrito.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/[0.01] transition-colors">
                    <div>
                      <h4 className="font-lab-titulo text-lg font-bold text-white tracking-wide">{item.nombre}</h4>
                      <p className="text-[#D4AF37] font-mono text-xs mt-0.5">U$S {item.precio} por unidad</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center border border-white/20 rounded bg-black/20 text-xs font-mono">
                        <button onClick={() => avanzarRestarCantidad(item.id)} className="px-3 py-1 text-slate-400 hover:text-white transition-colors font-bold bg-transparent border-none cursor-pointer">-</button>
                        <span className="px-2 font-bold text-slate-200 min-w-6 text-center">{item.cantidad}</span>
                        <button onClick={() => sumarCantidad(item.id)} className="px-3 py-1 text-slate-400 hover:text-white transition-colors font-bold bg-transparent border-none cursor-pointer">+</button>
                      </div>
                      <p className="font-mono text-white text-base min-w-[70px] text-right">U$S {item.precio * item.cantidad}</p>
                      <button onClick={() => eliminarProducto(item.id)} className="text-red-400/80 hover:text-red-400 text-xs bg-transparent border-none cursor-pointer uppercase tracking-wider font-semibold">
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#0A1630] p-6 rounded-xl border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 text-sm tracking-widest uppercase font-medium">Total de la Orden:</span>
                  <span className="text-2xl font-mono text-[#D4AF37]">U$S {totalCarrito}</span>
                </div>
                <button onClick={comprarPorWhatsApp} className="w-full bg-[#D4AF37] text-[#050F24] font-bold text-xs tracking-[0.2em] py-4 rounded hover:opacity-90 transition-opacity uppercase text-center flex items-center justify-center gap-2 border-none cursor-pointer">
                  📲 Confirmar Orden vía WhatsApp
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#020714] py-14 px-6 border-t border-white/10 text-center mt-24">
        <p className="text-[10px] tracking-[0.25em] font-light text-slate-400 max-w-4xl mx-auto leading-relaxed uppercase">
          AVISO LEGAL: Compuestos químicos destinados exclusivamente a fines de investigación in-vitro y desarrollo analítico de laboratorio. No aptos para uso clínico humano ni veterinario directo.
        </p>
      </footer>
    </main>
  );
}