import {useState} from 'react';
import {motion} from 'framer-motion';
import {Minimize2, Download} from 'lucide-react';
import FileUploader from '../components/FileUploader';
import PageHeader from '../components/common/PageHeader';
import ActionButton from '../components/common/ActionButton';
import FileList from '../components/common/FileList';
import ProcessingProgress from '../components/ProcessingProgress';
import {usePDFProcessor} from '../hooks/usePDFProcessor';
import {toast} from 'react-toastify';

const CompressPDF = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isCompressed, setIsCompressed] = useState(false);
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

    const handleCompress = async () => {
        if (file) {
            try {
                await startProcessing([file], {type: 'compress'});
                setIsCompressed(true);
                toast.success('PDF compressed successfully!');
            } catch (err: any) {
                toast.error('Error compressing PDF');
            }
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile();
            resetForm();
            toast.success('Download started');
        }
    };

    const resetForm = () => {
        setFile(null);
        setIsCompressed(false);
        resetState();
    };

    return (
        <div className="min-h-screen pt-20 px-4">
            <div className="max-w-4xl mx-auto pt-20">
                <PageHeader
                    title="Compress PDF"
                    description="Reduce file size while maintaining quality"
                />

                <FileUploader onFileSelect={handleFileSelect} maxFiles={1}/>

                {file && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="mt-8 bg-white rounded-lg shadow p-6"
                    >
                        <FileList files={[file]} onRemove={() => resetForm()}/>

                        <div className="mt-6 space-y-4">
                            {!isCompressed && (
                                <ActionButton
                                    onClick={handleCompress}
                                    icon={Minimize2}
                                    disabled={isProcessing}
                                >
                                    Compress PDF
                                </ActionButton>
                            )}

                            {isCompressed && (
                                <ActionButton
                                    onClick={handleDownload}
                                    icon={Download}
                                >
                                    Download Compressed PDF
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

export default CompressPDF;
