export interface Education {
  degree: string;
  institution: string;
  graduationDate: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  education: Education[];
  experience: WorkExperience[];
  skills: string;
  certifications: string;
}

export const emptyResume: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
  education: [{ degree: "", institution: "", graduationDate: "" }],
  experience: [{ jobTitle: "", company: "", startDate: "", endDate: "", responsibilities: "" }],
  skills: "",
  certifications: "",
};
