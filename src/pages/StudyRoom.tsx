import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, Pencil, Users, BookOpen, Brain, FileText, Code2, Download, Trash2, Type, Sigma, MousePointer2, StickyNote, Plus, Folder, File, Video, Image as ImageIcon, Shapes, ZoomIn, ZoomOut, Save } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import confetti from "canvas-confetti";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontToggle } from "@/components/FontToggle";
import { toast } from "@/hooks/use-toast";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import CircleMeeting from "@/components/CircleMeeting";
import MeetingNotification from "@/components/MeetingNotification";
import RichTextEditor from "@/components/RichTextEditor";
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
import { Toaster } from "@/components/ui/toaster";

const StudyRoom = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId') || '1';

  // Debug logging to track route and prevent confusion
  useEffect(() => {
    console.log('=== GROUP LEARNING STUDY ROOM ===');
    console.log('Route: /room/:roomId with classId param');
    console.log('roomId:', roomId);
    console.log('classId:', classId);
    console.log('Full URL:', window.location.href);
    console.log('=================================');
    
    // Add a marker to sessionStorage to track we're in group learning
    sessionStorage.setItem('currentMode', 'group-learning');
    sessionStorage.setItem('currentRoomId', roomId || '');
    
    return () => {
      console.log('StudyRoom component unmounting');
    };
  }, [roomId, classId]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [docContent, setDocContent] = useState('');
  const [notesContent, setNotesContent] = useState('');
  const [codeFiles, setCodeFiles] = useState<{[key: string]: string}>({
    'main.js': '// Write your code here\n// Everyone in the room can edit and run this code\n\nfunction binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}',
    'test.js': '// Test file\nconsole.log("Tests will go here");'
  });
  const [activeFile, setActiveFile] = useState('main.js');
  const [cursors, setCursors] = useState<Array<{x: number, y: number, userId: string, username: string, color: string}>>([]);
  const [activeTab, setActiveTab] = useState("whiteboard");
  const [showCircleMeeting, setShowCircleMeeting] = useState(false);
  const [showMeetingNotification, setShowMeetingNotification] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string[]>([]);

  // Assignment context data
  const assignmentContext = `
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
  `;
  const [myColor] = useState(['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'][Math.floor(Math.random() * 6)]);
  const userId = useRef(`user-${Math.random().toString(36).substr(2, 9)}`).current;
  const [drawColor, setDrawColor] = useState('#8B5CF6');
  const [brushSize, setBrushSize] = useState(2);
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "text" | "rectangle" | "circle" | "equation" | "image">("draw");
  const [showLatexDialog, setShowLatexDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // TODO: Uncomment these Firebase hooks after adding your config
  // Listen to document changes
  // useEffect(() => {
  //   if (!roomId) return;
  //   const docRef = doc(db, 'rooms', roomId, 'document', 'content');
  //   const unsubscribe = onSnapshot(docRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       setDocContent(snapshot.data().text || '');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [roomId]);

  // Listen to code changes
  // useEffect(() => {
  //   if (!roomId) return;
  //   const codeRef = doc(db, 'rooms', roomId, 'code', 'content');
  //   const unsubscribe = onSnapshot(codeRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       setCodeContent(snapshot.data().text || '');
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [roomId]);

  // Listen to cursor movements
  // useEffect(() => {
  //   if (!roomId) return;
  //   const cursorsRef = doc(db, 'rooms', roomId, 'cursors', 'positions');
  //   const unsubscribe = onSnapshot(cursorsRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.data();
  //       const cursorArray = Object.entries(data)
  //         .filter(([key]) => key !== userId)
  //         .map(([key, value]: [string, any]) => ({ userId: key, ...value }));
  //       setCursors(cursorArray);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [roomId, userId]);

  // TODO: Add Firebase Firestore to track active meetings
  // Configure your Firebase project and uncomment the following code:
  //
  // import { db } from "@/lib/firebase";
  // import { doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
  //
  // useEffect(() => {
  //   if (!roomId) return;
  //   const meetingRef = doc(db, 'rooms', roomId, 'meetings', 'active');
  //   const unsubscribe = onSnapshot(meetingRef, (snapshot) => {
  //     if (snapshot.exists() && snapshot.data().active && !showCircleMeeting) {
  //       setShowMeetingNotification(true);
  //     } else if (!snapshot.exists()) {
  //       setShowMeetingNotification(false);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [roomId, showCircleMeeting]);
  
  const handleMeetingStart = async () => {
    // Notify other users that a meeting has started
    setShowMeetingNotification(true);
    
    // TODO: Add Firebase code here to notify all users:
    // const meetingRef = doc(db, 'rooms', roomId, 'meetings', 'active');
    // await setDoc(meetingRef, { active: true, startedAt: new Date().toISOString() });
  };
  
  const handleMeetingEnd = async () => {
    // Clear meeting notification
    setShowMeetingNotification(false);
    
    // TODO: Add Firebase code here to clear notification for all users:
    // const meetingRef = doc(db, 'rooms', roomId, 'meetings', 'active');
    // await deleteDoc(meetingRef);
  };

  const handleMouseMove = async (e: React.MouseEvent) => {
    if (!roomId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // TODO: Uncomment after adding Firebase config
    // const cursorsRef = doc(db, 'rooms', roomId, 'cursors', 'positions');
    // await setDoc(cursorsRef, {
    //   [userId]: { x, y, username: 'User', color: myColor }
    // }, { merge: true });
  };

  const handleDocChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!roomId) return;
    const newContent = e.target.value;
    setDocContent(newContent);
    // TODO: Uncomment after adding Firebase config
    // const docRef = doc(db, 'rooms', roomId, 'document', 'content');
    // await setDoc(docRef, { text: newContent, updatedAt: new Date().toISOString() }, { merge: true });
  };

  const handleCodeChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!roomId) return;
    const newContent = e.target.value;
    setCodeFiles(prev => ({ ...prev, [activeFile]: newContent }));
    // TODO: Uncomment after adding Firebase config
    // const codeRef = doc(db, 'rooms', roomId, 'code', activeFile);
    // await setDoc(codeRef, { text: newContent, updatedAt: new Date().toISOString() }, { merge: true });
  };

  const addNewFile = () => {
    const fileName = prompt('Enter file name (e.g., helper.js):');
    if (fileName && !codeFiles[fileName]) {
      setCodeFiles(prev => ({ ...prev, [fileName]: '// New file\n' }));
      setActiveFile(fileName);
    }
  };

  const deleteFile = (fileName: string) => {
    if (Object.keys(codeFiles).length <= 1) {
      alert('Cannot delete the last file');
      return;
    }
    const newFiles = { ...codeFiles };
    delete newFiles[fileName];
    setCodeFiles(newFiles);
    if (activeFile === fileName) {
      setActiveFile(Object.keys(newFiles)[0]);
    }
  };

  const downloadCode = () => {
    const content = codeFiles[activeFile];
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const runCode = () => {
    // Notify users about JavaScript-only support
    toast({
      title: "JavaScript Only",
      description: "Currently only JavaScript is supported. Python, Java, and other languages coming very soon! 🚀",
      duration: 4000,
    });

    setCodeOutput([]);
    const output: string[] = [];
    
    // Override console.log to capture output
    const originalLog = console.log;
    console.log = (...args: any[]) => {
      output.push(args.map(arg => String(arg)).join(' '));
      originalLog(...args);
    };

    try {
      // Execute the code
      eval(codeFiles[activeFile]);
      setCodeOutput(output.length > 0 ? output : ['Code executed successfully (no output)']);
    } catch (error) {
      setCodeOutput([`Error: ${error instanceof Error ? error.message : String(error)}`]);
    } finally {
      // Restore original console.log
      console.log = originalLog;
    }
  };

  const handleExport = () => {
    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${roomId}.txt`;
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
    const fileName = `group-assignment-${roomId}.${format}`;
    console.log(`Submitting to Canvas as ${format}:`, fileName);
    alert(`Document will be submitted to Canvas as ${format.toUpperCase()}. This feature will be integrated with Canvas API.`);
  };

  // Initialize Fabric.js canvas when whiteboard tab is active
  useEffect(() => {
    if (activeTab !== "whiteboard") return;
    if (!canvasRef.current || fabricCanvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 3000,
      height: 2000,
      backgroundColor: '#ffffff',
    });

    // Initialize the brush
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
    link.download = `whiteboard-${roomId}-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Whiteboard Saved",
      description: "Your whiteboard has been downloaded as an image.",
    });
  };

  // Mock active users
  const activeUsers = [
    { id: 1, name: "John D.", initials: "JD", color: "bg-blue-500" },
    { id: 2, name: "Sarah M.", initials: "SM", color: "bg-purple-500" },
    { id: 3, name: "Mike K.", initials: "MK", color: "bg-green-500" },
    { id: 4, name: "Emily R.", initials: "ER", color: "bg-orange-500" }
  ];

  // Mock messages
  const messages = [
    { id: 1, user: "John D.", initials: "JD", color: "bg-blue-500", text: "Hey everyone! I'm stuck on the balance function", time: "10:23 AM" },
    { id: 2, user: "Sarah M.", initials: "SM", color: "bg-purple-500", text: "Which part specifically? The rotation or the height calculation?", time: "10:25 AM" },
    { id: 3, user: "John D.", initials: "JD", color: "bg-blue-500", text: "The left rotation - I think my pointer logic is off", time: "10:26 AM" },
    { id: 4, user: "Mike K.", initials: "MK", color: "bg-green-500", text: "Let me draw it on the whiteboard", time: "10:27 AM" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <LaTeXDialog
        open={showLatexDialog}
        onOpenChange={setShowLatexDialog}
        onSubmit={handleLatexSubmit}
      />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={`/class/${classId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Leave Room
              </Button>
            </Link>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-500/30">
                  <Users className="h-3 w-3 mr-1" />
                  Group Learning
                </Badge>
              </div>
              <h1 className="text-lg font-bold text-foreground">Binary Tree Implementation</h1>
              <p className="text-sm text-muted-foreground">CS 450 - Lab 5</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {activeUsers.slice(0, 3).map((user) => (
                  <Avatar key={user.id} className="border-2 border-background">
                    <AvatarFallback className={`${user.color} text-white text-xs`}>
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {activeUsers.length} online
              </span>
              <FontToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="whiteboard" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-4 bg-card/50 backdrop-blur-sm overflow-x-auto flex-nowrap">
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
                <TabsTrigger value="code" className="gap-2">
                  <Code2 className="h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="resources" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="quiz" className="gap-2">
                  <Brain className="h-4 w-4" />
                  Quiz
                </TabsTrigger>
              </TabsList>

              {/* Context Tab */}
              <TabsContent value="context" className="space-y-4">
                <Card className="p-6">
                  <div className="prose prose-sm max-w-none">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-foreground mb-2">Binary Tree Implementation</h2>
                      <p className="text-muted-foreground">CS 450 - Lab 5</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">Implement a balanced binary search tree in Java with insert, delete, and search operations</span>
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap text-foreground">
                      {assignmentContext}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Whiteboard Tab */}
              <TabsContent value="whiteboard">
                <Card className="p-6 min-h-[600px] max-w-full overflow-hidden">
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-border space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Collaborative Whiteboard</h3>
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
                        <div 
                          className="relative bg-white dark:bg-gray-900 rounded-lg shadow-inner overflow-auto h-[500px] w-full border border-border" 
                          onMouseMove={handleMouseMove}
                        >
                          <div className="inline-block min-w-full">
                            <canvas
                              ref={canvasRef}
                              className="block"
                            />
                          </div>
                          {cursors.map((cursor) => (
                            <div
                              key={cursor.userId}
                              className="absolute pointer-events-none z-10"
                              style={{
                                left: `${cursor.x}%`,
                                top: `${cursor.y}%`,
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: cursor.color }}
                              />
                              <div 
                                className="mt-1 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                                style={{ backgroundColor: cursor.color }}
                              >
                                {cursor.username}
                              </div>
                            </div>
                          ))}
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
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Collaborative Document</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex -space-x-1">
                          {activeUsers.slice(0, 3).map((user) => (
                            <Avatar key={user.id} className="border-2 border-background w-6 h-6">
                              <AvatarFallback className={`${user.color} text-white text-xs`}>
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span>Currently editing</span>
                      </div>
                    </div>
                    
                    <RichTextEditor
                      initialContent={docContent}
                      onChange={setDocContent}
                      onExport={handleExport}
                      onSubmit={handleSubmit}
                    />

                    <div className="text-xs text-muted-foreground text-right">
                      Last saved: just now
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes">
                <Card className="p-6 min-h-[600px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Group Notes</h3>
                      <Button size="sm">Save Notes</Button>
                    </div>
                    <textarea
                      value={notesContent}
                      onChange={(e) => setNotesContent(e.target.value)}
                      className="w-full h-96 p-4 rounded-lg border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Take shared notes here...

Everyone in the room can add and edit these notes together."
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Code Tab */}
              <TabsContent value="code">
                <Card className="p-6 min-h-[600px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <h3 className="text-lg font-semibold text-foreground">Collaborative Code Editor</h3>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={addNewFile}>
                          <Plus className="h-4 w-4 mr-1" />
                          New File
                        </Button>
                        <Button size="sm" variant="outline" onClick={downloadCode}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" onClick={runCode}>Run Code</Button>
                        <Button size="sm">Save All</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-[200px_1fr] gap-4 min-h-[500px]">
                      {/* File Tree */}
                      <div className="border border-border rounded-lg p-2 bg-muted/30">
                        <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground px-2">
                          <Folder className="h-4 w-4" />
                          <span>Files</span>
                        </div>
                        <div className="space-y-1">
                          {Object.keys(codeFiles).map((fileName) => (
                            <div
                              key={fileName}
                              className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer group ${
                                activeFile === fileName 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => setActiveFile(fileName)}
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <File className="h-3.5 w-3.5 shrink-0" />
                                <span className="text-sm truncate">{fileName}</span>
                              </div>
                              {Object.keys(codeFiles).length > 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFile(fileName);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Code Editor */}
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2 px-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <File className="h-4 w-4" />
                            <span className="font-mono">{activeFile}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">JavaScript only • Other languages coming soon</span>
                            <select className="px-2 py-1 text-xs rounded-md border border-border bg-background">
                              <option>JavaScript</option>
                              <option disabled>Python (Coming Soon)</option>
                              <option disabled>Java (Coming Soon)</option>
                              <option disabled>C++ (Coming Soon)</option>
                              <option disabled>TypeScript (Coming Soon)</option>
                            </select>
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-4 flex-1 font-mono text-sm">
                          <textarea
                            value={codeFiles[activeFile]}
                            onChange={handleCodeChange}
                            className="w-full h-full min-h-[450px] bg-transparent text-green-400 resize-none focus:outline-none"
                            spellCheck={false}
                          />
                        </div>
                       </div>
                    </div>
                    
                    {/* Console Output */}
                    {codeOutput.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-foreground">Console Output</h4>
                          <Button size="sm" variant="ghost" onClick={() => setCodeOutput([])}>
                            Clear
                          </Button>
                        </div>
                        <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm max-h-48 overflow-y-auto">
                          {codeOutput.map((line, index) => (
                            <div key={index} className={line.startsWith('Error:') ? 'text-red-400' : 'text-gray-300'}>
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                          {activeUsers.slice(0, 3).map((user) => (
                            <Avatar key={user.id} className="w-6 h-6 border-2 border-background">
                              <AvatarFallback className={`${user.color} text-white text-xs`}>
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span>Currently editing</span>
                      </div>
                      <span>Last saved: just now</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources">
                <Card className="p-6 min-h-[600px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Shared Resources</h3>
                      <Button size="sm">Add Resource</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Share notes, links, and study materials with the group
                    </p>
                  </div>
                </Card>
              </TabsContent>

              {/* Flashcards Tab */}
              <TabsContent value="flashcards">
                <Card className="p-6 min-h-[600px]">
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center space-y-4">
                      <BookOpen className="h-16 w-16 mx-auto opacity-50" />
                      <p className="text-lg">Group flashcards</p>
                      <p className="text-sm">Create and study flashcards together</p>
                      <Button>Create Flashcard Set</Button>
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
                      <p className="text-lg">Group quiz mode</p>
                      <p className="text-sm">Test your knowledge together</p>
                      <Button>Start Quiz</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Group Chat</h3>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowCircleMeeting(true)}
                    className="gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Circle
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={`${message.color} text-white text-xs`}>
                        {message.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{message.user}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-foreground">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button size="sm" className="shrink-0">Send</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Meeting Notification */}
      {showMeetingNotification && (
        <MeetingNotification
          onJoin={() => {
            setShowMeetingNotification(false);
            setShowCircleMeeting(true);
          }}
          onDecline={() => setShowMeetingNotification(false)}
        />
      )}

      {/* Circle Meeting Modal */}
      <CircleMeeting 
        open={showCircleMeeting}
        onClose={() => setShowCircleMeeting(false)}
        roomId={roomId || 'default'}
        onMeetingStart={handleMeetingStart}
        onMeetingEnd={handleMeetingEnd}
      />
      
      <Toaster />
    </div>
  );
};

export default StudyRoom;
