import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, BookOpen, Plus, Search, Sparkles, TrendingUp, Target } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { loadMajors, addOrUpdateMajor, type Major } from "@/lib/studyGroupData";
import { CanvasAssignmentSelector } from "@/components/CanvasAssignmentSelector";
import logo from "@/assets/mycanvasnoteslogo.png";

const GroupLearning = () => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalStudyRooms, setTotalStudyRooms] = useState(0);
  const [activeMajors, setActiveMajors] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [formData, setFormData] = useState({
    majorName: "",
    majorCode: "",
    classNumber: "",
    className: "",
    assignmentName: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    setMajors(loadMajors());
    
    // Animated counters
    const roomsTimer = setInterval(() => {
      setTotalStudyRooms(prev => prev < 48 ? prev + 1 : prev);
    }, 50);
    
    const majorsTimer = setInterval(() => {
      setActiveMajors(prev => prev < 6 ? prev + 1 : prev);
    }, 200);
    
    const studentsTimer = setInterval(() => {
      setTotalStudents(prev => prev < 1240 ? prev + 20 : prev);
    }, 60);

    return () => {
      clearInterval(roomsTimer);
      clearInterval(majorsTimer);
      clearInterval(studentsTimer);
    };
  }, []);

  const filteredMajors = majors.filter(major => 
    major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    major.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustom = () => {
    const { majorName, majorCode, classNumber, className, assignmentName } = formData;

    if (!majorName || !majorCode || !classNumber || !className || !assignmentName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const result = addOrUpdateMajor(majorName, majorCode, classNumber, className, assignmentName);
    setMajors(result.majors);
    
    toast({
      title: result.isNew ? "Major Created" : "Class Added",
      description: result.message,
    });

    // Reset form
    setFormData({
      majorName: "",
      majorCode: "",
      classNumber: "",
      className: "",
      assignmentName: ""
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/home">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <img src={logo} alt="MyCanvasNotes Logo" className="h-8 w-auto" />
                <span className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  MYCANVASNOTES
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search majors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <FontToggle />
              <ThemeToggle />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Start Group Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Major, Class & Assignment</DialogTitle>
                    <DialogDescription>
                      Add a custom major and class with an assignment from Canvas. If the major or class already exists, it will be added to the existing group.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <CanvasAssignmentSelector 
                    onSelect={(data) => setFormData(data)}
                  />
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or fill manually
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="majorName">Major Name</Label>
                      <Input
                        id="majorName"
                        placeholder="e.g., Biology"
                        value={formData.majorName}
                        onChange={(e) => setFormData({ ...formData, majorName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="majorCode">Major Code</Label>
                      <Input
                        id="majorCode"
                        placeholder="e.g., BIO"
                        value={formData.majorCode}
                        onChange={(e) => setFormData({ ...formData, majorCode: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="classNumber">Class Number</Label>
                      <Input
                        id="classNumber"
                        placeholder="e.g., BIO 101"
                        value={formData.classNumber}
                        onChange={(e) => setFormData({ ...formData, classNumber: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="className">Class Name (from Canvas)</Label>
                      <Input
                        id="className"
                        placeholder="e.g., Introduction to Biology"
                        value={formData.className}
                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignmentName">Assignment Name (from Canvas)</Label>
                      <Input
                        id="assignmentName"
                        placeholder="e.g., Cell Biology Lab Report"
                        value={formData.assignmentName}
                        onChange={(e) => setFormData({ ...formData, assignmentName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCustom}>
                      Add
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
            <p className="text-muted-foreground text-sm">Collaborative Study Spaces</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Group Learning
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">Connect, collaborate, and conquer assignments together</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 hover:scale-105 transition-transform duration-300 animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-secondary/20 rounded-xl">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Active Study Rooms</p>
            <p className="text-4xl font-bold text-secondary">{totalStudyRooms}</p>
            <p className="text-xs text-muted-foreground mt-1">across all majors</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Available Majors</p>
            <p className="text-4xl font-bold text-primary">{activeMajors}</p>
            <p className="text-xs text-muted-foreground mt-1">departments</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-accent/20 rounded-xl">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Active Students</p>
            <p className="text-4xl font-bold text-accent">{totalStudents}</p>
            <p className="text-xs text-muted-foreground mt-1">studying together</p>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Major</h2>
          <p className="text-muted-foreground">
            Join study groups and collaborate with peers in your field
          </p>
        </div>

        {/* Majors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMajors.length > 0 ? (
            filteredMajors.map((major, index) => (
            <Link key={major.id} to={`/major/${major.id}`} 
              className={`block transform transition-all duration-500 hover:rotate-y-[0deg] hover:scale-[1.02] animate-scale-in ${
                index % 3 === 0 ? 'md:rotate-y-[2deg]' : 
                index % 3 === 1 ? 'md:-rotate-y-[2deg]' : 
                'md:rotate-y-[1.5deg]'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transformStyle: 'preserve-3d'
              }}
            >
              <Card 
                className="p-6 h-full hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white/10 backdrop-blur-lg border-2 relative overflow-hidden"
                style={{ 
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  transition: 'border-color 0.5s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = major.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${major.borderColor}15, transparent)` 
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon/Badge */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${major.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <Badge variant="secondary" className="mb-2 font-mono">
                        {major.code}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {major.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{major.classCount} classes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{major.activeStudents} students</span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors"
                    >
                      Browse Classes →
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No majors found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupLearning;
