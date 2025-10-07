import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Pencil, StickyNote, Brain, BookOpen, Type, Trash2, Sigma, MousePointer2, Image as ImageIcon, Shapes, ZoomIn, ZoomOut, Save } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import RichTextEditor from "@/components/RichTextEditor";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { LaTeXDialog } from "@/components/LaTeXDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs as ImageTabs, TabsContent as ImageTabsContent, TabsList as ImageTabsList, TabsTrigger as ImageTabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AssignmentDetail = () => {
  const { id } = useParams();

  // Debug logging to track route and detect unwanted redirects
  useEffect(() => {
    console.log('=== INDEPENDENT LEARNING ASSIGNMENT ===');
    console.log('Route: /assignment/:id');
    console.log('Assignment id:', id);
    console.log('Full URL:', window.location.href);
    
    // Check if we should be in group learning instead
    const currentMode = sessionStorage.getItem('currentMode');
    const currentRoomId = sessionStorage.getItem('currentRoomId');
    
    if (currentMode === 'group-learning' && currentRoomId) {
      console.warn('WARNING: Detected potential unwanted redirect from group learning!');
      console.warn('Expected route: /room/' + currentRoomId);
      console.warn('Current route: /assignment/' + id);
    }
    
    // Mark as independent learning
    sessionStorage.setItem('currentMode', 'independent-learning');
    console.log('=======================================');
    
    return () => {
      console.log('AssignmentDetail component unmounting');
    };
  }, [id]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [drawColor, setDrawColor] = useState('#8B5CF6');
  const [brushSize, setBrushSize] = useState(2);
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "text" | "rectangle" | "circle" | "equation" | "image">("draw");
  const [activeTab, setActiveTab] = useState("whiteboard");
  const [docContent, setDocContent] = useState('');
  const [showLatexDialog, setShowLatexDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Initialize Fabric.js canvas when whiteboard tab is active
  useEffect(() => {
    if (activeTab !== "whiteboard") return;
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 3000,
      height: 2000,
      backgroundColor: '#ffffff',
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = drawColor;
    canvas.freeDrawingBrush.width = brushSize;
    canvas.isDrawingMode = true;

    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [activeTab]);

  // Update tool and color
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw") {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawColor;
        canvas.freeDrawingBrush.width = brushSize;
      }
    }
  }, [activeTool, drawColor, brushSize]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (tool === "text") {
      const text = new fabric.Textbox("Double-click to edit", {
        left: 100,
        top: 100,
        fill: drawColor,
        fontSize: 20,
        width: 200,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    } else if (tool === "equation") {
      setShowLatexDialog(true);
    } else if (tool === "image") {
      setShowImageDialog(true);
    }
  };

  const insertShape = (shape: 'rectangle' | 'circle' | 'triangle' | 'star' | 'hexagon') => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (shape === 'rectangle') {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: drawColor,
        width: 100,
        height: 100,
      });
      canvas.add(rect);
    } else if (shape === 'circle') {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: drawColor,
        radius: 50,
      });
      canvas.add(circle);
    } else if (shape === 'triangle') {
      const triangle = new fabric.Triangle({
        left: 100,
        top: 100,
        fill: drawColor,
        width: 100,
        height: 100,
      });
      canvas.add(triangle);
    } else if (shape === 'star') {
      // Create a simple star shape using polygon
      const starPoints = [
        { x: 50, y: 0 },
        { x: 61, y: 35 },
        { x: 98, y: 35 },
        { x: 68, y: 57 },
        { x: 79, y: 91 },
        { x: 50, y: 70 },
        { x: 21, y: 91 },
        { x: 32, y: 57 },
        { x: 2, y: 35 },
        { x: 39, y: 35 }
      ];
      const star = new fabric.Polygon(starPoints, {
        left: 100,
        top: 100,
        fill: drawColor,
      });
      canvas.add(star);
    } else if (shape === 'hexagon') {
      const hexagonPoints = [
        { x: 50, y: 0 },
        { x: 93.3, y: 25 },
        { x: 93.3, y: 75 },
        { x: 50, y: 100 },
        { x: 6.7, y: 75 },
        { x: 6.7, y: 25 }
      ];
      const hexagon = new fabric.Polygon(hexagonPoints, {
        left: 100,
        top: 100,
        fill: drawColor,
      });
      canvas.add(hexagon);
    }
    canvas.renderAll();
  };

  const handleLatexSubmit = (equation: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !equation) return;

    try {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      katex.render(equation, tempDiv, {
        throwOnError: false,
        displayMode: true,
      });
      
      const svgData = tempDiv.innerHTML;
      const foreignObject = `
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="padding: 10px; font-size: 20px;">
              ${svgData}
            </div>
          </foreignObject>
        </svg>
      `;
      
      const blob = new Blob([foreignObject], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      fabric.FabricImage.fromURL(url, {}).then((img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 1,
          scaleY: 1,
        });
        canvas.add(img);
        canvas.renderAll();
        document.body.removeChild(tempDiv);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      alert("Error rendering equation. Please check your LaTeX syntax.");
      console.error(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        insertImageToCanvas(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageToCanvas = (url: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !url) return;

    fabric.FabricImage.fromURL(url, {}).then((img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      canvas.add(img);
      canvas.renderAll();
      setShowImageDialog(false);
      setImageUrl('');
    });
  };

  const handleInsertImageFromUrl = () => {
    if (imageUrl) {
      insertImageToCanvas(imageUrl);
    }
  };

  const clearWhiteboard = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
  };

  const deleteSelected = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  };

  const duplicateSelected = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone().then((cloned: fabric.FabricObject) => {
        cloned.set({
          left: (activeObject.left || 0) + 20,
          top: (activeObject.top || 0) + 20,
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
      });
    }
  };

  const handleZoomIn = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const newZoom = Math.min(zoomLevel + 0.1, 3);
    setZoomLevel(newZoom);
    canvas.setZoom(newZoom);
    canvas.renderAll();
  };

  const handleZoomOut = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const newZoom = Math.max(zoomLevel - 0.1, 0.5);
    setZoomLevel(newZoom);
    canvas.setZoom(newZoom);
    canvas.renderAll();
  };

  const saveWhiteboard = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });
    const link = document.createElement('a');
    link.download = `whiteboard-assignment-${id}-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    const blob = new Blob([docContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assignment-${id}-document.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (format: 'pdf' | 'docx') => {
    // Immediate confetti burst for instant feedback
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6', '#F97316'],
    });

    // Then trigger continuous confetti rain animation
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    
    const rainConfetti = () => {
      confetti({
        particleCount: 8,
        angle: 90,
        spread: 80,
        origin: { x: Math.random(), y: -0.1 },
        colors: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6', '#F97316'],
        gravity: 1,
        scalar: 1.2,
        drift: Math.random() - 0.5,
        ticks: 300
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(rainConfetti);
      }
    };
    
    rainConfetti();

    // TODO: Integrate with Canvas API
    const fileName = `assignment-${id}-document.${format}`;
    console.log(`Submitting to Canvas as ${format}:`, fileName);
    alert(`Document will be submitted to Canvas as ${format.toUpperCase()}. This feature will be integrated with Canvas API.`);
  };

  // Mock assignment data
  const assignment = {
    title: "Data Structures - Binary Tree Implementation",
    course: "CS 450",
    dueDate: "2025-10-08",
    description: "Implement a balanced binary search tree in Java with insert, delete, and search operations",
    context: `
      # Assignment Overview
      
      In this assignment, you will implement a self-balancing binary search tree (AVL Tree) in Java. 
      
      ## Requirements
      
      1. Implement the following operations:
         - Insert a node
         - Delete a node
         - Search for a value
         - Balance the tree after modifications
      
      2. Include proper documentation and comments
      
      3. Write unit tests for each operation
      
      ## Grading Criteria
      
      - Correct implementation (60%)
      - Code quality and style (20%)
      - Test coverage (20%)
      
      ## Resources
      
      - Textbook: Chapter 7, pages 234-256
      - Video lecture: Week 8
      - Office hours: Tuesdays 2-4 PM
    `
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <LaTeXDialog
        open={showLatexDialog}
        onOpenChange={setShowLatexDialog}
        onSubmit={handleLatexSubmit}
      />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/independent">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assignments
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold text-foreground">{assignment.course}</h1>
              <p className="text-sm text-muted-foreground">{assignment.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontToggle />
              <ThemeToggle />
              <Button size="sm">Save Progress</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="whiteboard" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-6 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="context" className="gap-2">
              <FileText className="h-4 w-4" />
              Context
            </TabsTrigger>
            <TabsTrigger value="whiteboard" className="gap-2">
              <Pencil className="h-4 w-4" />
              Whiteboard
            </TabsTrigger>
            <TabsTrigger value="document" className="gap-2">
              <FileText className="h-4 w-4" />
              Document
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <StickyNote className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Flashcards
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <Brain className="h-4 w-4" />
              Quiz Mode
            </TabsTrigger>
          </TabsList>

          {/* Context Tab */}
          <TabsContent value="context" className="space-y-4">
            <Card className="p-6">
              <div className="prose prose-sm max-w-none">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{assignment.title}</h2>
                  <p className="text-muted-foreground">{assignment.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-foreground">
                  {assignment.context}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Whiteboard Tab */}
          <TabsContent value="whiteboard">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-border space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Interactive Whiteboard</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex gap-1 border-r border-border pr-3">
                      <Button 
                        size="sm" 
                        variant={activeTool === "select" ? "default" : "outline"}
                        onClick={() => setActiveTool("select")}
                        className="h-9 w-9 p-0"
                        title="Select"
                      >
                        <MousePointer2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeTool === "draw" ? "default" : "outline"}
                        onClick={() => setActiveTool("draw")}
                        className="h-9 w-9 p-0"
                        title="Draw"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeTool === "text" ? "default" : "outline"}
                        onClick={() => handleToolClick("text")}
                        className="h-9 w-9 p-0"
                        title="Add Text"
                      >
                        <Type className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-9 w-9 p-0"
                            title="Insert Shape"
                          >
                            <Shapes className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover">
                          <DropdownMenuItem onClick={() => insertShape('rectangle')}>
                            Rectangle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => insertShape('circle')}>
                            Circle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => insertShape('triangle')}>
                            Triangle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => insertShape('star')}>
                            Star
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => insertShape('hexagon')}>
                            Hexagon
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button 
                        size="sm" 
                        variant={activeTool === "equation" ? "default" : "outline"}
                        onClick={() => handleToolClick("equation")}
                        className="h-9 w-9 p-0"
                        title="Add Equation"
                      >
                        <Sigma className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={activeTool === "image" ? "default" : "outline"}
                        onClick={() => handleToolClick("image")}
                        className="h-9 w-9 p-0"
                        title="Add Image"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 items-center border-r border-border pr-3">
                      <span className="text-sm text-muted-foreground">Color:</span>
                      <input 
                        type="color" 
                        value={drawColor} 
                        onChange={(e) => setDrawColor(e.target.value)}
                        className="w-10 h-9 rounded border border-border cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-2 items-center border-r border-border pr-3">
                      <span className="text-sm text-muted-foreground">Size:</span>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground w-6">{brushSize}</span>
                    </div>
                    <div className="flex gap-1 border-r border-border pr-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleZoomOut} 
                        className="h-9 w-9 p-0"
                        title="Zoom Out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground min-w-12 flex items-center justify-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleZoomIn} 
                        className="h-9 w-9 p-0"
                        title="Zoom In"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="outline" onClick={saveWhiteboard} title="Save Whiteboard">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={clearWhiteboard} title="Clear Canvas">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-inner overflow-auto h-[500px] w-full border border-border">
                      <div className="inline-block min-w-full">
                        <canvas
                          ref={canvasRef}
                          className="block"
                        />
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={deleteSelected}>Delete Selected</ContextMenuItem>
                    <ContextMenuItem onClick={duplicateSelected}>Duplicate Selected</ContextMenuItem>
                    <ContextMenuItem onClick={clearWhiteboard}>Clear Canvas</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </Card>
          </TabsContent>

          {/* Image Dialog for Whiteboard */}
          <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image to Whiteboard</DialogTitle>
                <DialogDescription>
                  Upload an image from your computer or insert from a URL
                </DialogDescription>
              </DialogHeader>
              
              <ImageTabs defaultValue="upload" className="w-full">
                <ImageTabsList className="grid w-full grid-cols-2">
                  <ImageTabsTrigger value="upload">Upload</ImageTabsTrigger>
                  <ImageTabsTrigger value="url">From URL</ImageTabsTrigger>
                </ImageTabsList>
                
                <ImageTabsContent value="upload" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="whiteboard-image-upload">Choose an image file</Label>
                    <Input
                      id="whiteboard-image-upload"
                      type="file"
                      ref={imageInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supports JPG, PNG, GIF, and other image formats
                    </p>
                  </div>
                </ImageTabsContent>
                
                <ImageTabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="whiteboard-image-url">Image URL</Label>
                    <Input
                      id="whiteboard-image-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the direct URL to an image
                    </p>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleInsertImageFromUrl} disabled={!imageUrl}>
                      Insert Image
                    </Button>
                  </DialogFooter>
                </ImageTabsContent>
              </ImageTabs>
            </DialogContent>
          </Dialog>

          {/* Document Tab */}
          <TabsContent value="document">
            <Card className="p-6 min-h-[600px]">
              <RichTextEditor
                initialContent={docContent}
                onChange={setDocContent}
                onExport={handleExport}
                onSubmit={handleSubmit}
              />
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card className="p-6 min-h-[600px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">My Notes</h3>
                  <Button size="sm">New Note</Button>
                </div>
                <textarea
                  className="w-full h-96 p-4 rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Start typing your notes here..."
                />
              </div>
            </Card>
          </TabsContent>

          {/* Flashcards Tab */}
          <TabsContent value="flashcards">
            <Card className="p-6 min-h-[600px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-4">
                  <BookOpen className="h-16 w-16 mx-auto opacity-50" />
                  <p className="text-lg">Flashcard generation coming soon!</p>
                  <p className="text-sm">Auto-generate flashcards from your notes and assignment content</p>
                  <Button>Generate Flashcards</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz">
            <Card className="p-6 min-h-[600px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-4">
                  <Brain className="h-16 w-16 mx-auto opacity-50" />
                  <p className="text-lg">Quiz mode coming soon!</p>
                  <p className="text-sm">Test your knowledge with auto-generated questions</p>
                  <Button>Start Quiz</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AssignmentDetail;
