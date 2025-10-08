import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageSquare, 
  Settings, 
  Shield, 
  Users, 
  BookOpen, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Clock,
  Brain,
  FlaskConical,
  HelpCircle,
  Star,
  RefreshCw
} from "lucide-react";

const Uninstall = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [showAlternatives, setShowAlternatives] = useState(false);

  const uninstallReasons = [
    { id: "not-working", label: "The platform doesn't work for me", icon: Settings },
    { id: "interface", label: "I don't like the interface", icon: Sparkles },
    { id: "no-canvas", label: "My school doesn't use Canvas", icon: BookOpen },
    { id: "graduated", label: "I graduated/My semester is over!", icon: RefreshCw },
    { id: "privacy", label: "I have security/privacy concerns", icon: Shield },
    { id: "alternative", label: "I found a better alternative", icon: Star },
    { id: "other", label: "Other", icon: HelpCircle }
  ];

  const quickFixes = [
    {
      title: "Canvas Connection Issues",
      description: "Make sure you're logged into Canvas and have granted the necessary permissions",
      icon: BookOpen,
      action: "Check Canvas Login"
    },
    {
      title: "Study Room Problems", 
      description: "Try refreshing your browser or clearing your cache for better performance",
      icon: Users,
      action: "Refresh Page"
    },
    {
      title: "Flashcard Generation",
      description: "Ensure your notes are properly formatted for AI processing",
      icon: Brain,
      action: "Format Notes"
    },
    {
      title: "Timer Not Working",
      description: "Check your browser's notification permissions for study reminders",
      icon: Clock,
      action: "Enable Notifications"
    }
  ];

  const alternatives = [
    {
      title: "Try Our Mobile Experience",
      description: "Access your study groups on the go with our mobile-optimized interface",
      icon: Sparkles,
      action: "View Mobile Version"
    },
    {
      title: "Join Our Beta Program", 
      description: "Get early access to new features and help shape the platform's future",
      icon: Zap,
      action: "Join Beta"
    },
    {
      title: "Contact Our Support Team",
      description: "Our team is here to help resolve any issues you're experiencing",
      icon: MessageSquare,
      action: "Get Support"
    },
    {
      title: "Take a Study Break",
      description: "You can always come back later - your data will be waiting for you",
      icon: Heart,
      action: "Pause Account"
    }
  ];

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setShowAlternatives(true);
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', { reason: selectedReason, feedback });
    alert('Thank you for your feedback! We appreciate you taking the time to help us improve.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-100 rounded-full">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-600">We'll miss you</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Sorry to see you go!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us improve MyCanvasNotes by sharing your experience. Your feedback makes us better for everyone.
          </p>
        </div>

        {/* Feedback Form */}
        <Card className="mb-16 border-2">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Why are you leaving?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {uninstallReasons.map((reason) => (
                <Button
                  key={reason.id}
                  variant={selectedReason === reason.id ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start transition-all ${
                    selectedReason === reason.id 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:bg-accent/50 border-2'
                  }`}
                  onClick={() => handleReasonSelect(reason.id)}
                >
                  <div className="flex items-center gap-3">
                    <reason.icon className="w-5 h-5" />
                    <span className="font-medium">{reason.label}</span>
                  </div>
                </Button>
              ))}
            </div>

            {selectedReason && (
              <div className="space-y-6 p-6 bg-accent/20 rounded-lg border-2 border-accent/30">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tell us more about your experience (optional):
                  </label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What could we have done better? What features were you looking for?"
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={handleSubmitFeedback}
                  className="w-full"
                  size="lg"
                >
                  Submit Feedback & Help Us Improve
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Fixes Section */}
        {selectedReason && (
          <Card className="mb-16 border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Quick Fixes to Try</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {quickFixes.map((fix, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-lg border-2 bg-card hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
                          <fix.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{fix.title}</h3>
                        <p className="text-muted-foreground mb-4">{fix.description}</p>
                        <Button size="sm" variant="outline">
                          {fix.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alternative Solutions */}
        {showAlternatives && (
          <Card className="mb-16 border-2 bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-green-800">Before You Go...</h2>
              </div>
              <p className="text-muted-foreground mb-8 text-center">
                Consider these alternatives that might address your concerns:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {alternatives.map((alt, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-lg border-2 bg-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white shadow-md">
                          <alt.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{alt.title}</h3>
                        <p className="text-muted-foreground mb-4">{alt.description}</p>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          {alt.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy & Security Notice */}
        <Card className="mb-16 border-2 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-800">Your Privacy & Security</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">All your data is encrypted and never shared with third parties</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Canvas Integration Only</h3>
                <p className="text-sm text-muted-foreground">We only access Canvas data when you explicitly grant permission</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Collaboration</h3>
                <p className="text-sm text-muted-foreground">Study sessions use secure connections that don't store conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold mb-4">Still Want to Leave?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/")}
              className="text-lg px-8 py-6"
            >
              <RefreshCw className="mr-2 w-5 h-5" />
              Give Us Another Chance
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <CheckCircle2 className="mr-2 w-5 h-5" />
              Stay & Continue Learning
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your feedback helps us improve • We're always here to help • Thank you for being part of our community
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for students •{" "}
            <button 
              onClick={() => navigate("/")} 
              className="text-primary hover:underline font-medium"
            >
              Return to MyCanvasNotes
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Uninstall;
