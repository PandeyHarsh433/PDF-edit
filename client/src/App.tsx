import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import {ToastContainer} from 'react-toastify';
import MergePDF from './pages/MergePDF';
import SplitPDF from './pages/SplitPDF';
import CompressPDF from './pages/CompressPDF';
import PDFToWord from './pages/PDFToWord';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop/>
            <div className="min-h-screen bg-gray-50">
                <Header/>
                <ToastContainer position="bottom-right" autoClose={2000}/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/merge-pdf" element={<MergePDF/>}/>
                        <Route path="/split-pdf" element={<SplitPDF/>}/>
                        <Route path="/compress-pdf" element={<CompressPDF/>}/>
                        <Route path="/pdf-to-word" element={<PDFToWord/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
