import Head from 'next/head';
import { PersonalData } from '@/types';

export const generateSEOTags = (
  data: PersonalData,
  pageTitle?: string,
  pageDescription?: string
) => {
  const title = pageTitle 
    ? `${pageTitle} | ${data.name}` 
    : `${data.name} - ${data.title.join(', ')}`;
  
  const description = pageDescription || data.seo.description;
  
  return {
    title,
    description,
    keywords: data.seo.keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      image: data.photo,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image: data.photo,
    },
  };
};
