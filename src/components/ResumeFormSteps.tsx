import { ResumeData, Education, WorkExperience } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface StepProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const PersonalStep = ({ data, onChange }: StepProps) => (
  <div className="space-y-5 animate-fade-in">
    <h2 className="text-2xl font-display font-semibold text-foreground">Personal Information</h2>
    <p className="text-muted-foreground font-body text-sm">Let's start with your basic details.</p>
    <div className="grid gap-4">
      <div>
        <Label className="font-body">Full Name</Label>
        <Input value={data.fullName} onChange={e => onChange({ ...data, fullName: e.target.value })} placeholder="John Doe" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="font-body">Email</Label>
          <Input type="email" value={data.email} onChange={e => onChange({ ...data, email: e.target.value })} placeholder="john@example.com" />
        </div>
        <div>
          <Label className="font-body">Phone</Label>
          <Input value={data.phone} onChange={e => onChange({ ...data, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      <div>
        <Label className="font-body">Address</Label>
        <Input value={data.address} onChange={e => onChange({ ...data, address: e.target.value })} placeholder="City, State" />
      </div>
      <div>
        <Label className="font-body">Career Objective / Summary</Label>
        <Textarea value={data.summary} onChange={e => onChange({ ...data, summary: e.target.value })} placeholder="A brief summary of your professional goals..." rows={3} />
      </div>
    </div>
  </div>
);

export const EducationStep = ({ data, onChange }: StepProps) => {
  const addEdu = () => onChange({ ...data, education: [...data.education, { degree: "", institution: "", graduationDate: "" }] });
  const removeEdu = (i: number) => onChange({ ...data, education: data.education.filter((_, idx) => idx !== i) });
  const updateEdu = (i: number, field: keyof Education, val: string) => {
    const edu = [...data.education];
    edu[i] = { ...edu[i], [field]: val };
    onChange({ ...data, education: edu });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-foreground">Education</h2>
      <p className="text-muted-foreground font-body text-sm">Add your educational background.</p>
      {data.education.map((edu, i) => (
        <div key={i} className="bg-muted/50 p-4 rounded-lg space-y-3 relative">
          {data.education.length > 1 && (
            <button onClick={() => removeEdu(i)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          )}
          <div><Label className="font-body">Degree</Label><Input value={edu.degree} onChange={e => updateEdu(i, "degree", e.target.value)} placeholder="B.Sc. Computer Science" /></div>
          <div><Label className="font-body">Institution</Label><Input value={edu.institution} onChange={e => updateEdu(i, "institution", e.target.value)} placeholder="MIT" /></div>
          <div><Label className="font-body">Graduation Date</Label><Input value={edu.graduationDate} onChange={e => updateEdu(i, "graduationDate", e.target.value)} placeholder="May 2023" /></div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addEdu}><Plus className="w-4 h-4 mr-1" /> Add Education</Button>
    </div>
  );
};

export const ExperienceStep = ({ data, onChange }: StepProps) => {
  const addExp = () => onChange({ ...data, experience: [...data.experience, { jobTitle: "", company: "", startDate: "", endDate: "", responsibilities: "" }] });
  const removeExp = (i: number) => onChange({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });
  const updateExp = (i: number, field: keyof WorkExperience, val: string) => {
    const exp = [...data.experience];
    exp[i] = { ...exp[i], [field]: val };
    onChange({ ...data, experience: exp });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-foreground">Work Experience</h2>
      <p className="text-muted-foreground font-body text-sm">Detail your professional experience.</p>
      {data.experience.map((exp, i) => (
        <div key={i} className="bg-muted/50 p-4 rounded-lg space-y-3 relative">
          {data.experience.length > 1 && (
            <button onClick={() => removeExp(i)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className="font-body">Job Title</Label><Input value={exp.jobTitle} onChange={e => updateExp(i, "jobTitle", e.target.value)} placeholder="Software Engineer" /></div>
            <div><Label className="font-body">Company</Label><Input value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} placeholder="Google" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><Label className="font-body">Start Date</Label><Input value={exp.startDate} onChange={e => updateExp(i, "startDate", e.target.value)} placeholder="Jan 2021" /></div>
            <div><Label className="font-body">End Date</Label><Input value={exp.endDate} onChange={e => updateExp(i, "endDate", e.target.value)} placeholder="Present" /></div>
          </div>
          <div><Label className="font-body">Responsibilities</Label><Textarea value={exp.responsibilities} onChange={e => updateExp(i, "responsibilities", e.target.value)} placeholder="Led development of..." rows={3} /></div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addExp}><Plus className="w-4 h-4 mr-1" /> Add Experience</Button>
    </div>
  );
};

export const SkillsStep = ({ data, onChange }: StepProps) => (
  <div className="space-y-5 animate-fade-in">
    <h2 className="text-2xl font-display font-semibold text-foreground">Skills & Certifications</h2>
    <p className="text-muted-foreground font-body text-sm">Highlight your key skills and achievements.</p>
    <div>
      <Label className="font-body">Skills (comma-separated)</Label>
      <Textarea value={data.skills} onChange={e => onChange({ ...data, skills: e.target.value })} placeholder="React, TypeScript, Project Management, Communication..." rows={3} />
    </div>
    <div>
      <Label className="font-body">Certifications & Achievements</Label>
      <Textarea value={data.certifications} onChange={e => onChange({ ...data, certifications: e.target.value })} placeholder="AWS Certified, PMP, Dean's List..." rows={3} />
    </div>
  </div>
);
