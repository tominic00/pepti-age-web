"use client";

import { useState } from "react";
// Importamos íconos vectoriales reales de laboratorio, no emojis
import { Menu, X, ShoppingBag, Microscope, ShieldCheck, Truck, Award, ArrowRight } from "lucide-react";
// Importamos el motor de animaciones premium
import { motion, AnimatePresence } from "framer-motion";

// Inyección de Tipografías Estilo E-Commerce de Lujo
const TipografiasLaboratorio = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
    
    .font-premium-titulo {
      font-family: 'Cormorant Garamond', serif;
      text-transform: uppercase;
    }
    .font-premium-texto {
      font-family: 'Inter', sans-serif;
    }
  `}</style>
);

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  descBreve: string;
  imagen: string;
};

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Retatrutide 10mg", precio: 190, stock: 14, descBreve: "Agonista triple avanzado para optimización metabólica y control de peso celular.", imagen: "/retatrutide.png" },
  { id: 2, nombre: "Retatrutide 30mg", precio: 360, stock: 8, descBreve: "Fórmula de alta concentración para protocolos extendidos de optimización.", imagen: "/retatrutide.png" },
  { id: 3, nombre: "CJC-1295 / Ipamorelin 5mg/5mg", precio: 120, stock: 22, descBreve: "Sinergia de péptidos liberadores de hormona de crecimiento de acción biológica selectiva.", imagen: "/cjc.png" }
];

export default function Home() {
  const [vista, setVista] = useState<"inicio" | "catalogo" | "about" | "contacto" | "carrito">("inicio");
  const [carrito, setCarrito] = useState<{ id: number; cantidad: number }[]>([]);
  const [menuMovilAbierto, setMenuMovilMovilAbierto] = useState(false);

  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <main className="min-h-screen bg-[#050F24] font-premium-texto text-slate-200 pb-20 relative overflow-x-hidden antialiased">
      <TipografiasLaboratorio />
      
      {/* 1. BARRA DE NAVEGACIÓN DE ALTA GAMA */}
      <header className="bg-[#050F24]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 transition-all duration-300">
        <div className="container mx-auto max-w-6xl h-20 px-6 flex justify-between items-center">
          
          {/* Logo con Tipografía Extendida */}
          <button 
            onClick={() => setVista("inicio")} 
            className="text-2xl md:text-3xl font-premium-titulo font-bold tracking-[0.25em] text-[#D4AF37] bg-transparent border-none cursor-pointer transition-transform active:scale-95"
          >
            PEPTI AGE
          </button>
          
          {/* Enlaces Limpios con Animación Hover */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.3em] uppercase font-medium text-slate-300">
            {["inicio", "catalogo", "about", "contacto"].map((seccion) => (
              <button 
                key={seccion}
                onClick={() => setVista(seccion as any)} 
                className="bg-transparent border-none cursor-pointer relative py-2 group text-slate-300 hover:text-white transition-colors"
              >
                {seccion === "about" ? "Nosotros" : seccion}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${vista === seccion ? "scale-x-100" : ""}`} />
              </button>
            ))}
          </nav>
          
          {/* Botón de Carrito con Ícono Vectorial Fino */}
          <button 
            onClick={() => setVista("carrito")} 
            className="bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050F24] px-5 py-2.5 rounded border border-[#D4AF37] transition-all duration-300 flex items-center gap-3 text-xs tracking-widest font-semibold uppercase group"
          >
            <ShoppingBag size={15} className="group-hover:scale-110 transition-transform" />
            <span>PEDIDO</span>
            <span className="bg-white/10 text-white font-mono text-[10px] px-2 py-0.5 rounded ml-1 group-hover:bg-black/10 group-hover:text-[#050F24]">
              {cantidadItems}
            </span>
          </button>

          {/* Hamburguesa Móvil */}
          <button onClick={() => setMenuMovilMovilAbierto(!menuMovilAbierto)} className="md:hidden text-white bg-transparent border-none cursor-pointer">
            {menuMovilAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Menú Desplegable Móvil Animado */}
      <AnimatePresence>
        {menuMovilAbierto && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0A1630] border-b border-white/10 py-6 px-8 flex flex-col gap-4 text-sm tracking-widest uppercase font-light"
          >
            <button onClick={() => { setVista("inicio"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none text-white py-2">Inicio</button>
            <button onClick={() => { setVista("catalogo"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none text-white py-2">Productos</button>
            <button onClick={() => { setVista("about"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none text-white py-2">Nosotros</button>
            <button onClick={() => { setVista("contacto"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none text-white py-2">Contacto</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== CONTENIDO DINÁMICO EN BASE A LA VISTA ==================== */}
      <div className="container mx-auto max-w-5xl px-6 mt-12 space-y-24">
        
        {vista === "inicio" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="space-y-32">
            
            {/* SECCIÓN BIENVENIDA / HERO */}
            <section className="text-center max-w-4xl mx-auto py-16 space-y-8">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-8xl font-premium-titulo font-bold tracking-[0.1em] text-white leading-tight"
              >
                PEPTI AGE <span className="text-[#D4AF37] block mt-4 font-normal italic text-2xl md:text-5xl tracking-[0.2em]">BIENESTAR MOLECULAR</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-slate-300"
              >
                Péptidos liofilizados de grado de investigación con estándares de máxima pureza internacional para optimización biológica.
              </motion.p>

              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }}>
                <button onClick={() => setVista("catalogo")} className="bg-[#D4AF37] text-[#050F24] font-semibold tracking-[0.2em] text-xs uppercase px-10 py-4 rounded shadow-xl hover:bg-transparent hover:text-white border border-[#D4AF37] transition-all duration-300 flex items-center gap-2 mx-auto">
                  <span>Explorar Catálogo</span> <ArrowRight size={14} />
                </button>
              </motion.div>
            </section>

            {/* SECCIÓN POR QUÉ ELEGIRNOS CON ÍCONOS DE ALTA DEFINICIÓN */}
            <section className="py-20 bg-[#08142D]/60 rounded-3xl border border-white/5 px-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-30 pointer-events-none" />
              
              <div className="text-center space-y-4 mb-16">
                <span className="text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block">Estándares de Excelencia</span>
                <h2 className="text-3xl md:text-5xl font-premium-titulo font-light tracking-wide text-white">¿POR QUÉ ELEGIRNOS?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="bg-[#050F24]/80 p-8 rounded-xl border border-white/10 space-y-4 shadow-xl hover:border-[#D4AF37]/40 transition-colors duration-300">
                  <Microscope className="text-[#D4AF37]" size={28} />
                  <h4 className="font-premium-titulo text-lg text-white font-semibold tracking-wider">Pureza 99%+ Certificada</h4>
                  <p className="text-sm font-light leading-relaxed text-slate-400">Cada lote es sometido a estrictos análisis analíticos de espectrometría de masas y HPLC en laboratorios externos aprobados.</p>
                </div>

                <div className="bg-[#050F24]/80 p-8 rounded-xl border border-white/10 space-y-4 shadow-xl hover:border-[#D4AF37]/40 transition-colors duration-300">
                  <Truck className="text-[#D4AF37]" size={28} />
                  <h4 className="font-premium-titulo text-lg text-white font-semibold tracking-wider">Logística y Cadena de Frío</h4>
                  <p className="text-sm font-light leading-relaxed text-slate-400">Distribución controlada e importada desde USA, resguardada de manera estricta bajo protocolos de temperatura constante.</p>
                </div>

                <div className="bg-[#050F24]/80 p-8 rounded-xl border border-white/10 space-y-4 shadow-xl hover:border-[#D4AF37]/40 transition-colors duration-300">
                  <ShieldCheck className="text-[#D4AF37]" size={28} />
                  <h4 className="font-premium-titulo text-lg text-white font-semibold tracking-wider">Garantía RxWellHealth</h4>
                  <p className="text-sm font-light leading-relaxed text-slate-400">Transparencia absoluta. Fichas descriptivas y dosificaciones basadas rigurosamente en literatura científica oficial de fábrica.</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* 2. RECUADRO DE IMAGEN EN PAUSA PARA EL CATÁLOGO */}
        {vista === "catalogo" && (
          <div className="text-center py-20 space-y-6">
            <h2 className="text-3xl font-premium-titulo text-white tracking-widest">Compuestos Disponibles</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">El catálogo se encuentra estructurado en el sistema. Estamos terminando de calibrar los contenedores visuales.</p>
            <div className="w-40 h-40 border-2 border-dashed border-[#D4AF37]/30 rounded-2xl mx-auto flex items-center justify-center text-xs tracking-widest font-mono text-[#D4AF37] bg-white/5 uppercase">
              [ Recuadro Vial ]
            </div>
          </div>
        )}

      </div>

      {/* PIE DE PÁGINA INSTITUCIONAL */}
      <footer className="bg-[#020714] py-14 px-6 border-t border-white/10 text-center mt-32 absolute bottom-0 w-full">
        <p className="text-[10px] tracking-[0.25em] font-light text-slate-500 max-w-4xl mx-auto leading-relaxed uppercase">
          AVISO LEGAL: Compuestos químicos destinados exclusivamente a fines de investigación in-vitro y desarrollo analítico de laboratorio. No aptos para uso clínico humano ni veterinario directo.
        </p>
      </footer>
    </main>
  );
}