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
      {/* Hero Section do Index aplicado */}
      <section className="py-20 relative overflow-hidden">
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
            {/* Logs gerais para depuração do carregamento da logo */}
            {/* Caminho correto da logo principal, sem logs desnecessários */}
            <img
              src="/logo_nome.png"
              alt="ConverseIA Direito"
              className="h-16 drop-shadow-lg"
              onError={e => {
                const fallback = "/logo.png";
                const img = e.target as HTMLImageElement;
                if (img && img.src && !img.src.endsWith(fallback)) {
                  img.src = fallback;
                }
              }}
            />
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
              <Link to="/parceria/cadastro">
                Tornar-se Parceiro
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
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
                        <img src="/logo_nome.png" alt="ConverseIA Direito" className="h-16 drop-shadow-lg" onError={e => {
                          const fallback = "/logo.png";
                          const img = e.target as HTMLImageElement;
                          if (img && img.src && !img.src.endsWith(fallback)) {
                            img.src = fallback;
                          }
                        }} />
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