"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function BillingPage() {
  return (
    <div className="max-w-2xl mx-auto w-full p-4 sm:p-6 md:p-8">
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle>Billing & Payment</CardTitle>
          <CardDescription>Manage your plan and payment details</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Plan Summary */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg">Pro Plan</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
            </div>
            <div className="text-muted-foreground text-sm mb-1">$29/month</div>
            <div className="text-xs text-muted-foreground">Next payment: July 30, 2024</div>
          </div>

          {/* Payment Method Form */}
          <form className="space-y-6">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="1234 1234 1234 1234"
                className="mt-1"
                maxLength={19}
                autoComplete="cc-number"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="expiry">Expiry</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  className="mt-1"
                  maxLength={5}
                  autoComplete="cc-exp"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  type="text"
                  placeholder="CVC"
                  className="mt-1"
                  maxLength={4}
                  autoComplete="cc-csc"
                />
              </div>
            </div>
            <Button className="w-full mt-2" type="button" disabled>
              Pay $29 (Demo Only)
            </Button>
          </form>

          {/* Invoice History */}
          <div className="mt-10">
            <div className="font-semibold mb-2">Invoice History</div>
            <div className="rounded-lg border divide-y mt-1">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm">June 30, 2024</span>
                <span className="text-sm">$29</span>
                <Badge className="bg-green-100 text-green-700 border-green-200">Paid</Badge>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm">May 30, 2024</span>
                <span className="text-sm">$29</span>
                <Badge className="bg-green-100 text-green-700 border-green-200">Paid</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 