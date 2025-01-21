import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon: Icon, children, disabled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 
        transition-colors flex items-center justify-center space-x-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span>{children}</span>
      {Icon && <Icon className="h-5 w-5" />}
    </motion.button>
  );
};

export default ActionButton;