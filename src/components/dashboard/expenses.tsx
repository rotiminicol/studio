
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, Bot, CheckCircle, ArrowLeft, Mail, ScanLine } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import type { Category, NewExpense } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";
import { mainApi } from "@/lib/xano";
import { useData } from "@/contexts/data-context";

type AIExtractedData = Omit<NewExpense, 'source'>;

export function Expenses() {
  const { toast } = useToast();
  const { categories, addExpense } = useData();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<AIExtractedData | null>(null);

  const [emailContent, setEmailContent] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importedData, setImportedData] = useState<AIExtractedData | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setScannedData(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleScanReceipt = async () => {
    if (!file) {
      toast({ title: "Error", description: "Please select a file first.", variant: "destructive" });
      return;
    }
    setIsScanning(true);
    setScannedData(null);
    try {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await mainApi.post('/ai/scan-receipt', formData);
        setScannedData(data);
        toast({ title: "Scan Complete!", description: "Expense data extracted successfully." });
    } catch (error) {
        console.error("Error scanning receipt:", error);
        toast({ title: "Scan Failed", description: "Could not extract data from the receipt.", variant: "destructive" });
    } finally {
        setIsScanning(false);
    }
  };

  const handleEmailImport = async () => {
    if (!emailContent) {
      toast({ title: "Error", description: "Please paste email content.", variant: "destructive" });
      return;
    }
    setIsImporting(true);
    setImportedData(null);
    try {
        const { data } = await mainApi.post('/ai/import-email', { content: emailContent });
        setImportedData(data);
        toast({ title: "Import Complete!", description: "Expense data extracted successfully." });
    } catch (error) {
        console.error("Error importing email:", error);
        toast({ title: "Import Failed", description: "Could not extract data from the email.", variant: "destructive" });
    } finally {
        setIsImporting(false);
    }
  };

  const handleSaveExpense = async (data: AIExtractedData, source: 'Receipt' | 'Email') => {
    setIsSaving(true);
    await addExpense({ ...data, source });
    
    if (source === 'Receipt') {
      setScannedData(null);
      setPreviewUrl(null);
      setFile(null);
    }
    if (source === 'Email') {
      setImportedData(null);
      setEmailContent('');
    }
    setIsSaving(false);
  }

  const DataForm = ({ data, source }: { data: AIExtractedData, source: 'Receipt' | 'Email' }) => {
    const [formData, setFormData] = useState({
      ...data,
      date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : '',
    });

    const handleSave = () => {
      if (!formData.category_id) {
        toast({ title: "Category required", description: "Please select a category for this expense.", variant: "destructive" });
        return;
      }
      const itemsString = Array.isArray(formData.items) ? JSON.stringify(formData.items) : formData.items;
      handleSaveExpense({ ...formData, items: itemsString }, source);
    }

    return (
      <div className="space-y-4 pt-4 border-t border-primary/10 mt-6">
        <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle className="text-green-500" /> Extracted Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Vendor</Label>
            <Input value={formData.vendor} onChange={(e) => setFormData({ ...formData, vendor: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Date</Label>
            <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Amount</Label>
            <Input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} />
          </div>
          <div className="space-y-1">
            <Label>Tax</Label>
            <Input type="number" value={formData.tax || 0} onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) || 0 })} />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Category</Label>
          <Select value={String(formData.category_id)} onValueChange={(value) => setFormData({ ...formData, category_id: parseInt(value) })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat: Category) => (
                <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Items</Label>
          <Textarea value={Array.isArray(formData.items) ? formData.items.join("\n") : ''} onChange={(e) => setFormData({ ...formData, items: e.target.value.split('\n') })} rows={3} />
        </div>
        <Button className="w-full button-glow" onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="animate-spin mr-2" />}
          Save Expense
        </Button>
      </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4 pt-4 border-t border-primary/10 mt-6">
      <h3 className="font-semibold text-lg flex items-center gap-2 text-primary"><Loader2 className="animate-spin" /> Analyzing with AI...</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
        <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
        <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
        <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
      </div>
      <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-20 w-full" /></div>
      <Skeleton className="h-10 w-full" />
    </div>
  )

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">AI Expense Entry</h1>
              <p className="text-muted-foreground">Automatically add expenses from receipts or emails.</p>
            </div>
            <Link href="/dashboard/overview">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
              </Button>
            </Link>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-primary/40 transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ScanLine className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Scan Receipt</CardTitle>
                <CardDescription>Upload an image to extract expense details.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="receipt-upload" className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 transition-colors">
                {previewUrl ? (
                  <Image src={previewUrl} alt="Receipt preview" width={200} height={200} className="max-h-48 w-auto object-contain rounded-md" />
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 text-primary" />
                    <span className="mt-2 text-sm font-medium text-primary">Click or drag to upload</span>
                    <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, or WEBP (max 5MB)</span>
                  </>
                )}
              </Label>
              <Input id="receipt-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </div>
            <Button onClick={handleScanReceipt} disabled={!file || isScanning} className="w-full mt-4 button-glow">
              {isScanning ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
              {isScanning ? "Scanning with AI..." : "Scan with AI"}
            </Button>

            {isScanning && <LoadingSkeleton />}
            {scannedData && <DataForm data={scannedData} source="Receipt" />}
          </CardContent>
        </Card>

        <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:border-primary/40 transition-all" style={{animationDelay: '150ms'}}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              <div>
                <CardTitle>Import from Email</CardTitle>
                <CardDescription>Paste an expense email to import it.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your email content here..."
              rows={10}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="bg-primary/5 border-primary/20 focus:bg-background"
            />
            <Button onClick={handleEmailImport} disabled={!emailContent || isImporting} className="w-full mt-4 button-glow">
              {isImporting ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
              {isImporting ? "Importing with AI..." : "Import with AI"}
            </Button>
            {isImporting && <LoadingSkeleton />}
            {importedData && <DataForm data={importedData} source="Email" />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
