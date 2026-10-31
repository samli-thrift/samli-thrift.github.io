import '../scss/components/FaqDropdown.scss';

export default function FaqDropdown({ content, name }) {
  const { question, answer } = content;

  return (
    <details className="faq-dropdown" name={name}>
      <summary>
        <span className="question">{question}</span>
        <i className="fa fa-chevron-down" aria-hidden="true"></i>
      </summary>
      <div className="answer">
        <p>{answer}</p>
      </div>
    </details>
  );
}

export const faqs = [
  {
    question: "How do you grade your items?",
    answer: "Every item is checked for stains, wear and flaws, then labelled Like new, Good or Fair. Any visible defect is photographed on the product page.",
  },
  {
    question: "Do you deliver nationwide?",
    answer: "Yes. We deliver to all states, and you'll get tracking details once your order is dispatched.",
  },
  {
    question: "How long does delivery take?",
    answer: "[X–Y] working days depending on your location. Dispatch happens within [X] days of payment.",
  },
  {
    question: "Can I return an item?",
    answer: "[State your return window and conditions here, e.g. wrong size or not as described.]",
  },
  {
    question: "What payment methods do you accept?",
    answer: "[List: bank transfer, card, pay on delivery, etc.]",
  },
  {
    question: "Are your items washed before shipping?",
    answer: "[Confirm whether each piece is cleaned or steamed before it ships.]",
  },
];