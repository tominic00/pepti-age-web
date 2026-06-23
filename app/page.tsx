"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag, Microscope, ShieldCheck, Truck, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Inyección de Tipografías y COLORES BLINDADOS CON !IMPORTANT
const TipografiasYColoresLaboratorio = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
    
    .font-premium-titulo {
      font-family: 'Cormorant Garamond', serif !important;
      text-transform: uppercase !important;
    }
    
    .font-premium-texto {
      font-family: 'Inter', sans-serif !important;
    }

    /* FUERZA BRUTA CSS: Prohibido el color negro en los textos de esta pantalla */
    h1, h2, h3, h4, h5, h6 {
      color: #ffffff !important;
    }
    
    p, span, button, div, summary {
      color: #f1f5f9 !important; /* Blanco plata brillante */
    }

    .texto-dorado-fijo {
      color: #D4AF37 !important;
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
    <main className="min-h-screen bg-[#050F24] font-premium-texto pb-32 relative overflow-x-hidden antialiased">
      <TipografiasYColoresLaboratorio />
      
      {/* BARRA DE NAVEGACIÓN */}
      <header className="bg-[#050F24]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-2xl">
        <div className="container mx-auto max-w-6xl h-24 px-6 flex justify-between items-center">
          
          {/* Título de Marca principal */}
          <button 
            onClick={() => setVista("inicio")} 
            className="text-2xl md:text-3xl font-premium-titulo font-bold tracking-[0.25em] bg-transparent border-none cursor-pointer text-[#D4AF37] custom-link transition-transform active:scale-95"
          >
            <span className="texto-dorado-fijo">PEPTI AGE</span>
          </button>
          
          {/* Menú de navegación */}
          <nav className="hidden md:flex items-center gap-12 text-xs tracking-[0.3em] uppercase font-medium">
            {["inicio", "catalogo", "about", "contacto"].map((seccion) => (
              <button 
                key={seccion}
                onClick={() => setVista(seccion as any)} 
                className="bg-transparent border-none cursor-pointer relative py-2 group transition-colors"
                style={{ color: vista === seccion ? '#D4AF37' : '#f1f5f9' }}
              >
                <span className={vista === seccion ? "texto-dorado-fijo" : ""}>
                  {seccion === "about" ? "Nosotros" : seccion === "catalogo" ? "Productos" : seccion}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${vista === seccion ? "scale-x-100" : ""}`} />
              </button>
            ))}
          </nav>
          
          {/* Botón Carrito */}
          <button 
            onClick={() => setVista("carrito")} 
            className="bg-transparent hover:bg-[#D4AF37] px-6 py-3 rounded border border-[#D4AF37] transition-all duration-300 flex items-center gap-3 text-xs tracking-widest font-semibold uppercase group cursor-pointer"
          >
            <ShoppingBag size={14} className="transition-transform group-hover:scale-110" style={{ color: 'inherit' }} />
            <span style={{ color: 'inherit' }}>PEDIDO</span>
            <span className="bg-white/10 font-mono text-[10px] px-2 py-0.5 rounded ml-1 text-[#D4AF37]">
              <span className="texto-dorado-fijo">{cantidadItems}</span>
            </span>
          </button>

          {/* Menú móvil */}
          <button onClick={() => setMenuMovilMovilAbierto(!menuMovilAbierto)} className="md:hidden bg-transparent border-none cursor-pointer text-white">
            {menuMovilAbierto ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Menú desplegable móvil */}
      <AnimatePresence>
        {menuMovilAbierto && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0A1630] border-b border-white/10 py-6 px-8 flex flex-col gap-4 text-xs tracking-widest uppercase font-medium"
          >
            <button onClick={() => { setVista("inicio"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none py-2 text-white">Inicio</button>
            <button onClick={() => { setVista("catalogo"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none py-2 text-white">Productos</button>
            <button onClick={() => { setVista("about"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none py-2 text-white">Nosotros</button>
            <button onClick={() => { setVista("contacto"); setMenuMovilMovilAbierto(false); }} className="text-left bg-transparent border-none py-2 text-white">Contacto</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUERPO DE CONTENIDO PRINCIPAL */}
      <div className="container mx-auto max-w-5xl px-6 mt-16 space-y-28">
        
        {vista === "inicio" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-28">
            
            {/* HERO SECTION DE BIENVENIDA */}
            <section className="text-center max-w-4xl mx-auto py-12 space-y-8">
              <h1 className="text-4xl md:text-7xl font-lab-titulo font-bold tracking-wide leading-tight">
                PEPTI AGE <span className="block mt-4 font-normal italic text-2xl md:text-5xl tracking-[0.2em] texto-dorado-fijo">BIENESTAR MOLECULAR</span>
              </h1>
              
              <p className="text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-slate-200">
                Péptidos liofilizados de grado de investigación con estándares de máxima pureza internacional para optimización biológica.
              </p>

              <div className="pt-6">
                <button onClick={() => setVista("catalogo")} className="bg-[#D4AF37] !text-[#050F24] font-semibold tracking-[0.2em] text-xs uppercase px-12 py-4 rounded shadow-2xl hover:bg-transparent hover:!text-[#D4AF37] border border-[#D4AF37] transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer">
                  <span style={{ color: 'inherit' }}>Explorar Catálogo</span> <ArrowRight size={14} style={{ color: 'inherit' }} />
                </button>
              </div>
            </section>

            {/* SECCIÓN POR QUÉ ELEGIRNOS CON RESPIRACIÓN Y ESPACIADO */}
            <section className="py-20 bg-[#08142D] rounded-3xl border border-white/10 px-8 shadow-2xl relative overflow-hidden">
              <div className="text-center space-y-4 mb-16">
                <span className="text-xs tracking-[0.4em] font-semibold uppercase block texto-dorado-fijo">Estándares de Excelencia</span>
                <h2 className="text-3xl md:text-5xl font-lab-titulo font-light tracking-wide">¿POR QUÉ ELEGIRNOS?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-[#050F24] p-8 rounded-xl border border-white/10 space-y-4 shadow-xl hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <Microscope className="texto-dorado-fijo" size={30} />
                  <h4 className="font-lab-titulo text-lg font-semibold tracking-wider text-white">Pureza 99%+ Certificada</h4>
                  <p className="text-sm font-light leading-relaxed text-slate-300">Cada lote es sometido a estrictos análisis analíticos de espectrometría de masas y HPLC en laboratorios externos aprobados.</p>
                </div>

                <div className="bg-[#050F24] p-8 rounded-xl border border-white/10 space-y-4 shadow-xl hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <Truck className="texto-dorado-fijo" size={30} />
                  <h4 className="font-lab-titulo text-lg font-semibold tracking-wider text-white">Logística y Cadena de Frío</h4>
                  <p className="text-sm font-light leading-relaxed text-slate-300">Distribución controlada e importada desde USA, resguardada de manera estricta bajo protocolos de temperatura constante.</p>
                </div>

                <div className="bg-[#050F24] p-8 rounded-xl border border-white/10 space-y-4 shadow-xl hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <Award className="texto-dorado-fijo" size={30} />
                  <h4 className="font-lab-titulo text-lg font-semibold tracking-wider text-white">Garantía RxWellHealth</h4>
                  <p className="text-sm font-light leading-relaxed text-slate-300">Transparencia absoluta. Fichas descriptivas y dosificaciones basadas rigurosamente en literatura científica oficial de fábrica.</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* CONTENEDOR EN PAUSA PARA LAS IMÁGENES DEL CATÁLOGO */}
        {vista === "catalogo" && (
          <div className="text-center py-24 space-y-8">
            <h2 className="text-3xl font-lab-titulo tracking-widest text-white">Compuestos Disponibles</h2>
            <p className="text-slate-300 text-base max-w-md mx-auto font-light">El catálogo científico está configurado correctamente. Los contenedores de imágenes se encuentran en modo estructural sin desbordes.</p>
            <div className="w-44 h-44 border-2 border-dashed border-[#D4AF37]/40 rounded-2xl mx-auto flex items-center justify-center text-xs tracking-widest font-mono text-[#D4AF37] bg-white/5 uppercase select-none">
              [ Recuadro Vial ]
            </div>
          </div>
        )}

      </div>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#020714] py-14 px-6 border-t border-white/10 text-center mt-32 absolute bottom-0 w-full">
        <p className="text-[10px] tracking-[0.25em] font-light text-slate-400 max-w-4xl mx-auto leading-relaxed uppercase">
          AVISO LEGAL: Compuestos químicos destinados exclusivamente a fines de investigación in-vitro y desarrollo analítico de laboratorio. No aptos para uso clínico humano ni veterinario directo.
        </p>
      </footer>
    </main>
  );
}