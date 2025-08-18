import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Wrench, Building } from "lucide-react";

const steps = [
  {
    icon: Target,
    number: "01",
    title: "Ganhe com Cada Venda (e Depois Dela)",
    description: "Você recebe uma comissão de 30% em todas as vendas que realizar. Ao atingir o marco de R$ 50.000 em faturamento, essa taxa salta para 50%. Suas renovações se transformam em receita sustentável, e você também ganha comissões em todos os novos produtos e cross-sells que lançarmos.",
    note: "As comissões são pagas mensalmente e você tem acesso a relatórios detalhados de performance no Portal de Parceiros."
  },
  {
    icon: Wrench,
    number: "02", 
    title: "Monetize seu Conhecimento Jurídico e Técnico",
    description: "Você é um especialista. Use isso a seu favor. Ofereça serviços de implementação, como:",
    services: [
      "Desenho e configuração do funil de atendimento via WhatsApp",
      "Criação de scripts para qualificação automática de casos (Cível, Trabalhista, Previdenciário, etc.)",
      "Integração com CRMs e sistemas de gestão do escritório", 
      "Treinamento para a equipe interna do seu cliente"
    ],
    note: "O valor desses serviços é definido por você, e o lucro é 100% seu."
  },
  {
    icon: Building,
    number: "03",
    title: "Acesso a Inovações Constantes",
    description: "Fabricamos constantemente novos produtos, automações e inovações para o setor jurídico. Como parceiro, você terá acesso prioritário a todos os lançamentos, poderá oferecer cross-sells aos seus clientes e será comissionado por cada nova solução vendida. Além disso, você recebe 70% de desconto na plataforma para demonstrações.",
    cta: "Se você é apaixonado por eficiência, tecnologia e pelo futuro do Direito, chegou a hora de fazer parceria com a ConverseIA Direito 🤜🤛"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Como Funciona <span className="text-primary">na Prática</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um programa estruturado para maximizar seus ganhos e construir um negócio sustentável no setor de tecnologia jurídica.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="overflow-hidden border-2 hover:border-primary/20 transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Left side - Icon & Number */}
                  <div className="lg:w-1/4 bg-gradient-primary p-8 flex flex-col items-center justify-center text-white">
                    <div className="text-6xl font-bold opacity-30 mb-4">{step.number}</div>
                    <div className="p-4 bg-white/20 rounded-lg mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Passo {step.number}
                    </Badge>
                  </div>

                  {/* Right side - Content */}
                  <div className="lg:w-3/4">
                    <CardHeader>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {step.description}
                      </p>
                      
                      {step.services && (
                        <ul className="space-y-2 ml-4">
                          {step.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-start">
                              <span className="text-primary mr-2">•</span>
                              <span className="text-muted-foreground">{service}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {step.note && (
                        <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                          <p className="text-sm text-muted-foreground">
                            <strong>📍 Observação:</strong> {step.note}
                          </p>
                        </div>
                      )}

                      {step.cta && (
                        <div className="bg-gradient-primary/10 p-6 rounded-lg border border-primary/20">
                          <p className="text-lg font-medium text-center">{step.cta}</p>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}