import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Processing',
    description: 'Your files are encrypted and automatically deleted after processing',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process your PDFs in seconds with our optimized algorithms',
  },
  {
    icon: Globe,
    title: 'Cloud-Based',
    description: 'Access your tools from anywhere, no software installation needed',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Our services are available round the clock for your convenience',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Our PDF Tools?</h2>
          <p className="mt-4 text-xl text-gray-600">
            Professional tools designed for efficiency and ease of use
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;