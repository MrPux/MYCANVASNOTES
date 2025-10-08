import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Github, Mail, MessageCircle, Heart } from 'lucide-react';

const Uninstall = () => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const uninstallReasons = [
    "The platform doesn't work for me",
    "I don't like the interface",
    "My school doesn't use Canvas",
    "I graduated/My semester is over!",
    "I have security/privacy concerns",
    "I found a better alternative",
    "Other"
  ];

  const faqs = [
    {
      question: "Why aren't all my Canvas classes showing?",
      answer: "Make sure you're logged into Canvas and have granted the necessary permissions. Only classes with active assignments will appear in your dashboard."
    },
    {
      question: "Why can't I see my assignments?",
      answer: "Ensure your Canvas account is properly connected and you have the right permissions. Try refreshing the page or logging out and back in."
    },
    {
      question: "How do I change my study group settings?",
      answer: "Go to your profile settings and navigate to 'Study Groups' to modify your group preferences and notification settings."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! We use industry-standard encryption and never share your personal data. All collaboration happens in real-time with end-to-end security."
    }
  ];

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleSubmitFeedback = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { reason: selectedReason, feedback });
    alert('Thank you for your feedback! We appreciate you taking the time to help us improve.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="w-full px-5 md:px-10 py-6">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              alt="MyCanvasNotes logo" 
              src="/src/assets/mycanvasnoteslogo.png" 
              width="60" 
              height="60" 
              className="rounded-lg"
            />
            <h1 className="text-2xl font-bold text-gray-800">MyCanvasNotes</h1>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        {/* Title Section */}
        <div className="mb-10 mt-10 text-center">
          <h1 className="font-bold text-5xl md:text-6xl text-gray-800 mb-4">
            Sorry to see you go!
          </h1>
          <h2 className="font-bold text-4xl md:text-5xl text-red-500">
            Let us know how we can improve.
          </h2>
        </div>

        {/* Feedback Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Please select your reason for leaving:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {uninstallReasons.map((reason, index) => (
                <Button
                  key={index}
                  variant={selectedReason === reason ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start ${
                    selectedReason === reason 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'border-red-300 hover:bg-red-50'
                  }`}
                  onClick={() => handleReasonSelect(reason)}
                >
                  {reason}
                </Button>
              ))}
            </div>

            {selectedReason && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Additional feedback (optional):
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={4}
                />
                <Button 
                  onClick={handleSubmitFeedback}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Submit Feedback
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center">
              <MessageCircle className="w-8 h-8 mr-3" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-4">
                    {faq.answer}
                  </p>
                  {index < faqs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="mb-8 bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="destructive" className="text-lg">🔐</Badge>
              <h2 className="font-bold text-xl text-red-800">Data Privacy Notice</h2>
            </div>
            <div className="space-y-3 text-red-700">
              <p>
                <strong>Your data stays with you:</strong> MyCanvasNotes does NOT send your personal data anywhere. 
                Everything runs securely in your browser with end-to-end encryption.
              </p>
              <p>
                <strong>Canvas integration only:</strong> We only access Canvas data when you explicitly grant permission, 
                and only for the features you choose to use.
              </p>
              <p>
                <strong>Real-time collaboration:</strong> Study sessions use secure, encrypted connections 
                that don't store your conversations or shared content.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Solutions */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h2 className="font-bold text-xl text-blue-800 mb-4">
              💡 Before you go, consider these alternatives:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Try our mobile app</h3>
                <p className="text-blue-600 text-sm">Access your study groups on the go with our mobile-friendly interface.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Join our beta program</h3>
                <p className="text-blue-600 text-sm">Get early access to new features and help shape the platform.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Contact support</h3>
                <p className="text-blue-600 text-sm">Our team is here to help resolve any issues you're experiencing.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Take a break</h3>
                <p className="text-blue-600 text-sm">You can always come back later - your data will be waiting for you.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-5 md:px-10 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              A better collaborative learning platform for Canvas
            </h3>
            <p className="text-blue-100">
              Transform your Canvas assignments into engaging study experiences
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Mail className="w-5 h-5 mr-2" />
                Contact
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Heart className="w-5 h-5 mr-2" />
                Support
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-blue-100 mb-2">Made with ❤️ for students</p>
              <p className="text-blue-200 text-sm">
                © 2024 MyCanvasNotes. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uninstall;
