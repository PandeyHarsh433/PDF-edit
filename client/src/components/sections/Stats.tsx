import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, Globe2 } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1M+',
    label: 'Active Users',
  },
  {
    icon: FileCheck,
    value: '50M+',
    label: 'PDFs Processed',
  },
  {
    icon: Globe2,
    value: '190+',
    label: 'Countries',
  },
];

const Stats = () => {
  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats;