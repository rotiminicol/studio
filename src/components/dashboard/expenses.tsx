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

export function Expenses() {
  const { toast } = useToast();
  
  // State for receipt scanner
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScanReceiptOutput | null>(null);
  
  // State for email import
  const [emailContent, setEmailContent] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importedData, setImportedData] = useState<ImportExpenseDataFromEmailOutput | null>(null);

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

  const ScannedDataForm = ({data}: {data: ScanReceiptOutput}) => (
    <div className="space-y-4 pt-4 border-t mt-4">
        <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle className="text-green-500" /> Extracted Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label>Vendor</Label>
                <Input defaultValue={data.vendor} />
            </div>
            <div className="space-y-1">
                <Label>Date</Label>
                <Input type="date" defaultValue={data.date} />
            </div>
            <div className="space-y-1">
                <Label>Amount</Label>
                <Input type="number" defaultValue={data.amount} />
            </div>
            <div className="space-y-1">
                <Label>Tax</Label>
                <Input type="number" defaultValue={data.tax} />
            </div>
        </div>
        <div className="space-y-1">
            <Label>Items</Label>
            <Textarea defaultValue={data.items.join("\n")} rows={3} />
        </div>
        <Button className="w-full">Save Expense</Button>
    </div>
  );

  const ImportedDataForm = ({data}: {data: ImportExpenseDataFromEmailOutput}) => (
    <div className="space-y-4 pt-4 border-t mt-4">
        <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle className="text-green-500" /> Extracted Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label>Vendor</Label>
                <Input defaultValue={data.vendor} />
            </div>
            <div className="space-y-1">
                <Label>Date</Label>
                <Input type="date" defaultValue={data.date} />
            </div>
            <div className="space-y-1">
                <Label>Amount</Label>
                <Input type="number" defaultValue={data.amount} />
            </div>
            <div className="space-y-1">
                <Label>Tax</Label>
                <Input type="number" defaultValue={data.tax} />
            </div>
             <div className="space-y-1 md:col-span-2">
                <Label>Category</Label>
                <Input defaultValue={data.category} />
            </div>
        </div>
        <div className="space-y-1">
            <Label>Items</Label>
            <Textarea defaultValue={data.items.join("\n")} rows={3} />
        </div>
        <Button className="w-full">Save Expense</Button>
    </div>
  )

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
                  <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, or WEBP</span>
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
          {scannedData && <ScannedDataForm data={scannedData} />}
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
             {importedData && <ImportedDataForm data={importedData} />}
        </CardContent>
      </Card>
    </div>
  );
}
