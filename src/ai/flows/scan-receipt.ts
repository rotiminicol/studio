// Scans a receipt image and extracts relevant expense data using AI.
//
// - scanReceipt - Extracts data from a receipt image.
// - ScanReceiptInput - The input type for the scanReceipt function.
// - ScanReceiptOutput - The return type for the scanReceipt function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScanReceiptInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // prettier-ignore
    ),
});
export type ScanReceiptInput = z.infer<typeof ScanReceiptInputSchema>;

const ScanReceiptOutputSchema = z.object({
  vendor: z.string().describe('The name of the vendor.'),
  date: z.string().describe('The date on the receipt (YYYY-MM-DD).'),
  amount: z.number().describe('The total amount on the receipt.'),
  tax: z.number().describe('The tax amount on the receipt.'),
  items: z.array(z.string()).describe('A list of items purchased.'),
});
export type ScanReceiptOutput = z.infer<typeof ScanReceiptOutputSchema>;

export async function scanReceipt(input: ScanReceiptInput): Promise<ScanReceiptOutput> {
  return scanReceiptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scanReceiptPrompt',
  input: {schema: ScanReceiptInputSchema},
  output: {schema: ScanReceiptOutputSchema},
  prompt: `You are an expert receipt data extractor.

  Analyze the receipt image and extract the following information:
  - Vendor name
  - Date (YYYY-MM-DD)
  - Total amount
  - Tax amount
  - List of items purchased

  Receipt Image: {{media url=photoDataUri}}
  {
    "vendor": "",
    "date": "",
    "amount": 0,
    "tax": 0,
    "items": []
  }
  `,
});

const scanReceiptFlow = ai.defineFlow(
  {
    name: 'scanReceiptFlow',
    inputSchema: ScanReceiptInputSchema,
    outputSchema: ScanReceiptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
