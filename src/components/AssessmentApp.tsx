import { useState } from "react";
import { AssessmentHeader } from "./AssessmentHeader";
import { IntroductionModule } from "./IntroductionModule";
import { PsychometricModule, PsychometricScores } from "./PsychometricModule";
import { TechnicalModule, TechnicalScores } from "./TechnicalModule";
import { WiscarModule, WiscarScores } from "./WiscarModule";
import { ResultsModule } from "./ResultsModule";

type AssessmentStep = 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';

export const AssessmentApp = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [psychometricScores, setPsychometricScores] = useState<PsychometricScores | null>(null);
  const [technicalScores, setTechnicalScores] = useState<TechnicalScores | null>(null);
  const [wiscarScores, setWiscarScores] = useState<WiscarScores | null>(null);

  const steps: { key: AssessmentStep; title: string; description: string }[] = [
    { key: 'intro', title: 'Introduction', description: 'Overview and preparation' },
    { key: 'psychometric', title: 'Psychometric Evaluation', description: 'Personality and motivation assessment' },
    { key: 'technical', title: 'Technical Assessment', description: 'Skills and aptitude evaluation' },
    { key: 'wiscar', title: 'WISCAR Analysis', description: 'Multi-dimensional readiness framework' },
    { key: 'results', title: 'Results & Guidance', description: 'Personalized recommendations' }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const getCurrentStepData = () => {
    return steps[getCurrentStepIndex()];
  };

  const handleStartAssessment = () => {
    setCurrentStep('psychometric');
  };

  const handlePsychometricComplete = (scores: PsychometricScores) => {
    setPsychometricScores(scores);
    setCurrentStep('technical');
  };

  const handleTechnicalComplete = (scores: TechnicalScores) => {
    setTechnicalScores(scores);
    setCurrentStep('wiscar');
  };

  const handleWiscarComplete = (scores: WiscarScores) => {
    setWiscarScores(scores);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setPsychometricScores(null);
    setTechnicalScores(null);
    setWiscarScores(null);
  };

  const handleBackToPrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'intro':
        return <IntroductionModule onStart={handleStartAssessment} />;
      
      case 'psychometric':
        return (
          <PsychometricModule 
            onComplete={handlePsychometricComplete}
            onBack={() => setCurrentStep('intro')}
          />
        );
      
      case 'technical':
        return (
          <TechnicalModule 
            onComplete={handleTechnicalComplete}
            onBack={handleBackToPrevious}
          />
        );
      
      case 'wiscar':
        return (
          <WiscarModule 
            onComplete={handleWiscarComplete}
            onBack={handleBackToPrevious}
          />
        );
      
      case 'results':
        return (
          <ResultsModule 
            psychometricScores={psychometricScores!}
            technicalScores={technicalScores!}
            wiscarScores={wiscarScores!}
            onRestart={handleRestart}
          />
        );
      
      default:
        return <IntroductionModule onStart={handleStartAssessment} />;
    }
  };

  const shouldShowHeader = currentStep !== 'intro' && currentStep !== 'results';

  return (
    <div className="min-h-screen bg-background">
      {shouldShowHeader && (
        <AssessmentHeader
          currentStep={getCurrentStepIndex() + 1}
          totalSteps={steps.length}
          title={getCurrentStepData().title}
          description={getCurrentStepData().description}
        />
      )}
      
      <div className={shouldShowHeader ? "pt-32" : ""}>
        {renderCurrentStep()}
      </div>
    </div>
  );
};