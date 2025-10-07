import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BookOpen, Users, Brain, Zap, CheckCircle2, ArrowRight, Sparkles, Settings, Clock, FlaskConical, MessageSquare } from "lucide-react";
import { assignments } from "@/lib/assignmentData";
import { isToday, isThisWeek, isThisMonth } from "date-fns";

const GettingStarted = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("month");
  
  const [settings, setSettings] = useState({
    showTimer: true,
    enableFlashcards: true,
    showProgress: true,
    enableCollaboration: false,
  });

  const steps = [
    {
      number: 1,
      title: "Connect Your Canvas",
      description: "Link your Canvas account to automatically sync all your assignments and course materials in one place.",
      icon: BookOpen,
    },
    {
      number: 2,
      title: "Choose Your Learning Mode",
      description: "Work independently at your own pace or join group study rooms to collaborate with classmates.",
      icon: Users,
    },
    {
      number: 3,
      title: "Transform Your Notes",
      description: "Use AI-powered tools to convert assignments into flashcards, quizzes, and interactive study materials.",
      icon: Brain,
    },
    {
      number: 4,
      title: "Track Your Progress",
      description: "Monitor completion rates, set study goals, and celebrate your achievements as you learn.",
      icon: Zap,
    },
  ];

  const quickTips = [
    "Use the whiteboard feature during group sessions for visual learning",
    "Generate flashcards automatically from your notes for quick reviews",
    "Set timers to maintain focus during independent study sessions",
    "Join study rooms to discuss difficult concepts with peers",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to MyCanvasNotes</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Let's Get You Started
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your Canvas assignments into collaborative learning experiences. Here's how to begin your journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settings & Preview Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Settings className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">⚙️ App Settings</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <div>
                      <p className="font-medium">View</p>
                      <p className="text-sm text-muted-foreground">Filter assignments by day, week, or month</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={view === "day" ? "default" : "outline"}
                        onClick={() => setView("day")}
                      >
                        Day
                      </Button>
                      <Button
                        size="sm"
                        variant={view === "week" ? "default" : "outline"}
                        onClick={() => setView("week")}
                      >
                        Week
                      </Button>
                      <Button
                        size="sm"
                        variant={view === "month" ? "default" : "outline"}
                        onClick={() => setView("month")}
                      >
                        Month
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Study Timer</p>
                        <p className="text-sm text-muted-foreground">Track your study sessions</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.showTimer}
                      onCheckedChange={(checked) => setSettings({...settings, showTimer: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <FlaskConical className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Auto-Generate Flashcards</p>
                        <p className="text-sm text-muted-foreground">Create flashcards from notes</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.enableFlashcards}
                      onCheckedChange={(checked) => setSettings({...settings, enableFlashcards: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Progress Tracking</p>
                        <p className="text-sm text-muted-foreground">Monitor completion rates</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.showProgress}
                      onCheckedChange={(checked) => setSettings({...settings, showProgress: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Group Collaboration</p>
                        <p className="text-sm text-muted-foreground">Enable study rooms</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.enableCollaboration}
                      onCheckedChange={(checked) => setSettings({...settings, enableCollaboration: checked})}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    💡 Tip: You can change these settings anytime from your dashboard
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <Card className="border-2 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Live Preview
                </h3>
                <div className="bg-background rounded-lg border-2 p-4 space-y-4">
                  {/* Assignment Cards */}
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg border-l-4 border-l-primary bg-card shadow-sm transition-all ${settings.showProgress ? 'opacity-100' : 'opacity-50'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">Data Structures - Lab 5</h4>
                          <p className="text-xs text-muted-foreground mt-1">CS 450 • Binary Tree Implementation</p>
                        </div>
                        {settings.showProgress && (
                          <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            85%
                          </div>
                        )}
                      </div>
                      {settings.showTimer && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                          <Clock className="w-3 h-3" />
                          <span>2h 30m remaining</span>
                        </div>
                      )}
                      {settings.enableFlashcards && (
                        <div className="mt-3 pt-3 border-t">
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            📚 Generate Flashcards
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className={`p-4 rounded-lg border-l-4 border-l-secondary bg-card shadow-sm transition-all ${settings.enableCollaboration ? 'opacity-100' : 'opacity-50'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">Calculus II - Problem Set</h4>
                          <p className="text-xs text-muted-foreground mt-1">MATH 210 • Integration Techniques</p>
                        </div>
                        {settings.showProgress && (
                          <div className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
                            45%
                          </div>
                        )}
                      </div>
                      {settings.enableCollaboration && (
                        <div className="mt-3 pt-3 border-t flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-primary border-2 border-background"></div>
                            <div className="w-6 h-6 rounded-full bg-secondary border-2 border-background"></div>
                            <div className="w-6 h-6 rounded-full bg-accent border-2 border-background"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">3 students studying</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-lg border-l-4 border-l-accent bg-card shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">English Literature Essay</h4>
                          <p className="text-xs text-muted-foreground mt-1">ENG 301 • Shakespeare Analysis</p>
                        </div>
                        {settings.showProgress && (
                          <div className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                            100%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-muted-foreground pt-2 border-t">
                    Toggle settings to see changes ✨
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-16 border-2 border-primary/20">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Quick Tips for Success</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {quickTips.map((tip, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Sign In to Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/")}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required • Free to start • Connect your Canvas instantly
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Visit our{" "}
            <button 
              onClick={() => navigate("/")} 
              className="text-primary hover:underline font-medium"
            >
              Help Center
            </button>
            {" "}or contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
