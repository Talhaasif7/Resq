import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, BarChart3 } from "lucide-react";
import TrustRing from "@/components/atoms/TrustRing";
import { useTranslation } from "@/contexts/LanguageContext";
import { mockStats } from "@/data/mockData";

const AITrustPanel: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card flex h-full flex-col items-center justify-center p-6"
    >
      <h2 className="mb-4 text-lg font-bold text-foreground">{t("aiTrustScore")}</h2>
      <TrustRing percentage={87} size={96} strokeWidth={6} />
      <p className="mt-3 text-sm text-muted-foreground">{t("verified")}</p>

      <div className="mt-6 grid w-full grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 p-3">
          <ShieldCheck className="h-5 w-5 text-safety" />
          <div>
            <p className="text-lg font-bold text-foreground">{mockStats.verifiedReports}</p>
            <p className="text-[10px] text-muted-foreground">{t("verifiedReports")}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 p-3">
          <TrendingUp className="h-5 w-5 text-trust" />
          <div>
            <p className="text-lg font-bold text-foreground">96%</p>
            <p className="text-[10px] text-muted-foreground">Accuracy</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AITrustPanel;
