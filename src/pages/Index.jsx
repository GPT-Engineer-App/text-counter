import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [wordCount, setWordCount] = useState({ chinese: 0, english: 0 });

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileText = event.target.result;
      setText(fileText);
    };
    reader.readAsText(file, "utf-8");
  };

  const countWords = (inputText) => {
    // Match Chinese characters
    const chineseChars = inputText.match(/[\u4e00-\u9fff]/g) || [];
    
    // Match English words
    const englishWords = inputText.match(/\b[a-zA-Z]+\b/g) || [];
    
    setWordCount({
      chinese: chineseChars.length,
      english: englishWords.length,
    });
  };

  const handleCountWords = () => {
    countWords(text);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Word Count Tool</h1>
      <div className="w-1/2 space-y-4">
        <Label htmlFor="text-input">Enter Text:</Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={handleTextChange}
          placeholder="Type or paste your text here..."
          className="w-full"
        />
        <Label htmlFor="file-input">Or Upload a File:</Label>
        <Input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          className="w-full"
        />
        <Button onClick={handleCountWords} className="w-full mt-4">
          Count Words
        </Button>
        <div className="mt-4">
          <h2 className="text-xl">Word Count Results:</h2>
          <p>Chinese Characters: {wordCount.chinese}</p>
          <p>English Characters: {wordCount.english}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;