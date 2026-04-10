import React from "react";
import { motion } from "framer-motion";
import { Search, Shield } from "lucide-react";
import { LanguageProvider, useTranslation } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/molecules/LanguageSelector";
import SOSButton from "@/components/atoms/SOSButton";
import LiveCrisisFeed from "@/components/organisms/LiveCrisisFeed";
import AITrustPanel from "@/components/organisms/AITrustPanel";
import SafetyMap from "@/components/organisms/SafetyMap";
import CommunityReporting from "@/components/organisms/CommunityReporting";
import SafeRouteSidebar from "@/components/organisms/SafeRouteSidebar";
import VoiceAlertWaveform from "@/components/organisms/VoiceAlertWaveform";
import QuickStats from "@/components/organisms/QuickStats";

const DashboardContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-alert">
              <Shield className="h-5 w-5 text-alert-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{t("appName")}</h1>
              <p className="hidden text-[10px] text-muted-foreground sm:block">{t("tagline")}</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="glass-card flex w-full items-center gap-2 px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("search")}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <LanguageSelector />
        </div>
      </header>

      {/* Bento Grid Dashboard */}
      <main className="mx-auto max-w-[1600px] p-4 lg:p-6">
        <div className="grid gap-4 lg:gap-6">
          {/* Top Row: Live Feed (2/3) + AI Trust (1/3) */}
          <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
            <div className="md:col-span-2 min-h-[400px]">
              <LiveCrisisFeed />
            </div>
            <div className="min-h-[400px]">
              <AITrustPanel />
            </div>
          </div>

          {/* Middle Row: Map (1/2) + Reporting (1/2) */}
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            <div className="min-h-[350px]">
              <SafetyMap />
            </div>
            <div className="min-h-[350px]">
              <CommunityReporting />
            </div>
          </div>

          {/* Bottom Row: Routes (1/3) + Voice (1/3) + Stats (1/3) */}
          <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
            <div className="min-h-[300px]">
              <SafeRouteSidebar />
            </div>
            <div className="min-h-[300px]">
              <VoiceAlertWaveform />
            </div>
            <div className="min-h-[300px]">
              <QuickStats />
            </div>
          </div>
        </div>
      </main>

      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <SOSButton />
      </div>
    </div>
  );
};

const Index: React.FC = () => (
  <LanguageProvider>
    <DashboardContent />
  </LanguageProvider>
);

export default Index;
