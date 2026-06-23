"use client";

import { useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  descBreve: string;
  mecanismo: string;
  research: string;
  dosis: string;
  imagen: string;
};

// INFORMACIÓN CLÍNICA BASADA EN RXWELLHEALTH
const PRODUCTOS: Producto[] = [
  { 
    id: 1, 
    nombre: "Retatrutide 10mg", 
    precio: 190, 
    descBreve: "Agonista triple para control de peso avanzado. [cite: 112, 115, 118]",
    mecanismo: "Activa los receptores GLP-1, GIP y de glucagón para un enfoque de triple objetivo. [cite: 386]",
    research: "Apoya la pérdida de grasa significativa, la optimización metabólica y la regulación del apetito. Estudiado como uno de los péptidos más efectivos, especialmente para pacientes estancados con terapias GLP-1 o agonistas duales. [cite: 387, 388]",
    dosis: "Dosis inicial de 0.5mg una vez a la semana, con aumento de 0.5-1mg cada 2-4 semanas. Mantenimiento típico de 1mg a 3mg semanales. Reconstituir con agua bacteriostática. [cite: 400, 401, 402, 420]",
    imagen: "/retatrutide.png"
  },
  { 
    id: 2, 
    nombre: "Retatrutide 30mg", 
    precio: 360, 
    descBreve: "Agonista triple (Alta concentración). [cite: 112, 114]",
    mecanismo: "Activa los receptores GLP-1, GIP y de glucagón para un enfoque de triple objetivo. [cite: 386]",
    research: "Apoya la pérdida de grasa significativa, la optimización metabólica y la regulación del apetito. Estudiado como uno de los péptidos más efectivos, especialmente para pacientes estancados con terapias GLP-1 o agonistas duales. [cite: 387, 388]",
    dosis: "Dosis inicial de 0.5mg una vez a la semana, con aumento de 0.5-1mg cada 2-4 semanas. Mantenimiento típico de 1mg a 3mg semanales. Reconstituir con agua bacteriostática. [cite: 400, 401, 402, 420]",
    imagen: "/retatrutide.png"
  },
  { 
    id: 3, 
    nombre: "CJC-1295 / Ipamorelin 5mg/5mg", 
    precio: 120, 
    descBreve: "Combinación de análogo sintético de GHRH y GHRP. [cite: 71, 2274]",
    mecanismo: "El CJC-1295 (sin DAC) estimula la liberación natural de hormona de crecimiento (GH) desde la pituitaria imitando los patrones naturales. [cite: 1290, 1291, 1292]",
    research: "Diseñado para brindar una mayor amplitud de GHRH con menor carga de GHRP. Apoya la pérdida de grasa o recuperación sin un exceso de sangrado de GH o picos de cortisol. [cite: 2271]",
    dosis: "1 a 3 veces por día con el estómago vacío (ideal 30 min antes de comer o 90 min después). Ciclos recomendados de 8 a 12 semanas. [cite: 2267, 2270]",
    imagen: "/cjc.png"
  },
  { 
    id: 4, 
    nombre: "Glow (GHK-Cu / BPC-157 / TB-500)", 
    precio: 190, 
    descBreve: "Stack regenerativo y de recuperación cosmética. [cite: 83, 2301]",
    mecanismo: "Combina el poder curativo de BPC-157 y TB-500 con los efectos anti-envejecimiento y regenerativos del péptido de cobre GHK-Cu. [cite: 2301, 2325, 2326]",
    research: "Promueve la reparación de tejidos, la síntesis de colágeno, la mejora del tono de piel, el crecimiento capilar y una curación más rápida de heridas. [cite: 2302]",
    dosis: "Vía subcutánea o intradérmica. 1 vez al día para mantenimiento; 2 veces al día para curación activa o post-procedimiento. Ciclos de 8 a 12 semanas. [cite: 2301, 2309]",
    imagen: "/glow.png"
  },
  { 
    id: 5, 
    nombre: "MOTS-c 40mg", 
    precio: 160, 
    descBreve: "Péptido derivado de las mitocondrias para energía celular. [cite: 674, 1674, 1679]",
    mecanismo: "Juega un papel clave en la regulación de la energía celular y la optimización metabólica. Mejora el metabolismo de la glucosa e incrementa la sensibilidad a la insulina. [cite: 1679, 1680]",
    research: "Utilizado para la pérdida de grasa, apoyo en el síndrome metabólico y anti-envejecimiento. Particularly efectivo combinado con protocolos de entrenamiento activo. [cite: 1681, 1682]",
    dosis: "5 a 15mg por dosis, 2 a 3 veces por semana. Inyectar preferentemente por la mañana o pre-entrenamiento. [cite: 1694, 1695, 1699]",
    imagen: "/motsc.png"
  },
  { 
    id: 6, 
    nombre: "Wolverine (BPC-157 / TB-500)", 
    precio: 160, 
    descBreve: "Fórmula de recuperación integral y reparación de tejidos. [cite: 77, 2277]",
    mecanismo: "El BPC-157 provee reparación localizada mientras el TB-500 ofrece recuperación sistémica y angiogénesis (formación de vasos sanguíneos). [cite: 2065, 2279, 2325]",
    research: "Diseñado para la reparación acelerada de tejidos y tendones, reducción de la inflamación y una curación más rápida post-lesión o cirugía. [cite: 2277]",
    dosis: "1 a 2 veces al día (AM y PM para curación aguda). Vía subcutánea cerca de la lesión o intramuscular. Ciclos de 4 a 6 semanas. [cite: 2279, 2284, 2285]",
    imagen: "/wolverine.png"
  },
  { 
    id: 7, 
    nombre: "Tesamorelin / Ipamorelin 10mg/10mg", 
    precio: 150, 
    descBreve: "Sinergia de análogo GHRH y optimizador de GHRP. [cite: 92, 2342]",
    mecanismo: "El Tesamorelin actúa como análogo de GHRH para estimular la liberación de GH, mientras el Ipamorelin optimiza el pulso. [cite: 1149, 1259]",
    research: "Mezcla equilibrada que ofrece una excelente sinergia para la pérdida de grasa, mejora de la composición corporal y recuperación celular. [cite: 1151, 1152, 2355]",
    dosis: "Inyectar 30 minutos antes de dormir o al despertar en ayunas, 1 o 2 veces al día. Ciclos de 10 a 16 semanas. [cite: 2344, 2354, 2355]",
    imagen: "/tesamorelin.png"
  },
  { 
    id: 8, 
    nombre: "Agua Bacteriostática 30ml", 
    precio: 30, 
    descBreve: "Solución estéril esencial para reconstitución. [cite: 161]",
    mecanismo: "Agua esterilizada con un preservante antimicrobiano.",
    research: "Requerida universalmente para preparar y preservar los viales de péptidos liofilizados antes de su administración. [cite: 150, 297, 420]",
    dosis: "El volumen de reconstitución varía según el tamaño del vial para mantener una dosificación simple (ej. 2mL a 3mL típicamente). [cite: 157, 558, 652]",
    imagen: "/bacwater.png"
  },
];

export default function Home() {
  const [carrito, setCarrito] = useState<{ id: number; nombre: string; precio: number; cantidad: number }[]>([]);
  const [vista, setVista] = useState<"tienda" | "carrito">("tienda");

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
      }
      return [...prev, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }];
    });
    alert(`✅ ¡Agregaste ${producto.nombre} al pedido!`);
  };

  const sumarCantidad = (id: number) => {
    setCarrito((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)));
  };

  const avanzarRestarCantidad = (id: number) => {
    setCarrito((prev) => 
      prev.map((item) => (item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item))
    );
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
    carrito.forEach((item) => {
      mensaje += `▪️ ${item.cantidad}x ${item.nombre} (U$S ${item.precio * item.cantidad})%0A`;
    });
    mensaje += `%0A💰 *TOTAL: U$S ${totalCarrito}*%0A%0AHola! Me gustaría coordinar el pago y envío de este pedido.`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-[#0B1B3D] pb-12">
      
      {/* BARRA DE NAVEGACIÓN */}
      <header className="bg-[#0B1B3D] text-white py-4 shadow-xl border-b-2 border-[#D4AF37] sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button onClick={() => setVista("tienda")} className="text-2xl md:text-3xl font-bold tracking-widest text-[#D4AF37] bg-transparent border-none cursor-pointer drop-shadow-md">
            PEPTI AGE
          </button>
          
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-xs tracking-[0.2em] opacity-90">CIENCIA • BIENESTAR</p>
            <button onClick={() => setVista(vista === "tienda" ? "carrito" : "tienda")} className="bg-[#D4AF37] text-[#0B1B3D] px-4 py-2 rounded-full font-extrabold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform border border-white/20">
              <span>{vista === "tienda" ? "🛒 Ver Carrito" : "🔬 Ver Productos"}</span> ({cantidadItems})
            </button>
          </div>
        </div>
      </header>

      {/* VISTA A: CATÁLOGO DE PRODUCTOS */}
      {vista === "tienda" && (
        <>
          <section className="bg-gradient-to-b from-[#E8EEF5] to-[#F4F7FB] py-16 px-4 text-center border-b border-[#D4AF37]/20">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0B1B3D] drop-shadow-sm">
              Tu mejor versión <span className="text-[#D4AF37]">comienza hoy.</span>
            </h2>
            <p className="text-md md:text-lg max-w-2xl mx-auto text-slate-600 mb-2">
              Distribuidor Oficial by <span className="font-bold text-[#0B1B3D]">RxWellHealth USA</span> 🇺🇸. [cite: 23]
            </p>
            <p className="text-sm text-slate-500">Péptidos liofilizados de máxima pureza para investigación. [cite: 4]</p>
          </section>

          <section className="py-12 px-4 container mx-auto max-w-5xl">
            <div className="flex items-center justify-center mb-10">
              <div className="h-[1px] bg-[#D4AF37]/50 flex-1"></div>
              <h3 className="mx-4 text-2xl tracking-widest font-bold text-[#0B1B3D] uppercase">Catálogo Clínico</h3>
              <div className="h-[1px] bg-[#D4AF37]/50 flex-1"></div>
            </div>

            {/* GRILLA DE PRODUCTOS LIMITADA A 1 COLUMNA CENTRAL */}
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {PRODUCTOS.map((prod) => (
                <div key={prod.id} className="bg-[#0B1B3D] p-6 rounded-2xl shadow-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-300 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 group overflow-hidden">
                  
                  {/* RECUADRO DE IMAGEN: BLINDADO TOTALMENTE A 120X120 PX */}
                  <div className="w-[120px] h-[120px] max-w-[120px] max-h-[120px] flex-shrink-0 flex items-center justify-center bg-white rounded-xl border-2 border-[#D4AF37]/50 relative overflow-hidden mx-auto md:mx-0 p-2 block">
                     <img 
                        src={prod.imagen} 
                        alt={prod.nombre} 
                        width={120}
                        height={120}
                        className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 z-10"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/120x120/FFFFFF/0B1B3D?text=Vial";
                        }}
                     />
                  </div>

                  {/* LADO DERECHO: CONTENIDO */}
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-3">
                        <h4 className="font-extrabold text-2xl text-[#D4AF37] truncate">{prod.nombre}</h4>
                        <span className="font-black text-2xl text-white bg-white/10 px-4 py-0.5 rounded-lg border border-[#D4AF37]/30 shadow-sm self-start whitespace-nowrap">
                          ${prod.precio}
                        </span>
                      </div>
                      
                      <p className="text-base text-slate-300 mb-4 font-medium leading-relaxed">{prod.descBreve}</p>
                      
                      {/* ACORDEÓN CLÍNICO */}
                      <details className="group/details cursor-pointer outline-none mb-4 block">
                        <summary className="text-xs font-bold text-white mb-1 uppercase tracking-wider hover:text-[#D4AF37] transition-colors list-none flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/10 select-none">
                          <span>Ver Ficha Técnica Detallada 🔬</span>
                          <span className="group-open/details:rotate-180 transition-transform text-[#D4AF37]">▼</span>
                        </summary>
                        <div className="text-sm text-slate-300 space-y-3 mt-2 bg-black/20 p-4 rounded-lg border border-white/5 shadow-inner">
                          <p><strong className="text-[#D4AF37] block text-xs uppercase tracking-wider">Mecanismo de Acción:</strong> {prod.mecanismo}</p>
                          <p><strong className="text-[#D4AF37] block text-xs uppercase tracking-wider">Investigación Clínica:</strong> {prod.research}</p>
                          <p><strong className="text-[#D4AF37] block text-xs uppercase tracking-wider">Dosificación:</strong> {prod.dosis}</p>
                        </div>
                      </details>
                    </div>

                    {/* BOTÓN ALINEADO */}
                    <button onClick={() => agregarAlCarrito(prod)} className="self-start sm:self-end border-2 border-[#D4AF37] bg-[#D4AF37] text-[#0B1B3D] font-extrabold py-2 px-6 rounded-xl hover:bg-transparent hover:text-[#D4AF37] transition-all shadow-lg uppercase tracking-wider text-xs flex items-center gap-2 mt-2">
                      <span className="text-sm font-black">+</span> Agregar al Pedido
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* VISTA B: PÁGINA DEL CARRITO DE COMPRAS */}
      {vista === "carrito" && (
        <section className="py-12 px-4 container mx-auto max-w-3xl min-h-[60vh]">
          <button onClick={() => setVista("tienda")} className="text-sm font-bold text-[#D4AF37] hover:text-[#0B1B3D] transition-colors mb-6 flex items-center gap-2 bg-transparent border-none cursor-pointer">
            ← Volver a la Lista de Productos
          </button>
          <h2 className="text-3xl font-extrabold text-[#0B1B3D] mb-8 drop-shadow-sm">Tu Carrito de Pedido</h2>

          {carrito.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-md border border-[#D4AF37]/20 text-center text-slate-400">
              <span className="text-6xl block mb-4">🛒</span>
              <p className="text-lg font-bold mb-4">Tu pedido está completamente vacío.</p>
              <button onClick={() => setVista("tienda")} className="bg-[#0B1B3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#0B1B3D]/90 shadow-lg">
                Explorar Péptidos
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md border border-[#D4AF37]/30 divide-y divide-[#F4F7FB] overflow-hidden">
                {carrito.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-[#F9FAFC] transition-colors">
                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-12 h-12 max-w-[48px] max-h-[48px] bg-white rounded-lg overflow-hidden flex items-center justify-center border border-slate-200 p-1">
                         <img 
                            src={PRODUCTOS.find(p => p.id === item.id)?.imagen} 
                            alt={item.nombre} 
                            width={48}
                            height={48}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => e.currentTarget.src = "https://placehold.co/48x48/FFFFFF/0B1B3D?text=Vial"}
                         />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-[#0B1B3D]">{item.nombre}</h4>
                        <p className="text-[#D4AF37] font-extrabold text-sm mt-0.5">U$S {item.precio} c/u</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white shadow-sm">
                        <button onClick={() => avanzarRestarCantidad(item.id)} className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 font-bold rounded-l-lg">-</button>
                        <span className="px-3 font-bold text-sm min-w-8 text-center text-[#0B1B3D]">{item.cantidad}</span>
                        <button onClick={() => sumarCantidad(item.id)} className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 font-bold rounded-r-lg">+</button>
                      </div>
                      <div className="text-right min-w-[70px]">
                        <p className="font-extrabold text-[#0B1B3D] text-lg">U$S {item.precio * item.cantidad}</p>
                      </div>
                      <button onClick={() => eliminarProducto(item.id)} className="text-red-400 hover:text-red-600 p-2 bg-red-50 hover:bg-red-100 rounded-md transition-colors border-none cursor-pointer">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-[#D4AF37]/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-bold text-lg">Total del Pedido:</span>
                  <span className="text-3xl font-black text-[#0B1B3D]">U$S {totalCarrito}</span>
                </div>
                <button onClick={comprarPorWhatsApp} className="w-full bg-[#25D366] text-white font-extrabold text-xl py-4 rounded-xl shadow-lg hover:bg-[#20b858] transition-all flex items-center justify-center gap-3 border-none cursor-pointer hover:scale-[1.02]">
                  <span>📲</span> CONTINUAR COMPRA POR WHATSAPP
                </button>
                <p className="text-xs text-center text-slate-400 mt-4 font-medium">
                  Serás redirigido al chat de Pepti Age con el resumen de tu pedido listo para coordinar detalles de pago y entrega.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* PIE DE PÁGINA */}
      <section className="bg-[#0B1B3D] text-white py-12 px-4 border-t-4 border-[#D4AF37] mt-12 shadow-[0_-10px_30px_rgba(11,27,61,0.1)]">
        <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 transform hover:scale-105 transition-transform">
            <span className="text-3xl block mb-2 drop-shadow-md">💎</span>
            <h3 className="font-bold text-[#D4AF37] text-xs tracking-wider">CALIDAD PREMIUM</h3>
          </div>
          <div className="p-4 transform hover:scale-105 transition-transform">
            <span className="text-3xl block mb-2 drop-shadow-md">🏅</span>
            <h3 className="font-bold text-[#D4AF37] text-xs tracking-wider">USA IMPORT</h3>
          </div>
          <div className="p-4 transform hover:scale-105 transition-transform">
            <span className="text-3xl block mb-2 drop-shadow-md">🛡️</span>
            <h3 className="font-bold text-[#D4AF37] text-xs tracking-wider">ALTA PUREZA</h3>
          </div>
          <div className="p-4 transform hover:scale-105 transition-transform">
            <span className="text-3xl block mb-2 drop-shadow-md">🚚</span>
            <h3 className="font-bold text-[#D4AF37] text-xs tracking-wider">ENVÍOS AL PAÍS</h3>
          </div>
        </div>
      </section>

      <footer className="bg-[#E8EEF5] py-8 px-4 text-center border-t border-slate-200">
        <p className="text-xs text-slate-500 max-w-4xl mx-auto font-medium">
          AVISO LEGAL: Productos destinados exclusivamente a fines de investigación in-vitro. 
          No son medicamentos. Uso exclusivo para profesionales.
        </p>
      </footer>
    </main>
  );
}