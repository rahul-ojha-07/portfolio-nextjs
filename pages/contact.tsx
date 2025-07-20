import React from 'react';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import { Contact } from '../components/sections/Contact';
import data from '../data/data.json';
import { generateSEOTags } from '../utils/seo';

export default function ContactPage() {
  const seoTags = generateSEOTags(
    data, 
    'Contact', 
    'Get in touch with me for collaborations, opportunities, or just to say hello.'
  );

  return (
    <>
      <Head>
        <title>{seoTags.title}</title>
        <meta name="description" content={seoTags.description} />
        <meta name="keywords" content={seoTags.keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTags.openGraph.title} />
        <meta property="og:description" content={seoTags.openGraph.description} />
        <meta property="og:type" content={seoTags.openGraph.type} />
        <meta property="og:image" content={seoTags.openGraph.image} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={seoTags.twitter.card} />
        <meta name="twitter:title" content={seoTags.twitter.title} />
        <meta name="twitter:description" content={seoTags.twitter.description} />
        <meta name="twitter:image" content={seoTags.twitter.image} />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout data={data}>
        {/* Contact Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm always interested in new opportunities and exciting projects. 
              Let's discuss how we can collaborate to bring your ideas to life.
            </p>
          </div>
        </section>

        <Contact data={data} />
      </Layout>
    </>
  );
}
