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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            As Vantagens de Ser um <span className="text-primary">Parceiro ConverseIA Direito</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ao se juntar ao programa, você entra em um ecossistema projetado para gerar lucro, crescimento e liderança no nicho de tecnologia jurídica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="h-full hover:shadow-primary transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-primary rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {benefit.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}