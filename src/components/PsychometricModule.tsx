import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, ArrowRight, ArrowLeft } from "lucide-react";

interface PsychometricModuleProps {
  onComplete: (scores: PsychometricScores) => void;
  onBack: () => void;
}

export interface PsychometricScores {
  interest: number;
  personality: number;
  cognitiveStyle: number;
  motivation: number;
  overall: number;
}

interface Question {
  id: string;
  text: string;
  category: keyof Omit<PsychometricScores, 'overall'>;
  reverse?: boolean;
}

export const PsychometricModule = ({ onComplete, onBack }: PsychometricModuleProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions: Question[] = [
    // Interest Scale
    { id: "int1", text: "I enjoy creating consistent, reusable UI elements", category: "interest" },
    { id: "int2", text: "I find satisfaction in organizing and systematizing design components", category: "interest" },
    { id: "int3", text: "I'm excited about the intersection of design and development", category: "interest" },
    { id: "int4", text: "I like establishing visual guidelines and standards", category: "interest" },
    { id: "int5", text: "I prefer working on one-off designs rather than reusable systems", category: "interest", reverse: true },
    
    // Personality Compatibility
    { id: "per1", text: "I pay close attention to small details and inconsistencies", category: "personality" },
    { id: "per2", text: "I prefer structured, rule-based approaches to creative work", category: "personality" },
    { id: "per3", text: "I enjoy collaborating with both designers and developers", category: "personality" },
    { id: "per4", text: "I'm comfortable with repetitive, methodical tasks", category: "personality" },
    { id: "per5", text: "I prefer complete creative freedom over working within constraints", category: "personality", reverse: true },
    
    // Cognitive Style
    { id: "cog1", text: "I think analytically about design decisions", category: "cognitiveStyle" },
    { id: "cog2", text: "I can balance creative vision with technical constraints", category: "cognitiveStyle" },
    { id: "cog3", text: "I enjoy solving complex organizational problems", category: "cognitiveStyle" },
    { id: "cog4", text: "I prefer structured workflows over open-ended exploration", category: "cognitiveStyle" },
    { id: "cog5", text: "I work best when I can focus purely on creative expression", category: "cognitiveStyle", reverse: true },
    
    // Motivation
    { id: "mot1", text: "I'm driven by creating order and consistency in design", category: "motivation" },
    { id: "mot2", text: "I find fulfillment in improving team efficiency through better tools", category: "motivation" },
    { id: "mot3", text: "I'm motivated by the technical aspects of design implementation", category: "motivation" },
    { id: "mot4", text: "I enjoy mentoring others and establishing best practices", category: "motivation" },
    { id: "mot5", text: "I'm primarily motivated by individual creative recognition", category: "motivation", reverse: true }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const likertOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate scores
      const scores = calculateScores();
      onComplete(scores);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const calculateScores = (): PsychometricScores => {
    const categoryScores: Record<string, number[]> = {
      interest: [],
      personality: [],
      cognitiveStyle: [],
      motivation: []
    };

    questions.forEach(question => {
      const answer = answers[question.id] || 3;
      const score = question.reverse ? 6 - answer : answer;
      categoryScores[question.category].push(score);
    });

    const interest = Math.round((categoryScores.interest.reduce((a, b) => a + b, 0) / categoryScores.interest.length) * 20);
    const personality = Math.round((categoryScores.personality.reduce((a, b) => a + b, 0) / categoryScores.personality.length) * 20);
    const cognitiveStyle = Math.round((categoryScores.cognitiveStyle.reduce((a, b) => a + b, 0) / categoryScores.cognitiveStyle.length) * 20);
    const motivation = Math.round((categoryScores.motivation.reduce((a, b) => a + b, 0) / categoryScores.motivation.length) * 20);
    const overall = Math.round((interest + personality + cognitiveStyle + motivation) / 4);

    return { interest, personality, cognitiveStyle, motivation, overall };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'interest': return Heart;
      case 'personality': return Users;
      case 'cognitiveStyle': return Brain;
      case 'motivation': return Heart;
      default: return Brain;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'interest': return 'Interest Assessment';
      case 'personality': return 'Personality Fit';
      case 'cognitiveStyle': return 'Cognitive Style';
      case 'motivation': return 'Motivation Analysis';
      default: return 'Assessment';
    }
  };

  const CategoryIcon = getCategoryIcon(currentQuestion.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <Card className="shadow-elevation border-border/50 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <CategoryIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Psychometric Evaluation</CardTitle>
                <Badge variant="outline" className="mt-2">
                  {getCategoryLabel(currentQuestion.category)}
                </Badge>
              </div>
            </div>
            
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className="h-2 gradient-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="text-center space-y-6">
              <h3 className="text-xl font-semibold text-foreground leading-relaxed">
                {currentQuestion.text}
              </h3>

              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {likertOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label 
                      htmlFor={`option-${option.value}`} 
                      className="flex-1 text-left cursor-pointer font-medium"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {currentQuestionIndex === 0 ? 'Back to Intro' : 'Previous'}
              </Button>

              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="gradient-primary shadow-glow hover:shadow-elevation transition-all duration-300 flex items-center gap-2"
              >
                {isLastQuestion ? 'Complete Module' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};