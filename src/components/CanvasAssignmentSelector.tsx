import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, BookOpen, Search } from "lucide-react";
import { mockCanvasAssignments, parseCanvasAssignment, type CanvasAssignment } from "@/lib/canvasData";

interface CanvasAssignmentSelectorProps {
  onSelect: (formData: {
    majorName: string;
    majorCode: string;
    classNumber: string;
    className: string;
    assignmentName: string;
  }) => void;
}

export const CanvasAssignmentSelector = ({ onSelect }: CanvasAssignmentSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssignments = mockCanvasAssignments.filter(assignment =>
    assignment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelect = (assignment: CanvasAssignment) => {
    const parsedData = parseCanvasAssignment(assignment);
    onSelect(parsedData);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Auto Select from Canvas
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Canvas Assignment</DialogTitle>
            <DialogDescription>
              Choose an assignment from your Canvas courses to auto-fill the form
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => handleSelect(assignment)}
                  className="w-full p-4 text-left border rounded-lg hover:bg-accent hover:border-primary transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground">
                        {assignment.name}
                      </h4>
                      <Badge variant="secondary" className="shrink-0 font-mono">
                        {assignment.courseCode}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {assignment.courseName}
                    </p>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </button>
              ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No assignments found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
