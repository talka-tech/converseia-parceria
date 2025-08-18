import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Building, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
// import logo from "@/assets/converseia-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-8">
            <img src="/logotodabracahorizontal.png" alt="ConverseIA Direito" className="h-16" />
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Automatize seu<br />
            <span className="text-primary-glow">Escritório de Advocacia</span><br />
            com Inteligência Artificial
          </h2>
          
          <p className="text-2xl mb-12 opacity-90 max-w-4xl mx-auto">
            Revolucione o atendimento ao cliente, qualifique leads automaticamente 
            e libere tempo para focar no que realmente importa: a prática do Direito.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild variant="hero" size="lg" className="text-xl px-8 py-6">
              <Link to="/parceria">
                <Users className="mr-2" />
                Programa de Parceiros
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="text-xl px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Zap className="mr-2" />
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">30-50%</div>
              <h3 className="text-xl font-semibold mb-2">Comissão por Venda</h3>
              <p className="text-muted-foreground">Em todas as vendas e renovações</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">70%</div>
              <h3 className="text-xl font-semibold mb-2">Desconto na Plataforma</h3>
              <p className="text-muted-foreground">Para demonstrações aos clientes</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <h3 className="text-xl font-semibold mb-2">Suporte Técnico</h3>
              <p className="text-muted-foreground">Para você e seus clientes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <Building className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Transformar o Setor Jurídico?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Junte-se ao programa de parceiros e ajude escritórios de advocacia a automatizar 
            seus processos com inteligência artificial de ponta.
          </p>
          <Button asChild variant="hero" size="lg" className="text-xl px-8 py-6">
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
