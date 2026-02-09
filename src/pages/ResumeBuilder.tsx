import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import { PersonalStep, EducationStep, ExperienceStep, SkillsStep } from "@/components/ResumeFormSteps";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData, emptyResume } from "@/types/resume";

const TOTAL_STEPS = 5; // 0-3 form, 4 preview

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ResumeData>(emptyResume);

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 0: return <PersonalStep data={data} onChange={setData} />;
      case 1: return <EducationStep data={data} onChange={setData} />;
      case 2: return <ExperienceStep data={data} onChange={setData} />;
      case 3: return <SkillsStep data={data} onChange={setData} />;
      case 4: return <ResumePreview data={data} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="font-display font-semibold text-foreground text-lg">Resume Builder</h1>
        <div className="w-16" />
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <StepIndicator current={step} />

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between mt-10">
            <Button variant="outline" onClick={prev} disabled={step === 0}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button onClick={next}>
              {step === 3 ? (
                <><Eye className="w-4 h-4 mr-1" /> Preview Resume</>
              ) : (
                <>Next <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setStep(0)}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Edit Resume
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
