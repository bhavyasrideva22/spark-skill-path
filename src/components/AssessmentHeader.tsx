import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
}

export const AssessmentHeader = ({ 
  currentStep, 
  totalSteps, 
  title, 
  description 
}: AssessmentHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">DS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-muted/30"
          />
        </div>
      </div>
    </div>
  );
};