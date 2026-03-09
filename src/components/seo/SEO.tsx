import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Streamline Automations builds custom websites, AI agents, and admin systems that automate your business.", 
  image = "https://res.cloudinary.com/dnlgohkcc/image/upload/v1771959592/Untitled_design_49_mxxpip.png", 
  url,
  keywords = [
    "web design", 
    "automation", 
    "AI agents", 
    "business systems", 
    "software development",
    "web design gauteng",
    "web design vaal triangle",
    "web design vereeniging",
    "web design risiville",
    "web design three rivers",
    "automation gauteng"
  ]
}) => {
  const siteTitle = "Streamline Automations";
  const siteUrl = "https://streamline-automations.agency";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  // Construct canonical URL
  // If url prop is provided, use it (assuming it's full URL)
  // Otherwise, construct from siteUrl + current pathname (stripping query params)
  const currentUrl = url || (typeof window !== 'undefined' ? `${siteUrl}${window.location.pathname}` : siteUrl);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  );
};

export default SEO;
