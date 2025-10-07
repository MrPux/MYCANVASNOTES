import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Plus, MessageSquare, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import { useState, useEffect } from "react";
import { getMajorById, addOrUpdateMajor, type Assignment } from "@/lib/studyGroupData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CanvasAssignmentSelector } from "@/components/CanvasAssignmentSelector";

const ClassAssignments = () => {
  const { classId } = useParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [majorName, setMajorName] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const [majorBorderColor, setMajorBorderColor] = useState("#9333ea");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    assignmentName: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadAssignments = () => {
      try {
        const storedData = localStorage.getItem('studyGroupData');
        if (!storedData) return;
        
        const majors = JSON.parse(storedData);
        for (const major of majors) {
          const foundClass = major.classes?.find((c: any) => c.id === classId);
          if (foundClass) {
            setAssignments(foundClass.assignments || []);
            setClassName(foundClass.name || "");
            setClassCode(foundClass.code || "");
            setMajorName(major.name || "");
            setMajorCode(major.code || "");
            setMajorBorderColor(major.borderColor || "#9333ea");
            break;
          }
        }
      } catch (error) {
        console.error('Error loading assignments:', error);
      }
    };

    loadAssignments();
  }, [classId]);

  const filteredAssignments = assignments.filter(assignment =>
    assignment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const refreshAssignments = () => {
    try {
      const storedData = localStorage.getItem('studyGroupData');
      if (!storedData) return;
      
      const majors = JSON.parse(storedData);
      for (const major of majors) {
        const foundClass = major.classes?.find((c: any) => c.id === classId);
        if (foundClass) {
          setAssignments(foundClass.assignments ? [...foundClass.assignments] : []);
          break;
        }
      }
    } catch (error) {
      console.error('Error refreshing assignments:', error);
    }
  };

  const handleAddAssignment = () => {
    const { assignmentName } = formData;

    if (!assignmentName) {
      toast({
        title: "Missing Information",
        description: "Please fill in the assignment name",
        variant: "destructive"
      });
      return;
    }

    if (!majorName || !majorCode || !classCode || !className) {
      toast({
        title: "Error",
        description: "Class information not found",
        variant: "destructive"
      });
      return;
    }

    const result = addOrUpdateMajor(majorName, majorCode, classCode, className, assignmentName);
    
    toast({
      title: "Assignment Added",
      description: result.message,
    });

    // Refresh assignments
    refreshAssignments();

    // Reset form
    setFormData({
      assignmentName: ""
    });
    setIsDialogOpen(false);
  };

  const handleCanvasSelect = (data: {
    majorName: string;
    majorCode: string;
    classNumber: string;
    className: string;
    assignmentName: string;
  }) => {
    // Only use assignment name since we already have class context
    setFormData({
      assignmentName: data.assignmentName
    });
  };

  const getMajorIdForClass = () => {
    try {
      const storedData = localStorage.getItem('studyGroupData');
      if (!storedData) return '1';
      
      const majors = JSON.parse(storedData);
      const major = majors.find((m: any) => m.classes?.some((c: any) => c.id === classId));
      return major?.id || '1';
    } catch (error) {
      return '1';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/major/${getMajorIdForClass()}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Classes
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">{classCode} - {className}</h1>
              <p className="text-sm text-muted-foreground">Assignment Study Rooms</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <FontToggle />
              <ThemeToggle />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Start Group Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Assignment</DialogTitle>
                    <DialogDescription>
                      Add an assignment from Canvas to {classCode} - {className}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <CanvasAssignmentSelector 
                    onSelect={handleCanvasSelect}
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
                      <Label htmlFor="assignmentName">Assignment Name (from Canvas)</Label>
                      <Input
                        id="assignmentName"
                        placeholder="e.g., Binary Tree Implementation"
                        value={formData.assignmentName}
                        onChange={(e) => setFormData({ ...formData, assignmentName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddAssignment}>
                      Add
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Study Rooms for Assignments</h2>
          <p className="text-muted-foreground">
            Join a room to collaborate on assignments or create your own
          </p>
        </div>

        {/* Assignment Rooms Grid */}
        <div className="grid gap-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment, index) => (
            <Link key={assignment.id} to={`/room/${assignment.id}?classId=${classId}`}
              className={`transform transition-all duration-500 hover:rotate-y-[0deg] ${
                index % 2 === 0 ? 'md:rotate-y-[1.5deg]' : 'md:-rotate-y-[1.5deg]'
              }`}
            >
              <Card 
                className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group bg-white/10 backdrop-blur-lg border-2 border-white/20"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = majorBorderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {assignment.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(assignment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      Active
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-secondary" />
                      <span className="font-semibold">0</span>
                      <span>studying now</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="font-semibold">0</span>
                      <span>messages</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Click to join study room
                    </p>
                    <Button variant="outline" size="sm">
                      Join Room →
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? `No assignments found matching "${searchQuery}"` : 'No assignments yet'}
              </p>
            </div>
          )}
        </div>

        {/* Create New Room CTA */}
        <Card className="mt-8 p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-dashed">
          <h3 className="text-xl font-bold mb-2 text-foreground">Don't see your assignment?</h3>
          <p className="text-muted-foreground mb-4">
            Add a new assignment from Canvas to start a study group
          </p>
          <Button size="lg" className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-5 w-5" />
            Start Group Assignment
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default ClassAssignments;
