import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import { LiquidRefresh, LiquidRefreshRef } from "@/components/LiquidRefresh";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Sparkles,
  Target,
  Brain,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/mycanvasnoteslogo.png";
import smartNotesImg from "@/assets/features/smart-notes.png";
import whiteboardImg from "@/assets/features/whiteboard.png";
import flashcardsImg from "@/assets/features/flashcards.png";
import quizImg from "@/assets/features/quiz.png";
import timerImg from "@/assets/features/timer.png";
import collaborationImg from "@/assets/features/collaboration.png";
import progressImg from "@/assets/features/progress.png";
import aiHelperImg from "@/assets/features/ai-helper.png";

const Home = () => {
  const [time, setTime] = useState(new Date());
  const [studyStreak, setStudyStreak] = useState(0);
  const [hoursStudied, setHoursStudied] = useState(0);
  const [assignmentsCompleted, setAssignmentsCompleted] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const liquidRefreshRef = useRef<LiquidRefreshRef>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({
        title: "Logout Failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Animated counters
    const streakTimer = setInterval(() => {
      setStudyStreak(prev => prev < 7 ? prev + 1 : prev);
    }, 100);
    
    const hoursTimer = setInterval(() => {
      setHoursStudied(prev => prev < 24 ? prev + 1 : prev);
    }, 80);
    
    const assignmentsTimer = setInterval(() => {
      setAssignmentsCompleted(prev => prev < 12 ? prev + 1 : prev);
    }, 120);

    return () => {
      clearInterval(timer);
      clearInterval(streakTimer);
      clearInterval(hoursTimer);
      clearInterval(assignmentsTimer);
    };
  }, []);

  const greeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

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
      <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="MyCanvasNotes Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold">
                {greeting()}, <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Scholar</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
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
              <Button variant="outline" size="sm">Profile</Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-4 flex flex-col">
        {/* Greeting Section */}
        <div className="mb-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <p className="text-muted-foreground text-xs">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-1">
            Choose Your <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Learning Path</span>
          </h1>
          <p className="text-base text-muted-foreground">Ready to conquer your studies today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:scale-105 transition-transform duration-300 animate-scale-in">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Trophy className="h-4 w-4 text-primary" />
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Study Streak</p>
            <p className="text-2xl font-bold text-primary">{studyStreak}</p>
            <p className="text-xs text-muted-foreground mt-1">days in a row 🔥</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Clock className="h-4 w-4 text-secondary" />
              </div>
              <Zap className="h-4 w-4 text-secondary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Hours This Week</p>
            <p className="text-2xl font-bold text-secondary">{hoursStudied}</p>
            <p className="text-xs text-muted-foreground mt-1">+8 from last week</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Target className="h-4 w-4 text-accent" />
              </div>
              <Brain className="h-4 w-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Completed</p>
            <p className="text-2xl font-bold text-accent">{assignmentsCompleted}</p>
            <p className="text-xs text-muted-foreground mt-1">assignments done</p>
          </Card>
        </div>

        {/* Quick Actions */}
        {/* <div className="flex-1 grid md:grid-cols-2 gap-6 mb-16">
          <Link to="/independent" className="group">
            <Card className="h-full p-8 bg-white/10 backdrop-blur-lg border-2 border-white/20 hover:border-primary hover:shadow-2xl transition-all duration-500 relative overflow-hidden transform hover:scale-[1.02] hover:rotate-y-[5deg]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <BookOpen className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Solo Study</h3>
                      <p className="text-sm text-muted-foreground">Your personal workspace</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Access your Canvas assignments, create notes, flashcards, and ace those quizzes on your own terms.
                  </p>
                </div>
                <Button className="w-full group/btn gap-2">
                  Start Learning
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/group" className="group">
            <Card className="h-full p-8 bg-white/10 backdrop-blur-lg border-2 border-white/20 hover:border-secondary hover:shadow-2xl transition-all duration-500 relative overflow-hidden transform hover:scale-[1.02] hover:-rotate-y-[5deg]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-secondary to-accent rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Users className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Group Study</h3>
                      <p className="text-sm text-muted-foreground">Learn together</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Join study rooms with classmates, collaborate in real-time, and make learning a social experience.
                  </p>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 group/btn gap-2">
                  Join Study Groups
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </Link>
        </div> */}

        {/* Landing Page Content */}
        <div className="py-4">
          {/* Hero Section */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Transform Your Canvas Experience</span>
            </div>
          </div>

          {/* Two Main Options */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-4" style={{ perspective: '1500px' }}>
            {/* Independent Learning */}
            <Link to="/independent" className="transform md:rotate-y-[15deg] transition-all duration-500 hover:rotate-y-[0deg]" style={{ transformStyle: 'preserve-3d' }}>
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer border-2 border-white/20 hover:border-primary group relative overflow-hidden bg-white/10 backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <BookOpen className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Independent Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Access your Canvas assignments with enhanced study tools
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      View Canvas assignments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Interactive whiteboard & notes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Generate flashcards & quizzes
                    </li>
                  </ul>
                  <Button className="w-full group/btn" size="lg">
                    Start Studying
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>

            {/* Group Learning */}
            <Link to="/group" className="transform md:-rotate-y-[15deg] transition-all duration-500 hover:rotate-y-[0deg]" style={{ transformStyle: 'preserve-3d' }}>
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer border-2 border-white/20 hover:border-secondary group relative overflow-hidden bg-white/10 backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Users className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">Group Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Collaborate with peers on assignments by major and class
                    </p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2 text-left w-full">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      Browse by major & class
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      Join study rooms
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                      Collaborative whiteboard & chat
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 group/btn" size="lg">
                    Join Study Groups
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>
          </div>

          {/* Description text */}
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-3">
            Study independently with powerful tools or collaborate with peers in real-time study rooms
          </p>

          {/* Animated Features Strip */}
          <div className="w-full overflow-hidden">
            <div className="flex gap-3 animate-scroll-left">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-3 min-w-max">
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={smartNotesImg} alt="Smart Notes" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Smart Notes</h4>
                    <p className="text-xs text-muted-foreground/70">Save notes</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={whiteboardImg} alt="Whiteboard" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Whiteboard</h4>
                    <p className="text-xs text-muted-foreground/70">Draw & visualize</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={flashcardsImg} alt="Flashcards" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Flashcards</h4>
                    <p className="text-xs text-muted-foreground/70">Auto-generate</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={quizImg} alt="Quiz Mode" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Quiz Mode</h4>
                    <p className="text-xs text-muted-foreground/70">Test knowledge</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={timerImg} alt="Study Timer" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Study Timer</h4>
                    <p className="text-xs text-muted-foreground/70">Pomodoro</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={collaborationImg} alt="Real-time Collaboration" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Collaboration</h4>
                    <p className="text-xs text-muted-foreground/70">Study together</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={progressImg} alt="Progress Tracking" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">Progress</h4>
                    <p className="text-xs text-muted-foreground/70">Track learning</p>
                  </Card>
                  <Card className="p-3 w-36 bg-muted/30 border-muted opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-300">
                    <img src={aiHelperImg} alt="AI Assistant" className="w-10 h-10 mb-1 object-contain" />
                    <h4 className="font-semibold text-xs mb-0.5 text-muted-foreground">AI Helper</h4>
                    <p className="text-xs text-muted-foreground/70">Smart assistant</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
    </LiquidRefresh>
  );
};

export default Home;
