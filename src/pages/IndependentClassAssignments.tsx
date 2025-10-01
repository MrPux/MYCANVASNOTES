import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, CheckCircle2, Circle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import { useState } from "react";

// Mock data for assignments
const mockAssignmentsByClass: Record<string, any[]> = {
  "1": [
    {
      id: 1,
      title: "Integration Techniques Problem Set",
      course: "MATH 251",
      dueDate: "2025-10-05",
      status: "in-progress",
      description: "Complete problems 1-20 on integration by parts and substitution"
    },
    {
      id: 5,
      title: "Differential Equations Worksheet",
      course: "MATH 251",
      dueDate: "2025-10-12",
      status: "not-started",
      description: "Solve differential equations using various methods"
    }
  ],
  "2": [
    {
      id: 2,
      title: "Binary Tree Implementation",
      course: "CS 450",
      dueDate: "2025-10-08",
      status: "not-started",
      description: "Implement a balanced binary search tree in Java with insert, delete, and search operations"
    },
    {
      id: 6,
      title: "Graph Algorithms Project",
      course: "CS 450",
      dueDate: "2025-10-15",
      status: "not-started",
      description: "Implement BFS and DFS traversal algorithms"
    }
  ],
  "3": [
    {
      id: 3,
      title: "Shakespeare Essay",
      course: "ENG 201",
      dueDate: "2025-10-10",
      status: "not-started",
      description: "Write a 5-page essay analyzing themes in Hamlet"
    }
  ],
  "4": [
    {
      id: 4,
      title: "Projectile Motion Lab Report",
      course: "PHYS 101",
      dueDate: "2025-09-28",
      status: "completed",
      description: "Submit lab report with data analysis and conclusions"
    },
    {
      id: 7,
      title: "Electric Circuits Lab",
      course: "PHYS 101",
      dueDate: "2025-10-06",
      status: "in-progress",
      description: "Complete circuits lab and submit findings"
    }
  ],
  "5": [
    {
      id: 8,
      title: "Renaissance Period Research Paper",
      course: "HIST 150",
      dueDate: "2025-10-18",
      status: "not-started",
      description: "Write a 10-page research paper on the Renaissance period"
    }
  ]
};

const classNames: Record<string, { name: string; code: string; color: string }> = {
  "1": { name: "Calculus II", code: "MATH 251", color: "hsl(280 45% 40%)" },
  "2": { name: "Data Structures", code: "CS 450", color: "hsl(15 85% 60%)" },
  "3": { name: "English Literature", code: "ENG 201", color: "hsl(200 70% 50%)" },
  "4": { name: "Physics I", code: "PHYS 101", color: "hsl(140 60% 45%)" },
  "5": { name: "World History", code: "HIST 150", color: "hsl(30 80% 55%)" }
};

const IndependentClassAssignments = () => {
  const { classId } = useParams();
  const assignments = mockAssignmentsByClass[classId || "1"] || [];
  const classInfo = classNames[classId || "1"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filterAssignments = (filterType: string) => {
    const today = new Date();
    
    switch (filterType) {
      case "todo":
        return assignments.filter(a => {
          const daysUntil = getDaysUntilDue(a.dueDate);
          return a.status !== "completed" && daysUntil >= 0;
        });
      case "overdue":
        return assignments.filter(a => {
          const daysUntil = getDaysUntilDue(a.dueDate);
          return a.status !== "completed" && daysUntil < 0;
        });
      case "completed":
        return assignments.filter(a => a.status === "completed");
      default:
        return assignments;
    }
  };

  const renderAssignmentsList = (filteredAssignments: any[]) => {
    if (filteredAssignments.length === 0) {
      return (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No assignments in this category.</p>
        </Card>
      );
    }

    return filteredAssignments.map((assignment) => {
      const daysUntilDue = getDaysUntilDue(assignment.dueDate);
      const isOverdue = daysUntilDue < 0;
      const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

      return (
        <Link key={assignment.id} to={`/assignment/${assignment.id}`}
          className={`transform transition-all duration-500 hover:rotate-y-[0deg] ${
            filteredAssignments.indexOf(assignment) % 2 === 0 ? 'md:rotate-y-[1.5deg]' : 'md:-rotate-y-[1.5deg]'
          }`}
        >
          <Card 
            className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group bg-white/10 backdrop-blur-lg border-2"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = classInfo?.color || 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getStatusIcon(assignment.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {assignment.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status.replace("-", " ")}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due {assignment.dueDate}</span>
                  </div>
                  {assignment.status !== "completed" && (
                    <div className={`flex items-center gap-1 text-sm ${
                      isOverdue ? "text-destructive font-semibold" : 
                      isDueSoon ? "text-orange-600 font-semibold" : 
                      "text-muted-foreground"
                    }`}>
                      <Clock className="h-4 w-4" />
                      <span>
                        {isOverdue 
                          ? `${Math.abs(daysUntilDue)} days overdue`
                          : `${daysUntilDue} days left`
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Button variant="outline" size="sm" className="shrink-0">
                Open →
              </Button>
            </div>
          </Card>
        </Link>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/independent">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Classes
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-bold text-foreground">{classInfo?.code}</h1>
              <p className="text-sm text-muted-foreground">{classInfo?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Assignments</h2>
          <p className="text-muted-foreground">Your Canvas assignments with enhanced study tools</p>
        </div>

        {/* Tabs for filtering assignments */}
        <Tabs defaultValue="todo" className="w-full">
          <TabsList className="mb-6 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="todo">To Do ({filterAssignments("todo").length})</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({filterAssignments("overdue").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filterAssignments("completed").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="todo">
            <div className="grid gap-6">
              {renderAssignmentsList(filterAssignments("todo"))}
            </div>
          </TabsContent>

          <TabsContent value="overdue">
            <div className="grid gap-6">
              {renderAssignmentsList(filterAssignments("overdue"))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid gap-6">
              {renderAssignmentsList(filterAssignments("completed"))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default IndependentClassAssignments;
