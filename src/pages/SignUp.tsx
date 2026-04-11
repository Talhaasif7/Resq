import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, User, Phone, MapPin, CreditCard, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    cnic: "",
    role: "citizen" as "volunteer" | "citizen",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    const success = await signUp({
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      cnic: form.cnic,
      role: form.role,
    });
    setLoading(false);
    if (success) {
      toast.success("Account created! Welcome to ResQ.");
      navigate(form.role === "volunteer" ? "/verification" : "/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-trust/8 blur-[120px]" />
      </div>

      <div className="fixed right-4 top-4"><ThemeToggle /></div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        <div className="rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-primary/5">
          <Link to="/" className="mb-6 flex items-center justify-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">ResQ</span>
          </Link>

          <h1 className="mb-1 text-center font-display text-2xl font-bold text-foreground">Create Account</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Join ResQ as a {form.role === "volunteer" ? "Volunteer" : "Citizen"} — Step {step} of 2
          </p>

          {/* Role selector */}
          <div className="mb-6 flex gap-2 rounded-xl bg-secondary/50 p-1">
            {(["citizen", "volunteer"] as const).map((r) => (
              <button
                key={r}
                onClick={() => update("role", r)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  form.role === r ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "citizen" ? "👤 Citizen" : "🤝 Volunteer"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} className="rounded-xl pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="rounded-xl pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"} placeholder="Min 8 characters"
                      value={form.password} onChange={(e) => update("password", e.target.value)}
                      className="rounded-xl pl-10 pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="button" onClick={() => {
                  if (!form.name || !form.email || !form.password) { toast.error("Fill required fields"); return; }
                  setStep(2);
                }} className="w-full gap-2 rounded-xl">
                  Next Step <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="rounded-xl pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="e.g. Lahore, Karachi" value={form.city} onChange={(e) => update("city", e.target.value)} className="rounded-xl pl-10" />
                  </div>
                </div>
                {form.role === "volunteer" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">CNIC Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="XXXXX-XXXXXXX-X" value={form.cnic} onChange={(e) => update("cnic", e.target.value)} className="rounded-xl pl-10" />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl">Back</Button>
                  <Button type="submit" className="flex-1 gap-2 rounded-xl" disabled={loading}>
                    {loading ? "Creating..." : "Create Account"} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
