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
          {/* Balança */}
          <svg className="animate-float-slow" style={{position:'absolute', left:60, top:80, width:160, height:160, opacity:0.10}} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M500.609,322.275l-57.428-162.834c0.135,0.008,0.279,0.025,0.406,0.025c39.538,0.677,49.422-20.58,54.566-27.94c7.118-10.171-7.91-20.343-15.816-13.558c-7.906,6.775-29.264,21.011-70.386,2.024C374.874,102.875,309.87,73.098,271.92,67.399v-39c0-8.799-7.127-15.921-15.918-15.921c-8.795,0-15.922,7.122-15.922,15.921v39c-37.95,5.699-102.953,35.476-140.031,52.593c-41.121,18.987-62.48,4.751-70.386-2.024c-7.906-6.784-22.935,3.388-15.816,13.558c5.145,7.36,15.028,28.617,54.566,27.94c0.132,0,0.276-0.017,0.402-0.025L11.391,322.275H0c11.497,38.025,46.804,65.736,88.595,65.736c41.786,0,77.093-27.711,88.59-65.736h-11.386l-60.355-171.134c37.183-11.467,89.569-31.056,134.636-34.072v24.23h-8.507v267.748H218.37v23.858c-8.715,0-17.569,0-24.874,0c-23.354,0-22.663,32.969-22.663,32.969c-19.233,0-28.85,15.101-28.85,33.648h228.033c0-18.546-9.616-33.648-28.845-33.648c0,0,0.686-32.969-22.668-32.969c-7.305,0-16.159,0-24.874,0v-23.858h-13.203V141.3h-8.507v-24.23c45.072,3.015,97.457,22.604,134.64,34.072l-60.358,171.134h-11.387c11.496,38.025,46.804,65.736,88.59,65.736c41.79,0,77.098-27.711,88.594-65.736H500.609z M141.243,322.275H35.948L88.595,173L141.243,322.275z M370.758,322.275L423.41,173l52.643,149.275H370.758z" fill="#60a5fa"/>
          </svg>
          {/* Martelo */}
          <svg className="animate-float-medium" style={{position:'absolute', right:80, bottom:60, width:120, height:120, opacity:0.10}} viewBox="0 -8 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M59,27.27l-10,10a3.66,3.66,0,0,1-5.18-.07,3.7,3.7,0,0,1-.56-4.56l-4.4-4.4-3.57,3.58A3.84,3.84,0,0,1,34.17,35L18.61,50.54a3.87,3.87,0,0,1-5.48-5.48L28.68,29.52a3.91,3.91,0,0,1,4.23-.85l3.18-3.18-4.4-4.4a3.72,3.72,0,0,1-4.63-5.74l10-10A3.72,3.72,0,0,1,42.79,10L54.33,21.54A3.72,3.72,0,0,1,59,27.27Z" fill="#38bdf8"/>
          </svg>
          {/* Livro */}
          <svg className="animate-float-slower" style={{position:'absolute', left:'50%', top:40, width:110, height:110, opacity:0.09, transform:'translateX(-50%)'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
          <h2 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-[1.08] bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-glow" style={{overflowWrap:'anywhere'}}>
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
          </div>
        </div>
      </section>

      {/* Quick Stats */}
  <section className="pt-6 pb-10 bg-gradient-to-b from-[#101828]/80 to-[#1a2233]/90">
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
  <section className="pt-10 pb-16 bg-gradient-to-b from-[#1a2233]/80 to-[#101828]/90">
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
