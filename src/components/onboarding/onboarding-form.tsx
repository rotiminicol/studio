
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Briefcase, CheckCircle, Loader2, Mail, PiggyBank, Smile, UserPlus, Sparkles, Target, Users } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import Link from "next/link";

const totalSteps = 5;

const stepImages = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg"
];

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const { completeOnboarding, isLoading } = useAuth();

  const [accountType, setAccountType] = useState("personal");
  const [budget, setBudget] = useState("");
  const [teammateEmail, setTeammateEmail] = useState("");

  const handleFinish = () => {
    if (isLoading) return;
    completeOnboarding({ account_type: accountType });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress = (step / totalSteps) * 100;

  const stepTitles = [
    "Welcome to Fluxpense!",
    "What will you be using Fluxpense for?",
    "Connect your email for smart imports",
    "Set your monthly budget goals",
    "Invite your team (optional)",
  ];

  const stepDescriptions = [
    "Let's get your account set up in a few quick steps.",
    "This helps us tailor your experience perfectly.",
    "Forward receipts to automatically create expenses.",
    "We'll help you stay on track with intelligent alerts.",
    "Collaborate on expenses with your colleagues.",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Full screen with transition */}
      <div 
        key={step}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${stepImages[step - 1]})`
        }}
      ></div>
      
      {/* Mobile overlay - Light & blurred for readability */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md lg:hidden"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 min-h-screen lg:grid lg:grid-cols-2">
        {/* Left side - Form - Full half screen */}
        <div className="flex flex-col min-h-screen lg:bg-background/95 lg:backdrop-blur-sm relative">
          
          {/* Form container - takes full height and centers content */}
          <div className="flex-1 flex flex-col justify-center p-6 lg:p-12">
            <div className="absolute top-8 left-8 z-20">
              <Link href="/">
                <Logo variant="bird" size="md" />
              </Link>
            </div>

            <Card className="w-full max-w-md mx-auto bg-transparent border-none shadow-none lg:glassmorphism lg:border-primary/20 lg:shadow-2xl lg:rounded-2xl flex-1 flex flex-col">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
                    <span className="text-sm text-primary font-medium">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <CardTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stepTitles[step - 1]}
                </CardTitle>
                <CardDescription className="text-base">
                  {stepDescriptions[step - 1]}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow flex items-center justify-center">
                <div className="w-full">
                {step === 1 && (
                    <div className="text-center space-y-6">
                        <div className="relative">
                          <Smile className="w-24 h-24 mx-auto text-primary animate-float" />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-semibold text-foreground">We're excited to have you on board!</p>
                          <p className="text-muted-foreground">Let's create your personalized expense management experience.</p>
                        </div>
                    </div>
                )}
                
                {step === 2 && (
                    <div className="grid grid-cols-1 gap-4 w-full">
                        <Button 
                          variant={accountType === 'personal' ? 'default' : 'outline'} 
                          className={cn("h-20 flex items-center gap-3 transition-all duration-300", 
                            accountType === 'personal' && "button-glow scale-105"
                          )}
                          onClick={() => setAccountType('personal')}
                        >
                          <PiggyBank className="w-6 h-6"/>
                          <div className="text-left">
                            <div className="font-semibold text-lg">Personal</div>
                            <div className="text-sm font-normal opacity-80">Individual use</div>
                          </div>
                        </Button>
                        <Button 
                          variant={accountType === 'business' ? 'default' : 'outline'} 
                          className={cn("h-20 flex items-center gap-3 transition-all duration-300",
                            accountType === 'business' && "button-glow scale-105"
                          )}
                          onClick={() => setAccountType('business')}
                        >
                          <Briefcase className="w-6 h-6"/>
                          <div className="text-left">
                            <div className="font-semibold text-lg">Business</div>
                            <div className="text-sm font-normal opacity-80">Company expenses</div>
                          </div>
                        </Button>
                        <Button 
                          variant={accountType === 'both' ? 'default' : 'outline'} 
                          className={cn("h-20 flex items-center gap-3 transition-all duration-300",
                            accountType === 'both' && "button-glow scale-105"
                          )}
                          onClick={() => setAccountType('both')}
                        >
                          <CheckCircle className="w-6 h-6"/>
                          <div className="text-left">
                            <div className="font-semibold text-lg">Both</div>
                            <div className="text-sm font-normal opacity-80">Mixed usage</div>
                          </div>
                        </Button>
                    </div>
                )}
                
                {step === 3 && (
                    <div className="w-full space-y-6 text-center">
                        <div className="relative">
                          <Mail className="w-16 h-16 mx-auto text-primary animate-float" />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">Connect your email to automatically import receipts from services like Uber, Amazon, and more.</p>
                          <div className="space-y-3">
                            <Button className="w-full button-glow h-12 text-base">
                              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                              Connect Gmail
                            </Button>
                            <Button variant="outline" className="w-full h-12 text-base">
                              Connect Other Email
                            </Button>
                          </div>
                        </div>
                    </div>
                )}
                
                {step === 4 && (
                    <div className="w-full space-y-6">
                        <div className="text-center">
                          <Target className="w-16 h-16 mx-auto text-primary animate-float mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Set Your Financial Goals</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="budget" className="text-base font-medium">Monthly Budget Goal</Label>
                                <Input 
                                  id="budget" 
                                  type="number" 
                                  placeholder="2000" 
                                  value={budget} 
                                  onChange={(e) => setBudget(e.target.value)}
                                  className="text-lg h-12 border-primary/20 focus:border-primary"
                                />
                                <p className="text-sm text-muted-foreground">We'll help you track and optimize your spending</p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="p-3 bg-primary/10 rounded-lg">
                                <div className="text-lg font-bold text-primary">85%</div>
                                <div className="text-xs text-muted-foreground">Avg. Savings</div>
                              </div>
                              <div className="p-3 bg-accent/10 rounded-lg">
                                <div className="text-lg font-bold text-accent">15min</div>
                                <div className="text-xs text-muted-foreground">Time Saved</div>
                              </div>
                              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <div className="text-lg font-bold text-green-600">99%</div>
                                <div className="text-xs text-muted-foreground">Accuracy</div>
                              </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {step === 5 && (
                    <div className="w-full space-y-6">
                        <div className="text-center">
                          <Users className="w-16 h-16 mx-auto text-primary animate-float mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Invite Your Team</h3>
                          <p className="text-muted-foreground text-sm">Collaborate on expenses and budgets together</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="teammate-email" className="text-base font-medium">Teammate's Email (Optional)</Label>
                                <Input 
                                  id="teammate-email" 
                                  type="email" 
                                  placeholder="teammate@example.com" 
                                  value={teammateEmail} 
                                  onChange={(e) => setTeammateEmail(e.target.value)}
                                  className="border-primary/20 focus:border-primary"
                                />
                            </div>
                            {teammateEmail && (
                              <Button 
                                className="w-full" 
                                variant="outline"
                                onClick={() => {
                                  // Simulate sending invite
                                  setTimeout(() => {
                                    alert(`Invite sent to ${teammateEmail}!`);
                                    setTeammateEmail('');
                                  }, 1000);
                                }}
                              >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Send Invite
                              </Button>
                            )}
                            <div className="text-center text-sm text-muted-foreground">
                              You can always invite team members later from your dashboard
                            </div>
                        </div>
                    </div>
                )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between mt-auto">
                <Button variant="outline" onClick={handleBack} disabled={step === 1 || isLoading}>
                  Back
                </Button>
                <div className="flex items-center gap-4">
                    {step > 1 && step < totalSteps && (
                      <Button variant="ghost" onClick={handleNext}>
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext} disabled={isLoading} className="button-glow">
                        {isLoading && step === totalSteps && <Loader2 className="animate-spin mr-2" />}
                        {step === totalSteps ? "Complete Setup" : "Continue"}
                    </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Right side - Image area - Full half screen on desktop, hidden on mobile */}
        <div className="hidden lg:block relative">
          {/* Step indicator overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {step}
                </div>
                <div>
                  <div className="font-semibold text-foreground">Step {step} of {totalSteps}</div>
                  <div className="text-sm text-muted-foreground">
                    {step === 1 && "Getting Started"}
                    {step === 2 && "Account Type"}
                    {step === 3 && "Email Integration"}
                    {step === 4 && "Budget Setup"}
                    {step === 5 && "Team Collaboration"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
