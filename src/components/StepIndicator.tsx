import { cn } from "@/lib/utils";

const stepLabels = ["Personal", "Education", "Experience", "Skills", "Review"];

interface StepIndicatorProps {
  current: number;
}

const StepIndicator = ({ current }: StepIndicatorProps) => (
  <div className="flex items-center justify-center gap-2 mb-10">
    {stepLabels.map((label, i) => (
      <div key={label} className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-body transition-colors",
              i <= current
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {i + 1}
          </div>
          <span className="text-xs mt-1 text-muted-foreground font-body hidden sm:block">{label}</span>
        </div>
        {i < stepLabels.length - 1 && (
          <div className={cn("w-8 h-0.5 mb-4 sm:mb-5", i < current ? "bg-primary" : "bg-muted")} />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
