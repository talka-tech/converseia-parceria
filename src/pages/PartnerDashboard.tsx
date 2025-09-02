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
import { googleSheetsService, ClientData } from "@/lib/googleSheets";
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
  Check,
  Edit3,
  X,
  Save,
  RefreshCw
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface PartnerData {
  id: number;
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

interface Client {
  name: string;
  email: string;
  phone: string;
  company: string;
  value: number;
  status: 'pending_payment' | 'pending_implementation' | 'active';
  implementationPaid: boolean;
}

const IMPLEMENTATION_FEE = 500.00; // Taxa de implantação

export default function PartnerDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  // --- Estado para métodos de pagamento removido ---
  // const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  // const [showAddPayment, setShowAddPayment] = useState(false);
  // const [newPaymentMethod, setNewPaymentMethod] = useState({...});

  // --- Estado e lógica para clientes ---
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Client>({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    value: 0, 
    status: 'pending_payment', 
    implementationPaid: false 
  });
  const [isLoadingClients, setIsLoadingClients] = useState(false);

  // Carregar clientes do Google Sheets
  const loadClientsFromSheets = async () => {
    setIsLoadingClients(true);
    try {
      const sheetsClients = await googleSheetsService.getClients();
      // Converter para o formato local (adicionar implementationPaid se não existir)
      const formattedClients = sheetsClients.map(client => ({
        ...client,
        implementationPaid: client.status === 'active'
      }));
      setClients(formattedClients);
      toast({
        title: "Dados sincronizados",
        description: "Clientes carregados do Google Sheets com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro de sincronização",
        description: "Não foi possível carregar dados do Google Sheets.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingClients(false);
    }
  };

  // --- Estado para edição de cliente ---
  const [editingClientIndex, setEditingClientIndex] = useState<number | null>(null);
  const [editingClient, setEditingClient] = useState<Client>({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    value: 0, 
    status: 'pending_payment', 
    implementationPaid: false 
  });

  // Remover clientPrice já que agora o parceiro define o valor

  useEffect(() => {
    const data = localStorage.getItem('partnerData');
    if (data) {
      const partner = JSON.parse(data);
      setPartnerData(partner);
      // Carregar clientes do Google Sheets
      loadClientsFromSheets();
    } else {
      // Se não há dados do parceiro, redireciona para cadastro
      navigate('/parceria/cadastro');
    }
  }, [navigate]);

  // Funções de pagamento removidas
  // const loadPaymentMethods = async (partnerId: number) => {...}
  // const handleAddPaymentMethod = async () => {...}
  // const handleDeletePaymentMethod = async (methodId: number) => {...}

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

  async function handleAddClient() {
    if (!newClient.name || !newClient.email || !newClient.value) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e valor do cliente.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoadingClients(true);
      
      // Adicionar no Google Sheets
      const clientData: ClientData = {
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        company: newClient.company,
        value: newClient.value,
        status: 'pending_payment'
      };
      
      const success = await googleSheetsService.addClient(clientData);
      
      if (success) {
        // Atualizar estado local
        setClients(prev => [...prev, { ...newClient, status: 'pending_payment' }]);
        setNewClient({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '', 
          value: 0, 
          status: 'pending_payment', 
          implementationPaid: false 
        });

        toast({
          title: "Cliente cadastrado",
          description: "Cliente adicionado ao Google Sheets com sucesso!",
        });
      } else {
        throw new Error('Falha ao adicionar no Google Sheets');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o cliente no Google Sheets.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingClients(false);
    }
  }

  const handleEditClient = (index: number) => {
    setEditingClientIndex(index);
    setEditingClient(clients[index]);
  };

  const handleSaveEditClient = async () => {
    if (!editingClient.name || !editingClient.email || !editingClient.value) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e valor do cliente.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoadingClients(true);
      
      // Atualizar no Google Sheets
      const clientData: ClientData = {
        name: editingClient.name,
        email: editingClient.email,
        phone: editingClient.phone,
        company: editingClient.company,
        value: editingClient.value,
        status: editingClient.status
      };
      
      const success = await googleSheetsService.updateClient(editingClientIndex!, clientData);
      
      if (success) {
        // Atualizar estado local
        setClients(prev => prev.map((client, index) => 
          index === editingClientIndex ? editingClient : client
        ));
        
        setEditingClientIndex(null);
        setEditingClient({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '', 
          value: 0, 
          status: 'pending_payment', 
          implementationPaid: false 
        });

        toast({
          title: "Cliente atualizado",
          description: "Dados atualizados no Google Sheets com sucesso.",
        });
      } else {
        throw new Error('Falha ao atualizar no Google Sheets');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cliente no Google Sheets.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingClients(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingClientIndex(null);
    setEditingClient({ 
      name: '', 
      email: '', 
      phone: '', 
      company: '', 
      value: 0, 
      status: 'pending_payment', 
      implementationPaid: false 
    });
  };

  const handleDeleteClient = async (index: number) => {
    try {
      setIsLoadingClients(true);
      
      // Deletar do Google Sheets
      const success = await googleSheetsService.deleteClient(index);
      
      if (success) {
        // Atualizar estado local
        setClients(prev => prev.filter((_, i) => i !== index));
        toast({
          title: "Cliente removido",
          description: "Cliente removido do Google Sheets com sucesso.",
        });
      } else {
        throw new Error('Falha ao deletar do Google Sheets');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o cliente do Google Sheets.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingClients(false);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    // Função removida - não mais necessária
  };

  const handlePayImplementationFee = async (clientIndex: number) => {
    try {
      // Aqui você integraria com o Stripe para criar o pagamento
      // Por enquanto, vamos simular o pagamento
      
      toast({
        title: "Redirecionando para pagamento",
        description: `Taxa de implantação: R$ ${IMPLEMENTATION_FEE.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      });

      // Simular pagamento bem-sucedido após alguns segundos
      setTimeout(() => {
        setClients(prev => prev.map((client, index) => 
          index === clientIndex 
            ? { ...client, implementationPaid: true, status: 'active' }
            : client
        ));
        
        toast({
          title: "Pagamento confirmado",
          description: "Taxa de implantação paga! Cliente será notificado.",
        });
      }, 3000);

    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar o pagamento da taxa de implantação.",
        variant: "destructive"
      });
    }
  };
  return (
  <div className="min-h-screen bg-gradient-to-b from-[#0a1833] via-[#101828] to-[#1a2233] text-white">
      
      {/* Header */}
  <header className="border-b bg-[#151d2b]/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/logo.png" alt="ConverseIA Direito" className="w-10 h-10 mr-3" onError={e => {
                const fallback = "/logo.png";
                const img = e.target as HTMLImageElement;
                if (img && img.src && !img.src.endsWith(fallback)) {
                  img.src = fallback;
                }
              }} />
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
              <Button variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white border-none" onClick={handleLogout}>Sair</Button>
            </div>
          </div>
        </div>
      </header>

  <div className="container mx-auto px-6 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold mb-2 text-blue-400 drop-shadow-glow">
            Bem-vindo, {partnerData.name}! 👋
          </h2>
          <p className="text-blue-200/90">
            Você está pronto para revolucionar o setor jurídico com IA. Comece explorando os recursos disponíveis.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#101828]/90 border border-blue-700/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Vendas Totais</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ {salesData.totalSales.toLocaleString()}</div>
              <p className="text-xs text-blue-100">Este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-[#101828]/90 border border-blue-700/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Comissão Atual</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">20%</div>
              <p className="text-xs text-blue-100">Próximo nível: 50%</p>
            </CardContent>
          </Card>

          <Card className="bg-[#101828]/90 border border-blue-700/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Clientes Ativos</CardTitle>
              <Users className="h-4 w-4 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-blue-100">Escritórios atendidos</p>
            </CardContent>
          </Card>

          <Card className="bg-[#101828]/90 border border-blue-700/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Próxima Meta</CardTitle>
              <Target className="h-4 w-4 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ 50k</div>
              <p className="text-xs text-blue-100">Para comissão 50%</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Next Tier */}
  <Card className="mb-8 bg-[#101828]/90 border border-blue-700/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Zap className="w-5 h-5 text-blue-400 mr-2" />
              Progresso para Próximo Nível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-blue-100">
                <span>R$ {salesData.totalSales}</span>
                <span>R$ {salesData.nextTier.toLocaleString()}</span>
              </div>
              <Progress value={(salesData.totalSales / salesData.nextTier) * 100} className="h-3" />
              <p className="text-sm text-blue-100">
                Você precisa de mais R$ {(salesData.nextTier - salesData.totalSales).toLocaleString()} em vendas para atingir comissão de 50%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#151d2b]/90 border border-blue-700/40 rounded-xl overflow-hidden">
            <TabsTrigger value="clients" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200">Clientes</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200">Recursos</TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200">Suporte</TabsTrigger>
          </TabsList>
          {/* Nova aba de Clientes */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-[#151d2b]/90 border border-blue-700/40 text-white">
              <CardHeader>
                <CardTitle>Adicionar Novo Cliente</CardTitle>
                <p className="text-blue-100 mt-2">Cadastre um novo cliente e realize o pagamento pré-pago com desconto de parceiro.</p>
              </CardHeader>
              <CardContent>
                {/* Formulário de novo cliente */}
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleAddClient(); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-blue-100">Nome do Cliente</Label>
                      <Input 
                        required 
                        value={newClient.name} 
                        onChange={e => setNewClient(prev => ({...prev, name: e.target.value}))} 
                        placeholder="Nome completo" 
                        className="bg-[#101828] border-blue-700/40 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <Label className="text-blue-100">Email do Cliente</Label>
                      <Input 
                        required 
                        type="email" 
                        value={newClient.email} 
                        onChange={e => setNewClient(prev => ({...prev, email: e.target.value}))} 
                        placeholder="email@cliente.com" 
                        className="bg-[#101828] border-blue-700/40 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-blue-100">Telefone</Label>
                      <Input 
                        value={newClient.phone} 
                        onChange={e => setNewClient(prev => ({...prev, phone: e.target.value}))} 
                        placeholder="(99) 99999-9999" 
                        className="bg-[#101828] border-blue-700/40 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <Label className="text-blue-100">Empresa</Label>
                      <Input 
                        value={newClient.company} 
                        onChange={e => setNewClient(prev => ({...prev, company: e.target.value}))} 
                        placeholder="Nome da empresa" 
                        className="bg-[#101828] border-blue-700/40 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-blue-100">Valor do Cliente (R$)</Label>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      required 
                      value={newClient.value || ''} 
                      onChange={e => setNewClient(prev => ({...prev, value: parseFloat(e.target.value) || 0}))} 
                      placeholder="Ex: 1500.00" 
                      className="bg-[#101828] border-blue-700/40 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-blue-200 text-lg font-semibold">Valor definido:</span>
                    <span className="text-2xl font-bold text-blue-400">R$ {newClient.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-100 border border-green-600/40 ml-2">Personalizado</Badge>
                  </div>
                  <Button type="submit" variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white mt-4">Cadastrar Cliente</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="bg-[#151d2b]/90 border border-blue-700/40 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Clientes Cadastrados</CardTitle>
                    <p className="text-blue-100 mt-2">Dados sincronizados em tempo real com Google Sheets.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={loadClientsFromSheets}
                    disabled={isLoadingClients}
                    className="border-blue-600 text-blue-300 hover:bg-blue-700"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingClients ? 'animate-spin' : ''}`} />
                    Sincronizar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingClients ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 text-blue-400 mx-auto mb-4 animate-spin" />
                    <p className="text-blue-200">Sincronizando com Google Sheets...</p>
                  </div>
                ) : clients.length === 0 ? (
                  <div className="text-center py-8 text-blue-200">
                    <p>Nenhum cliente encontrado no Google Sheets.</p>
                    <p className="text-sm mt-2">Cadastre o primeiro cliente ou verifique a configuração da planilha.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="text-blue-300 border-b border-blue-700/40">
                          <th className="py-2 px-4">Nome</th>
                          <th className="py-2 px-4">Email</th>
                          <th className="py-2 px-4">Empresa</th>
                          <th className="py-2 px-4">Valor</th>
                          <th className="py-2 px-4">Status</th>
                          <th className="py-2 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((c, i) => (
                          <tr key={i} className="border-b border-blue-800/30">
                            {editingClientIndex === i ? (
                              // Modo de edição
                              <>
                                <td className="py-2 px-4">
                                  <Input 
                                    value={editingClient.name} 
                                    onChange={e => setEditingClient(prev => ({...prev, name: e.target.value}))}
                                    className="bg-[#101828] border-blue-700/40 text-white text-sm h-8"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input 
                                    value={editingClient.email} 
                                    onChange={e => setEditingClient(prev => ({...prev, email: e.target.value}))}
                                    className="bg-[#101828] border-blue-700/40 text-white text-sm h-8"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input 
                                    value={editingClient.company} 
                                    onChange={e => setEditingClient(prev => ({...prev, company: e.target.value}))}
                                    className="bg-[#101828] border-blue-700/40 text-white text-sm h-8"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input 
                                    type="number"
                                    value={editingClient.value || ''} 
                                    onChange={e => setEditingClient(prev => ({...prev, value: parseFloat(e.target.value) || 0}))}
                                    className="bg-[#101828] border-blue-700/40 text-white text-sm h-8"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  {c.status === 'pending_payment' && (
                                    <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300 border border-yellow-600/30">Pendente Pagamento</Badge>
                                  )}
                                  {c.status === 'pending_implementation' && (
                                    <Badge variant="secondary" className="bg-orange-600/20 text-orange-300 border border-orange-600/30">Pendente Implantação</Badge>
                                  )}
                                  {c.status === 'active' && (
                                    <Badge variant="secondary" className="bg-green-600/20 text-green-300 border border-green-600/30">Ativo</Badge>
                                  )}
                                </td>
                                <td className="py-2 px-4">
                                  <div className="flex gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="hero" 
                                      className="bg-green-600 hover:bg-green-700 text-white text-xs p-1 h-7 w-7"
                                      onClick={handleSaveEditClient}
                                    >
                                      <Save className="w-3 h-3" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs p-1 h-7 w-7"
                                      onClick={handleCancelEdit}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              // Modo de visualização
                              <>
                                <td className="py-2 px-4">{c.name}</td>
                                <td className="py-2 px-4">{c.email}</td>
                                <td className="py-2 px-4">{c.company}</td>
                                <td className="py-2 px-4">R$ {c.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                <td className="py-2 px-4">
                                  {c.status === 'pending_payment' && (
                                    <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300 border border-yellow-600/30">Pendente Pagamento</Badge>
                                  )}
                                  {c.status === 'pending_implementation' && (
                                    <Badge variant="secondary" className="bg-orange-600/20 text-orange-300 border border-orange-600/30">Pendente Implantação</Badge>
                                  )}
                                  {c.status === 'active' && (
                                    <Badge variant="secondary" className="bg-green-600/20 text-green-300 border border-green-600/30">Ativo</Badge>
                                  )}
                                </td>
                                <td className="py-2 px-4">
                                  <div className="flex gap-1">
                                    {c.status === 'pending_implementation' && !c.implementationPaid && (
                                      <Button 
                                        size="sm" 
                                        variant="hero" 
                                        className="bg-orange-600 hover:bg-orange-700 text-white text-xs mr-1"
                                        onClick={() => handlePayImplementationFee(i)}
                                      >
                                        Pagar Taxa
                                      </Button>
                                    )}
                                    {c.status === 'active' && (
                                      <Badge variant="secondary" className="bg-green-600/20 text-green-300 border border-green-600/30 mr-1">✓ Ativo</Badge>
                                    )}
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs p-1 h-7 w-7"
                                      onClick={() => handleEditClient(i)}
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive" 
                                      className="bg-red-700 hover:bg-red-800 text-white text-xs p-1 h-7 w-7"
                                      onClick={() => handleDeleteClient(i)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
        </TabsContent>


          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <Card className="bg-[#151d2b]/90 border border-blue-700/40 text-white">
                <CardHeader>
                  <CardTitle>Primeiros Passos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-4 border border-blue-700/40 rounded-lg bg-[#101828]/80">
                    <div className="w-8 h-8 bg-blue-600/80 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Baixar Kit de Vendas</p>
                      <p className="text-sm text-blue-200">Materiais essenciais para apresentações</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border border-blue-700/40 rounded-lg bg-[#101828]/80">
                    <div className="w-8 h-8 bg-blue-600/80 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Configurar sua conta com desconto</p>
                      <p className="text-sm text-blue-200">70% de desconto para demonstrações</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border border-blue-700/40 rounded-lg bg-[#101828]/80">
                    <div className="w-8 h-8 bg-blue-600/80 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Contatar primeiro lead</p>
                      <p className="text-sm text-blue-200">Começar vendas qualificadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#151d2b]/90 border border-blue-700/40 text-white">
                <CardHeader>
                  <CardTitle>Estrutura de Comissões</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-[#101828]/80 border border-blue-700/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">Comissão Padrão</span>
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border border-blue-600/30">20%</Badge>
                    </div>
                    <p className="text-sm text-blue-200">Em todas as vendas e renovações</p>
                  </div>
                  <div className="p-4 bg-[#101828]/80 border border-blue-700/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">Desconto Plataforma</span>
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border border-blue-600/30">70%</Badge>
                    </div>
                    <p className="text-sm text-blue-200">Para demonstrações aos clientes</p>
                  </div>
                  <div className="p-4 bg-[#101828]/80 border border-blue-700/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">Após R$ 50k</span>
                      <Badge variant="secondary" className="bg-green-600/20 text-green-300 border border-green-600/30">50%</Badge>
                    </div>
                    <p className="text-sm text-green-200">Comissão premium permanente</p>
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
                  <Card key={index} className="bg-[#101828]/90 border border-blue-700/40 hover:shadow-lg transition-all duration-300 cursor-pointer text-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-blue-400" />
                        <Badge variant="outline" className="border-blue-600/40 text-blue-300">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="hero" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="bg-[#101828]/90 border border-blue-700/40 hover:shadow-lg transition-all duration-300 cursor-pointer text-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-blue-400" />
                        <Badge variant="outline" className="border-blue-600/40 text-blue-300">{resource.type}</Badge>
                      </div>
                      <CardTitle className="text-lg text-white">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="hero" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <Card className="bg-[#151d2b]/90 border border-blue-700/40 text-white">
                <CardHeader>
                  <CardTitle>Contatos de Suporte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Equipe de Parcerias</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para questões sobre vendas e comissões</p>
                    <Button variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">Entrar em Contato</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Suporte Técnico</h4>
                    <p className="text-sm text-muted-foreground mb-2">Ajuda com a plataforma e implementação</p>
                    <Button variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">Abrir Ticket</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#151d2b]/90 border border-blue-700/40 text-white">
                <CardHeader>
                  <CardTitle>Treinamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Onboarding de Parceiros</h4>
                    <p className="text-sm text-muted-foreground mb-2">Treinamento inicial completo</p>
                    <Button variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">Assistir</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Técnicas de Vendas</h4>
                    <p className="text-sm text-muted-foreground mb-2">Como vender para advogados</p>
                    <Button variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">Assistir</Button>
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