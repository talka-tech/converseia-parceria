import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar,
  Award,
  Download,
  FileText,
  Video,
  MessageSquare,
  Target,
  Zap,
  Crown,
  CreditCard,
  Banknote,
  Smartphone,
  Plus,
  Trash2,
  Check
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface PartnerData {
  name: string;
  companyName: string;
  email: string;
  companyType: string;
}

interface PaymentMethod {
  id: number;
  method_type: string;
  details: any;
  is_default: boolean;
  created_at: string;
}

export default function PartnerDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    method_type: '',
    pix_key: '',
    bank: '',
    agency: '',
    account: '',
    account_type: 'corrente'
  });

  useEffect(() => {
    const data = localStorage.getItem('partnerData');
    if (data) {
      const partner = JSON.parse(data);
      setPartnerData(partner);
      loadPaymentMethods(partner.id);
    } else {
      // Se não há dados do parceiro, redireciona para cadastro
      navigate('/parceria/cadastro');
    }
  }, [navigate]);

  const loadPaymentMethods = async (partnerId: number) => {
    try {
      const response = await fetch(`${API_URL}/api/partners/${partnerId}/payment-methods`);
      if (response.ok) {
        const methods = await response.json();
        setPaymentMethods(methods);
      }
    } catch (error) {
      console.error('Erro ao carregar métodos de pagamento:', error);
    }
  };

  const handleAddPaymentMethod = async () => {
    if (!partnerData) return;

    try {
      let details = {};
      
      if (newPaymentMethod.method_type === 'pix') {
        details = {
          pix_key: newPaymentMethod.pix_key,
          bank: newPaymentMethod.bank
        };
      } else if (newPaymentMethod.method_type === 'bank_transfer') {
        details = {
          bank: newPaymentMethod.bank,
          agency: newPaymentMethod.agency,
          account: newPaymentMethod.account,
          account_type: newPaymentMethod.account_type
        };
      }

      const response = await fetch(`${API_URL}/api/partners/${partnerData.id}/payment-methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method_type: newPaymentMethod.method_type,
          details: details,
          is_default: paymentMethods.length === 0 // Primeiro método é padrão
        }),
      });

      if (response.ok) {
        toast({
          title: "Método de pagamento adicionado",
          description: "Seu método de pagamento foi cadastrado com sucesso.",
        });
        
        loadPaymentMethods(partnerData.id);
        setShowAddPayment(false);
        setNewPaymentMethod({
          method_type: '',
          pix_key: '',
          bank: '',
          agency: '',
          account: '',
          account_type: 'corrente'
        });
      } else {
        throw new Error('Erro ao adicionar método de pagamento');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o método de pagamento.",
        variant: "destructive"
      });
    }
  };

  const handleDeletePaymentMethod = async (methodId: number) => {
    if (!partnerData) return;

    try {
      const response = await fetch(`${API_URL}/api/partners/${partnerData.id}/payment-methods/${methodId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Método removido",
          description: "Método de pagamento removido com sucesso.",
        });
        loadPaymentMethods(partnerData.id);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o método de pagamento.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('partnerData');
    navigate('/parceria');
  };

  if (!partnerData) {
    return <div>Carregando...</div>;
  }

  const salesData = {
    totalSales: 0,
    commission: 0,
    recurringCommission: 0,
    nextTier: 50000,
    currentProgress: 0
  };

  const resources = [
    { title: "Kit de Vendas Completo", type: "PDF", icon: FileText },
    { title: "Apresentação da Solução", type: "PPT", icon: FileText },
    { title: "Vídeo de Demonstração", type: "MP4", icon: Video },
    { title: "Scripts de Qualificação", type: "PDF", icon: MessageSquare },
    { title: "Cases de Sucesso", type: "PDF", icon: Award },
    { title: "Materiais de Marketing", type: "ZIP", icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/iconecomaprincipalcornalogoefundobranco.png" alt="ConverseIA Direito" className="w-10 h-10 mr-3" />
              <div>
                <h1 className="text-xl font-bold">ConverseIA Direito</h1>
                <p className="text-sm text-muted-foreground">Painel do Parceiro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Crown className="w-4 h-4 mr-1" />
                Parceiro Certificado
              </Badge>
              <div className="text-right">
                <p className="font-medium">{partnerData.name}</p>
                <p className="text-sm text-muted-foreground">{partnerData.companyName}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>Sair</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Bem-vindo, {partnerData.name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Você está pronto para revolucionar o setor jurídico com IA. Comece explorando os recursos disponíveis.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {salesData.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comissão Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">30%</div>
              <p className="text-xs text-muted-foreground">Próximo nível: 50%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Escritórios atendidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Meta</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 50k</div>
              <p className="text-xs text-muted-foreground">Para comissão 50%</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Next Tier */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 text-primary mr-2" />
              Progresso para Próximo Nível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>R$ {salesData.totalSales}</span>
                <span>R$ {salesData.nextTier.toLocaleString()}</span>
              </div>
              <Progress value={(salesData.totalSales / salesData.nextTier) * 100} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Você precisa de mais R$ {(salesData.nextTier - salesData.totalSales).toLocaleString()} em vendas para atingir comissão de 50%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            <TabsTrigger value="support">Suporte</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <Card>
                <CardHeader>
                  <CardTitle>Primeiros Passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Baixar Kit de Vendas</p>
                      <p className="text-sm text-muted-foreground">Materiais essenciais para apresentações</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Configurar sua conta com desconto</p>
                      <p className="text-sm text-muted-foreground">70% de desconto para demonstrações</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Contatar primeiro lead</p>
                      <p className="text-sm text-muted-foreground">Começar vendas qualificadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estrutura de Comissões</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Comissão Padrão</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">30%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Em todas as vendas e renovações</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Desconto Plataforma</span>
                      <Badge variant="secondary">70%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Para demonstrações aos clientes</p>
                  </div>
                  
                  <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Após R$ 50k</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">50%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Comissão premium permanente</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-primary" />
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            
            {/* Métodos de Pagamento */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Métodos de Pagamento</CardTitle>
                    <p className="text-muted-foreground">
                      Configure como deseja receber suas comissões
                    </p>
                  </div>
                  <Button onClick={() => setShowAddPayment(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Método
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Nenhum método cadastrado</h3>
                    <p className="text-muted-foreground mb-6">
                      Adicione um método de pagamento para receber suas comissões.
                    </p>
                    <Button onClick={() => setShowAddPayment(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Primeiro Método
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          {method.method_type === 'pix' ? (
                            <Smartphone className="w-8 h-8 text-primary mr-3" />
                          ) : (
                            <Banknote className="w-8 h-8 text-primary mr-3" />
                          )}
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">
                                {method.method_type === 'pix' ? 'PIX' : 'Transferência Bancária'}
                              </h4>
                              {method.is_default && (
                                <Badge variant="secondary" className="ml-2">
                                  <Check className="w-3 h-3 mr-1" />
                                  Padrão
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.method_type === 'pix' 
                                ? `Chave: ${method.details.pix_key}` 
                                : `${method.details.bank} - Ag: ${method.details.agency}`
                              }
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeletePaymentMethod(method.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulário para adicionar método */}
                {showAddPayment && (
                  <div className="mt-6 p-6 border rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-4">Adicionar Método de Pagamento</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Tipo de Pagamento</Label>
                        <Select 
                          value={newPaymentMethod.method_type} 
                          onValueChange={(value) => setNewPaymentMethod(prev => ({...prev, method_type: value}))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pix">PIX</SelectItem>
                            <SelectItem value="bank_transfer">Transferência Bancária</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {newPaymentMethod.method_type === 'pix' && (
                        <>
                          <div>
                            <Label>Chave PIX</Label>
                            <Input
                              value={newPaymentMethod.pix_key}
                              onChange={(e) => setNewPaymentMethod(prev => ({...prev, pix_key: e.target.value}))}
                              placeholder="CPF, e-mail, telefone ou chave aleatória"
                            />
                          </div>
                          <div>
                            <Label>Banco</Label>
                            <Input
                              value={newPaymentMethod.bank}
                              onChange={(e) => setNewPaymentMethod(prev => ({...prev, bank: e.target.value}))}
                              placeholder="Nome do banco"
                            />
                          </div>
                        </>
                      )}

                      {newPaymentMethod.method_type === 'bank_transfer' && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Banco</Label>
                              <Input
                                value={newPaymentMethod.bank}
                                onChange={(e) => setNewPaymentMethod(prev => ({...prev, bank: e.target.value}))}
                                placeholder="Nome do banco"
                              />
                            </div>
                            <div>
                              <Label>Agência</Label>
                              <Input
                                value={newPaymentMethod.agency}
                                onChange={(e) => setNewPaymentMethod(prev => ({...prev, agency: e.target.value}))}
                                placeholder="0000"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Conta</Label>
                              <Input
                                value={newPaymentMethod.account}
                                onChange={(e) => setNewPaymentMethod(prev => ({...prev, account: e.target.value}))}
                                placeholder="00000-0"
                              />
                            </div>
                            <div>
                              <Label>Tipo de Conta</Label>
                              <Select 
                                value={newPaymentMethod.account_type} 
                                onValueChange={(value) => setNewPaymentMethod(prev => ({...prev, account_type: value}))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="corrente">Corrente</SelectItem>
                                  <SelectItem value="poupanca">Poupança</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex gap-2">
                        <Button onClick={handleAddPaymentMethod}>
                          Adicionar
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Card>
                <CardHeader>
                  <CardTitle>Contatos de Suporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Equipe de Parcerias</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para questões sobre vendas e comissões</p>
                    <Button variant="outline" size="sm">Entrar em Contato</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Suporte Técnico</h4>
                    <p className="text-sm text-muted-foreground mb-2">Ajuda com a plataforma e implementação</p>
                    <Button variant="outline" size="sm">Abrir Ticket</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treinamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Onboarding de Parceiros</h4>
                    <p className="text-sm text-muted-foreground mb-2">Treinamento inicial completo</p>
                    <Button variant="outline" size="sm">Assistir</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Técnicas de Vendas</h4>
                    <p className="text-sm text-muted-foreground mb-2">Como vender para advogados</p>
                    <Button variant="outline" size="sm">Assistir</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}