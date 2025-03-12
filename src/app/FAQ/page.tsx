"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "How can I reset my password?",
      answer:
        "To reset your password, go to the login page and click on 'Forgot password.' Follow the instructions to reset your password.",
    },
    {
      id: 2,
      question: "How do I update my billing information?",
      answer:
        "To update your billing information, navigate to 'Account Settings' > 'Billing' and enter your new payment details.",
    },
    {
      id: 3,
      question: "How can I contact customer support?",
      answer:
        "You can contact our support team via the 'Help' section in your dashboard or by emailing support@example.com.",
    },
    {
      id: 4,
      question: "How do I delete my account?",
      answer:
        "To delete your account, go to 'Settings' > 'Account' > 'Delete Account'. Please note that this action is irreversible.",
    },
  ];

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      animate(
        [["ul", { opacity: 1 }], ["li", { x: [-20, 0] }, { delay: stagger(0.2) }]],
        { duration: 3.5 }
      );
    }
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
        </div>
        <ul ref={listRef} className="opacity-0">
          {faqs.map((faq) => (
            <li key={faq.id}>
              <details className="border border-gray-300 p-4 rounded-xl mb-4 transition duration-500">
                <summary className="flex justify-between w-full text-lg font-normal text-gray-900 cursor-pointer hover:text-indigo-600">
                  {faq.question}
                  <svg
                    className="w-6 h-6 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="text-base text-gray-900 font-normal leading-6 mt-2">
                  {faq.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
