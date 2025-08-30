import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, BookOpen, Trophy, Bell, ArrowRight } from "lucide-react";
import schoolHero from "@/assets/school-hero.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  const announcements = [
    {
      id: 1,
      title: "Reunião de Pais - 3° Bimestre",
      date: "2024-09-15",
      content: "Reunião para apresentação dos resultados do 3° bimestre. Presença obrigatória.",
      urgent: true
    },
    {
      id: 2,
      title: "Feira de Ciências 2024",
      date: "2024-10-20",
      content: "Inscrições abertas para a Feira de Ciências. Prazo até 30/09.",
      urgent: false
    },
    {
      id: 3,
      title: "Volta às Aulas",
      date: "2024-08-01",
      content: "Início do segundo semestre letivo. Bem-vindos de volta!",
      urgent: false
    }
  ];

  const achievements = [
    {
      title: "1° Lugar na Olimpíada Brasileira de Matemática",
      student: "Ana Clara Silva - 9° Ano",
      date: "Agosto 2024"
    },
    {
      title: "Menção Honrosa em Redação",
      student: "João Pedro Santos - 8° Ano",
      date: "Julho 2024"
    },
    {
      title: "Destaque Regional em Ciências",
      student: "Turma do 7° Ano B",
      date: "Junho 2024"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary/90 to-secondary/80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${schoolHero})`,
            backgroundBlendMode: 'multiply'
          }}
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Escola Estadual Voluntário Carmo Turano
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Educação de qualidade em Cedral-SP. Formando cidadãos conscientes, 
              críticos e preparados para os desafios do futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/historia">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Conheça Nossa História
                </Button>
              </Link>
              <Link to="/contato">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Entre em Contato
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">850+</div>
              <div className="text-muted-foreground">Alunos Matriculados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">45</div>
              <div className="text-muted-foreground">Professores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">28</div>
              <div className="text-muted-foreground">Anos de História</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">95%</div>
              <div className="text-muted-foreground">Aprovação SARESP</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Announcements */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center">
                  <Bell className="w-6 h-6 mr-3 text-primary" />
                  Quadro de Avisos
                </h2>
                <Link to="/notificacoes">
                  <Button variant="outline" size="sm">
                    Ver Todos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground flex-1">
                          {announcement.title}
                        </h3>
                        {announcement.urgent && (
                          <Badge variant="destructive" className="ml-2">Urgente</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{announcement.content}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(announcement.date).toLocaleDateString('pt-BR')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements Sidebar */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center">
                  <Trophy className="w-5 h-5 mr-3 text-accent" />
                  Premiações Recentes
                </h2>
                <Link to="/premiacoes">
                  <Button variant="outline" size="sm">Ver Todas</Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="bg-gradient-to-br from-accent/5 to-success/5 border-accent/20">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.student}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {achievement.date}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/repositorio" className="group">
              <Card className="hover:shadow-lg transition-all group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Repositório de Trabalhos</h3>
                  <p className="text-sm text-muted-foreground">
                    Acesse os trabalhos e projetos dos nossos alunos organizados por série e ano.
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/contato" className="group">
              <Card className="hover:shadow-lg transition-all group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Fale Conosco</h3>
                  <p className="text-sm text-muted-foreground">
                    Entre em contato com a escola ou envie sugestões e reclamações.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/historia" className="group">
              <Card className="hover:shadow-lg transition-all group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Nossa História</h3>
                  <p className="text-sm text-muted-foreground">
                    Conheça a trajetória de mais de 25 anos de educação de qualidade.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
