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
  cta: "Se você é apaixonado por eficiência, tecnologia e pelo futuro do Direito, chegou a hora de fazer parceria com a ConverseIA Direito."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a2233]/90 to-[#101828]/90">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Como Funciona <span className="text-blue-400">na Prática</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Um programa estruturado para maximizar seus ganhos e construir um negócio sustentável no setor de tecnologia jurídica.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="overflow-hidden bg-[#101828]/80 border border-blue-700/40 shadow-xl shadow-blue-900/20 hover:scale-[1.02] hover:border-blue-400/40 transition-all duration-300 text-white">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Icon & Number */}
                  <div className="lg:w-1/4 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-700 p-8 flex flex-col items-center justify-center text-white">
                    <div className="text-6xl font-bold opacity-30 mb-4">{step.number}</div>
                    <div className="p-4 bg-white/20 rounded-lg mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-400/10 text-blue-100 border border-blue-400/30">
                      Passo {step.number}
                    </Badge>
                  </div>

                  {/* Right side - Content */}
                  <div className="lg:w-3/4">
                    <CardHeader>
                      <CardTitle className="text-2xl text-blue-100 drop-shadow-glow">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-blue-200/90 leading-relaxed text-lg">
                        {step.description}
                      </p>
                      {step.services && (
                        <ul className="space-y-2 ml-4">
                          {step.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              <span className="text-blue-200/90">{service}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {step.note && (
                        <div className="bg-blue-900/40 p-4 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm text-blue-200/90">
                            <strong>📍 Observação:</strong> {step.note}
                          </p>
                        </div>
                      )}
                      {step.cta && (
                        <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-400/20">
                          <p className="text-lg font-medium text-center text-blue-100">{step.cta}</p>
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