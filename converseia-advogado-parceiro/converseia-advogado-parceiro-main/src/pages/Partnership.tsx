import PartnersHero from "@/components/PartnersHero";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const targetPartners = [
  {
    title: "Agências de Marketing Jurídico",
    description: "Que desejam expandir seu portfólio com serviços de automação e implementação de IA."
  },
  {
    title: "Consultores de Gestão para Escritórios", 
    description: "Que buscam ferramentas eficazes para otimizar a operação de seus clientes."
  },
  {
    title: "Empreendedores de Lawtechs/Legaltechs",
    description: "Que estão construindo negócios focados em tecnologia para o setor jurídico."
  },
  {
    title: "Profissionais de TI e Desenvolvedores",
    description: "Com foco em soluções para o mercado jurídico."
  }
];

export default function Partnership() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <PartnersHero />
      
      {/* Target Partners Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Quem Buscamos Como <span className="text-primary">Parceiro?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa comunidade de parceiros é formada por profissionais focados em crescimento que introduzem escritórios à nossa plataforma. Eles administram seus próprios negócios enquanto ganham comissões por cada indicação bem-sucedida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {targetPartners.map((partner, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <CardTitle className="text-xl">{partner.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6">
              <Link to="/parceria/cadastro">
                Quero Ser Parceiro
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BenefitsSection />
      <HowItWorksSection />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Revolucionar o Setor Jurídico?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se ao programa de parceiros da ConverseIA Direito e comece a construir um negócio lucrativo no futuro da advocacia.
          </p>
          <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90">
            <Link to="/parceria/cadastro">
              Começar Agora
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}