import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, MessageSquare, Plus, Search } from "lucide-react";
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
import { getMajorById, addOrUpdateMajor, loadMajors, type Class } from "@/lib/studyGroupData";
import { CanvasAssignmentSelector } from "@/components/CanvasAssignmentSelector";

const MajorClasses = () => {
  const { majorId } = useParams();
  const [classes, setClasses] = useState<Class[]>([]);
  const [majorName, setMajorName] = useState("");
  const [majorCode, setMajorCode] = useState("");
  const [majorBorderColor, setMajorBorderColor] = useState("#9333ea");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    classNumber: "",
    className: "",
    assignmentName: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (majorId) {
      const major = getMajorById(majorId);
      if (major) {
        setClasses(major.classes);
        setMajorName(major.name);
        setMajorCode(major.code);
        setMajorBorderColor(major.borderColor);
      }
    }
  }, [majorId]);

  const filteredClasses = classes.filter(classItem =>
    classItem.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const refreshClasses = () => {
    if (majorId) {
      const major = getMajorById(majorId);
      if (major) {
        setClasses(major.classes);
      }
    }
  };

  const handleAddAssignment = () => {
    const { classNumber, className, assignmentName } = formData;

    if (!classNumber || !className || !assignmentName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (!majorName || !majorCode) {
      toast({
        title: "Error",
        description: "Major information not found",
        variant: "destructive"
      });
      return;
    }

    const result = addOrUpdateMajor(majorName, majorCode, classNumber, className, assignmentName);
    
    toast({
      title: "Assignment Added",
      description: result.message,
    });

    // Refresh classes
    refreshClasses();

    // Reset form
    setFormData({
      classNumber: "",
      className: "",
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
    // Only use class-related fields, ignore major fields since we're already in a major
    setFormData({
      classNumber: data.classNumber,
      className: data.className,
      assignmentName: data.assignmentName
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/group">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Majors
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">{majorName} Classes</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes..."
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
                    <DialogTitle>Add Class & Assignment</DialogTitle>
                    <DialogDescription>
                      Add a class and assignment from Canvas. If the class already exists, the assignment will be added to it.
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
                      <Label htmlFor="classNumber">Class Number</Label>
                      <Input
                        id="classNumber"
                        placeholder="e.g., CS 101"
                        value={formData.classNumber}
                        onChange={(e) => setFormData({ ...formData, classNumber: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="className">Class Name (from Canvas)</Label>
                      <Input
                        id="className"
                        placeholder="e.g., Introduction to Programming"
                        value={formData.className}
                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                      />
                    </div>
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
          <h2 className="text-3xl font-bold mb-2 text-foreground">Available Classes</h2>
          <p className="text-muted-foreground">
            Select a class to view and join assignment study rooms
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid gap-6">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem, index) => (
            <Link key={classItem.id} to={`/class/${classItem.id}`}
              className={`transform transition-all duration-500 hover:rotate-y-[0deg] ${
                index % 2 === 0 ? 'md:rotate-y-[2deg]' : 'md:-rotate-y-[2deg]'
              }`}
            >
              <Card 
                className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group bg-white/10 backdrop-blur-lg border-2 border-white/20"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = majorBorderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="font-mono text-base px-3 py-1">
                        {classItem.code}
                      </Badge>
                       <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {classItem.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       <div className="flex items-center gap-1">
                         <MessageSquare className="h-4 w-4" />
                         <span>{classItem.assignments.length} assignments</span>
                       </div>
                       <div className="flex items-center gap-1">
                         <Users className="h-4 w-4" />
                         <span>{classItem.participants} participants</span>
                       </div>
                     </div>
                  </div>

                  <Button variant="outline" size="sm" className="shrink-0">
                    View Assignments →
                  </Button>
                </div>
              </Card>
            </Link>
          ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No classes found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MajorClasses;
