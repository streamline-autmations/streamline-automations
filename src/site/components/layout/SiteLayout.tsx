import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

/**
 * SiteLayout — shared chrome for every v2 route: header, page outlet, footer.
 * Also neutralises the legacy dark <body> classes from index.html so the
 * white canvas is correct even behind transparent areas / overscroll.
 */
export default function SiteLayout() {
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
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
