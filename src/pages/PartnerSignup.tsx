import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { User, Building, Mail, Phone, Briefcase, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

// URL da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function PartnerSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
    company_type: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const companyTypes = [
    "Agência de Marketing Jurídico",
    "Consultoria de Gestão",
    "Lawtech/Legaltech",
    "Profissional de TI",
    "Desenvolvedor",
    "Outro"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
  if (!formData.name || !formData.email || !formData.password || !formData.company_name || !formData.company_type) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return false;
    }

  if (formData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      // 1. Cadastro Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { name: formData.name } }
      });
      if (signUpError) throw new Error(signUpError.message);
      const user = signUpData.user;
      if (!user) throw new Error("Erro ao criar usuário no Supabase.");

      // 2. Inserir dados do parceiro
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .insert([
          {
            user_id: user.id,
            company_name: formData.company_name,
            company_type: formData.company_type,
            phone: formData.phone
          }
        ])
        .select()
        .single();
      if (partnerError) throw new Error(partnerError.message);

      setShowConfirmEmail(true);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1833] via-[#101828] to-[#1a2233] text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 shadow-lg bg-[#151d2b]/80 border-blue-700/40 text-white">
            <CardHeader className="text-center">
              <img src="/logo.png" alt="ConverseIA Direito" className="w-16 h-16 mx-auto mb-4" onError={e => {
                const fallback = "/logo.png";
                const img = e.target as HTMLImageElement;
                if (img && img.src && !img.src.endsWith(fallback)) {
                  img.src = fallback;
                }
              }} />
              <CardTitle className="text-3xl">Cadastro de Parceiro</CardTitle>
              <p className="text-muted-foreground pt-2">
                Já tem uma conta?{" "}
                <Link to="/parceria/login" className="text-primary font-semibold hover:underline">
                  Faça login
                </Link>
              </p>
            </CardHeader>
            <CardContent>
              {showConfirmEmail ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="mx-auto mb-6"><path stroke="#2563eb" strokeWidth="1.5" d="M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.5m-18 0V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v.5m-18 0 8.47 6.35a2 2 0 0 0 2.36 0L21 7.5"/><path stroke="#2563eb" strokeWidth="1.5" d="m3.5 7.5 7.97 6.36a2 2 0 0 0 2.06.09l.3-.18L20.5 7.5"/></svg>
                  <h2 className="text-2xl font-bold mb-2">Confirme seu e-mail</h2>
                  <p className="text-lg mb-4">Enviamos um link de confirmação para <span className="font-semibold text-primary">{formData.email}</span>.</p>
                  <p className="text-base text-muted-foreground mb-2">Acesse sua caixa de entrada e clique no link para ativar sua conta.</p>
                  <p className="text-base text-muted-foreground">Após confirmar, você será direcionado automaticamente para o painel.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Seu nome completo"
                            required
                            className="pl-10 text-[#101828] placeholder:text-[#101828]"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className="pl-10 text-[#101828] placeholder:text-[#101828]"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="password">Senha *</Label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="Mínimo 6 caracteres"
                          required
                          className="pl-10 pr-10 text-[#101828] placeholder:text-[#101828]"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="pl-10 text-[#101828] placeholder:text-[#101828]"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Dados da Empresa */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Dados da Empresa</h3>
                    <div>
                      <Label htmlFor="company_name">Nome da Empresa *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="company_name"
                          value={formData.company_name}
                          onChange={(e) => handleInputChange('company_name', e.target.value)}
                          placeholder="Nome da sua empresa"
                          required
                          className="pl-10 text-white placeholder:text-[#101828]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company_type">Tipo de Empresa *</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Select value={formData.company_type} onValueChange={(value) => handleInputChange('company_type', value)}>
                          <SelectTrigger className="pl-10 text-[#101828]">
                            <SelectValue
                              placeholder={<span className="text-[#101828]">Selecione o tipo da sua empresa</span>}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {companyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full text-lg py-6 mt-8"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta de Parceiro"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}