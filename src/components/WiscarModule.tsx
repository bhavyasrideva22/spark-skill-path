import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Heart, 
  Wrench, 
  Brain, 
  GraduationCap, 
  Users,
  ArrowRight, 
  ArrowLeft 
} from "lucide-react";

interface WiscarModuleProps {
  onComplete: (scores: WiscarScores) => void;
  onBack: () => void;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitiveReadiness: number;
  abilityToLearn: number;
  realWorldAlignment: number;
  overall: number;
}

interface Question {
  id: string;
  text: string;
  category: keyof Omit<WiscarScores, 'overall'>;
  type: 'likert' | 'scenario' | 'self-assessment';
  options?: Array<{ value: number; label: string }>;
  choices?: Array<{ value: string; label: string; score: number }>;
}

export const WiscarModule = ({ onComplete, onBack }: WiscarModuleProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const likertScale = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  const questions: Question[] = [
    // Will - Inner motivation & consistency
    {
      id: "w1",
      text: "I consistently follow through on design projects even when they become challenging or repetitive",
      category: "will",
      type: "likert",
      options: likertScale
    },
    {
      id: "w2", 
      text: "I maintain high standards for my work even when facing tight deadlines",
      category: "will",
      type: "likert",
      options: likertScale
    },

    // Interest - Genuine curiosity & relevance
    {
      id: "i1",
      text: "I actively seek out articles, tutorials, and resources about design systems in my free time",
      category: "interest", 
      type: "likert",
      options: likertScale
    },
    {
      id: "i2",
      text: "I find myself analyzing and critiquing the design consistency of websites and apps I use",
      category: "interest",
      type: "likert", 
      options: likertScale
    },

    // Skill - Current technical & soft skills
    {
      id: "s1",
      text: "How would you rate your current CSS and HTML skills?",
      category: "skill",
      type: "scenario",
      choices: [
        { value: "beginner", label: "Beginner - Basic understanding", score: 2 },
        { value: "intermediate", label: "Intermediate - Can build responsive layouts", score: 3 },
        { value: "advanced", label: "Advanced - Proficient with modern CSS features", score: 4 },
        { value: "expert", label: "Expert - Can architect complex styling systems", score: 5 }
      ]
    },
    {
      id: "s2",
      text: "How comfortable are you with design collaboration and giving/receiving feedback?",
      category: "skill",
      type: "scenario",
      choices: [
        { value: "uncomfortable", label: "Uncomfortable - Prefer working alone", score: 2 },
        { value: "somewhat", label: "Somewhat comfortable - With close colleagues", score: 3 },
        { value: "comfortable", label: "Comfortable - Can facilitate design discussions", score: 4 },
        { value: "expert", label: "Expert - Natural collaborator and facilitator", score: 5 }
      ]
    },

    // Cognitive Readiness - Analytical thinking & problem-solving
    {
      id: "c1",
      text: "When I encounter a complex design problem, I naturally break it down into smaller, manageable components",
      category: "cognitiveReadiness",
      type: "likert",
      options: likertScale
    },
    {
      id: "c2",
      text: "I can easily switch between big-picture thinking and detailed execution",
      category: "cognitiveReadiness", 
      type: "likert",
      options: likertScale
    },

    // Ability to Learn - Openness to feedback & persistence
    {
      id: "a1",
      text: "I actively seek feedback on my work and use it to improve",
      category: "abilityToLearn",
      type: "likert",
      options: likertScale
    },
    {
      id: "a2",
      text: "When learning a new tool or concept, I persist through initial confusion and frustration",
      category: "abilityToLearn",
      type: "likert", 
      options: likertScale
    },

    // Real-World Alignment - Job fit & day-to-day applicability
    {
      id: "r1",
      text: "Which work environment appeals to you most?",
      category: "realWorldAlignment",
      type: "scenario",
      choices: [
        { value: "startup", label: "Fast-paced startup - Wearing many hats", score: 3 },
        { value: "corporate", label: "Large corporation - Specialized role with clear processes", score: 4 },
        { value: "agency", label: "Design agency - Variety of client projects", score: 3 },
        { value: "product", label: "Product company - Deep focus on one system", score: 5 }
      ]
    },
    {
      id: "r2",
      text: "How important is having a clear impact measurement for your design work?",
      category: "realWorldAlignment",
      type: "scenario",
      choices: [
        { value: "not-important", label: "Not important - I trust the process", score: 2 },
        { value: "somewhat", label: "Somewhat important - Nice to have metrics", score: 3 },
        { value: "important", label: "Important - I want to see usage data", score: 4 },
        { value: "critical", label: "Critical - I need clear success metrics", score: 5 }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    if (currentQuestion.type === 'likert') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: parseInt(value)
      }));
    } else {
      const choice = currentQuestion.choices?.find(c => c.value === value);
      if (choice) {
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: choice.score
        }));
      }
    }
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

  const calculateScores = (): WiscarScores => {
    const categoryQuestions = {
      will: questions.filter(q => q.category === 'will'),
      interest: questions.filter(q => q.category === 'interest'),
      skill: questions.filter(q => q.category === 'skill'),
      cognitiveReadiness: questions.filter(q => q.category === 'cognitiveReadiness'),
      abilityToLearn: questions.filter(q => q.category === 'abilityToLearn'),
      realWorldAlignment: questions.filter(q => q.category === 'realWorldAlignment')
    };

    const calculateCategoryScore = (categoryQs: Question[]) => {
      const scores = categoryQs.map(q => answers[q.id] || 3);
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      return Math.round(average * 20); // Convert to 0-100 scale
    };

    const will = calculateCategoryScore(categoryQuestions.will);
    const interest = calculateCategoryScore(categoryQuestions.interest);
    const skill = calculateCategoryScore(categoryQuestions.skill);
    const cognitiveReadiness = calculateCategoryScore(categoryQuestions.cognitiveReadiness);
    const abilityToLearn = calculateCategoryScore(categoryQuestions.abilityToLearn);
    const realWorldAlignment = calculateCategoryScore(categoryQuestions.realWorldAlignment);
    
    const overall = Math.round((will + interest + skill + cognitiveReadiness + abilityToLearn + realWorldAlignment) / 6);

    return {
      will,
      interest,
      skill,
      cognitiveReadiness,
      abilityToLearn,
      realWorldAlignment,
      overall
    };
  };

  const getDimensionIcon = (category: string) => {
    switch (category) {
      case 'will': return Target;
      case 'interest': return Heart;
      case 'skill': return Wrench;
      case 'cognitiveReadiness': return Brain;
      case 'abilityToLearn': return GraduationCap;
      case 'realWorldAlignment': return Users;
      default: return Target;
    }
  };

  const getDimensionLabel = (category: string) => {
    switch (category) {
      case 'will': return 'Will - Inner Motivation';
      case 'interest': return 'Interest - Genuine Curiosity';
      case 'skill': return 'Skill - Current Abilities';
      case 'cognitiveReadiness': return 'Cognitive - Analytical Thinking';
      case 'abilityToLearn': return 'Ability to Learn - Growth Mindset';
      case 'realWorldAlignment': return 'Real-World - Job Fit';
      default: return 'WISCAR Assessment';
    }
  };

  const DimensionIcon = getDimensionIcon(currentQuestion.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <Card className="shadow-elevation border-border/50 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <DimensionIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">WISCAR Framework Analysis</CardTitle>
                <Badge variant="outline" className="mt-2">
                  {getDimensionLabel(currentQuestion.category)}
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
                value={answers[currentQuestion.id]?.toString() || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {currentQuestion.type === 'likert' ? (
                  currentQuestion.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors">
                      <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                      <Label 
                        htmlFor={`option-${option.value}`} 
                        className="flex-1 text-left cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))
                ) : (
                  currentQuestion.choices?.map((choice, index) => (
                    <div key={choice.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border/30 hover:bg-muted/20 transition-colors">
                      <RadioGroupItem value={choice.value} id={`choice-${index}`} />
                      <Label 
                        htmlFor={`choice-${index}`} 
                        className="flex-1 text-left cursor-pointer"
                      >
                        {choice.label}
                      </Label>
                    </div>
                  ))
                )}
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
                {isLastQuestion ? 'Complete Analysis' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};