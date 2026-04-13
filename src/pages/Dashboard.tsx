import React from "react";
import { motion } from "framer-motion";
import { Search, Shield } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageProvider, useTranslation } from "@/contexts/LanguageContext";
import VoiceLanguageSettings from "@/components/molecules/VoiceLanguageSettings";
import SOSButton from "@/components/atoms/SOSButton";
import LiveCrisisFeed from "@/components/organisms/LiveCrisisFeed";
import AITrustPanel from "@/components/organisms/AITrustPanel";
import InteractiveMap from "@/components/organisms/InteractiveMap";
import CommunityReporting from "@/components/organisms/CommunityReporting";
import SafeRouteSidebar from "@/components/organisms/SafeRouteSidebar";
import VoiceAlertWaveform from "@/components/organisms/VoiceAlertWaveform";
import QuickStats from "@/components/organisms/QuickStats";
import LiveChatBox from "@/components/organisms/LiveChatBox";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const DashboardContent: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">{t("appName")}</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-card px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("search")}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <Link to="/shelters" className="rounded-lg px-2.5 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">Shelters</Link>
              <Link to="/qa" className="rounded-lg px-2.5 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">Q&A</Link>
            </div>
            <ThemeToggle />
            <LanguageSelector />
            {isAuthenticated ? (
              <Link to="/profile">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {user?.name?.[0] || "U"}
                </div>
              </Link>
            ) : (
              <Link to="/signin">
                <Button size="sm" variant="outline" className="text-xs">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Bento Grid Dashboard */}
      <main className="mx-auto max-w-[1600px] p-4 lg:p-6">
        <div className="grid gap-4 lg:gap-6">
          <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
            <div className="md:col-span-2 min-h-[400px]">
              <LiveCrisisFeed />
            </div>
            <div className="min-h-[400px]">
              <AITrustPanel />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            <div className="min-h-[350px]">
              <InteractiveMap />
            </div>
            <div className="min-h-[350px]">
              <CommunityReporting />
            </div>
          </div>

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

      {/* Floating elements */}
      <LiveChatBox />
      <div className="fixed bottom-6 right-6 z-50">
        <SOSButton />
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => (
  <LanguageProvider>
    <DashboardContent />
  </LanguageProvider>
);

export default Dashboard;
