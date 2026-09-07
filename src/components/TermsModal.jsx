import './TermsModal.css';

const TERMS = [
  {
    title: '1. Orders & Payment',
    text: 'All orders are subject to availability and confirmation of the order price. Payment must be completed at checkout before your order is processed.',
  },
  {
    title: '2. Delivery',
    text: 'We aim to deliver within your selected time slot. Delivery dates are estimates and may vary due to weather or unforeseen circumstances. A correct delivery address is the customer\'s responsibility.',
  },
  {
    title: '3. Returns & Refunds',
    text: 'Due to the perishable nature of flowers, we do not accept returns. If you receive damaged or incorrect items, contact us within 24 hours of delivery with a photo for a replacement or refund.',
  },
  {
    title: '4. Cancellations',
    text: 'Orders may be cancelled up to 12 hours before the scheduled delivery time for a full refund. Cancellations made after this window may not be eligible for a refund.',
  },
  {
    title: '5. Privacy',
    text: 'We collect personal information only to process and deliver your orders. We do not sell or share your data with third parties. Your information is stored securely.',
  },
  {
    title: '6. Liability',
    text: 'Roots Bloom is not liable for delays caused by events beyond our control, including natural disasters, strikes, or supply shortages. Our liability is limited to the value of your order.',
  },
];

function TermsModal({ onClose }) {
  return (
    <div className="terms-overlay" onClick={onClose}>
      <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="terms-header">
          <h2>Terms & Conditions</h2>
          <button className="terms-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="terms-body">
          {TERMS.map((term) => (
            <div className="terms-item" key={term.title}>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
            </div>
          ))}
        </div>
        <div className="terms-footer">
          <button className="btn btn-primary" onClick={onClose}>I Understand</button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
