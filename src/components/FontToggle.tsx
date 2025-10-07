import { Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

type FontOption = "normal" | "lexend" | "atkinson" | "comic";

const FONT_OPTIONS = [
  { value: "normal" as const, label: "Normal Font", className: "" },
  { value: "lexend" as const, label: "Lexend (Dyslexia)", className: "dyslexia-font" },
  { value: "atkinson" as const, label: "Atkinson Hyperlegible", className: "font-atkinson" },
  { value: "comic" as const, label: "Comic Neue", className: "font-comic" },
];

export function FontToggle() {
  const [selectedFont, setSelectedFont] = useState<FontOption>("normal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("accessibility-font") as FontOption;
    if (saved && FONT_OPTIONS.find(opt => opt.value === saved)) {
      setSelectedFont(saved);
      applyFont(saved);
    }
  }, []);

  const applyFont = (font: FontOption) => {
    // Remove all font classes
    document.documentElement.classList.remove("dyslexia-font", "font-atkinson", "font-comic");
    
    // Apply the selected font class
    const fontOption = FONT_OPTIONS.find(opt => opt.value === font);
    if (fontOption && fontOption.className) {
      document.documentElement.classList.add(fontOption.className);
    }
  };

  const handleFontChange = (font: FontOption) => {
    setSelectedFont(font);
    applyFont(font);
    localStorage.setItem("accessibility-font", font);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Type className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          title="Change font for better readability"
        >
          <Type 
            className={`h-4 w-4 transition-all ${selectedFont !== "normal" ? "text-primary" : ""}`} 
          />
          <span className="sr-only">Toggle accessible fonts</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {FONT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleFontChange(option.value)}
            className={selectedFont === option.value ? "bg-accent" : ""}
          >
            <span className={option.className}>{option.label}</span>
            {selectedFont === option.value && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
