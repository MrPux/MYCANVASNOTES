import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, FileText, RefreshCw, Sparkles, Clock, Target, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import { LiquidRefresh, LiquidRefreshRef } from "@/components/LiquidRefresh";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/mycanvasnoteslogo.png";

// Mock data for Canvas classes
const mockClasses = [
  {
    id: 1,
    code: "MATH 251",
    name: "Calculus II",
    professor: "Dr. Anderson",
    assignmentCount: 8,
    color: "hsl(280 45% 40%)"
  },
  {
    id: 2,
    code: "CS 450",
    name: "Data Structures",
    professor: "Dr. Williams",
    assignmentCount: 12,
    color: "hsl(15 85% 60%)"
  },
  {
    id: 3,
    code: "ENG 201",
    name: "English Literature",
    professor: "Dr. Martinez",
    assignmentCount: 6,
    color: "hsl(200 70% 50%)"
  },
  {
    id: 4,
    code: "PHYS 101",
    name: "Physics I",
    professor: "Dr. Thompson",
    assignmentCount: 10,
    color: "hsl(140 60% 45%)"
  },
  {
    id: 5,
    code: "HIST 150",
    name: "World History",
    professor: "Dr. Johnson",
    assignmentCount: 7,
    color: "hsl(30 80% 55%)"
  }
];

const IndependentLearning = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [activeClasses, setActiveClasses] = useState(0);
  const [hoursThisWeek, setHoursThisWeek] = useState(0);
  const { toast } = useToast();
  const liquidRefreshRef = useRef<LiquidRefreshRef>(null);

  useEffect(() => {
    // Animated counters
    const assignmentsTimer = setInterval(() => {
      setTotalAssignments(prev => prev < 43 ? prev + 1 : prev);
    }, 50);
    
    const classesTimer = setInterval(() => {
      setActiveClasses(prev => prev < 5 ? prev + 1 : prev);
    }, 200);
    
    const hoursTimer = setInterval(() => {
      setHoursThisWeek(prev => prev < 12 ? prev + 1 : prev);
    }, 100);

    return () => {
      clearInterval(assignmentsTimer);
      clearInterval(classesTimer);
      clearInterval(hoursTimer);
    };
  }, []);

  const handleSyncCanvas = async () => {
    setIsSyncing(true);
    // Simulate Canvas API sync - replace with actual Canvas API call later
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Canvas Synced",
      description: "Your Canvas data has been successfully synchronized.",
    });
    
    setIsSyncing(false);
  };

  const handleButtonClick = () => {
    liquidRefreshRef.current?.triggerRefresh();
  };

  return (
    <LiquidRefresh ref={liquidRefreshRef} onRefresh={handleSyncCanvas}>
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0">
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
                <FontToggle />
                <ThemeToggle />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleButtonClick}
                  disabled={isSyncing}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Canvas'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <p className="text-muted-foreground text-sm">Your Personal Study Space</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Independent Learning
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">Master your courses at your own pace</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:scale-105 transition-transform duration-300 animate-scale-in">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Assignments</p>
              <p className="text-4xl font-bold text-primary">{totalAssignments}</p>
              <p className="text-xs text-muted-foreground mt-1">across all classes</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-secondary/20 rounded-xl">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <Target className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Active Classes</p>
              <p className="text-4xl font-bold text-secondary">{activeClasses}</p>
              <p className="text-xs text-muted-foreground mt-1">this semester</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Study Hours</p>
              <p className="text-4xl font-bold text-accent">{hoursThisWeek}</p>
              <p className="text-xs text-muted-foreground mt-1">this week</p>
            </Card>
          </div>

          {/* Classes Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">My Canvas Classes</h2>
            <p className="text-muted-foreground">Select a class to view assignments and study tools</p>
          </div>

          {/* Classes Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockClasses.map((classItem, index) => (
              <Link key={classItem.id} to={`/independent/class/${classItem.id}`}
                className={`transform transition-all duration-500 hover:rotate-y-[0deg] animate-scale-in ${
                  index % 3 === 0 ? 'md:rotate-y-[2deg]' : 
                  index % 3 === 1 ? 'md:-rotate-y-[2deg]' : 
                  'md:rotate-y-[1.5deg]'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card 
                  className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group h-full bg-white/10 backdrop-blur-lg border-2 border-white/20 relative overflow-hidden"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    transformStyle: 'preserve-3d'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = classItem.color}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${classItem.color}15, transparent)` 
                    }}
                  />
                  <div className="relative z-10 space-y-4">
                    {/* Class Icon */}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg"
                      style={{ backgroundColor: `${classItem.color}25` }}
                    >
                      <BookOpen 
                        className="h-7 w-7"
                        style={{ color: classItem.color }}
                      />
                    </div>

                    {/* Class Info */}
                    <div className="space-y-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {classItem.code}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {classItem.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {classItem.professor}
                      </p>
                    </div>

                    {/* Assignment Count */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{classItem.assignmentCount} assignments</span>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </LiquidRefresh>
  );
};

export default IndependentLearning;
