import React from 'react';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { EducationSection } from '../components/sections/Education';
import { Projects } from '../components/sections/Projects';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import data from '../data/data.json';
import { generateSEOTags } from '../utils/seo';

export default function Home() {
  const seoTags = generateSEOTags(data);

  return (
    <>
      <Head>
        <title>{seoTags.title}</title>
        <meta name="description" content={seoTags.description} />
        <meta name="keywords" content={seoTags.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout data={data}>
        {data.sections.hero && (
          <section id="home">
            <Hero data={data} />
          </section>
        )}
        
        {data.sections.about && (
          <section id="about">
            <About data={data} />
          </section>
        )}
        
        {data.sections.skills && (
          <section id="skills">
            <Skills 
              skillData={data.skillCategories} 
              additionalSkills={data.additionalSkills} 
            />
          </section>
        )}
        
        {data.sections.experience && (
          <section id="experience">
            <Experience work={data.work} companies={data.companies} />
          </section>
        )}
        
        <section id="education">
          <EducationSection education={data.education} />
        </section>
        
        {data.sections.projects && (
          <section id="projects">
            <Projects projects={data.projects} />
          </section>
        )}
        
        {data.sections.testimonials && (
          <section id="testimonials">
            <Testimonials 
              testimonials={data.testimonials} 
              stats={data.testimonialStats} 
            />
          </section>
        )}
        
        {data.sections.contact && (
          <section id="contact">
            <Contact data={data} />
          </section>
        )}
      </Layout>
    </>
  );
}
