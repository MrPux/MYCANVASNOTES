import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import IndependentLearning from "./pages/IndependentLearning";
import IndependentClassAssignments from "./pages/IndependentClassAssignments";
import GroupLearning from "./pages/GroupLearning";
import AssignmentDetail from "./pages/AssignmentDetail";
import MajorClasses from "./pages/MajorClasses";
import ClassAssignments from "./pages/ClassAssignments";
import StudyRoom from "./pages/StudyRoom";
import GettingStarted from "./pages/GettingStarted";
import Uninstall from "./pages/Uninstall";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/independent" element={<IndependentLearning />} />
            <Route path="/independent/class/:classId" element={<IndependentClassAssignments />} />
            <Route path="/group" element={<GroupLearning />} />
            <Route path="/assignment/:id" element={<AssignmentDetail />} />
            <Route path="/major/:majorId" element={<MajorClasses />} />
            <Route path="/class/:classId" element={<ClassAssignments />} />
            <Route path="/room/:roomId" element={<StudyRoom />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/uninstall" element={<Uninstall />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;