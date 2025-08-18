import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Building, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
// import logo from "@/assets/converseia-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1833] via-[#101828] to-[#1a2233] text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* SVG Animated Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Balança */}
            <g className="animate-float-slow" style={{opacity:0.10}}>
              <circle cx="300" cy="200" r="90" fill="#60a5fa" />
              <path d="M300 120 L300 260" stroke="#fff" strokeWidth="6" strokeLinecap="round"/>
              <path d="M250 180 Q300 150 350 180" stroke="#fff" strokeWidth="4" fill="none"/>
              <path d="M250 180 Q275 210 300 180 Q325 210 350 180" stroke="#fff" strokeWidth="2" fill="none"/>
              <circle cx="250" cy="180" r="10" fill="#fff" fillOpacity="0.7"/>
              <circle cx="350" cy="180" r="10" fill="#fff" fillOpacity="0.7"/>
            </g>
            {/* Martelo */}
            <g className="animate-float-medium" style={{opacity:0.10}}>
              <rect x="1100" y="350" width="80" height="20" rx="8" fill="#38bdf8" transform="rotate(-20 1100 350)"/>
              <rect x="1150" y="340" width="18" height="50" rx="6" fill="#fff" fillOpacity="0.7" transform="rotate(-20 1150 340)"/>
            </g>
            {/* Símbolo Direito (livro) */}
            <g className="animate-float-slower" style={{opacity:0.08}}>
              <rect x="700" y="80" width="120" height="60" rx="12" fill="#2563eb"/>
              <rect x="710" y="90" width="40" height="40" rx="6" fill="#fff" fillOpacity="0.7"/>
              <rect x="770" y="90" width="40" height="40" rx="6" fill="#fff" fillOpacity="0.7"/>
            </g>
          </svg>
        </div>
        <style>{`
          @keyframes float-slow { 0%{transform:translateY(0);} 50%{transform:translateY(-18px);} 100%{transform:translateY(0);} }
          @keyframes float-medium { 0%{transform:translateY(0);} 50%{transform:translateY(12px);} 100%{transform:translateY(0);} }
          @keyframes float-slower { 0%{transform:translateY(0);} 50%{transform:translateY(10px);} 100%{transform:translateY(0);} }
          .animate-float-slow { animation: float-slow 9s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 13s ease-in-out infinite; }
          .animate-float-slower { animation: float-slower 17s ease-in-out infinite; }
        `}</style>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center mb-8">
            <img src="/logotodabracahorizontal.png" alt="ConverseIA Direito" className="h-16 drop-shadow-lg" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-glow">
            Automatize seu<br />
            <span className="text-blue-400">Escritório de Advocacia</span><br />
            com Inteligência Artificial
          </h2>
          <p className="text-2xl mb-12 opacity-90 max-w-4xl mx-auto text-gray-200">
            Revolucione o atendimento ao cliente, qualifique leads automaticamente 
            e libere tempo para focar no que realmente importa: a prática do Direito.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild variant="hero" size="lg" className="text-xl px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 border border-blue-400/40">
              <Link to="/parceria">
                <Users className="mr-2" />
                Programa de Parceiros
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-xl px-8 py-6 bg-white/10 border-blue-400/30 text-blue-200 hover:bg-blue-900/40 shadow-md">
              <Zap className="mr-2" />
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-b from-[#101828]/80 to-[#1a2233]/90">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-[#151d2b]/80 border border-blue-700/40 shadow-xl shadow-blue-900/20 hover:scale-105 transition-transform">
              <div className="text-4xl font-extrabold text-blue-400 mb-2 drop-shadow-glow">30-50%</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Comissão por Venda</h3>
              <p className="text-blue-200/80">Em todas as vendas e renovações</p>
            </div>
            <div className="p-8 rounded-2xl bg-[#151d2b]/80 border border-blue-700/40 shadow-xl shadow-blue-900/20 hover:scale-105 transition-transform">
              <div className="text-4xl font-extrabold text-blue-400 mb-2 drop-shadow-glow">70%</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Desconto na Plataforma</h3>
              <p className="text-blue-200/80">Para demonstrações aos clientes</p>
            </div>
            <div className="p-8 rounded-2xl bg-[#151d2b]/80 border border-blue-700/40 shadow-xl shadow-blue-900/20 hover:scale-105 transition-transform">
              <div className="text-4xl font-extrabold text-blue-400 mb-2 drop-shadow-glow">24/7</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Suporte Técnico</h3>
              <p className="text-blue-200/80">Para você e seus clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a2233]/80 to-[#101828]/90">
        <div className="container mx-auto px-6 text-center">
          <Building className="w-16 h-16 text-blue-400 mx-auto mb-6 drop-shadow-glow" />
          <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow-glow">
            Pronto para Transformar o Setor Jurídico?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Junte-se ao programa de parceiros e ajude escritórios de advocacia a automatizar 
            seus processos com inteligência artificial de ponta.
          </p>
          <Button asChild variant="hero" size="lg" className="text-xl px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 border border-blue-400/40">
            <Link to="/parceria">
              Quero Ser Parceiro
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
