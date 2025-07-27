import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, FileText } from "lucide-react";

interface WordlistUploadProps {
  onWordsUploaded: (words: string[]) => void;
}

export const WordlistUpload = ({ onWordsUploaded }: WordlistUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const parseWordlist = (text: string): string[] => {
    // Split by lines and filter out empty lines
    const words = text
      .split(/[\n\r]+/)
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    return words;
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.includes('text') && !file.name.endsWith('.txt')) {
      toast.error("Please upload a text file (.txt)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const words = parseWordlist(text);
      
      if (words.length === 0) {
        toast.error("No words found in the file");
        return;
      }

      onWordsUploaded(words);
      toast.success(`Successfully loaded ${words.length} words!`);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border shadow-gentle">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Upload className="w-5 h-5" />
          Upload Custom Wordlist
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Upload a text file with words separated by lines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            Drag and drop a text file here, or click to select
          </p>
          <Input
            type="file"
            accept=".txt,text/plain"
            onChange={handleFileSelect}
            className="hidden"
            id="wordlist-upload"
          />
          <Button asChild variant="outline">
            <label htmlFor="wordlist-upload" className="cursor-pointer">
              Select File
            </label>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};