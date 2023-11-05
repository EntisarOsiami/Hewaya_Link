/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const features = [
  {
    id: 'feature-1',
    title: 'Discover New Hobbies',
    description: 'Find activities you love and meet new people along the way.',
    image: 'https://source.unsplash.com/featured/?hobbies',
    direction: 'left',
  },
  {
    id: 'feature-2',
    title: 'Connect with Enthusiasts',
    description: 'Share your passion with a community that cares.',
    image: 'https://source.unsplash.com/featured/?community',
    direction: 'right',
  },
  {
    id: 'feature-3',
    title: 'Learn and Grow',
    description: 'Expand your skills with expert-led tutorials and workshops.',
    image: 'https://source.unsplash.com/featured/?learning',
    direction: 'left',
  },
  {
    id: 'feature-4',
    title: 'Access Premium Materials',
    description: 'Get the best tools and materials for your hobby projects.',
    image: 'https://source.unsplash.com/featured/?materials',
    direction: 'right',
  },
  {
    id: 'feature-5',
    title: 'Showcase Your Creations',
    description: 'Gain recognition and feedback in a vibrant showcase gallery.',
    image: 'https://source.unsplash.com/featured/?gallery',
    direction: 'left',
  },
  {
    id: 'feature-6',
    title: 'Join Exclusive Events',
    description: 'Participate in members-only events and competitions.',
    image: 'https://source.unsplash.com/featured/?events',
    direction: 'right',
  }
];

const featureVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === 'left' ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const ScrollingFeatures = () => {
  return (
    <div className='container'>
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          custom={feature.direction}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={featureVariants}
          className={`feature ${feature.direction === 'left' ? 'left' : 'right'}`}
        >
          <motion.img src={feature.image} alt={feature.title} />
          <div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 100,
          delay: 0.2,
        }}
      >
        <button className="join-us-button">Join Us</button>
      </motion.div>
    </div>
  );
};

export default ScrollingFeatures;
