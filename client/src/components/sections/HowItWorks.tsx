import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cog, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Files',
    description: 'Select or drag and drop your PDF files',
  },
  {
    icon: Cog,
    title: 'Choose Your Tool',
    description: 'Select from our wide range of PDF tools',
  },
  {
    icon: Download,
    title: 'Download Result',
    description: 'Get your processed file instantly',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">
            Three simple steps to transform your PDFs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-6">
                  <step.icon className="h-10 w-10" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-red-100" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;