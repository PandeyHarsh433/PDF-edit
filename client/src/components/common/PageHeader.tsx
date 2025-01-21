import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default PageHeader;