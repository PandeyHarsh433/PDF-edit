import {useState} from 'react';
import {motion} from 'framer-motion';
import {ArrowRight, Download} from 'lucide-react';
import PDFSelector from '../components/PDFSelector';
import PageHeader from '../components/common/PageHeader';
import ActionButton from '../components/common/ActionButton';
import FileList from '../components/common/FileList';
import ProcessingProgress from '../components/ProcessingProgress';
import {usePDFProcessor} from '../hooks/usePDFProcessor';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MergePDF = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isMerged, setIsMerged] = useState(false);
    const {
        isProcessing,
        progress,
        result,
        error,
        startProcessing,
        downloadFile
    } = usePDFProcessor();

    const handleFileSelect = (newFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setIsMerged(false);
    };

    const handleRemove = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setIsMerged(false);
    };

    const handleMerge = async () => {
        if (files.length > 0) {
            try {
                await startProcessing(files, {type: 'merge'});
                setIsMerged(true);
                toast.success('PDFs merged successfully!'); // Show success message
            } catch (error) {
                toast.error('Error merging PDFs'); // Show error message
            }
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile();
            toast.success('Download started'); // Show download success message
            resetForm();
        }
    };

    const resetForm = () => {
        setFiles([]);
        setIsMerged(false);
    };

    return (
        <div className="min-h-screen pt-20 px-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="max-w-4xl mx-auto pt-20"
            >
                <PageHeader
                    title="Merge PDF Files"
                    description="Combine multiple PDFs into a single file"
                />

                <PDFSelector
                    multiple
                    maxFiles={10}
                    onFileSelect={handleFileSelect}
                />

                {files.length > 0 && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="mt-8 bg-white rounded-lg shadow p-6"
                    >
                        <FileList files={files} onRemove={handleRemove}/>

                        <div className="mt-6 space-y-4">
                            {!isMerged && !isProcessing && (
                                <ActionButton
                                    onClick={handleMerge}
                                    icon={ArrowRight}
                                    disabled={isProcessing || files.length === 0}
                                >
                                    Merge Files
                                </ActionButton>
                            )}

                            {isMerged && (
                                <ActionButton
                                    onClick={handleDownload}
                                    icon={Download}
                                >
                                    Download Merged PDF
                                </ActionButton>
                            )}
                        </div>

                        <ProcessingProgress
                            isProcessing={isProcessing}
                            progress={progress}
                            result={result}
                            error={error}
                        />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MergePDF;
