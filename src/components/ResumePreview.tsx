import { ResumeData } from "@/types/resume";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: "#ffffff" });
    const link = document.createElement("a");
    link.download = `${data.fullName || "resume"}.png`;
    link.href = canvas.toDataURL();
    link.click();
    toast({ title: "Downloaded!", description: "Your resume has been saved." });
  };

  const handleCopy = () => {
    const text = buildPlainText(data);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Resume text copied to clipboard." });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold text-foreground">Your Resume</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? "Copied" : "Copy Text"}
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
        </div>
      </div>

      {/* Resume Document */}
      <div className="shadow-elevated rounded-lg overflow-hidden border border-border">
        <div ref={ref} className="bg-white p-8 md:p-12 max-w-[800px] mx-auto" style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#1a2332" }}>
          {/* Header */}
          <div className="text-center border-b-2 pb-5 mb-6" style={{ borderColor: "#1e3a5f" }}>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1e3a5f" }}>{data.fullName || "Your Name"}</h1>
            <div className="mt-2 text-sm flex flex-wrap justify-center gap-3" style={{ color: "#5a6b7d" }}>
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>• {data.phone}</span>}
              {data.address && <span>• {data.address}</span>}
            </div>
          </div>

          {/* Summary */}
          {data.summary && (
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#1e3a5f" }}>Professional Summary</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.some(e => e.jobTitle) && (
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#1e3a5f" }}>Work Experience</h2>
              {data.experience.filter(e => e.jobTitle).map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-sm">{exp.jobTitle}</span>
                    <span className="text-xs" style={{ color: "#5a6b7d" }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ""}</span>
                  </div>
                  <div className="text-sm italic" style={{ color: "#5a6b7d" }}>{exp.company}</div>
                  {exp.responsibilities && <p className="text-sm mt-1 leading-relaxed" style={{ color: "#333" }}>{exp.responsibilities}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.some(e => e.degree) && (
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#1e3a5f" }}>Education</h2>
              {data.education.filter(e => e.degree).map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-sm">{edu.degree}</span>
                    <span className="text-xs" style={{ color: "#5a6b7d" }}>{edu.graduationDate}</span>
                  </div>
                  <div className="text-sm italic" style={{ color: "#5a6b7d" }}>{edu.institution}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills && (
            <div className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#1e3a5f" }}>Skills</h2>
              <p className="text-sm" style={{ color: "#333" }}>{data.skills}</p>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#1e3a5f" }}>Certifications & Achievements</h2>
              <p className="text-sm" style={{ color: "#333" }}>{data.certifications}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function buildPlainText(data: ResumeData): string {
  let t = `${data.fullName}\n${data.email} | ${data.phone} | ${data.address}\n\n`;
  if (data.summary) t += `PROFESSIONAL SUMMARY\n${data.summary}\n\n`;
  if (data.experience.some(e => e.jobTitle)) {
    t += `WORK EXPERIENCE\n`;
    data.experience.filter(e => e.jobTitle).forEach(e => {
      t += `${e.jobTitle} at ${e.company} (${e.startDate} – ${e.endDate})\n${e.responsibilities}\n\n`;
    });
  }
  if (data.education.some(e => e.degree)) {
    t += `EDUCATION\n`;
    data.education.filter(e => e.degree).forEach(e => {
      t += `${e.degree}, ${e.institution} (${e.graduationDate})\n`;
    });
    t += "\n";
  }
  if (data.skills) t += `SKILLS\n${data.skills}\n\n`;
  if (data.certifications) t += `CERTIFICATIONS\n${data.certifications}\n`;
  return t;
}

export default ResumePreview;
