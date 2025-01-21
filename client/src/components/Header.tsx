import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">ProPDF</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/merge-pdf" className="text-gray-600 hover:text-red-500 transition-colors">
              Merge PDF
            </Link>
            <Link to="/split-pdf" className="text-gray-600 hover:text-red-500 transition-colors">
              Split PDF
            </Link>
            <Link to="/compress-pdf" className="text-gray-600 hover:text-red-500 transition-colors">
              Compress PDF
            </Link>
            <Link to="/pdf-to-word" className="text-gray-600 hover:text-red-500 transition-colors">
              PDF to Word
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;