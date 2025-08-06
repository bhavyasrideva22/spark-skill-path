import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Target,
  Heart,
  Wrench,
  Brain,
  GraduationCap,
  Users,
  BookOpen,
  Lightbulb,
  Code,
  TrendingUp,
  Download,
  RefreshCw
} from "lucide-react";
import { PsychometricScores } from "./PsychometricModule";
import { TechnicalScores } from "./TechnicalModule";
import { WiscarScores } from "./WiscarModule";

interface ResultsModuleProps {
  psychometricScores: PsychometricScores;
  technicalScores: TechnicalScores;
  wiscarScores: WiscarScores;
  onRestart: () => void;
}

export const ResultsModule = ({ 
  psychometricScores, 
  technicalScores, 
  wiscarScores, 
  onRestart 
}: ResultsModuleProps) => {
  
  const overallScore = Math.round(
    (psychometricScores.overall + technicalScores.overall + wiscarScores.overall) / 3
  );

  const getRecommendation = () => {
    if (overallScore >= 75) {
      return {
        decision: "YES",
        icon: CheckCircle,
        color: "text-success",
        bgColor: "bg-success/10",
        borderColor: "border-success/30",
        title: "Excellent Fit for Design Systems",
        description: "You demonstrate strong alignment across all dimensions. You're well-positioned to excel as a Design Systems Specialist."
      };
    } else if (overallScore >= 55) {
      return {
        decision: "MAYBE",
        icon: AlertTriangle,
        color: "text-warning",
        bgColor: "bg-warning/10",
        borderColor: "border-warning/30",
        title: "Potential with Development Needed",
        description: "You show promise but would benefit from strengthening certain areas before pursuing this specialization."
      };
    } else {
      return {
        decision: "NO",
        icon: XCircle,
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/30",
        title: "Consider Alternative Paths",
        description: "Based on current assessment, other career paths might be better aligned with your profile and interests."
      };
    }
  };

  const recommendation = getRecommendation();
  const RecommendationIcon = recommendation.icon;

  const wiscarDimensions = [
    { key: 'will', label: 'Will', icon: Target, score: wiscarScores.will, description: 'Inner motivation & consistency' },
    { key: 'interest', label: 'Interest', icon: Heart, score: wiscarScores.interest, description: 'Genuine curiosity & relevance' },
    { key: 'skill', label: 'Skill', icon: Wrench, score: wiscarScores.skill, description: 'Current technical & soft skills' },
    { key: 'cognitiveReadiness', label: 'Cognitive', icon: Brain, score: wiscarScores.cognitiveReadiness, description: 'Analytical thinking & problem-solving' },
    { key: 'abilityToLearn', label: 'Learn', icon: GraduationCap, score: wiscarScores.abilityToLearn, description: 'Openness to feedback & persistence' },
    { key: 'realWorldAlignment', label: 'Alignment', icon: Users, score: wiscarScores.realWorldAlignment, description: 'Job fit & day-to-day applicability' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 55) return "text-warning";
    return "text-destructive";
  };

  const careerPaths = [
    {
      title: "Design System Architect",
      level: "Senior",
      description: "Lead the strategic vision and technical architecture of enterprise design systems.",
      match: overallScore >= 80 ? "Excellent Match" : overallScore >= 65 ? "Good Match" : "Needs Development"
    },
    {
      title: "UI Component Developer",
      level: "Mid-Level",
      description: "Build and maintain reusable UI components with focus on technical implementation.",
      match: technicalScores.overall >= 70 ? "Good Match" : "Needs Development"
    },
    {
      title: "DesignOps Specialist",
      level: "Mid-Senior",
      description: "Optimize design processes, tooling, and collaboration across design teams.",
      match: wiscarScores.realWorldAlignment >= 70 ? "Good Match" : "Consider Alternatives"
    },
    {
      title: "Product Designer",
      level: "All Levels",
      description: "Focus on user experience design with systematic approach to interface design.",
      match: psychometricScores.overall >= 60 ? "Good Match" : "Consider Alternatives"
    }
  ];

  const learningPath = overallScore >= 75 
    ? [
        "Advanced Design Systems Patterns",
        "Component API Design",
        "Design System Governance",
        "Cross-Platform Token Management"
      ]
    : overallScore >= 55
    ? [
        "Design Systems Fundamentals",
        "Component-Based Design",
        "CSS Architecture & Methodologies",
        "Design-Development Collaboration"
      ]
    : [
        "UI/UX Design Fundamentals",
        "Front-end Development Basics",
        "Design Tools Proficiency",
        "Basic Design Principles"
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Assessment Results</h1>
          <p className="text-xl text-muted-foreground">
            Your comprehensive readiness analysis for Design Systems specialization
          </p>
        </div>

        {/* Overall Score & Recommendation */}
        <Card className={`shadow-elevation ${recommendation.bgColor} ${recommendation.borderColor} border-2`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl ${recommendation.bgColor} border ${recommendation.borderColor} flex items-center justify-center`}>
                  <RecommendationIcon className={`w-8 h-8 ${recommendation.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{recommendation.title}</h2>
                  <p className="text-muted-foreground">{recommendation.description}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{overallScore}%</div>
                <Badge variant="outline" className={`${recommendation.color} ${recommendation.borderColor}`}>
                  {recommendation.decision}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Psychometric Scores */}
          <Card className="shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(psychometricScores.overall)}`}>
                  {psychometricScores.overall}%
                </div>
                <Progress value={psychometricScores.overall} className="mt-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Interest</span>
                  <span className={`font-medium ${getScoreColor(psychometricScores.interest)}`}>
                    {psychometricScores.interest}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Personality</span>
                  <span className={`font-medium ${getScoreColor(psychometricScores.personality)}`}>
                    {psychometricScores.personality}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Cognitive Style</span>
                  <span className={`font-medium ${getScoreColor(psychometricScores.cognitiveStyle)}`}>
                    {psychometricScores.cognitiveStyle}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Motivation</span>
                  <span className={`font-medium ${getScoreColor(psychometricScores.motivation)}`}>
                    {psychometricScores.motivation}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Scores */}
          <Card className="shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(technicalScores.overall)}`}>
                  {technicalScores.overall}%
                </div>
                <Progress value={technicalScores.overall} className="mt-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">General Aptitude</span>
                  <span className={`font-medium ${getScoreColor(technicalScores.generalAptitude)}`}>
                    {technicalScores.generalAptitude}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Prerequisites</span>
                  <span className={`font-medium ${getScoreColor(technicalScores.prerequisiteKnowledge)}`}>
                    {technicalScores.prerequisiteKnowledge}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Domain Specific</span>
                  <span className={`font-medium ${getScoreColor(technicalScores.domainSpecific)}`}>
                    {technicalScores.domainSpecific}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Overall */}
          <Card className="shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                WISCAR Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(wiscarScores.overall)}`}>
                  {wiscarScores.overall}%
                </div>
                <Progress value={wiscarScores.overall} className="mt-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {wiscarDimensions.map((dimension) => {
                  const Icon = dimension.icon;
                  return (
                    <div key={dimension.key} className="text-center p-2 rounded border border-border/30">
                      <Icon className="w-4 h-4 mx-auto text-primary mb-1" />
                      <div className={`text-sm font-medium ${getScoreColor(dimension.score)}`}>
                        {dimension.score}%
                      </div>
                      <div className="text-xs text-muted-foreground">{dimension.label}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Guidance */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Job Roles */}
          <Card className="shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Career Paths & Fit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="p-4 rounded-lg border border-border/30 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">{path.title}</h4>
                      <Badge variant="secondary" className="text-xs mt-1">{path.level}</Badge>
                    </div>
                    <Badge 
                      variant={path.match.includes("Excellent") ? "default" : path.match.includes("Good") ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {path.match}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card className="shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                Recommended Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {learningPath.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                      <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  Next Steps
                </h4>
                {overallScore >= 75 ? (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Apply for Design Systems positions</p>
                    <p>• Start a portfolio project showcasing component libraries</p>
                    <p>• Join design systems communities and conferences</p>
                  </div>
                ) : overallScore >= 55 ? (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Take foundational courses in identified weak areas</p>
                    <p>• Build sample design system components</p>
                    <p>• Seek mentorship from experienced practitioners</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Consider UI/UX design or front-end development first</p>
                    <p>• Build fundamental design and technical skills</p>
                    <p>• Retake assessment after 6-12 months of learning</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button onClick={onRestart} className="gradient-primary shadow-glow hover:shadow-elevation transition-all duration-300 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};