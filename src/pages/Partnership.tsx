import Navigation from "@/components/Navigation";
import { ArrowRight, CheckCircle, Zap, TrendingUp, Users, DollarSign, Brain, Gift, Headphones, Trophy, Rocket, Target, Wrench, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
  <div className="min-h-screen bg-gradient-to-b from-[#0a1833] via-[#101828] to-[#1a2233] text-white">
      <Navigation />
      {/* PartnersHero inlined */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1833] via-[#101828] to-[#1a2233] text-white">
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
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white bg-white/10 hover:bg-white/20">
                  <a href="https://www.converseia.com/#sobre" target="_blank" rel="noopener noreferrer">
                    Saiba Mais
                  </a>
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
      
      {/* Target Partners Section */}
  <section className="py-20 bg-gradient-to-b from-[#101828]/80 to-[#1a2233]/90">
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
              <Card key={index} className="border-2 hover:border-blue-400/40 bg-[#151d2b]/80 shadow-xl shadow-blue-900/20 transition-all duration-300 text-white">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-6 h-6 text-primary mr-3" />
                    <CardTitle className="text-xl">{partner.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 text-base md:text-lg leading-relaxed opacity-90">{partner.description}</p>
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

      {/* BenefitsSection inlined */}
      <section className="py-20 bg-gradient-to-b from-[#151d2b]/90 to-[#1a2233]/90">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              As Vantagens de Ser um <span className="text-blue-400">Parceiro ConverseIA Direito</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Ao se juntar ao programa, você entra em um ecossistema projetado para gerar lucro, crescimento e liderança no nicho de tecnologia jurídica.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefits Cards */}
            {[
              { icon: DollarSign, title: "Ganhos Exponenciais", description: "Comissão de 30% em todas as vendas e renovações. Ao atingir R$ 50.000 em faturamento, sua comissão sobe para 50%, garantindo uma receita passiva e crescente. Além disso, ganhe comissões em todos os novos produtos e cross-sells que oferecermos.", badge: "Receita Recorrente" },
              { icon: Brain, title: "Monetização da Expertise", description: "Você não é apenas um revendedor. Ofereça serviços de alto valor como configuração de fluxos de atendimento, criação de scripts de qualificação jurídica e treinamento de equipes. Defina seus próprios preços e fique com 100% dessa receita.", badge: "100% Seu Lucro" },
              { icon: Users, title: "Leads Jurídicos Qualificados", description: "Nós investimos no seu sucesso. Fornecemos acesso a uma base de advogados e escritórios que já demonstraram interesse na ConverseIA Direito, mas precisam de um especialista para implementar a solução.", badge: "Leads Prontos" },
              { icon: Gift, title: "70% de Desconto na Plataforma", description: "Domine a plataforma com 70% de desconto. Receba acesso à ConverseIA Direito com desconto especial para demonstrações aos clientes, permitindo que você explore todo o potencial da ferramenta e apresente com confiança.", badge: "Acesso com Desconto" },
              { icon: Headphones, title: "Suporte e Ferramentas", description: "Tenha acesso a uma equipe de parcerias dedicada para orientação estratégica, além de suporte técnico 24/7. Fornecemos kits de vendas, materiais de marketing, demonstrações e documentação técnica focada no universo jurídico.", badge: "Suporte 24/7" },
              { icon: Trophy, title: "Crescimento de Marca", description: "Ganhe credibilidade instantânea com o selo oficial de Parceiro Certificado ConverseIA Direito. Seja destaque em nossos canais e tenha sua empresa listada em nosso diretório de parceiros.", badge: "Certificação Oficial" }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="h-full bg-[#101828]/80 border border-blue-700/40 shadow-xl shadow-blue-900/20 hover:scale-105 hover:border-blue-400/40 transition-all duration-300 text-white">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-10 h-10 text-blue-500 drop-shadow" />
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-100 border border-blue-600/40">
                        {benefit.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-blue-100 drop-shadow-glow">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-200/90 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* HowItWorksSection + CTA unificados */}
      <section className="py-20 bg-gradient-to-b from-[#1a2233]/90 to-[#101828]/90">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Como Funciona <span className="text-blue-400">na Prática</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-12">
              Um programa estruturado para maximizar seus ganhos e construir um negócio sustentável no setor de tecnologia jurídica.
            </p>
          </div>
          <div className="space-y-12 mb-20">
            {/* Steps Cards - novo estilo padronizado */}
            {[
              {
                icon: Target,
                number: "01",
                title: "Ganhe com Cada Venda (e depois dela)",
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
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-xl shadow-blue-900/20 border border-blue-700/40 bg-[#101828]/80 hover:scale-[1.02] hover:border-blue-400/40 transition-all duration-300">
                  {/* Lado esquerdo: gradiente azul, número, ícone, badge */}
                  <div className="lg:w-1/3 flex flex-col items-center justify-center py-12 px-6 bg-blue-600 relative">
                    <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-6xl font-bold text-white/40 mb-8">{step.number}</span>
                      <span className="flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 mb-4">
                        <Icon className="w-10 h-10 text-white/80" />
                      </span>
                      <span className="text-white/80 text-sm font-medium tracking-wide">Passo {step.number}</span>
                    </div>
                  </div>
                  {/* Lado direito: conteúdo */}
                  <div className="lg:w-2/3 flex flex-col justify-center p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-blue-100 text-lg leading-relaxed mb-4">{step.description}</p>
                    {step.services && (
                      <ul className="list-disc list-inside text-blue-100 mb-4 pl-2">
                        {step.services.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    )}
                    {step.note && (
                      <div className="bg-blue-900/60 p-4 rounded-lg border-l-4 border-blue-400 mt-2">
                        <span className="font-semibold text-white">Observação:</span> <span className="text-blue-100">{step.note}</span>
                      </div>
                    )}
                    {step.cta && (
                      <div className="bg-blue-900/60 p-4 rounded-lg border-l-4 border-blue-400 mt-2">
                        <span className="text-blue-100">{step.cta}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* CTA Final */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para Revolucionar o Setor Jurídico?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se ao programa de parceiros da ConverseIA Direito e comece a construir um negócio lucrativo no futuro da advocacia.
            </p>
            <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 border border-blue-400/40">
              <Link to="/parceria/cadastro">
                Começar Agora
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}