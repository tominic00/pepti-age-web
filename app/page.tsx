"use client";

import { useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  desc: string;
};

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Retatrutide 10mg", precio: 190, desc: "Péptido metabólico de máxima eficiencia." },
  { id: 2, nombre: "Retatrutide 30mg", precio: 360, desc: "Péptido metabólico (Alta concentración)." },
  { id: 3, nombre: "CJC-1295 / Ipamorelin 5mg/5mg", precio: 120, desc: "Estimulación de GH, sueño y recuperación." },
  { id: 4, nombre: "Glow (GHK-Cu / BPC-157 / TB-500)", precio: 190, desc: "Regeneración celular, piel y articulaciones." },
  { id: 5, nombre: "Mots-C 40mg", precio: 160, desc: "Energía mitocondrial y rendimiento físico." },
  { id: 6, nombre: "BPC-157 / TB-500 10mg/10mg", precio: 160, desc: "Recuperación acelerada de lesiones y tejidos." },
  { id: 7, nombre: "Tesamorelin / Ipamorelin 10mg/10mg", precio: 150, desc: "Pérdida de grasa localizada y anti-aging." },
  { id: 8, nombre: "Bac Water 30ml", precio: 30, desc: "Agua bacteriostática para reconstitución." },
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
    // Acá cambiamos el fondo general a un tono azul-grisáceo muy premium (#F4F7FB)
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-[#0B1B3D] pb-12">
      
      {/* BARRA DE NAVEGACIÓN */}
      <header className="bg-[#0B1B3D] text-white py-4 shadow-xl border-b-2 border-[#D4AF37] sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button 
            onClick={() => setVista("tienda")} 
            className="text-2xl md:text-3xl font-bold tracking-widest text-[#D4AF37] bg-transparent border-none cursor-pointer drop-shadow-md"
          >
            PEPTI AGE
          </button>
          
          <div className="flex items-center gap-4">
            <p className="hidden md:block text-xs tracking-[0.2em] opacity-90">CIENCIA • BIENESTAR</p>
            <button 
              onClick={() => setVista(vista === "tienda" ? "carrito" : "tienda")}
              className="bg-[#D4AF37] text-[#0B1B3D] px-4 py-2 rounded-full font-extrabold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform border border-white/20"
            >
              <span>{vista === "tienda" ? "🛒 Ver Carrito" : "🔬 Ver Productos"}</span> ({cantidadItems})
            </button>
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* VISTA A: CATÁLOGO DE PRODUCTOS */}
      {/* ========================================= */}
      {vista === "tienda" && (
        <>
          {/* Portada con gradiente elegante */}
          <section className="bg-gradient-to-b from-[#E8EEF5] to-[#F4F7FB] py-16 px-4 text-center border-b border-[#D4AF37]/20">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0B1B3D] drop-shadow-sm">
              Tu mejor versión <span className="text-[#D4AF37]">comienza hoy.</span>
            </h2>
            <p className="text-md md:text-lg max-w-2xl mx-auto text-slate-600 mb-2">
              Distribuidor Oficial by <span className="font-bold text-[#0B1B3D]">RxWellHealth USA</span> 🇺🇸.
            </p>
            <p className="text-sm text-slate-500">Péptidos liofilizados de máxima pureza para investigación.</p>
          </section>

          <section className="py-12 px-4 container mx-auto max-w-5xl">
            <div className="flex items-center justify-center mb-10">
              <div className="h-[1px] bg-[#D4AF37]/50 flex-1"></div>
              <h3 className="mx-4 text-xl tracking-widest font-bold text-[#0B1B3D] uppercase">Lista de Precios</h3>
              <div className="h-[1px] bg-[#D4AF37]/50 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTOS.map((prod) => (
                <div key={prod.id} className="bg-white p-6 rounded-xl shadow-md border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-[#0B1B3D] pr-4 group-hover:text-[#D4AF37] transition-colors">{prod.nombre}</h4>
                      <span className="font-extrabold text-xl text-[#0B1B3D] bg-[#D4AF37]/20 px-3 py-1 rounded-md border border-[#D4AF37]/30">
                        ${prod.precio}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">{prod.desc}</p>
                  </div>
                  
                  <button 
                    onClick={() => agregarAlCarrito(prod)}
                    className="w-full border-2 border-[#0B1B3D] text-[#0B1B3D] font-bold py-2 rounded-lg hover:bg-[#0B1B3D] hover:text-white transition-colors shadow-sm"
                  >
                    + Agregar al Pedido
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ========================================= */}
      {/* VISTA B: PÁGINA DEL CARRITO DE COMPRAS */}
      {/* ========================================= */}
      {vista === "carrito" && (
        <section className="py-12 px-4 container mx-auto max-w-3xl min-h-[60vh]">
          
          <button 
            onClick={() => setVista("tienda")}
            className="text-sm font-bold text-[#D4AF37] hover:text-[#0B1B3D] transition-colors mb-6 flex items-center gap-2 bg-transparent border-none cursor-pointer"
          >
            ← Volver a la Lista de Productos (Agregar más)
          </button>

          <h2 className="text-3xl font-extrabold text-[#0B1B3D] mb-8 drop-shadow-sm">Tu Carrito de Pedido</h2>

          {carrito.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl shadow-md border border-[#D4AF37]/20 text-center text-slate-400">
              <span className="text-6xl block mb-4">🛒</span>
              <p className="text-lg font-bold mb-4">Tu pedido está completamente vacío.</p>
              <button 
                onClick={() => setVista("tienda")}
                className="bg-[#0B1B3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#0B1B3D]/90 shadow-lg"
              >
                Explorar Péptidos
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md border border-[#D4AF37]/30 divide-y divide-[#F4F7FB] overflow-hidden">
                {carrito.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-[#F9FAFC] transition-colors">
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-[#0B1B3D]">{item.nombre}</h4>
                      <p className="text-[#D4AF37] font-extrabold text-sm mt-0.5">U$S {item.precio} c/u</p>
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
                
                <button 
                  onClick={comprarPorWhatsApp}
                  className="w-full bg-[#25D366] text-white font-extrabold text-xl py-4 rounded-xl shadow-lg hover:bg-[#20b858] transition-all flex items-center justify-center gap-3 border-none cursor-pointer hover:scale-[1.02]"
                >
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