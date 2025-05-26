"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger, motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllFaqs } from "@/lib/redux/actions/faqAction";

const FAQ = () => {

  const { faqs } = useAppSelector((state) => state.FAQ);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFaqs());
  }, [dispatch]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      animate(
        [
          [".faq-list", { opacity: 1 }],
          [".faq-list li", { x: [-20, 0] }, { delay: stagger(0.2) }],
        ],
        { duration: 0.5 }
      );
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 leading-[3.25rem]">
            Frequently Asked Questions
          </h2>
        </div>
        <ul ref={listRef} className="faq-list opacity-0">
          {faqs.map((faq, index) => (
            <li key={faq._id} className="mb-4">
              <div
                className={`border p-4 rounded-xl transition-all duration-300 ${
                  openIndex === index
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-300"
                }`}
              >
                <button
                  className="flex justify-between w-full text-lg font-normal text-gray-900 cursor-pointer hover:text-blue-600 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <motion.svg
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-6 h-6"
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
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-base text-gray-900 font-normal leading-6 mt-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
