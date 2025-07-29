import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiFilter, FiCalendar, FiUsers } from 'react-icons/fi';
import { TfiQuoteLeft } from 'react-icons/tfi';
import { useTheme } from '@/hooks/useTheme';
import { ColorScheme } from '@/types';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
  category: string;
}

interface TestimonialStats {
  totalReviews: number;
  averageRating: number;
  recommendationRate: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  stats: TestimonialStats;
}

// Category colors for filtering that use theme colors from data.json via useTheme hook
const categoryColors = (colors: ColorScheme) => ({
  technical: `bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`,
  leadership: `bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300`,
  collaboration: `bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`,
  mentorship: `bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300`,
  all: `bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`
});

const StarRating: React.FC<{ rating: number; showNumber?: boolean }> = ({ rating, showNumber = false }) => {
  const { colors } = useTheme();
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: star * 0.1, duration: 0.3 }}
        >
          <FiStar
            className={`w-4 h-4 ${star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
              }`}
            aria-hidden="true"
          />
        </motion.div>
      ))}
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400" aria-label={`Rating: ${rating} out of 5`}>
          {rating}.0
        </span>
      )}
    </div>
  );
};

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
}> = ({ testimonial, index, isVisible }) => {
  const [imageError, setImageError] = useState(false);
  const { colors } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
      role="article"
      aria-label={`Testimonial by ${testimonial.author}`}
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
                aria-hidden="true"
              >
                {!imageError ? (
                  <Image
                    src={testimonial.avatar}
                    alt={`Avatar of ${testimonial.author}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600 text-white font-semibold text-lg"
                    aria-hidden="true"
                  >
                    {testimonial.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </div>
            </div>

            <div>
              <h4 style={{ color: colors.foreground }} className="font-semibold">
                {testimonial.author}
              </h4>
              <p style={{ color: colors.foreground, opacity: 0.75 }} className="text-sm">
                {testimonial.position}
              </p>
              <p style={{ color: colors.primary }} className="text-sm font-medium">
                {testimonial.company}
              </p>
            </div>
          </div>

          <div className="text-right">
            <StarRating rating={testimonial.rating} />
            <p
              style={{ color: colors.foreground, opacity: 0.6 }}
              className="text-xs mt-1 flex items-center"
            >
              <FiCalendar className="w-3 h-3 mr-1" aria-hidden="true" />
              {formatDate(testimonial.date)}
            </p>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize`}
            style={{
              backgroundColor: {
                technical: '#dbeafe', // These should ideally come from theme colors or data.json if you define mapping
                leadership: '#ede9fe',
                collaboration: '#dcfce7',
                mentorship: '#ffedd5',
                all: '#e5e7eb',
              }[testimonial.category] || '#e5e7eb',
              color: {
                technical: '#2563eb',
                leadership: '#7c3aed',
                collaboration: '#16a34a',
                mentorship: '#f97316',
                all: '#374151',
              }[testimonial.category] || '#374151',
            }}
          >
            {testimonial.category}
          </span>
        </div>
      </div>

      {/* Quote */}
      <div className="px-6 pb-6 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="absolute -top-2 left-4 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
          aria-hidden="true"
          style={{ backgroundColor: colors.primary }}
        >
          <TfiQuoteLeft className="text-white text-sm" />
        </motion.div>

        <blockquote
          className="leading-relaxed italic text-lg pt-4"
          style={{ color: colors.foreground }}
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 rounded-full mt-4"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
          }}
        />
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, stats }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { colors } = useTheme();

  const filteredTestimonials = testimonials.filter(
    (testimonial) => activeFilter === 'all' || testimonial.category === activeFilter
  );

  const categories = ['all', ...Array.from(new Set(testimonials.map((t) => t.category)))];

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredTestimonials.length));
  };

  const displayedTestimonials = filteredTestimonials.slice(0, visibleCount);

  const categoryColorClasses = categoryColors(colors);

  return (
    <section
      className="py-20"
      style={{
        background: `linear-gradient(to bottom right, ${colors.background}, ${colors.card || colors.background})`,
      }}
      ref={ref}
      aria-label="Testimonials section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-4"
          >
            <FiUsers className="text-4xl" style={{ color: colors.primary }} aria-hidden="true" />
          </motion.div>
          <h2 style={{ color: colors.foreground }} className="text-4xl md:text-5xl font-bold mb-4">
            What People Say
          </h2>
          <p style={{ color: colors.foreground, opacity: 0.75 }} className="text-xl max-w-3xl mx-auto">
            Feedback and recommendations from colleagues, managers, and clients I've worked with
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[{
            label: 'Total Reviews',
            value: `${stats.totalReviews}+`,
          }, {
            label: 'Average Rating',
            value: stats.averageRating.toFixed(1),
            isRating: true
          }, {
            label: 'Recommendation Rate',
            value: `${stats.recommendationRate}%`,
          }].map(({ label, value, isRating }, idx) => (
            <div
              key={label}
              className="text-center p-6 rounded-xl shadow-lg"
              style={{
                backgroundColor: colors.card,
                boxShadow: `0 4px 6px 0 ${colors.cardShadow}`,
                color: colors.foreground,
              }}
            >
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: colors.primary }}
              >
                {value}
                {isRating && <StarRating rating={5} showNumber={false} />}
              </div>
              <div style={{ opacity: 0.75 }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center mb-12"
        >
          <div
            style={{
              backgroundColor: colors.card,
              boxShadow: `0 4px 6px 0 ${colors.cardShadow}`,
            }}
            className="rounded-xl p-2 shadow-lg"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setVisibleCount(6);
                }}
                style={{
                  backgroundColor:
                    activeFilter === category ? colors.primary : 'transparent',
                  color:
                    activeFilter === category ? colors.badgeText : colors.foreground,
                }}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 capitalize"
                aria-pressed={activeFilter === category}
              >
                <div className="flex items-center space-x-2">
                  <FiFilter />
                  <span>{category}</span>
                  <span
                    style={{
                      backgroundColor: colors.badgeBackground,
                      color: colors.badgeText,
                    }}
                    className="text-xs px-2 py-1 rounded-full"
                  >
                    {category === 'all'
                      ? testimonials.length
                      : testimonials.filter((t) => t.category === category).length}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {displayedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${activeFilter}`}
                testimonial={testimonial}
                index={index}
                isVisible={isInView}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {visibleCount < filteredTestimonials.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              style={{ backgroundColor: colors.primary, color: colors.badgeText }}
              className="px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300"
              aria-label="Load more testimonials"
            >
              Load More Reviews ({filteredTestimonials.length - visibleCount} remaining)
            </motion.button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
            color: colors.badgeText,
          }}
          className="text-center mt-16 p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-lg mb-6">{`Join the list of satisfied clients and colleagues who've experienced exceptional results.`}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            aria-label="Start a project"
          >
            Let's Start a Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
