"use client";

import { useState, useEffect } from "react";

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

// BASE DE DATOS OFICIAL CON STOCK REAL E INDICADOR DE DESTACADOS
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
    stock: 0, // Sin stock para simular el cartel "Out of Stock" de LionElite
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

  // Auto-reproducción del carrusel de destacados estilo LionElite
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
    alert(`✅ ¡Agregaste ${producto.nombre} al carrito!`);
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
    <main className="min-h-screen bg-[#050F24] font-sans text-slate-100 pb-12 relative overflow-x-hidden selection:bg-[#D4AF37]/30">
      
      {/* GLOW ATMOSFÉRICO AMBIENTAL */}
      <div className="absolute top-[-5%] left-[-10%] w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-[#0B1B3D]/30 rounded-full blur-[180px] pointer-events-none"></div>

      {/* MENÚ DE NAVEGACIÓN MODERNO */}
      <header className="bg-[#050F24]/90 backdrop-blur-md text-white py-5 sticky top-0 z-50 border-b border-white/5">
        <div className="container mx-auto max-w-5xl px-6 flex justify-between items-center">
          <button onClick={() => setVista("inicio")} className="text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] text-[#D4AF37] bg-transparent border-none cursor-pointer">
            PEPTI AGE
          </button>
          
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-light text-slate-300">
            <button onClick={() => setVista("inicio")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "inicio" ? "text-[#D4AF37] font-normal" : ""}`}>Home</button>
            <button onClick={() => setVista("catalogo")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "catalogo" ? "text-[#D4AF37] font-normal" : ""}`}>Products</button>
            <button onClick={() => setVista("about")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "about" ? "text-[#D4AF37] font-normal" : ""}`}>About Us</button>
            <button onClick={() => setVista("contacto")} className={`bg-transparent border-none cursor-pointer hover:text-[#D4AF37] transition-colors ${vista === "contacto" ? "text-[#D4AF37] font-normal" : ""}`}>Contact</button>
          </nav>
          
          <button onClick={() => setVista("carrito")} className="bg-transparent text-white hover:text-[#050F24] hover:bg-[#D4AF37] px-5 py-2 rounded font-medium text-xs tracking-widest uppercase border border-[#D4AF37] transition-all duration-300 flex items-center gap-2">
            🛒 CART ({cantidadItems})
          </button>
        </div>
      </header>

      {/* SECCIÓN NAV PARA MÓVILES */}
      <div className="md:hidden bg-[#0A1630] py-3 px-6 flex justify-around border-b border-white/5 text-[10px] uppercase tracking-wider font-light text-slate-400">
        <button onClick={() => setVista("inicio")} className="bg-transparent border-none">Home</button>
        <button onClick={() => setVista("catalogo")} className="bg-transparent border-none">Products</button>
        <button onClick={() => setVista("about")} className="bg-transparent border-none">About</button>
        <button onClick={() => setVista("contacto")} className="bg-transparent border-none">Contact</button>
      </div>

      {/* ==================== VISTA 1: HOME (INICIO) ==================== */}
      {vista === "inicio" && (
        <>
          {/* HERO BANNER */}
          <section className="py-24 px-6 text-center max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-7xl font-serif font-medium mb-6 tracking-wide text-white leading-tight">
              PEPTI AGE <span className="text-[#D4AF37] block mt-2 font-light italic text-3xl md:text-5xl tracking-[0.1em]">MOLECULAR WELLNESS</span>
            </h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto text-slate-400 font-light leading-relaxed mb-8">
              Premium grade liofilizados de máxima pureza para optimización biológica y desarrollo celular.
            </p>
            <button onClick={() => setVista("catalogo")} className="bg-[#D4AF37] text-[#050F24] font-semibold tracking-widest text-xs uppercase px-8 py-3.5 rounded shadow-xl hover:bg-transparent hover:text-white border border-[#D4AF37] transition-all duration-300">
              Explore Products
            </button>
          </section>

          {/* COMPONENTE PRINCIPAL: POR QUÉ ELEGIRNOS */}
          <section className="py-16 bg-[#08142D]/50 border-y border-white/5 px-6">
            <div className="container mx-auto max-w-5xl text-center">
              <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-3">Why Choose Us</span>
              <h2 className="text-2xl md:text-4xl font-serif font-light tracking-wide text-white mb-12">RESEARCH EXCELLENCE</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-[#050F24] p-6 rounded-xl border border-white/5">
                  <span className="text-2xl mb-3 block">💎</span>
                  <h4 className="font-serif text-lg text-[#D4AF37] mb-2 font-medium">99%+ Purity Guaranteed</h4>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">Cada lote es sometido a rigurosos análisis de espectrometría de masas y HPLC de laboratorios externos certificados.</p>
                </div>
                <div className="bg-[#050F24] p-6 rounded-xl border border-white/5">
                  <span className="text-2xl mb-3 block">🏅</span>
                  <h4 className="font-serif text-lg text-[#D4AF37] mb-2 font-medium">Direct USA Import</h4>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">Distribución oficial directa en el país, almacenada en condiciones óptimas de cadena de frío constante.</p>
                </div>
                <div className="bg-[#050F24] p-6 rounded-xl border border-white/5">
                  <span className="text-2xl mb-3 block">📜</span>
                  <h4 className="font-serif text-lg text-[#D4AF37] mb-2 font-medium">Full Lab Certified</h4>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">Transparencia analítica completa. Fichas de composición real basadas estrictamente en literatura científica internacional.</p>
                </div>
              </div>
            </div>
          </section>

          {/* COMPONENTE PRINCIPAL: CARRUSEL DE DESTACADOS */}
          <section className="py-20 px-6 container mx-auto max-w-4xl text-center">
            <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-3">Featured</span>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-10">POPULAR COMPOUNDS</h2>
            
            {/* CUADRO DINÁMICO DEL CARRUSEL */}
            <div className="bg-[#0A1630] p-8 rounded-2xl border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center gap-8 text-left relative transition-all duration-500">
              <div className="w-40 h-40 flex-shrink-0 bg-white rounded-xl p-3 flex items-center justify-center border border-[#D4AF37]/40 shadow-xl">
                <img src={destacados[indexCarrusel].imagen} alt={destacados[indexCarrusel].nombre} className="h-full w-auto object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-2xl font-medium text-white">{destacados[indexCarrusel].nombre}</h3>
                  <span className="text-[#D4AF37] font-mono text-xl font-light">${destacados[indexCarrusel].precio}</span>
                </div>
                <p className="text-slate-300 text-base font-light leading-relaxed mb-6">{destacados[indexCarrusel].descBreve}</p>
                <div className="flex gap-4">
                  <button onClick={() => verDetalleProducto(destacados[indexCarrusel])} className="bg-transparent hover:bg-white/5 text-white py-2 px-5 rounded border border-white/20 text-xs tracking-widest uppercase transition-colors">
                    View Details
                  </button>
                  <button onClick={() => agregarAlCarrito(destacados[indexCarrusel])} className="bg-[#D4AF37] text-[#050F24] font-semibold py-2 px-5 rounded text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                    Add To Cart
                  </button>
                </div>
              </div>
              
              {/* SELECTORES DE NAVEGACIÓN DEL CARRUSEL */}
              <div className="absolute bottom-4 right-6 flex gap-2">
                {destacados.map((_, i) => (
                  <button key={i} onClick={() => setIndexCarrusel(i)} className={`w-2 h-2 rounded-full p-0 border-none cursor-pointer transition-all ${i === indexCarrusel ? "bg-[#D4AF37] w-4" : "bg-white/20"}`}></button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ==================== VISTA 2: CATÁLOGO CON STOCK INCLUIDO ==================== */}
      {vista === "catalogo" && (
        <section className="py-20 px-6 container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-3">Catalog</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">ALL RESEARCH PEPTIDES</h2>
          </div>

          <div className="flex flex-col gap-6">
            {PRODUCTOS.map((prod) => (
              <div key={prod.id} className="bg-[#0A1630]/60 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col md:flex-row gap-6 items-center group relative overflow-hidden">
                
                {/* RECUADRO IMAGEN */}
                <div onClick={() => verDetalleProducto(prod)} className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-white rounded-xl border border-white/10 relative overflow-hidden p-2 cursor-pointer group-hover:border-[#D4AF37]/40 transition-colors">
                   <img src={prod.imagen} alt={prod.nombre} className="h-24 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* CONTENIDO */}
                <div className="flex-1 w-full flex flex-col text-left">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-2">
                    <h4 onClick={() => verDetalleProducto(prod)} className="font-serif text-2xl font-medium text-white hover:text-[#D4AF37] cursor-pointer transition-colors">{prod.nombre}</h4>
                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      {prod.stock === 0 ? (
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">Out of Stock</span>
                      ) : (
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">In Stock ({prod.stock})</span>
                      )}
                      <span className="font-mono text-xl text-[#D4AF37]">${prod.precio}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-base font-light leading-relaxed mb-4">{prod.descBreve}</p>
                  
                  <div className="flex justify-between items-center mt-auto gap-4">
                    <button onClick={() => verDetalleProducto(prod)} className="text-xs font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-wider bg-transparent border-none cursor-pointer">
                      View Full Specs →
                    </button>
                    <button 
                      onClick={() => agregarAlCarrito(prod)} 
                      disabled={prod.stock === 0}
                      className={`font-semibold py-2 px-6 rounded text-xs tracking-widest uppercase transition-all border ${prod.stock === 0 ? "border-white/10 text-slate-600 bg-transparent cursor-not-allowed" : "border-[#D4AF37] bg-[#D4AF37] text-[#050F24] hover:bg-transparent hover:text-[#D4AF37]"}`}
                    >
                      {prod.stock === 0 ? "Sold Out" : "Add to Cart"}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== VISTA 3: PAGINA DE DETALLE INDIVIDUAL COMPLETA ==================== */}
      {vista === "detalle" && productoSeleccionado && (
        <section className="py-20 px-6 container mx-auto max-w-4xl animate-fadeIn">
          <button onClick={() => setVista("catalogo")} className="text-xs font-medium tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors mb-10 bg-transparent border-none cursor-pointer">
            ← Back to Catalog
          </button>

          <div className="bg-[#0A1630] p-8 rounded-2xl border border-[#D4AF37]/20 shadow-2xl space-y-10">
            {/* CABECERA DE DETALLE */}
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start border-b border-white/5 pb-10">
              <div className="w-56 h-56 bg-white rounded-xl flex items-center justify-center border-2 border-[#D4AF37]/30 p-4 shadow-2xl flex-shrink-0">
                <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} className="h-full w-auto object-contain" />
              </div>
              <div className="flex-1 w-full space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-3xl md:text-4xl font-serif font-medium text-white">{productoSeleccionado.nombre}</h2>
                  <span className="text-[#D4AF37] font-mono text-3xl font-light">${productoSeleccionado.precio}</span>
                </div>
                <div className="pt-1">
                  {productoSeleccionado.stock === 0 ? (
                    <span className="text-xs tracking-widest uppercase font-semibold text-red-400 bg-red-400/10 px-3 py-1 rounded border border-red-400/20">Out of Stock</span>
                  ) : (
                    <span className="text-xs tracking-widest uppercase font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded border border-emerald-400/20">Available Supply: {productoSeleccionado.stock} units</span>
                  )}
                </div>
                <p className="text-slate-300 text-lg font-light leading-relaxed pt-2">{productoSeleccionado.descBreve}</p>
                <div className="pt-4">
                  <button 
                    onClick={() => agregarAlCarrito(productoSeleccionado)} 
                    disabled={productoSeleccionado.stock === 0}
                    className={`w-full sm:w-auto font-semibold py-3.5 px-10 rounded text-xs tracking-widest uppercase transition-all ${productoSeleccionado.stock === 0 ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5" : "bg-[#D4AF37] text-[#050F24] hover:bg-transparent hover:text-[#D4AF37] border border-[#D4AF37]"}`}
                  >
                    {productoSeleccionado.stock === 0 ? "Out of Stock" : "Add compound to cart"}
                  </button>
                </div>
              </div>
            </div>

            {/* ESPECIFICACIONES CLÍNICAS COMPLETAS Y EXPANDIDAS */}
            <div className="text-left space-y-8 pt-4">
              <div>
                <h4 className="text-xs tracking-[0.2em] font-semibold text-[#D4AF37] uppercase mb-2">Molecular Mechanism of Action</h4>
                <div className="bg-[#050F24] p-5 rounded-xl border border-white/5 text-base text-slate-300 font-light leading-relaxed shadow-inner">
                  {productoSeleccionado.mecanismo}
                </div>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.2em] font-semibold text-[#D4AF37] uppercase mb-2">Research Overview & Clinical Data</h4>
                <div className="bg-[#050F24] p-5 rounded-xl border border-white/5 text-base text-slate-300 font-light leading-relaxed shadow-inner">
                  {productoSeleccionado.research}
                </div>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.2em] font-semibold text-[#D4AF37] uppercase mb-2">Reconstitution & Dosing Protocol Guidelines</h4>
                <div className="bg-[#050F24] p-5 rounded-xl border border-white/5 text-base text-slate-300 font-light leading-relaxed shadow-inner">
                  {productoSeleccionado.dosis}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== VISTA 4: PÁGINA ABOUT US ==================== */}
      {vista === "about" && (
        <section className="py-20 px-6 container mx-auto max-w-3xl text-left animate-fadeIn">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-3">About Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">WHO WE ARE</h2>
          </div>
          <div className="bg-[#0A1630] p-8 rounded-2xl border border-white/5 space-y-6 text-slate-300 font-light text-base leading-relaxed shadow-2xl">
            <p>
              En <strong className="text-white font-medium">Pepti Age</strong> nos dedicamos a proveer péptidos de grado de investigación de la más alta pureza internacional, actuando como el nexo logístico de laboratorios líderes en Estados Unidos como <strong className="text-[#D4AF37]">RxWellHealth</strong>.
            </p>
            <p>
              Creemos firmemente que el acceso a compuestos avanzados para la optimización metabólica y celular debe estar respaldado por la transparencia absoluta. Por eso, no añadimos rellenos ni alteramos las formulaciones originales; entregamos ciencia molecular pura.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center pt-6 border-t border-white/5">
              <div className="p-4 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-2xl font-serif font-bold text-[#D4AF37]">99.8%</span>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Pureza Media</p>
              </div>
              <div className="p-4 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-2xl font-serif font-bold text-[#D4AF37]">100%</span>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">USA Certified</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== VISTA 5: PÁGINA DE CONTACTO ==================== */}
      {vista === "contacto" && (
        <section className="py-20 px-6 container mx-auto max-w-xl text-left animate-fadeIn">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block mb-3">Contact</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">CONNECT WITH US</h2>
          </div>
          <div className="bg-[#0A1630] p-8 rounded-2xl border border-white/5 space-y-6 shadow-2xl">
            <p className="text-slate-300 font-light text-center leading-relaxed text-sm">
              Si sos profesional de la salud, investigador o necesitas soporte técnico con la dosificación y distribución masiva, comunícate directamente por nuestros canales oficiales.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-xl">📲</span>
                <div>
                  <h5 className="text-[#D4AF37] font-medium text-xs uppercase tracking-wider">Canal Oficial WhatsApp</h5>
                  <p className="text-white text-sm font-mono font-light">+54 9 381 545-0641</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#050F24] rounded-xl border border-white/5">
                <span className="text-xl">📍</span>
                <div>
                  <h5 className="text-[#D4AF37] font-medium text-xs uppercase tracking-wider">Distribución Central</h5>
                  <p className="text-slate-300 text-sm font-light">Tucumán / Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
            <button onClick={() => window.open("https://wa.me/5493815450641", "_blank")} className="w-full mt-4 bg-[#D4AF37] text-[#050F24] font-semibold text-xs tracking-[0.2em] py-4 rounded uppercase transition-opacity hover:opacity-90 border-none cursor-pointer">
              Open WhatsApp Chat
            </button>
          </div>
        </section>
      )}

      {/* ==================== VISTA 6: CARRITO DE COMPRAS REFINADO ==================== */}
      {vista === "carrito" && (
        <section className="py-20 px-6 container mx-auto max-w-2xl min-h-[60vh] text-left animate-fadeIn">
          <button onClick={() => setVista("catalogo")} className="text-xs font-medium tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors mb-8 bg-transparent border-none cursor-pointer">
            ← Back to Catalog
          </button>
          <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-wide text-white mb-8">Your Cart Selection</h2>

          {carrito.length === 0 ? (
            <div className="bg-[#0A1630] p-12 rounded-xl border border-white/5 text-center text-slate-500 shadow-xl">
              <p className="text-base font-light mb-6">Your scientific order is empty.</p>
              <button onClick={() => setVista("catalogo")} className="bg-transparent text-[#D4AF37] hover:text-[#050F24] hover:bg-[#D4AF37] font-medium py-2.5 px-6 rounded border border-[#D4AF37] text-xs tracking-widest uppercase transition-all">
                Explore Compounds
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#0A1630] rounded-xl border border-white/5 divide-y divide-white/5 overflow-hidden shadow-2xl">
                {carrito.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/[0.01] transition-colors">
                    <div>
                      <h4 className="font-serif text-lg text-white tracking-wide">{item.nombre}</h4>
                      <p className="text-[#D4AF37] font-mono text-xs mt-0.5">U$S {item.precio} unit</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center border border-white/10 rounded bg-black/20 text-xs font-mono">
                        <button onClick={() => avanzarRestarCantidad(item.id)} className="px-2.5 py-1 text-slate-500 hover:text-white transition-colors font-bold">-</button>
                        <span className="px-2 font-bold text-slate-300 min-w-6 text-center">{item.cantidad}</span>
                        <button onClick={() => sumarCantidad(item.id)} className="px-2.5 py-1 text-slate-500 hover:text-white transition-colors font-bold">+</button>
                      </div>
                      <p className="font-mono text-white text-base min-w-[70px] text-right">U$S {item.precio * item.cantidad}</p>
                      <button onClick={() => eliminarProducto(item.id)} className="text-red-400/70 hover:text-red-400 text-xs bg-transparent border-none cursor-pointer uppercase tracking-wider">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#0A1630] p-6 rounded-xl border border-white/5 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 text-sm tracking-widest uppercase">Order Total:</span>
                  <span className="text-2xl font-mono text-[#D4AF37]">U$S {totalCarrito}</span>
                </div>
                <button onClick={comprarPorWhatsApp} className="w-full bg-[#D4AF37] text-[#050F24] font-semibold text-xs tracking-[0.2em] py-4 rounded hover:opacity-90 transition-opacity uppercase text-center flex items-center justify-center gap-2 border-none cursor-pointer">
                  📲 Submit Order via WhatsApp
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#030A1A] py-12 px-6 border-t border-white/5 text-center mt-24">
        <p className="text-[10px] tracking-[0.25em] font-light text-slate-500 max-w-4xl mx-auto leading-relaxed uppercase">
          AVISO LEGAL: Compuestos químicos destinados exclusivamente a fines de investigación in-vitro y desarrollo analítico. No aptos para uso clínico directo en humanos ni animales.
        </p>
      </footer>
    </main>
  );
}