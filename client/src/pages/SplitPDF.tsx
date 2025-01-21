import {useState} from 'react';
import {motion} from 'framer-motion';
import {Scissors, Download} from 'lucide-react';
import FileUploader from '../components/FileUploader';
import PageHeader from '../components/common/PageHeader';
import ActionButton from '../components/common/ActionButton';
import FileList from '../components/common/FileList';
import ProcessingProgress from '../components/ProcessingProgress';
import {usePDFProcessor} from '../hooks/usePDFProcessor';
import {toast} from 'react-toastify';

const SplitPDF = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pagesToSplit, setPagesToSplit] = useState<string>('');
    const [isSplit, setIsSplit] = useState(false);
    const {
        isProcessing,
        progress,
        result,
        error,
        startProcessing,
        downloadFile,
        resetState,
    } = usePDFProcessor();

    const handleFileSelect = (files: File[]) => {
        resetForm();
        setFile(files[0]);
    };

    const handleSplit = async () => {
        if (file && pagesToSplit) {
            try {
                await startProcessing([file], {
                    type: 'split',
                    additionalData: {pages: pagesToSplit},
                });
                setIsSplit(true);
                toast.success('PDF split successfully!');
            } catch (err: any) {
                toast.error('Error splitting PDF');
            }
        }
    };

    const handleDownload = () => {
        downloadFile();
        resetForm();
        toast.success('Download started');
    };

    const resetForm = () => {
        setFile(null);
        setPagesToSplit('');
        setIsSplit(false);
        resetState();
    };

    return (
        <div className="min-h-screen pt-20 px-4">
            <div className="max-w-4xl mx-auto pt-20">
                <PageHeader
                    title="Split PDF"
                    description="Extract specific pages from your PDF"
                />

                <FileUploader onFileSelect={handleFileSelect} maxFiles={1}/>

                {file && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="mt-8 bg-white rounded-lg shadow p-6"
                    >
                        <FileList files={[file]} onRemove={resetForm}/>

                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.8}}
                            className="mt-4 mb-4"
                        >
                            <label className="block text-sm font-medium text-gray-700 pb-2">
                                Pages to Split (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={pagesToSplit}
                                onChange={(e) => setPagesToSplit(e.target.value)}
                                placeholder="e.g. 1,3,5"
                                className="py-2.5 px-2 font-large mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none border"
                            />
                        </motion.div>

                        <div className="mt-6 space-y-4">
                            {!isSplit && (
                                <ActionButton
                                    onClick={handleSplit}
                                    icon={Scissors}
                                    disabled={isProcessing || !pagesToSplit}
                                >
                                    Split PDF
                                </ActionButton>
                            )}

                            {isSplit && (
                                <ActionButton
                                    onClick={handleDownload}
                                    icon={Download}
                                >
                                    Download Split PDFs
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
            </div>
        </div>
    );
};

export default SplitPDF;
