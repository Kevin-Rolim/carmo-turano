import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Medal, Award, Star, Search, Calendar, Users, Download } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
  level: "municipal" | "regional" | "estadual" | "nacional" | "internacional";
  year: number;
  winners: string;
  position: string;
  organizer: string;
  date: string;
  image?: string;
}

const Premiacoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Olimpíada Brasileira de Matemática - OBMEP",
      description: "Conquista do primeiro lugar na categoria ensino fundamental II, demonstrando excelência em matemática e raciocínio lógico.",
      category: "Matemática",
      level: "nacional",
      year: 2024,
      winners: "Ana Clara Silva (9º Ano A)",
      position: "1º Lugar",
      organizer: "Instituto de Matemática Pura e Aplicada (IMPA)",
      date: "2024-08-15"
    },
    {
      id: 2,
      title: "Concurso Regional de Redação",
      description: "Menção honrosa por texto sobre sustentabilidade e meio ambiente, destacando-se entre mais de 500 participantes da região.",
      category: "Português",
      level: "regional",
      year: 2024,
      winners: "João Pedro Santos (8º Ano B)",
      position: "Menção Honrosa",
      organizer: "Secretaria Regional de Educação",
      date: "2024-07-20"
    },
    {
      id: 3,
      title: "Feira Brasileira de Ciências e Engenharia - FEBRACE",
      description: "Projeto sobre energia solar renovável conquistou destaque nacional pela inovação e aplicabilidade prática.",
      category: "Ciências",
      level: "nacional",
      year: 2024,
      winners: "Turma do 7º Ano B - Marina Costa e Pedro Lima",
      position: "Destaque Nacional",
      organizer: "Universidade de São Paulo (USP)",
      date: "2024-06-10"
    },
    {
      id: 4,
      title: "Olimpíada de História do Brasil",
      description: "Equipe demonstrou conhecimento excepcional sobre a história brasileira, conquistando medalha de bronze na fase nacional.",
      category: "História",
      level: "nacional",
      year: 2023,
      winners: "Equipe: Carlos Santos, Maria Oliveira, Lucas Silva (9º Ano)",
      position: "3º Lugar - Medalha de Bronze",
      organizer: "Universidade Estadual de Campinas (UNICAMP)",
      date: "2023-11-25"
    },
    {
      id: 5,
      title: "Concurso Municipal de Desenho e Artes",
      description: "Obras de arte inspiradas na cultura local conquistaram os primeiros lugares nas categorias juvenil e adolescente.",
      category: "Artes",
      level: "municipal",
      year: 2024,
      winners: "Sofia Rodrigues (6º Ano) e Rafael Costa (1º Ano)",
      position: "1º Lugar - Duas Categorias",
      organizer: "Prefeitura Municipal de Cedral",
      date: "2024-05-18"
    },
    {
      id: 6,
      title: "Olimpíada Brasileira de Robótica - OBR",
      description: "Robô desenvolvido pelos alunos se destacou na modalidade prática, mostrando inovação em programação e engenharia.",
      category: "Tecnologia",
      level: "estadual",
      year: 2023,
      winners: "Equipe RoboCarmo: Gabriel Lima, Amanda Silva, Thiago Santos",
      position: "2º Lugar Estadual",
      organizer: "Sociedade Brasileira de Computação",
      date: "2023-10-14"
    },
    {
      id: 7,
      title: "Concurso de Oratória Jovem",
      description: "Discurso sobre 'O Futuro da Educação Pública' conquistou o júri e a audiência no concurso regional de oratória.",
      category: "Oratória",
      level: "regional",
      year: 2024,
      winners: "Beatriz Almeida (2º Ano A)",
      position: "1º Lugar Regional",
      organizer: "Rotary Club Regional",
      date: "2024-04-22"
    },
    {
      id: 8,
      title: "Mostra Nacional de Experimentos de Física",
      description: "Experimento sobre ondas sonoras impressionou os avaliadores pela criatividade e base científica sólida.",
      category: "Física",
      level: "nacional",
      year: 2023,
      winners: "Bruno Santos e Larissa Oliveira (3º Ano B)",
      position: "Menção Honrosa Nacional",
      organizer: "Sociedade Brasileira de Física",
      date: "2023-09-08"
    }
  ];

  const categories = ["Matemática", "Português", "Ciências", "História", "Artes", "Tecnologia", "Oratória", "Física"];
  const years = [2024, 2023, 2022, 2021, 2020];
  const levels = [
    { value: "municipal", label: "Municipal", color: "bg-blue-100 text-blue-800", icon: Award },
    { value: "regional", label: "Regional", color: "bg-green-100 text-green-800", icon: Medal },
    { value: "estadual", label: "Estadual", color: "bg-orange-100 text-orange-800", icon: Star },
    { value: "nacional", label: "Nacional", color: "bg-purple-100 text-purple-800", icon: Trophy },
    { value: "internacional", label: "Internacional", color: "bg-red-100 text-red-800", icon: Trophy }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.winners.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || achievement.category === filterCategory;
    const matchesYear = filterYear === "all" || achievement.year.toString() === filterYear;
    const matchesLevel = filterLevel === "all" || achievement.level === filterLevel;
    
    return matchesSearch && matchesCategory && matchesYear && matchesLevel;
  });

  const getLevelInfo = (level: string) => {
    return levels.find(l => l.value === level) || levels[0];
  };

  const getAchievementIcon = (level: string) => {
    const levelInfo = getLevelInfo(level);
    const Icon = levelInfo.icon;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
            <Trophy className="w-8 h-8 mr-3 text-accent" />
            Premiações e Conquistas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebramos as conquistas e talentos dos nossos alunos em competições acadêmicas, 
            científicas e culturais em níveis municipal, regional, estadual e nacional.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent mb-1">{achievements.length}</div>
              <div className="text-xs text-muted-foreground">Total de Premiações</div>
            </CardContent>
          </Card>
          
          {levels.slice(0, 4).map((level) => {
            const count = achievements.filter(a => a.level === level.value).length;
            return (
              <Card key={level.value} className="text-center">
                <CardContent className="p-4">
                  <div className={`text-2xl font-bold mb-1 ${level.color.includes('blue') ? 'text-blue-600' : 
                                   level.color.includes('green') ? 'text-green-600' :
                                   level.color.includes('orange') ? 'text-orange-600' : 'text-purple-600'}`}>
                    {count}
                  </div>
                  <div className="text-xs text-muted-foreground">{level.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Pesquisar premiações..."
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

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Anos</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Níveis</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            {filteredAchievements.length} premiações encontradas
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAchievements.map((achievement) => {
            const levelInfo = getLevelInfo(achievement.level);
            return (
              <Card key={achievement.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getAchievementIcon(achievement.level)}
                        <Badge className={`${levelInfo.color} border-0`}>
                          {levelInfo.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {achievement.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent mb-1">
                        {achievement.year}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Users className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Vencedores</div>
                        <div className="text-sm text-muted-foreground">{achievement.winners}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="font-medium text-primary">{achievement.position}</span>
                        <span className="text-muted-foreground"> • {achievement.organizer}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">
                        {new Date(achievement.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma premiação encontrada
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros de busca para encontrar as premiações desejadas.
            </p>
          </div>
        )}

        {/* Highlights Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Destaques por Categoria
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-primary mb-2">
                  {achievements.filter(a => a.level === "nacional").length}
                </div>
                <div className="text-sm text-muted-foreground">Premiações Nacionais</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 text-secondary mx-auto mb-4" />
                <div className="text-2xl font-bold text-secondary mb-2">
                  {achievements.filter(a => a.category === "Matemática" || a.category === "Ciências").length}
                </div>
                <div className="text-sm text-muted-foreground">Exatas e Ciências</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-2xl font-bold text-accent mb-2">
                  {new Set(achievements.map(a => a.winners.split(',')[0])).size}
                </div>
                <div className="text-sm text-muted-foreground">Alunos Premiados</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premiacoes;