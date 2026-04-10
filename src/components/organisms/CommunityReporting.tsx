import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Mic, ImageIcon, Send } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ReportMode = "text" | "voice" | "image";

const CommunityReporting: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<ReportMode>("text");

  const modes: { key: ReportMode; icon: React.ReactNode; label: string }[] = [
    { key: "text", icon: <FileText className="h-4 w-4" />, label: t("textReport") },
    { key: "voice", icon: <Mic className="h-4 w-4" />, label: t("voiceReport") },
    { key: "image", icon: <ImageIcon className="h-4 w-4" />, label: t("imageReport") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card flex h-full flex-col p-5"
    >
      <h2 className="mb-4 text-lg font-bold text-foreground">{t("communityReporting")}</h2>

      {/* Mode selector */}
      <div className="mb-4 flex gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === m.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Form — API integration point for NLP processing of reports */}
      <div className="flex flex-1 flex-col gap-3">
        {mode === "text" && (
          <>
            <Textarea
              placeholder={t("enterDescription")}
              className="flex-1 resize-none rounded-2xl border-border bg-secondary/30 text-sm"
            />
            <Input
              placeholder={t("enterLocation")}
              className="rounded-2xl border-border bg-secondary/30 text-sm"
            />
          </>
        )}

        {mode === "voice" && (
          <div className="flex flex-1 items-center justify-center rounded-2xl bg-secondary/30">
            {/* Voice API integration point */}
            <div className="flex items-end gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-primary"
                  animate={{ height: [8, Math.random() * 40 + 8, 8] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + Math.random() * 0.4,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {mode === "image" && (
          <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/20">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm">Drag & drop or tap to upload</p>
            </div>
          </div>
        )}

        <Button className="w-full rounded-2xl gap-2">
          <Send className="h-4 w-4" />
          {t("submitReport")}
        </Button>
      </div>
    </motion.div>
  );
};

export default CommunityReporting;
