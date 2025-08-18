import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
// import logo from "@/assets/converseia-logo.png";

export default function PartnersHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 py-20 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <img src="/logotodabracahorizontal.png" alt="ConverseIA Direito" className="h-12" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Programa de Parceiros:<br />
              <span className="text-primary-glow">A Revolução da IA</span><br />
              no Setor Jurídico
            </h2>
            
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Transforme escritórios de advocacia com automação inteligente.<br />
              Ganhe <strong>30-50% de comissão</strong> + <strong>70% de desconto na plataforma</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6">
                <Link to="/parceria/cadastro">
                  Tornar-se Parceiro
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex-1 lg:flex-none lg:w-96">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-white mr-3" />
                  <h3 className="text-xl font-semibold text-white">Comissão por Venda</h3>
                </div>
                <p className="text-3xl font-bold text-primary-glow">30-50%</p>
                <p className="opacity-80 text-white">em todas as vendas</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white mr-3" />
                  <h3 className="text-xl font-semibold text-white">Desconto Plataforma</h3>
                </div>
                <p className="text-3xl font-bold text-primary-glow">70%</p>
                <p className="opacity-80 text-white">para demonstrações</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-white mr-3" />
                  <h3 className="text-xl font-semibold text-white">Para Quem?</h3>
                </div>
                <ul className="space-y-2 text-sm opacity-80 text-white">
                  <li>• Agências de Marketing Jurídico</li>
                  <li>• Consultores de Gestão</li>
                  <li>• Empreendedores Lawtechs</li>
                  <li>• Profissionais de TI</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}