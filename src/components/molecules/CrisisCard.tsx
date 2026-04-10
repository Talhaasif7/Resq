import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import TrustRing from "@/components/atoms/TrustRing";
import SeverityBadge from "@/components/atoms/SeverityBadge";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Crisis } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface CrisisCardProps {
  crisis: Crisis;
  index: number;
}

const CrisisCard: React.FC<CrisisCardProps> = ({ crisis, index }) => {
  const { language, t } = useTranslation();
  const title = language === "ur" ? crisis.titleUr : crisis.title;
  const location = language === "ur" ? crisis.locationUr : crisis.location;
  const timeAgo = language === "ur" ? crisis.timeAgoUr : crisis.timeAgo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-card flex items-start gap-3 p-4 cursor-pointer"
    >
      <TrustRing percentage={crisis.trustScore} size={44} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <SeverityBadge severity={crisis.severity} />
          {crisis.verified && (
            <Badge className="bg-trust/20 text-trust border-trust/30 text-[10px] px-1.5 py-0">
              {t("verified")}
            </Badge>
          )}
        </div>
        <h4 className="text-sm font-semibold text-foreground truncate">{title}</h4>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {timeAgo}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CrisisCard;
