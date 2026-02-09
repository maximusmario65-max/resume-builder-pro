import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Sparkles, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: FileText, title: "Step-by-Step Guidance", desc: "We walk you through every section of your resume." },
  { icon: Sparkles, title: "Professional Formatting", desc: "Clean, polished layout ready for job applications." },
  { icon: Download, title: "Instant Download", desc: "Download your finished resume as an image instantly." },
  { icon: CheckCircle, title: "Review Before Saving", desc: "Preview and confirm everything before finalizing." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36 px-6">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-widest text-accent mb-4 font-body"
          >
            AI Resume Generator
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight font-display"
          >
            Build Your Perfect Resume{" "}
            <span className="text-gradient">in Minutes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-body"
          >
            Answer a few simple questions and we'll generate a polished,
            professional resume you can download immediately.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <Button
              size="lg"
              onClick={() => navigate("/builder")}
              className="px-10 py-6 text-lg font-semibold font-body"
            >
              Start Building →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-card border border-border"
            >
              <f.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold font-display text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm font-body">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground font-body border-t border-border">
        AI Resume Generator &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
