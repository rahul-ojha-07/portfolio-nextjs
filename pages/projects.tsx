import React from 'react';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import { Projects } from '../components/sections/Projects';
import data from '../data/data.json';
import { generateSEOTags } from '../utils/seo';

export default function ProjectsPage() {
  const seoTags = generateSEOTags(
    data, 
    'Projects', 
    'Explore my portfolio of projects showcasing my development skills and experience.'
  );

  return (
    <>
      <Head>
        <title>{seoTags.title}</title>
        <meta name="description" content={seoTags.description} />
        <meta name="keywords" content={seoTags.keywords} />
        
        <meta property="og:title" content={seoTags.openGraph.title} />
        <meta property="og:description" content={seoTags.openGraph.description} />
        <meta property="og:type" content={seoTags.openGraph.type} />
        <meta property="og:image" content={seoTags.openGraph.image} />
        
        <meta name="twitter:card" content={seoTags.twitter.card} />
        <meta name="twitter:title" content={seoTags.twitter.title} />
        <meta name="twitter:description" content={seoTags.twitter.description} />
        <meta name="twitter:image" content={seoTags.twitter.image} />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout data={data}>
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              A showcase of my recent work and technical achievements
            </p>
          </div>
        </section>

        <Projects projects={data.projects} />
      </Layout>
    </>
  );
}
