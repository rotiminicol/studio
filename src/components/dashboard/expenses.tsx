"use client";

import { useState } from "react";
import { scanReceipt, ScanReceiptOutput } from "@/ai/flows/scan-receipt";
import { importExpenseDataFromEmail, ImportExpenseDataFromEmailOutput } from "@/ai/flows/email-import";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, Bot, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useData } from "@/contexts/data-context";
import { NewExpense, Category } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

export function Expenses() {
  const { toast } = useToast();
  const { categories, addExpense } = useData();

  // State for receipt scanner
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScanReceiptOutput | null>(null);
  
  // State for email import
  const [emailContent, setEmailContent] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importedData, setImportedData] = useState<ImportExpenseDataFromEmailOutput | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      img.onload = () => {
        // Set maximum dimensions
        const maxWidth = 1500;
        const maxHeight = 1500;
        
        let { width, height } = img;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and resize image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to data URL with lower compression for better compatibility
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
        resolve(resizedDataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      // Create object URL for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size > maxSize) {
        toast({ 
          title: "File too large", 
          description: "Please select an image smaller than 5MB.", 
          variant: "destructive" 
        });
        return;
      }

      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({ 
          title: "Invalid file type", 
          description: "Please select a PNG, JPG, or WEBP image.", 
          variant: "destructive" 
        });
        return;
      }

      try {
        setFile(selectedFile);
        setScannedData(null);
        
        // Resize image to ensure compatibility with AI service
        const resizedDataUrl = await resizeImage(selectedFile);
        setPreviewUrl(resizedDataUrl);
      } catch (error) {
        console.error('Error processing image:', error);
        toast({ 
          title: "Image processing error", 
          description: "Could not process the selected image. Please try a different image.", 
          variant: "destructive" 
        });
      }
    }
  };

  const handleScanReceipt = async () => {
    if (!previewUrl) {
      toast({ title: "Error", description: "Please select a file first.", variant: "destructive" });
      return;
    }
    setIsScanning(true);
    setScannedData(null);
    try {
      const result = await scanReceipt({ photoDataUri: previewUrl });
      setScannedData(result);
      toast({ title: "Scan Complete!", description: "Expense data extracted successfully." });
    } catch (error) {
      console.error(error);
      toast({ 
        title: "Invalid Image File", 
        description: "The uploaded file is not a valid image or may be corrupted. Please try uploading a different image file that is not damaged or corrupted.", 
        variant: "destructive" 
      });
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
        const result = await importExpenseDataFromEmail({ emailContent });
        setImportedData(result);
        toast({ title: "Import Complete!", description: "Expense data extracted successfully." });
    } catch (error) {
        console.error(error);
        toast({ title: "Import Failed", description: "Could not extract data from the email.", variant: "destructive" });
    } finally {
        setIsImporting(false);
    }
  };
  
  const handleSaveExpense = async (data: any, source: 'Receipt' | 'Email') => {
    setIsSaving(true);
    try {
        const newExpense: NewExpense = {
            vendor: data.vendor,
            date: data.date,
            amount: data.amount,
            tax: data.tax,
            items: JSON.stringify(data.items),
            category_id: data.category_id,
            source: source,
            notes: source === 'Email' ? `Imported from email` : `Scanned from receipt`
        };
        await addExpense(newExpense);
        if (source === 'Receipt') setScannedData(null);
        if (source === 'Email') setImportedData(null);
    } catch(err) {
        // toast is handled in context
    } finally {
        setIsSaving(false);
    }
  }


  const DataForm = ({data, source}: {data: ScanReceiptOutput | ImportExpenseDataFromEmailOutput, source: 'Receipt' | 'Email'}) => {
    const [formData, setFormData] = useState({
        ...data,
        date: data.date ? format(new Date(data.date), 'yyyy-MM-dd') : '',
        category_id: source === 'Email' && 'category' in data ? (categories.find(c => c.name.toLowerCase() === data.category.toLowerCase())?.id || 0) : 0,
    });

    const handleSave = () => {
        if (!formData.category_id) {
            toast({ title: "Category required", description: "Please select a category for this expense.", variant: "destructive" });
            return;
        }
        handleSaveExpense(formData, source);
    }

    return (
        <div className="space-y-4 pt-4 border-t mt-4">
            <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle className="text-green-500" /> Extracted Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label>Vendor</Label>
                    <Input value={formData.vendor} onChange={(e) => setFormData({...formData, vendor: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <Label>Date</Label>
                    <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <Label>Amount</Label>
                    <Input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="space-y-1">
                    <Label>Tax</Label>
                    <Input type="number" value={formData.tax} onChange={(e) => setFormData({...formData, tax: parseFloat(e.target.value) || 0})} />
                </div>
            </div>
            <div className="space-y-1">
                <Label>Category</Label>
                <Select value={String(formData.category_id)} onValueChange={(value) => setFormData({...formData, category_id: parseInt(value)})}>
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
                <Textarea value={Array.isArray(formData.items) ? formData.items.join("\n") : ''} onChange={(e) => setFormData({...formData, items: e.target.value.split('\n')})} rows={3} />
            </div>
            <Button className="w-full" onClick={handleSave} disabled={isSaving}>
                {isSaving && <Loader2 className="animate-spin mr-2" />}
                Save Expense
            </Button>
        </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4 pt-4 border-t mt-4">
        <h3 className="font-semibold text-lg flex items-center gap-2"><Loader2 className="animate-spin" /> Analyzing...</h3>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Scan Receipt</CardTitle>
          <CardDescription>Upload an image of your receipt to automatically extract expense details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="receipt-upload" className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
              {previewUrl ? (
                <Image src={previewUrl} alt="Receipt preview" width={200} height={200} className="max-h-48 w-auto object-contain rounded-md"/>
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-muted-foreground" />
                  <span className="mt-2 text-sm font-medium">Click or drag to upload</span>
                  <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, or WEBP (max 5MB)</span>
                </>
              )}
            </Label>
            <Input id="receipt-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
          </div>
          <Button onClick={handleScanReceipt} disabled={!file || isScanning} className="w-full mt-4">
            {isScanning ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
            {isScanning ? "Scanning with AI..." : "Scan with AI"}
          </Button>

          {isScanning && <LoadingSkeleton />}
          {scannedData && <DataForm data={scannedData} source="Receipt" />}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Import from Email</CardTitle>
          <CardDescription>Paste the content of an expense email (e.g., from Uber, Amazon) to import it.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea 
                placeholder="Paste your email content here..." 
                rows={10}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
            />
            <Button onClick={handleEmailImport} disabled={!emailContent || isImporting} className="w-full mt-4">
                {isImporting ? <Loader2 className="animate-spin mr-2" /> : <Bot className="mr-2" />}
                {isImporting ? "Importing with AI..." : "Import with AI"}
            </Button>
             {isImporting && <LoadingSkeleton />}
             {importedData && <DataForm data={importedData} source="Email" />}
        </CardContent>
      </Card>
    </div>
  );
}