import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Calendar, Users } from "lucide-react";

interface WorkItem {
  id: number;
  title: string;
  description: string;
  grade: string;
  year: number;
  subject: string;
  author: string;
  thumbnail: string;
  type: string;
}

const Repositorio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  

  const mockWorks: WorkItem[] = [
    {
      id: 1,
      title: "Projeto Meio Ambiente e Sustentabilidade",
      description: "Pesquisa sobre impactos ambientais na região de Cedral",
      grade: "9º Ano A",
      year: 2024,
      subject: "Geografia",
      author: "Ana Silva, João Santos",
      thumbnail: "https://picsum.photos/300/200?random=1",
      type: "Projeto de Pesquisa"
    },
    {
      id: 2,
      title: "Experimentos de Química Orgânica",
      description: "Relatório de experimentos com compostos orgânicos",
      grade: "3º Ano B",
      year: 2024,
      subject: "Química",
      author: "Maria Oliveira",
      thumbnail: "https://picsum.photos/300/200?random=2",
      type: "Relatório de Laboratório"
    },
    {
      id: 3,
      title: "História de Cedral: Das Origens aos Dias Atuais",
      description: "Documentário sobre a história da cidade de Cedral-SP",
      grade: "8º Ano C",
      year: 2024,
      subject: "História",
      author: "Turma do 8º C",
      thumbnail: "https://picsum.photos/300/200?random=3",
      type: "Documentário"
    },
    {
      id: 4,
      title: "Análise Literária: Machado de Assis",
      description: "Estudo comparativo das obras de Machado de Assis",
      grade: "2º Ano A",
      year: 2023,
      subject: "Literatura",
      author: "Carlos Pereira",
      thumbnail: "https://picsum.photos/300/200?random=4",
      type: "Ensaio Literário"
    },
    {
      id: 5,
      title: "Modelagem Matemática: Crescimento Populacional",
      description: "Estudo estatístico do crescimento populacional brasileiro",
      grade: "9º Ano B",
      year: 2023,
      subject: "Matemática",
      author: "Lucas Costa, Marina Santos",
      thumbnail: "https://picsum.photos/300/200?random=5",
      type: "Projeto Matemático"
    },
    {
      id: 6,
      title: "Feira de Ciências: Energia Solar",
      description: "Protótipo de aquecedor solar feito com materiais recicláveis",
      grade: "7º Ano A",
      year: 2024,
      subject: "Física",
      author: "Pedro Lima, Sofia Rodrigues",
      thumbnail: "https://picsum.photos/300/200?random=6",
      type: "Protótipo"
    }
  ];

  const grades = ["1º Ano", "2º Ano", "3º Ano"];
  const years = [2024, 2023, 2022, 2021, 2020];

  const filteredWorks = mockWorks.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || work.grade.includes(selectedGrade);
    const matchesYear = selectedYear === "all" || work.year.toString() === selectedYear;

    return matchesSearch && matchesGrade && matchesYear;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Repositório de Trabalhos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore os projetos e trabalhos desenvolvidos pelos nossos alunos ao longo dos anos. 
            Uma biblioteca digital do conhecimento produzido em nossa escola.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Pesquisar por título, autor ou disciplina..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Série do Ensino Médio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Séries</SelectItem>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
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
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            Encontrados {filteredWorks.length} trabalhos
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Baixar Relatório
          </Button>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <Card key={work.id} className="hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {work.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {work.subject}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {work.year}
                  </div>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {work.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {work.description}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="line-clamp-1">{work.author}</span>
                </div>
                
                <div className="flex items-center text-sm text-primary font-medium">
                  {work.grade}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum trabalho encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros de busca para encontrar os trabalhos desejados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Repositorio;