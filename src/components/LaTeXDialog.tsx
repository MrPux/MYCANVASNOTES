import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LaTeXDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (equation: string) => void;
}

const commonFormulas = [
  { label: "π (Pi)", latex: "\\pi" },
  { label: "Fraction", latex: "\\frac{a}{b}" },
  { label: "Square Root", latex: "\\sqrt{x}" },
  { label: "Power", latex: "x^{n}" },
  { label: "Subscript", latex: "x_{n}" },
  { label: "Summation", latex: "\\sum_{i=1}^{n} x_i" },
  { label: "Integral", latex: "\\int_{a}^{b} f(x) dx" },
  { label: "Limit", latex: "\\lim_{x \\to \\infty} f(x)" },
  { label: "Alpha (α)", latex: "\\alpha" },
  { label: "Beta (β)", latex: "\\beta" },
  { label: "Theta (θ)", latex: "\\theta" },
  { label: "Delta (Δ)", latex: "\\Delta" },
  { label: "Infinity", latex: "\\infty" },
  { label: "Plus/Minus", latex: "\\pm" },
  { label: "Multiply", latex: "\\times" },
  { label: "Divide", latex: "\\div" },
  { label: "Not Equal", latex: "\\neq" },
  { label: "Less/Equal", latex: "\\leq" },
  { label: "Greater/Equal", latex: "\\geq" },
  { label: "Matrix 2x2", latex: "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}" },
];

export const LaTeXDialog = ({ open, onOpenChange, onSubmit }: LaTeXDialogProps) => {
  const [equation, setEquation] = useState("");

  const handleInsertFormula = (latex: string) => {
    // If there's already text, add a space before inserting
    const newEquation = equation ? `${equation} ${latex}` : latex;
    setEquation(newEquation);
  };

  const handleSubmit = () => {
    if (equation.trim()) {
      onSubmit(equation);
      setEquation("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setEquation("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Insert LaTeX Equation</DialogTitle>
          <DialogDescription>
            Type your LaTeX equation or click a common formula to insert it
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="equation">LaTeX Equation</Label>
            <Input
              id="equation"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Example: x = \frac{"{-b \\pm \\sqrt{b^2-4ac}}"}{"{2a}"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Common Formulas</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {commonFormulas.map((formula, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertFormula(formula.latex)}
                  className="text-xs justify-start h-auto py-2 px-3"
                  title={`Insert: ${formula.latex}`}
                >
                  <span className="truncate">{formula.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!equation.trim()}>
              Insert Equation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
