import {Link} from 'react-router-dom';
import {Heart} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Organize PDF</h3>
                        <ul className="space-y-2">
                            <li><Link to="/merge-pdf" className="text-gray-600 hover:text-red-500">Merge PDF</Link></li>
                            <li><Link to="/split-pdf" className="text-gray-600 hover:text-red-500">Split PDF</Link></li>
                            <li><Link to="/compress-pdf" className="text-gray-600 hover:text-red-500">Compress
                                PDF</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Convert PDF</h3>
                        <ul className="space-y-2">
                            <li><Link to="/pdf-to-word" className="text-gray-600 hover:text-red-500">PDF to Word</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About</h3>
                        <p className="text-gray-600">
                            Made with <Heart className="inline h-4 w-4 text-red-500"/> for PDF lovers.
                            The best tools to work with PDFs online.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;