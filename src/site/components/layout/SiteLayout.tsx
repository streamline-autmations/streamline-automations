import { useEffect, type ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Cursor from '../craft/Cursor';
import ContactOrb from '../craft/ContactOrb';

/**
 * SiteLayout — persistent chrome for the v2 app: header, animated page content,
 * footer. Mounted once (header/footer never remount on navigation). Also
 * neutralises the legacy dark <body> classes from index.html so the white
 * canvas is correct even behind transparent areas / overscroll.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const { body, documentElement: html } = document;
    const prev = {
      bodyBg: body.style.background,
      bodyColor: body.style.color,
      htmlBg: html.style.background,
    };
    body.style.background = '#ffffff';
    body.style.color = '#0a0a0f';
    html.style.background = '#ffffff';
    return () => {
      body.style.background = prev.bodyBg;
      body.style.color = prev.bodyColor;
      html.style.background = prev.htmlBg;
    };
  }, []);

  return (
    <div className="site-root flex min-h-[100svh] flex-col bg-white">
      <Cursor />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ContactOrb />
    </div>
  );
}
