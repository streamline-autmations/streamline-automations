import { Link } from 'react-router-dom';

const SERVICES: Array<[string, string]> = [
  ['Web Design & Creation', '/websites'],
  ['Systems & Automation', '/systems'],
  ['Hosting & Maintenance', '/hosting'],
];

const COMPANY: Array<[string, string]> = [
  ['Portfolio', '/portfolio'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export default function WhiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E8E8EC]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10 mb-16">
          <div className="md:col-span-2 max-w-sm">
            <p className="text-[18px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] mb-4">
              Streamline<span className="text-[#7B3FE4]">.</span>
            </p>
            <p className="text-[14.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65] mb-6">
              Custom websites and automation systems for South African businesses.
              Built to stop the manual work.
            </p>
            <p className="text-[13px] font-['DM_Sans'] text-[#9E9EA8]">
              Vaal Triangle · Gauteng · South Africa
            </p>
          </div>

          <div>
            <p className="text-[11px] font-['DM_Sans'] font-medium uppercase
                          tracking-[0.12em] text-[#9E9EA8] mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-[14px] font-['DM_Sans'] text-[#3D3D47]
                               hover:text-[#0A0A0F] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-['DM_Sans'] font-medium uppercase
                          tracking-[0.12em] text-[#9E9EA8] mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:christian@streamline-automations.agency"
                  className="text-[14px] font-['DM_Sans'] text-[#3D3D47]
                             hover:text-[#0A0A0F] transition-colors duration-200 break-all"
                >
                  christian@streamline-automations.agency
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27633063861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-['DM_Sans'] text-[#3D3D47]
                             hover:text-[#0A0A0F] transition-colors duration-200"
                >
                  WhatsApp: 063 306 3861
                </a>
              </li>
              <li className="pt-2">
                <ul className="space-y-3">
                  {COMPANY.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        to={href}
                        className="text-[14px] font-['DM_Sans'] text-[#3D3D47]
                                   hover:text-[#0A0A0F] transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-[#E8E8EC] mb-6" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12.5px] font-['DM_Sans'] text-[#9E9EA8]">
            © {year} Streamline Automations. All rights reserved.
          </p>
          <p className="text-[12.5px] font-['DM_Sans'] text-[#9E9EA8]">
            Designed &amp; built in the Vaal Triangle, SA.
          </p>
        </div>
      </div>
    </footer>
  );
}
