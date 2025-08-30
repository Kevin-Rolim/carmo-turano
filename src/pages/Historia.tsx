import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, School, Users, Trophy, BookOpen } from "lucide-react";

const Historia = () => {
  const milestones = [
    {
      year: "1996",
      title: "Fundação da Escola",
      description: "A Escola Estadual Voluntário Carmo Turano foi fundada para atender a crescente demanda educacional da região de Cedral.",
      icon: School,
      color: "primary"
    },
    {
      year: "2001",
      title: "Primeiro Ensino Médio",
      description: "Implementação do Ensino Médio, ampliando a oferta educacional para a comunidade local.",
      icon: BookOpen,
      color: "secondary"
    },
    {
      year: "2008",
      title: "Laboratório de Informática",
      description: "Inauguração do primeiro laboratório de informática, modernizando o ensino e incluindo tecnologia na educação.",
      icon: Users,
      color: "accent"
    },
    {
      year: "2012",
      title: "Reforma e Ampliação",
      description: "Grande reforma das instalações e construção de novas salas de aula, biblioteca e quadra poliesportiva.",
      icon: School,
      color: "success"
    },
    {
      year: "2018",
      title: "Primeira Colocação Regional",
      description: "Alunos conquistam o primeiro lugar na Olimpíada Brasileira de Matemática na categoria regional.",
      icon: Trophy,
      color: "warning"
    },
    {
      year: "2024",
      title: "Modernização Digital",
      description: "Implementação de plataformas digitais e renovação completa dos equipamentos tecnológicos.",
      icon: BookOpen,
      color: "primary"
    }
  ];

  const statistics = [
    { label: "Anos de Fundação", value: "28 anos", description: "De história e tradição educacional" },
    { label: "Alunos Formados", value: "15.000+", description: "Cidadãos preparados para o futuro" },
    { label: "Professores", value: "200+", description: "Educadores que passaram pela escola" },
    { label: "Premiações", value: "50+", description: "Reconhecimentos e conquistas" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Nossa História
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A Escola Estadual Voluntário Carmo Turano tem uma trajetória de mais de duas décadas 
            dedicada à educação pública de qualidade em Cedral-SP. Conheça os principais marcos 
            que moldaram nossa instituição.
          </p>
        </div>

        {/* Statistics */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <School className="w-6 h-6 mr-3" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Promover uma educação pública de excelência, formando cidadãos conscientes, 
                  críticos e preparados para os desafios do século XXI, através de práticas 
                  pedagógicas inovadoras e inclusivas que respeitem a diversidade e 
                  potencializem o desenvolvimento integral de cada estudante.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-secondary">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Nossa Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconhecida como uma instituição de referência em educação pública 
                  no interior paulista, destacando-se pela qualidade do ensino, 
                  pela formação humanística e pela preparação de jovens capazes de 
                  contribuir positivamente para a sociedade e o desenvolvimento regional.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Linha do Tempo
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                    {/* Timeline dot */}
                    <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-${milestone.color} rounded-full flex items-center justify-center z-10`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary" className="text-sm">
                              {milestone.year}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-accent/5 to-success/5">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Nossos Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Inclusão</h4>
                  <p className="text-sm text-muted-foreground">
                    Valorizamos a diversidade e promovemos um ambiente acolhedor para todos.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">Excelência</h4>
                  <p className="text-sm text-muted-foreground">
                    Buscamos constantemente a melhoria da qualidade educacional.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">Integridade</h4>
                  <p className="text-sm text-muted-foreground">
                    Formamos cidadãos éticos e responsáveis com a sociedade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Historia;