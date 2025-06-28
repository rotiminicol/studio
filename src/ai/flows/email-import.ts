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
  tax: z.number().describe('The tax amount of the expense.'),
  items: z.array(z.string()).describe('The list of items purchased.'),
  category: z.string().describe('The category of the expense.'),
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

  - Vendor: The name of the vendor where the expense occurred.
  - Date: The date of the expense in YYYY-MM-DD format.
  - Amount: The total amount of the expense.
  - Tax: The tax amount included in the expense.
  - Items: A list of items purchased in the expense.
  - Category: The category that best fits the expense.

  Email Content: {{{emailContent}}}
  \n  Return the extracted information in JSON format.
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
    return output!;
  }
);
