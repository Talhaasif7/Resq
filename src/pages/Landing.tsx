import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield,
  ArrowRight,
  Radio,
  MapPin,
  Users,
  Brain,
  Volume2,
  Navigation,
  Phone,
  ChevronRight,
  Zap,
  Globe,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const features = [
  {
    icon: Radio,
    title: "Live Crisis Feed",
    description: "Real-time AI-verified alerts for floods, earthquakes, and security incidents across Pakistan.",
    color: "text-alert",
    bg: "bg-alert/10",
  },
  {
    icon: Brain,
    title: "AI Trust Scoring",
    description: "Every report is verified by AI with a trust percentage, filtering noise from genuine crises.",
    color: "text-trust",
    bg: "bg-trust/10",
  },
  {
    icon: MapPin,
    title: "Interactive Safety Map",
    description: "GIS-powered maps showing shelters, danger zones, and evacuation routes in your area.",
    color: "text-safety",
    bg: "bg-safety/10",
  },
  {
    icon: Users,
    title: "Community Reporting",
    description: "Submit reports via text, voice, or image. Crowdsourced intelligence for faster response.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Navigation,
    title: "Safe Route Navigation",
    description: "Real-time alternative routes with clear/blocked status and estimated travel times.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Volume2,
    title: "Multilingual Voice Alerts",
    description: "Audio alerts in Urdu, English, Pashto, and Sindhi for maximum accessibility.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const stats = [
  { value: "50M+", label: "People Protected" },
  { value: "99.7%", label: "Uptime" },
  { value: "847", label: "Verified Reports Today" },
  { value: "< 30s", label: "Alert Delivery" },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">ResQ</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
            <a href="#stats" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Impact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="gap-1.5">
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-safety/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-trust/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
            >
              <Zap className="h-3.5 w-3.5" />
              Real-Time Crisis Intelligence for Pakistan
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Stay Safe.{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Stay Informed.
              </span>{" "}
              Stay Connected.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              ResQ is Pakistan's AI-powered crisis alert platform. Get real-time verified alerts, 
              find safe routes, and report emergencies — all in one place, in your language.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/25">
                  Open Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2 rounded-xl px-8 text-base">
                <Phone className="h-4 w-4" />
                Emergency SOS
              </Button>
            </motion.div>
          </div>

          {/* Hero visual — floating cards preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mx-auto mt-16 max-w-4xl"
          >
            <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-primary/5">
              <div className="grid grid-cols-3 gap-2">
                {/* Mini crisis card */}
                <div className="col-span-2 space-y-2 rounded-xl bg-secondary/50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-alert" />
                    </span>
                    <span className="text-xs font-bold text-alert">LIVE</span>
                    <span className="text-xs text-muted-foreground">Crisis Feed</span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg bg-card p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {90 + i}%
                      </div>
                      <div className="flex-1">
                        <div className="h-2.5 w-3/4 rounded bg-muted" />
                        <div className="mt-1 h-2 w-1/2 rounded bg-muted/60" />
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${i === 1 ? 'bg-alert/10 text-alert' : i === 2 ? 'bg-trust/10 text-trust' : 'bg-info/10 text-info'}`}>
                        {i === 1 ? 'Critical' : i === 2 ? 'High' : 'Moderate'}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Mini AI trust */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-secondary/50 p-4">
                  <div className="relative mb-2 flex h-16 w-16 items-center justify-center">
                    <svg className="-rotate-90" width="64" height="64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--safety))" strokeWidth="4" strokeLinecap="round" strokeDasharray="176" strokeDashoffset="23" />
                    </svg>
                    <span className="absolute text-sm font-bold text-foreground">87%</span>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">AI Trust Score</span>
                  <div className="mt-2 flex items-center gap-1 rounded-full bg-safety/10 px-2 py-0.5">
                    <CheckCircle className="h-3 w-3 text-safety" />
                    <span className="text-[9px] font-semibold text-safety">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold text-foreground lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Platform Features</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need in a Crisis
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for Pakistan's unique challenges — from floods to earthquakes, ResQ keeps you 
              informed with AI-verified intelligence and community-powered reporting.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="border-y border-border bg-card/50 py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">How It Works</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              From Report to Response in Seconds
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Report or Detect",
                description: "Citizens report incidents via text, voice, or image. AI also monitors official feeds and sensors.",
                icon: AlertTriangle,
              },
              {
                step: "02",
                title: "AI Verifies",
                description: "Our NLP engine cross-references reports, assigns trust scores, and filters false alarms in real-time.",
                icon: ShieldCheck,
              },
              {
                step: "03",
                title: "Alert & Navigate",
                description: "Verified alerts go live instantly. Safe routes update. Voice alerts broadcast in your language.",
                icon: Globe,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-display text-sm font-bold text-primary">{item.step}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                {i < 2 && (
                  <ChevronRight className="absolute -right-4 top-8 hidden h-6 w-6 text-border md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center shadow-2xl shadow-primary/20 sm:px-16"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
                Ready to Stay Protected?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Join millions of Pakistanis who rely on ResQ for real-time crisis alerts, 
                safe navigation, and community-powered safety.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link to="/dashboard">
                  <Button size="lg" variant="secondary" className="gap-2 rounded-xl px-8 text-base font-semibold">
                    Open Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="ghost" className="gap-2 rounded-xl px-8 text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:flex-row md:justify-between lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">ResQ</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">How It Works</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 ResQ. Protecting Pakistan.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
