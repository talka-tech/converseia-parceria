import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Brain, 
  Users, 
  Gift, 
  Headphones, 
  Trophy,
  Rocket 
} from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Ganhos Exponenciais",
    description: "Comissão de 30% em todas as vendas e renovações. Ao atingir R$ 50.000 em faturamento, sua comissão sobe para 50%, garantindo uma receita passiva e crescente. Além disso, ganhe comissões em todos os novos produtos e cross-sells que oferecermos.",
    badge: "Receita Recorrente"
  },
  {
    icon: Brain,
    title: "Monetização da Expertise",
    description: "Você não é apenas um revendedor. Ofereça serviços de alto valor como configuração de fluxos de atendimento, criação de scripts de qualificação jurídica e treinamento de equipes. Defina seus próprios preços e fique com 100% dessa receita.",
    badge: "100% Seu Lucro"
  },
  {
    icon: Users,
    title: "Leads Jurídicos Qualificados",
    description: "Nós investimos no seu sucesso. Fornecemos acesso a uma base de advogados e escritórios que já demonstraram interesse na ConverseIA Direito, mas precisam de um especialista para implementar a solução.",
    badge: "Leads Prontos"
  },
  {
    icon: Gift,
    title: "70% de Desconto na Plataforma",
    description: "Domine a plataforma com 70% de desconto. Receba acesso à ConverseIA Direito com desconto especial para demonstrações aos clientes, permitindo que você explore todo o potencial da ferramenta e apresente com confiança.",
    badge: "Acesso com Desconto"
  },
  {
    icon: Headphones,
    title: "Suporte e Ferramentas",
    description: "Tenha acesso a uma equipe de parcerias dedicada para orientação estratégica, além de suporte técnico 24/7. Fornecemos kits de vendas, materiais de marketing, demonstrações e documentação técnica focada no universo jurídico.",
    badge: "Suporte 24/7"
  },
  {
    icon: Trophy,
    title: "Crescimento de Marca",
    description: "Ganhe credibilidade instantânea com o selo oficial de Parceiro Certificado ConverseIA Direito. Seja destaque em nossos canais e tenha sua empresa listada em nosso diretório de parceiros.",
    badge: "Certificação Oficial"
  },
  {
    icon: Rocket,
    title: "Inovação Constante",
    description: "Fabricamos constantemente novos produtos, automações e inovações para o setor jurídico. Como parceiro, você terá acesso prioritário a todos os lançamentos e poderá oferecer cross-sells, sendo comissionado por cada nova solução vendida.",
    badge: "Novos Produtos"
  }
];

export default function BenefitsSection() {
  return (
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
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="h-full bg-[#101828]/80 border border-blue-700/40 shadow-xl shadow-blue-900/20 hover:scale-105 hover:border-blue-400/40 transition-all duration-300 text-white">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-700 rounded-lg shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-blue-400/10 text-blue-300 border border-blue-400/30">
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
  );
}