import '../scss/components/FaqDropdown.scss';

export default function FaqDropdown({
  content,
  name,
}) {
  const { question, answer } = content;

  return <details className="faq-dropdown" name={name}>
    <summary>
      {question}
      <i className="fa fa-chevron-down"></i>
    </summary>
    <div className="answer">
      {answer}
    </div>
  </details>;
};