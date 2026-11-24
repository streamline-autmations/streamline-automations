import Panel from '../craft/Panel';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';

/**
 * FAQ — native <details> so every answer is in the prerendered HTML, matching
 * the FAQPage JSON-LD that SiteSEO emits from the same items.
 */
export default function FAQSection({
  items,
  bg = 'offwhite',
}: {
  items: ReadonlyArray<{ question: string; answer: string }>;
  bg?: 'white' | 'offwhite';
}) {
  return (
    <Panel bg={bg} className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-3xl">
        <Tag variant="outline" className="mb-6">
          FAQ
        </Tag>
        <SplitReveal
          as="h2"
          segments={[{ text: 'Questions,' }, { text: 'answered.', serif: true }]}
          className="text-[clamp(30px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
        />

        <div className="mt-10 divide-y divide-site-line border-t border-site-line">
          {items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-[44px] cursor-pointer py-5 list-none items-center justify-between gap-4 text-[17px] font-semibold text-site-ink outline-none transition-colors duration-200 hover:text-site-accent focus-visible:text-site-accent">
                {item.question}
                <span
                  aria-hidden="true"
                  className="ml-2 flex-shrink-0 text-[22px] font-normal leading-none text-site-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="-mt-2 max-w-2xl pb-5 text-[15.5px] leading-[1.65] text-site-text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Panel>
  );
}
