import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";

interface TechnicalModuleProps {
  onComplete: (scores: TechnicalScores) => void;
  onBack: () => void;
}

export interface TechnicalScores {
  generalAptitude: number;
  prerequisiteKnowledge: number;
  domainSpecific: number;
  overall: number;
}

interface Question {
  id: string;
  text: string;
  category: keyof Omit<TechnicalScores, 'overall'>;
  type: 'multiple-choice' | 'scenario';
  options: Array<{ value: string; label: string; correct?: boolean }>;
}

export const TechnicalModule = ({ onComplete, onBack }: TechnicalModuleProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions: Question[] = [
    // General Aptitude
    {
      id: "apt1",
      text: "If a design system has 8 base components and each component has 3 variants, and you need to create documentation for each variant, how many documentation pages will you create?",
      category: "generalAptitude",
      type: "multiple-choice",
      options: [
        { value: "8", label: "8" },
        { value: "11", label: "11" },
        { value: "24", label: "24", correct: true },
        { value: "32", label: "32" }
      ]
    },
    {
      id: "apt2", 
      text: "Which pattern comes next in this sequence: Button → Input → Card → ?",
      category: "generalAptitude",
      type: "multiple-choice",
      options: [
        { value: "Modal", label: "Modal", correct: true },
        { value: "Icon", label: "Icon" },
        { value: "Text", label: "Text" },
        { value: "Form", label: "Form" }
      ]
    },
    {
      id: "apt3",
      text: "A design token hierarchy has 4 levels. If Level 1 has 2 values, Level 2 has 3x Level 1, Level 3 has 2x Level 2, and Level 4 has 1.5x Level 3, what's the total number of tokens?",
      category: "generalAptitude", 
      type: "multiple-choice",
      options: [
        { value: "26", label: "26" },
        { value: "32", label: "32", correct: true },
        { value: "36", label: "36" },
        { value: "42", label: "42" }
      ]
    },

    // Prerequisite Knowledge
    {
      id: "pre1",
      text: "What does CSS-in-JS primarily help with in component-based design systems?",
      category: "prerequisiteKnowledge",
      type: "multiple-choice", 
      options: [
        { value: "styling", label: "Scoped styling and dynamic theming", correct: true },
        { value: "performance", label: "Faster page loading" },
        { value: "accessibility", label: "Better screen reader support" },
        { value: "seo", label: "Search engine optimization" }
      ]
    },
    {
      id: "pre2",
      text: "In responsive design, what does 'mobile-first' approach mean?",
      category: "prerequisiteKnowledge",
      type: "multiple-choice",
      options: [
        { value: "mobile-only", label: "Designing only for mobile devices" },
        { value: "mobile-primary", label: "Starting with mobile styles and progressively enhancing", correct: true },
        { value: "mobile-separate", label: "Creating separate mobile versions" },
        { value: "mobile-last", label: "Adding mobile styles at the end" }
      ]
    },
    {
      id: "pre3",
      text: "What is the primary purpose of semantic HTML in design systems?",
      category: "prerequisiteKnowledge", 
      type: "multiple-choice",
      options: [
        { value: "performance", label: "Faster rendering" },
        { value: "styling", label: "Easier CSS targeting" },
        { value: "accessibility", label: "Better accessibility and meaning", correct: true },
        { value: "seo", label: "Search engine ranking" }
      ]
    },

    // Domain Specific
    {
      id: "dom1",
      text: "You're implementing a design system for a team of 20 developers. One developer requests a custom button variant that only they will use. What's the best approach?",
      category: "domainSpecific",
      type: "scenario",
      options: [
        { value: "add-immediately", label: "Add it immediately to keep the developer happy" },
        { value: "assess-reusability", label: "Assess if it could be useful for others, propose alternatives first", correct: true },
        { value: "reject-outright", label: "Reject it to maintain consistency" },
        { value: "create-separate", label: "Create a separate component library for exceptions" }
      ]
    },
    {
      id: "dom2",
      text: "Your design system's color tokens need to work across web, iOS, and Android. What's the most effective approach?",
      category: "domainSpecific",
      type: "scenario", 
      options: [
        { value: "platform-specific", label: "Create separate color systems for each platform" },
        { value: "universal-tokens", label: "Define universal tokens with platform-specific implementations", correct: true },
        { value: "web-first", label: "Use web colors and adapt them later" },
        { value: "design-tools", label: "Let each platform team choose from design tool palettes" }
      ]
    },
    {
      id: "dom3",
      text: "A component in your system needs to be updated with breaking changes. How do you manage this transition?",
      category: "domainSpecific",
      type: "scenario",
      options: [
        { value: "immediate-update", label: "Update immediately and notify teams" },
        { value: "versioned-migration", label: "Version the component, provide migration guide and timeline", correct: true },
        { value: "duplicate-component", label: "Create a new component with a different name" },
        { value: "gradual-change", label: "Make gradual changes without versioning" }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
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

  const calculateScores = (): TechnicalScores => {
    const categoryScores: Record<string, number[]> = {
      generalAptitude: [],
      prerequisiteKnowledge: [],
      domainSpecific: []
    };

    questions.forEach(question => {
      const answer = answers[question.id];
      const correctOption = question.options.find(opt => opt.correct);
      const isCorrect = answer === correctOption?.value;
      const score = isCorrect ? 100 : 0;
      categoryScores[question.category].push(score);
    });

    const generalAptitude = Math.round(categoryScores.generalAptitude.reduce((a, b) => a + b, 0) / categoryScores.generalAptitude.length);
    const prerequisiteKnowledge = Math.round(categoryScores.prerequisiteKnowledge.reduce((a, b) => a + b, 0) / categoryScores.prerequisiteKnowledge.length);
    const domainSpecific = Math.round(categoryScores.domainSpecific.reduce((a, b) => a + b, 0) / categoryScores.domainSpecific.length);
    const overall = Math.round((generalAptitude + prerequisiteKnowledge + domainSpecific) / 3);

    return { generalAptitude, prerequisiteKnowledge, domainSpecific, overall };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'generalAptitude': return Lightbulb;
      case 'prerequisiteKnowledge': return BookOpen;
      case 'domainSpecific': return Code;
      default: return Code;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'generalAptitude': return 'General Aptitude';
      case 'prerequisiteKnowledge': return 'Prerequisite Knowledge';
      case 'domainSpecific': return 'Domain-Specific Quiz';
      default: return 'Technical Assessment';
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
                <CardTitle className="text-2xl">Technical & Aptitude Assessment</CardTitle>
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
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground leading-relaxed">
                {currentQuestion.text}
              </h3>

              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors">
                    <RadioGroupItem value={option.value} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 text-left cursor-pointer"
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
                Previous
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