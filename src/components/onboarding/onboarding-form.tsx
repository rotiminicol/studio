"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Briefcase, CheckCircle, Loader2, Mail, PiggyBank, Smile, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";


const totalSteps = 5;

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const { completeOnboarding, isLoading } = useAuth();

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-center text-2xl">
          {
            [
              "Welcome to Fluxpense!",
              "What will you be using Fluxpense for?",
              "Link your email for easy imports",
              "Set your monthly budget goals",
              "Invite your team (optional)",
            ][step - 1]
          }
        </CardTitle>
        <CardDescription className="text-center">
            {
                [
                    "Let's get your account set up in a few quick steps.",
                    "This helps us tailor your experience.",
                    "Forward receipts to automatically create expenses.",
                    "We'll help you stay on track.",
                    "Collaborate on expenses with your colleagues.",
                ][step-1]
            }
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[250px] flex items-center justify-center">
        {step === 1 && (
            <div className="text-center">
                <Smile className="w-24 h-24 mx-auto text-primary animate-float" />
                <p className="mt-4 text-lg text-muted-foreground">We're excited to have you on board!</p>
            </div>
        )}
        {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Button variant="outline" className="h-24 flex flex-col gap-2"><PiggyBank/>Personal</Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2"><Briefcase/>Business</Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2"><CheckCircle/>Both</Button>
            </div>
        )}
        {step === 3 && (
            <div className="w-full max-w-sm mx-auto space-y-4 text-center">
                <Mail className="w-16 h-16 mx-auto text-primary" />
                <p className="text-muted-foreground">Connect your Gmail or Outlook account to automatically import receipts. (This is a demo, no actual connection will be made).</p>
                <Button className="w-full">Link Gmail Account</Button>
                <Button variant="outline" className="w-full">Link Outlook Account</Button>
            </div>
        )}
        {step === 4 && (
            <div className="w-full max-w-sm mx-auto space-y-4">
                <PiggyBank className="w-16 h-16 mx-auto text-primary" />
                <div className="space-y-2">
                    <Label htmlFor="budget">Monthly Budget Goal</Label>
                    <Input id="budget" type="number" placeholder="$2,000" />
                </div>
                 <p className="text-xs text-muted-foreground text-center">You can set more specific budgets for categories later.</p>
            </div>
        )}
        {step === 5 && (
            <div className="w-full max-w-sm mx-auto space-y-4">
                <UserPlus className="w-16 h-16 mx-auto text-primary" />
                <div className="space-y-2">
                    <Label htmlFor="teammate-email">Teammate's Email</Label>
                    <Input id="teammate-email" type="email" placeholder="teammate@example.com" />
                </div>
                <Button className="w-full">Send Invite</Button>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1 || isLoading}>
          Back
        </Button>
        <div className="flex items-center gap-4">
            {step > 1 && <Button variant="ghost" onClick={handleNext}>Skip</Button>}
            <Button onClick={handleNext} disabled={isLoading}>
                {isLoading && step === totalSteps && <Loader2 className="animate-spin mr-2" />}
                {step === totalSteps ? "Finish" : "Continue"}
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
