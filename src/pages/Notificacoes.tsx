import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Bell, Search, Filter, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  read: boolean;
}

const Notificacoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Reunião de Pais - 3° Bimestre",
      content: "Reunião para apresentação dos resultados do 3° bimestre. Presença obrigatória dos pais ou responsáveis. Local: Auditório da escola. Horário: 19h30.",
      date: "2024-09-15",
      category: "Reuniões",
      priority: "urgent",
      read: false
    },
    {
      id: 2,
      title: "Feira de Ciências 2024 - Inscrições Abertas",
      content: "Estão abertas as inscrições para a Feira de Ciências 2024. Prazo para inscrição até 30/09. Regulamento disponível na secretaria.",
      date: "2024-09-10",
      category: "Eventos",
      priority: "high",
      read: false
    },
    {
      id: 3,
      title: "Alteração no Horário da Cantina",
      content: "A partir de segunda-feira (16/09), a cantina funcionará das 7h às 16h. Novos cardápios disponíveis no site.",
      date: "2024-09-12",
      category: "Infraestrutura",
      priority: "medium",
      read: true
    },
    {
      id: 4,
      title: "Resultado SARESP 2023 Divulgado",
      content: "Divulgação oficial dos resultados do SARESP 2023. Nossa escola obteve nota acima da média estadual em todas as disciplinas avaliadas.",
      date: "2024-09-08",
      category: "Acadêmico",
      priority: "medium",
      read: true
    },
    {
      id: 5,
      title: "Suspensão de Aulas - Quinta-feira",
      content: "Devido à manutenção na rede elétrica, as aulas de quinta-feira (19/09) estão suspensas. Reposição será comunicada em breve.",
      date: "2024-09-17",
      category: "Suspensões",
      priority: "urgent",
      read: false
    },
    {
      id: 6,
      title: "Nova Biblioteca Digital",
      content: "Inauguração da nova biblioteca digital da escola. Acesso disponível para todos os alunos através do portal estudantil.",
      date: "2024-09-05",
      category: "Novidades",
      priority: "low",
      read: true
    },
    {
      id: 7,
      title: "Campanha de Vacinação na Escola",
      content: "Campanha de vacinação contra H1N1 para alunos de 6 a 17 anos. Data: 25/09, das 8h às 16h. Autorização dos pais necessária.",
      date: "2024-09-20",
      category: "Saúde",
      priority: "high",
      read: false
    },
    {
      id: 8,
      title: "Projeto Horta Escolar - Voluntários",
      content: "Buscamos voluntários para o projeto da horta escolar. Interessados devem se inscrever na coordenação até 30/09.",
      date: "2024-09-14",
      category: "Projetos",
      priority: "low",
      read: true
    }
  ]);

  const categories = ["Reuniões", "Eventos", "Acadêmico", "Infraestrutura", "Suspensões", "Novidades", "Saúde", "Projetos"];
  const priorities = [
    { value: "low", label: "Baixa", color: "bg-blue-100 text-blue-800" },
    { value: "medium", label: "Média", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "Alta", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgente", color: "bg-red-100 text-red-800" }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || notification.category === filterCategory;
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4" />;
      case "high":
        return <Bell className="w-4 h-4" />;
      case "medium":
        return <Info className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj?.color || "bg-gray-100 text-gray-800";
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
            <Bell className="w-8 h-8 mr-3 text-primary" />
            Notificações Escolares
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-3">
                {unreadCount} não lidas
              </Badge>
            )}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Fique por dentro de todas as novidades, comunicados e informações importantes da escola.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Pesquisar notificações..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Prioridades</SelectItem>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            {filteredNotifications.length} notificações encontradas
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Marcar Todas como Lidas
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-lg transition-all cursor-pointer ${
                !notification.read ? 'bg-primary/5 border-primary/30' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`text-lg font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {notification.content}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(notification.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      
                      <Badge variant="outline">
                        {notification.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`${getPriorityColor(notification.priority)} border-0`}>
                      {getPriorityIcon(notification.priority)}
                      <span className="ml-1">
                        {priorities.find(p => p.value === notification.priority)?.label}
                      </span>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma notificação encontrada
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros de busca para encontrar as notificações desejadas.
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">
                {notifications.length}
              </div>
              <div className="text-sm text-muted-foreground">Total de Notificações</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-destructive mb-2">
                {notifications.filter(n => !n.read).length}
              </div>
              <div className="text-sm text-muted-foreground">Não Lidas</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning mb-2">
                {notifications.filter(n => n.priority === "urgent").length}
              </div>
              <div className="text-sm text-muted-foreground">Urgentes</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success mb-2">
                {notifications.filter(n => n.category === "Eventos").length}
              </div>
              <div className="text-sm text-muted-foreground">Eventos</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notificacoes;