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
  tax: z.number().describe('The tax amount on the receipt. If not present, use 0.'),
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
  prompt: `You are an expert financial assistant AI. Your task is to accurately extract information from a receipt image.
Analyze the receipt image provided and extract the following details:
- Vendor name (e.g., "Starbucks", "Walmart")
- Date of the transaction in YYYY-MM-DD format.
- The final total amount of the bill.
- The total tax amount. If not present, use 0.
- A list of all individual items purchased.

Return ONLY a single, valid JSON object matching the specified output schema. Do not include any explanatory text, greetings, or additional formatting like markdown code blocks.

Receipt Image: {{media url=photoDataUri}}
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
