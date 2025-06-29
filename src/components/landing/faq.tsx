import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a free plan with generous limits that you can use for as long as you like. For more advanced features, you can upgrade to our Pro or Team plans anytime."
  },
  {
    question: "How does the receipt scanning work?",
    answer: "Our AI-powered OCR (Optical Character Recognition) technology analyzes the photo of your receipt to extract key information like vendor, date, amount, and tax. It's fast, accurate, and secure."
  },
  {
    question: "Can I import expenses from my email?",
    answer: "Absolutely! Our Pro plan allows you to forward your digital receipts and invoices from services like Uber, Amazon, or flight bookings to a dedicated Fluxpense email address, and we'll automatically create an expense for you."
  },
  {
    question: "Is my financial data secure?",
    answer: "Security is our top priority. We use bank-level encryption (AES-256) for all your data, both in transit and at rest. We never share your data with third parties."
  },
  {
    question: "Can I use Fluxpense for my business?",
    answer: "Yes! Our Team plan is designed specifically for businesses to manage employee expenses, set spending policies, and streamline the reimbursement process."
  }
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Have questions? We have answers.</p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}