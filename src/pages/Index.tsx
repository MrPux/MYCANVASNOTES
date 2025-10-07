import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, ArrowRight, Sparkles, CheckCircle2, Zap, TrendingUp, Clock, Brain, Star, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import logo from "@/assets/mycanvasnoteslogo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const featuresAnimation = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-2xl border-b border-border shadow-lg">
        {/* Top gradient accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent"></div>
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group relative"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={logo} 
                  alt="MyCanvasNotes Logo" 
                  className="h-12 w-auto relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-2xl" 
                />
              </div>
              <div className="relative overflow-hidden">
                <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative">
                  MYCANVASNOTES
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 blur-sm transition-opacity"></div>
              </div>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="hidden md:flex font-semibold text-base relative overflow-hidden group/btn"
                asChild
              >
                <Link to="/home">
                  <span className="relative z-10">Demo</span>
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className="hidden sm:flex font-bold text-base border-2 hover:border-primary hover:bg-primary/10 relative overflow-hidden group/btn transition-all"
                asChild
              >
                <Link to="/auth">
                  <span className="relative z-10">Log In</span>
                  <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300"></div>
                </Link>
              </Button>

              <Button 
                className="relative font-black text-base px-8 py-6 overflow-hidden group/cta shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground"
                asChild
              >
                <Link to="/auth">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center gap-2 drop-shadow-lg font-black">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover/cta:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>

              <div className="flex items-center ml-3 pl-3 border-l-2 border-border">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom animated gradient line */}
        <div className="h-[2px] w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scroll-right_3s_linear_infinite] opacity-50"></div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-8 md:pt-12 pb-12 overflow-visible">
        {/* Animated Background Elements - Now theme-aware */}
        <div className="absolute inset-0 -inset-x-4 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 dark:bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto overflow-visible">
          <div className="text-center space-y-6 overflow-visible pt-2">
            {/* Main Headline */}
            <div className="space-y-3 animate-fade-in overflow-visible" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight py-4 overflow-visible">
                <span className="block text-foreground drop-shadow-sm overflow-visible">Stop</span>
                <span className="block text-foreground drop-shadow-sm overflow-visible">Struggling.</span>
                <span className="block mt-1 pb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite] overflow-visible">
                  Start Acing.
                </span>
              </h1>
            </div>
            
            {/* Subheadline */}
            <p className="text-lg md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Transform your Canvas assignments into{" "}
              <span className="text-primary font-bold">AI-powered flashcards</span>,{" "}
              <span className="text-secondary font-bold">interactive quizzes</span>, and{" "}
              <span className="text-accent font-bold">live study sessions</span>
              —all in seconds.
            </p>

            {/* Badge */}
            <div className="animate-fade-in pt-2" style={{ animationDelay: '0.5s' }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 border-2 border-primary/40 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Join 10,000+ Students Getting Better Grades
                </span>
                <Star className="h-4 w-4 text-secondary fill-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center items-center animate-fade-in pt-2" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors">
                <Brain className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 transition-colors">
                <Users className="h-5 w-5 text-secondary" />
                <span className="text-sm font-semibold text-foreground">Live Collaboration</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">Canvas Sync</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
                size="lg" 
                className="text-xl px-12 py-7 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden" 
                asChild
              >
                <Link to="/auth">
                  <span className="relative z-10 flex items-center gap-3">
                    Get Started Free
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-7 hover:scale-105 transition-all duration-300 border-2" 
                asChild
              >
                <Link to="/home">
                  <BookOpen className="h-6 w-6 mr-3" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-5 w-5 text-secondary" />
                <span className="font-medium">Setup in 30 seconds</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-medium">500+ universities trust us</span>
              </div>
            </div>

            {/* Social Proof Numbers - Infinite Scroll */}
            <div className="relative pt-12 overflow-hidden">
              <div className="flex animate-[scroll-right_30s_linear_infinite]">
                {/* First set */}
                <div className="flex gap-12 px-6 shrink-0">
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                      C to A
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Average Grade Jump</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent mb-2">
                      10K+
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Active Students</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent mb-2">
                      8hrs+
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Saved Per Week</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                      3x
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Faster Learning</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent mb-2">
                      50K+
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Study Sessions</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent mb-2">
                      4.9★
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">User Rating</div>
                  </div>
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-12 px-6 shrink-0">
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                      C to A
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Average Grade Jump</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent mb-2">
                      10K+
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Active Students</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent mb-2">
                      8hrs+
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Saved Per Week</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                      3x
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Faster Learning</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent mb-2">
                      50K+
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Study Sessions</div>
                  </div>
                  <div className="text-center group hover:scale-110 transition-transform min-w-[160px]">
                    <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent mb-2">
                      4.9★
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresAnimation.ref} className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Everything You Need to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Excel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed specifically for Canvas users
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Brain,
              title: "AI Study Assistant",
              description: "Auto-generate flashcards, quizzes, and summaries from any Canvas assignment",
              gradient: "from-primary to-primary-glow"
            },
            {
              icon: Users,
              title: "Live Study Rooms",
              description: "Collaborate with classmates in real-time with shared whiteboards and video chat",
              gradient: "from-secondary to-accent"
            },
            {
              icon: Zap,
              title: "Smart Whiteboard",
              description: "Draw, annotate, and brainstorm with an infinite canvas and AI shape recognition",
              gradient: "from-primary to-secondary"
            },
            {
              icon: TrendingUp,
              title: "Progress Analytics",
              description: "Track your study time, completion rates, and improvement over time",
              gradient: "from-accent to-secondary"
            },
            {
              icon: Clock,
              title: "Focus Timer",
              description: "Stay productive with Pomodoro timers and distraction-free study modes",
              gradient: "from-primary to-accent"
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your data is encrypted and never shared. FERPA compliant.",
              gradient: "from-secondary to-primary"
            },
          ].map((feature, i) => (
            <Card 
              key={i} 
              className={`p-6 hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:scale-105 border-2 border-transparent hover:border-primary/30 group bg-card/50 backdrop-blur-sm ${
                featuresAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${i * 100}ms`,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof - Infinite Scroll Testimonials */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
            Loved by Students <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Everywhere</span>
          </h2>
        </div>
        
        <div className="relative">
          <div className="flex animate-[scroll-left_40s_linear_infinite]">
            {/* First set */}
            <div className="flex gap-6 px-3 shrink-0">
              {[
                {
                  quote: "Went from C's to A's in one semester. The AI flashcards are a game-changer!",
                  author: "Sarah M.",
                  school: "UCLA"
                },
                {
                  quote: "Study groups on here are so much better than trying to coordinate on Zoom.",
                  author: "James T.",
                  school: "NYU"
                },
                {
                  quote: "I actually look forward to studying now. The whiteboard feature is incredible.",
                  author: "Emma L.",
                  school: "Stanford"
                },
                {
                  quote: "This app saved my GPA. I can't imagine studying without it anymore!",
                  author: "Michael R.",
                  school: "MIT"
                },
                {
                  quote: "The AI quiz generator is like having a personal tutor 24/7. Mind-blowing!",
                  author: "Priya K.",
                  school: "UC Berkeley"
                },
                {
                  quote: "Canvas integration is seamless. All my assignments automatically sync!",
                  author: "David L.",
                  school: "Harvard"
                },
                {
                  quote: "Best study tool I've used. Period. Worth every minute I spend on it.",
                  author: "Jessica W.",
                  school: "Princeton"
                },
                {
                  quote: "The collaborative study rooms make group projects actually enjoyable!",
                  author: "Alex P.",
                  school: "Yale"
                },
              ].map((testimonial, i) => (
                <Card key={i} className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-colors min-w-[320px] max-w-[320px]">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.school}</div>
                  </div>
                </Card>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex gap-6 px-3 shrink-0">
              {[
                {
                  quote: "Went from C's to A's in one semester. The AI flashcards are a game-changer!",
                  author: "Sarah M.",
                  school: "UCLA"
                },
                {
                  quote: "Study groups on here are so much better than trying to coordinate on Zoom.",
                  author: "James T.",
                  school: "NYU"
                },
                {
                  quote: "I actually look forward to studying now. The whiteboard feature is incredible.",
                  author: "Emma L.",
                  school: "Stanford"
                },
                {
                  quote: "This app saved my GPA. I can't imagine studying without it anymore!",
                  author: "Michael R.",
                  school: "MIT"
                },
                {
                  quote: "The AI quiz generator is like having a personal tutor 24/7. Mind-blowing!",
                  author: "Priya K.",
                  school: "UC Berkeley"
                },
                {
                  quote: "Canvas integration is seamless. All my assignments automatically sync!",
                  author: "David L.",
                  school: "Harvard"
                },
                {
                  quote: "Best study tool I've used. Period. Worth every minute I spend on it.",
                  author: "Jessica W.",
                  school: "Princeton"
                },
                {
                  quote: "The collaborative study rooms make group projects actually enjoyable!",
                  author: "Alex P.",
                  school: "Yale"
                },
              ].map((testimonial, i) => (
                <Card key={`dup-${i}`} className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-colors min-w-[320px] max-w-[320px]">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.school}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Transform Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Study Game?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of students who are already studying smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/auth">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/independent">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-6 w-auto" />
              <span>© 2024 MyCanvasNotes. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
