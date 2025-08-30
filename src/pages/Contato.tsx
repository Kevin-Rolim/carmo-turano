import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  AlertTriangle, 
  UserCheck, 
  Shield 
} from "lucide-react";

const Contato = () => {
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    isAnonymous: false,
    agreeTerms: false
  });

  const contactTypes = [
    { value: "duvida", label: "Dúvida Geral", icon: MessageSquare },
    { value: "sugestao", label: "Sugestão", icon: UserCheck },
    { value: "reclamacao", label: "Reclamação", icon: AlertTriangle },
    { value: "elogio", label: "Elogio", icon: UserCheck },
    { value: "denuncia", label: "Denúncia", icon: Shield }
  ];

  const categories = [
    "Infraestrutura e Instalações",
    "Qualidade do Ensino",
    "Relacionamento Professor-Aluno", 
    "Alimentação Escolar",
    "Transporte Escolar",
    "Atendimento Administrativo",
    "Atividades Extracurriculares",
    "Segurança Escolar",
    "Recursos Didáticos",
    "Outros"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error("Você deve aceitar os termos para continuar.");
      return;
    }

    if (!formData.isAnonymous && (!formData.name || !formData.email)) {
      toast.error("Nome e email são obrigatórios para contatos não anônimos.");
      return;
    }

    // Simular envio
    toast.success("Mensagem enviada com sucesso! Retornaremos em até 48h.");
    setFormData({
      type: "",
      category: "",
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      isAnonymous: false,
      agreeTerms: false
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sua opinião é importante para nós. Entre em contato através dos canais abaixo 
            ou utilize nosso sistema de mensagens para sugestões, dúvidas e reclamações.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium">Endereço</div>
                    <div className="text-sm text-muted-foreground">
                      Rua da Educação, 123<br />
                      Centro - Cedral, SP<br />
                      CEP: 15895-000
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium">Telefone</div>
                    <div className="text-sm text-muted-foreground">
                      (17) 3263-1234<br />
                      (17) 99999-5678 (WhatsApp)
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      contato@carmoturano.edu.sp.gov.br
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <div className="font-medium">Horário de Atendimento</div>
                    <div className="text-sm text-muted-foreground">
                      Segunda à Sexta: 7h às 17h<br />
                      Sábado: 7h às 12h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Contatos de Emergência
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Direção:</span>
                  <span className="font-medium">(17) 3263-1235</span>
                </div>
                <div className="flex justify-between">
                  <span>Coordenação:</span>
                  <span className="font-medium">(17) 3263-1236</span>
                </div>
                <div className="flex justify-between">
                  <span>Secretaria:</span>
                  <span className="font-medium">(17) 3263-1237</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-primary" />
                  Envie sua Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type of Contact */}
                  <div className="space-y-2">
                    <Label>Tipo de Contato *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de contato" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center">
                                <Icon className="w-4 h-4 mr-2" />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={formData.isAnonymous}
                      onCheckedChange={(checked) => setFormData({...formData, isAnonymous: checked as boolean})}
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Enviar de forma anônima
                    </Label>
                  </div>

                  {!formData.isAnonymous && (
                    <>
                      <Separator />
                      
                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Seu nome completo"
                            required={!formData.isAnonymous}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="seu.email@exemplo.com"
                            required={!formData.isAnonymous}
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="phone">Telefone (opcional)</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="(17) 99999-9999"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Resumo da sua mensagem"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Descreva detalhadamente sua mensagem..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                      Aceito que minha mensagem seja processada pela escola e entendo que, 
                      em caso de mensagens não anônimas, poderei receber retorno via email ou telefone.
                    </Label>
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Política de Privacidade e Tratamento de Mensagens
            </h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                • <strong>Resposta:</strong> Todas as mensagens são analisadas em até 48 horas úteis.
              </p>
              <p>
                • <strong>Anonimato:</strong> Mensagens anônimas são tratadas com total sigilo e confidencialidade.
              </p>
              <p>
                • <strong>Denúncias:</strong> Casos graves são encaminhados para as autoridades competentes quando necessário.
              </p>
              <p>
                • <strong>Transparência:</strong> Relatórios mensais sobre tipos de contatos são publicados (sem identificação).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contato;