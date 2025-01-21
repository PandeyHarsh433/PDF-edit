import {useState} from 'react';
import {motion} from 'framer-motion';
import {FileText, Download} from 'lucide-react';
import FileUploader from '../components/FileUploader';
import PageHeader from '../components/common/PageHeader';
import ActionButton from '../components/common/ActionButton';
import FileList from '../components/common/FileList';
import ProcessingProgress from '../components/ProcessingProgress';
import {usePDFProcessor} from '../hooks/usePDFProcessor';
import {toast} from 'react-toastify';

const PDFToWord = () => {
    const [file, setFile] = useState<File | null>(null);
    const [processingCompleted, setProcessingCompleted] = useState(false);
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
        resetState();
        setFile(files[0]);
        setProcessingCompleted(false);
    };

    const handleConvert = async () => {
        if (file) {
            try {
                await startProcessing([file], {type: 'convert'});
                setProcessingCompleted(true);
                toast.success('PDF converted to Word successfully!');
            } catch (err: any) {
                toast.error('Error converting PDF to Word');
            }
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile();
            resetState();
            setFile(null);
            setProcessingCompleted(false);
            toast.success('Download started');
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4">
            <div className="max-w-4xl mx-auto pt-20">
                <PageHeader
                    title="PDF to Word"
                    description="Convert your PDF to an editable Word document"
                />

                <FileUploader onFileSelect={handleFileSelect} maxFiles={1}/>

                {file && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="mt-8 bg-white rounded-lg shadow p-6"
                    >
                        <FileList
                            files={[file]}
                            onRemove={() => {
                                resetState();
                                setFile(null);
                                setProcessingCompleted(false);
                            }}
                        />

                        <div className="mt-6 space-y-4">
                            {!processingCompleted && (
                                <ActionButton
                                    onClick={handleConvert}
                                    icon={FileText}
                                    disabled={isProcessing}
                                >
                                    Convert to Word
                                </ActionButton>
                            )}

                            {processingCompleted && (
                                <ActionButton
                                    onClick={handleDownload}
                                    icon={Download}
                                >
                                    Download Word Document
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

export default PDFToWord;
