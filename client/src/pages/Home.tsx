import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, FilePlus2, FileOutput, FileInput } from 'lucide-react';
import Features from '../components/sections/Features';
import Stats from '../components/sections/Stats';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonials';

const tools = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Convert PDF',
    description: 'Convert PDFs to Word in a single step',
    link: '/pdf-to-word',
  },
  {
    icon: <FilePlus2 className="h-8 w-8" />,
    title: 'Merge PDF',
    description: 'Combine multiple PDFs into a single file',
    link: '/merge-pdf',
  },
  {
    icon: <FileOutput className="h-8 w-8" />,
    title: 'Split PDF',
    description: 'Extract all the pages from your PDF',
    link: '/split-pdf',
  },
  {
    icon: <FileInput className="h-8 w-8" />,
    title: 'Compress PDF',
    description: 'Reduce file size while optimizing quality',
    link: '/compress-pdf',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-red-50 to-red-100 pt-32 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Every tool you need to work with PDFs
            </motion.h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              All the tools you'll need to be more productive and work smarter with documents.
              Simple, fast, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={tool.link}
                  className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-red-500 mb-4">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-600">{tool.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;