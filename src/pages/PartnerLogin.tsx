import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

// URL da sua API. O Vite substitui esta variável pelo valor no seu .env ou configuração do Render
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function PartnerLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao realizar o login.');
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o seu painel...",
        variant: "default"
      });

      // Salva os dados do usuário para simular a sessão
      localStorage.setItem('partnerData', JSON.stringify(result.user));
      
      setTimeout(() => {
        navigate('/parceria/painel');
      }, 1500);

    } catch (error: any) {
      console.error("Erro no login:", error);
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Verifique seu e-mail e senha.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card className="border-2 shadow-lg">
            <CardHeader className="text-center">
              <img src="/iconecomaprincipalcornalogoefundobranco.png" alt="ConverseIA Direito" className="w-16 h-16 mx-auto mb-4" />
              <CardTitle className="text-3xl">Acesse sua Conta</CardTitle>
              <p className="text-muted-foreground pt-2">
                Não tem uma conta?{" "}
                <Link to="/parceria/cadastro" className="text-primary font-semibold hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="seu@email.com" required className="pl-10" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} placeholder="Sua senha" required className="pl-10" />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full text-lg py-6 mt-6" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}