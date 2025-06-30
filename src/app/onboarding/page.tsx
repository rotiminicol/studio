
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Check, User, Building, Mail, PiggyBank, Users, PartyPopper, ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

const steps = [
  { id: 1, title: "Welcome!", icon: PartyPopper, image: "/3.jpg" },
  { id: 2, title: "Account Type", icon: Building, image: "/4.jpg" },
  { id: 3, title: "Connect Email", icon: Mail, image: "/5.jpg" },
  { id: 4, title: "Financial Goals", icon: PiggyBank, image: "/6.jpg" },
  { id: 5, title: "Invite Team", icon: Users, image: "/7.jpg" },
  { id: 6, title: "You're all set!", icon: Check, image: "/8.jpg" },
];

const slideVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "50%" : "-50%",
    scale: 0.95
  }),
  visible: {
    opacity: 1,
    x: "0%",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? "50%" : "-50%",
    scale: 0.95,
    transition: {
      duration: 0.2
    },
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);

  const nextStep = () => {
    setDirection(1);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const finishOnboarding = async () => {
    setIsFinishing(true);
    await completeOnboarding();
    setTimeout(() => {
        router.push('/dashboard/overview');
    }, 1500);
  }

  const progress = ((currentStep + 1) / steps.length) * 100;
  const ActiveIcon = steps[currentStep].icon;

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden">
      <div
        className="hidden md:block md:w-1/2 h-full relative"
      >
        <Image
          src={steps[currentStep].image}
          alt={steps[currentStep].title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src={steps[currentStep].image}
          alt={steps[currentStep].title + ' Mobile Background'}
          fill
          className="w-full h-full object-cover absolute top-0 left-0 opacity-80 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex w-full md:w-1/2 h-full items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto no-scrollbar">
        <motion.div
          key={steps[currentStep].id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full md:max-w-xl flex flex-col justify-center"
        >
          <Card className="w-full relative glassmorphism animate-in fade-in-0 slide-in-from-bottom-8 duration-500">
            <div className="flex flex-col items-center mb-4">
              <Link href="/">
                <Logo variant="default" size="lg" className="cursor-pointer" />
              </Link>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
                <div className="flex items-center gap-2">
                  <ActiveIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-2xl font-bold tracking-tight">{steps[currentStep].title}</CardTitle>
                </div>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            <div className="overflow-hidden relative h-80 flex items-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute w-full px-6"
                >
                  <StepContent step={currentStep} />
                </motion.div>
              </AnimatePresence>
            </div>
            <CardFooter className="flex flex-col md:flex-row justify-between border-t pt-6 gap-4 md:gap-0">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0 || isFinishing || loading} className="w-full md:w-auto">
                <ArrowLeft className="mr-2" /> Previous
              </Button>
              {currentStep < steps.length - 2 ? (
                <Button onClick={nextStep} className="w-full md:w-auto button-glow">
                  Next <ArrowRight className="ml-2" />
                </Button>
              ) : currentStep === steps.length - 2 ? (
                <Button onClick={nextStep} className="w-full md:w-auto button-glow">
                  Finish Setup <Check className="ml-2" />
                </Button>
              ) : (
                <Button onClick={finishOnboarding} className="w-full md:w-auto button-glow bg-green-500 hover:bg-green-600" disabled={isFinishing || loading}>
                  {isFinishing ? "Redirecting..." : "Go to Dashboard"}
                  {!isFinishing && <ArrowRight className="ml-2" />}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Welcome to Fluxpense!</h3>
          <p className="text-muted-foreground">Let's get your account set up in just a few quick steps. We're excited to help you take control of your finances.</p>
        </div>
      );
    case 1:
      return (
        <div className="space-y-4">
          <Label className="text-lg">How will you be using Fluxpense?</Label>
          <RadioGroup defaultValue="personal" className="space-y-2">
            <Label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="personal" id="personal" />
              <div>
                <p className="font-semibold">Personal Use</p>
                <p className="text-sm text-muted-foreground">For tracking my own expenses and budgets.</p>
              </div>
            </Label>
            <Label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="business" id="business" />
              <div>
                <p className="font-semibold">Business/Team</p>
                <p className="text-sm text-muted-foreground">For managing expenses for my company or team.</p>
              </div>
            </Label>
          </RadioGroup>
        </div>
      );
    case 2:
      return (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Automate with Email</h3>
          <p className="text-muted-foreground">Connect your email to automatically import receipts from services like Uber, Amazon, and more. You can do this later from the Integrations page.</p>
          <Button>Connect Gmail</Button>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">What are your financial goals?</h3>
            <Textarea placeholder="e.g., Save for a vacation, reduce monthly spending on dining out, pay off debt..." rows={4}/>
        </div>
      );
    case 4:
      return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Invite your team (optional)</h3>
            <p className="text-sm text-muted-foreground">Enter emails separated by commas to invite team members.</p>
            <Input placeholder="friend@example.com, colleague@example.com" />
        </div>
      );
    case 5:
      return (
        <div className="text-center space-y-4 py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, type: 'spring' } }}>
                <PartyPopper className="h-16 w-16 text-green-500 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold">You're All Set!</h3>
            <p className="text-muted-foreground">Your account is ready. Let's get your finances organized.</p>
        </div>
      );
    default:
      return null;
  }
}
