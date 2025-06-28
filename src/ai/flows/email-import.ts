'use server';

/**
 * @fileOverview Extracts expense data from an email.
 *
 * - importExpenseDataFromEmail - A function that handles the extraction of expense data from an email.
 * - ImportExpenseDataFromEmailInput - The input type for the importExpenseDataFromEmail function.
 * - ImportExpenseDataFromEmailOutput - The return type for the importExpenseDataFromEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImportExpenseDataFromEmailInputSchema = z.object({
  emailContent: z
    .string()
    .describe('The content of the email to extract expense data from.'),
});
export type ImportExpenseDataFromEmailInput = z.infer<
  typeof ImportExpenseDataFromEmailInputSchema
>;

const ImportExpenseDataFromEmailOutputSchema = z.object({
  vendor: z.string().describe('The name of the vendor.'),
  date: z.string().describe('The date of the expense (YYYY-MM-DD).'),
  amount: z.number().describe('The amount of the expense.'),
  tax: z.number().describe('The tax amount of the expense. If not specified, use 0.'),
  items: z.array(z.string()).describe('The list of items purchased.'),
  category: z.string().describe("A suggested category for the expense. Choose from: Travel, Food, Supplies, Utilities, Entertainment, Other."),
});
export type ImportExpenseDataFromEmailOutput = z.infer<
  typeof ImportExpenseDataFromEmailOutputSchema
>;

export async function importExpenseDataFromEmail(
  input: ImportExpenseDataFromEmailInput
): Promise<ImportExpenseDataFromEmailOutput> {
  return importExpenseDataFromEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'importExpenseDataFromEmailPrompt',
  input: {schema: ImportExpenseDataFromEmailInputSchema},
  output: {schema: ImportExpenseDataFromEmailOutputSchema},
  prompt: `You are an AI assistant that extracts expense data from emails.
Analyze the email content provided and extract the following information:
- Vendor: The name of the vendor (e.g., Amazon, Uber, Delta Airlines).
- Date: The date of the expense in YYYY-MM-DD format.
- Amount: The total amount of the expense.
- Tax: The tax amount. If not specified, use 0.
- Items: A list of items or services from the expense.
- Category: A general category for the expense. Choose from: Travel, Food, Supplies, Utilities, Entertainment, Other.

Return ONLY a single, valid JSON object matching the specified output schema. Do not include any extra text or markdown.

Email Content: {{{emailContent}}}
  `,
});

const importExpenseDataFromEmailFlow = ai.defineFlow(
  {
    name: 'importExpenseDataFromEmailFlow',
    inputSchema: ImportExpenseDataFromEmailInputSchema,
    outputSchema: ImportExpenseDataFromEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate a valid response for the email.");
    }
    return output;
  }
);
