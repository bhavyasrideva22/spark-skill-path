import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  Palette, 
  Component, 
  Code,
  Layers
} from "lucide-react";

interface IntroductionModuleProps {
  onStart: () => void;
}

export const IntroductionModule = ({ onStart }: IntroductionModuleProps) => {
  const careers = [
    { title: "UI/UX Designer", icon: Palette, level: "Entry-Mid" },
    { title: "Design System Manager", icon: Layers, level: "Mid-Senior" },
    { title: "Front-end Developer", icon: Code, level: "All Levels" },
    { title: "Product Designer", icon: Component, level: "Mid-Senior" }
  ];

  const traits = [
    "Strong visual design skills",
    "Attention to detail",
    "Collaborative mindset", 
    "Problem-solving abilities",
    "Consistency focus",
    "Technical fluency"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8 animate-slide-up">
        
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 p-4 rounded-2xl gradient-primary shadow-glow">
            <Component className="w-8 h-8 text-primary-foreground" />
            <span className="text-2xl font-bold text-primary-foreground">Design Systems Assessment</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Comprehensive Readiness & Career Fit Assessment for
            <span className="block gradient-primary bg-clip-text text-transparent">
              Design Systems Specialists
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover if you're ready to excel as a Design Systems Specialist through our AI-powered 
            multi-dimensional assessment covering psychometric fit, technical readiness, and career alignment.
          </p>
        </div>

        {/* About Section */}
        <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="w-6 h-6 text-primary" />
              About Design Systems Specialists
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Design Systems Specialists develop, maintain, and scale reusable design components, 
              ensuring visual and functional consistency across digital products. They bridge the 
              gap between design and development, creating systematic approaches to UI/UX.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Career Paths */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Typical Career Paths
                </h3>
                <div className="grid gap-3">
                  {careers.map((career, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                      <div className="flex items-center gap-3">
                        <career.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{career.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {career.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Traits */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Success Traits
                </h3>
                <div className="grid gap-2">
                  {traits.map((trait, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-muted-foreground">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Info */}
        <Card className="shadow-card border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                What You'll Discover
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-3 text-center">
                  <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center shadow-glow">
                    <Target className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold">Psychological Fit</h4>
                  <p className="text-sm text-muted-foreground">
                    Assess your personality alignment and intrinsic motivation for the field
                  </p>
                </div>
                
                <div className="space-y-3 text-center">
                  <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center shadow-glow">
                    <Code className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold">Technical Readiness</h4>
                  <p className="text-sm text-muted-foreground">
                    Evaluate your current skills and aptitude for technical concepts
                  </p>
                </div>
                
                <div className="space-y-3 text-center">
                  <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center shadow-glow">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold">Career Alignment</h4>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations and learning pathways
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-6 mt-8">
                <p className="text-muted-foreground mb-4">
                  <strong>Assessment Duration:</strong> 20-30 minutes • <strong>Modules:</strong> 6 comprehensive sections
                </p>
                
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="gradient-primary shadow-glow hover:shadow-elevation transition-all duration-300 group"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};