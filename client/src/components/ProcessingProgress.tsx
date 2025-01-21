import React from 'react';
import {motion} from 'framer-motion';
import {Loader2} from 'lucide-react';

interface ProcessingProgressProps {
    isProcessing: boolean;
    progress: number;
    result: string | null;
    error: string | null;
}

const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
                                                                   isProcessing, progress, result, error,
                                                               }) => {
    if (!isProcessing && !result && !error) return null;

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
            {isProcessing && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Loader2 className="h-5 w-5 text-red-500 animate-spin"/>
                        <span className="text-gray-700">Processing your file...</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{width: 0}}
                            animate={{width: `${progress}%`}}
                            className="absolute top-0 left-0 h-full bg-red-500"
                        />
                    </div>
                    <p className="text-sm text-gray-600 text-right">{progress}%</p>
                </div>
            )}

            {result && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="flex justify-between items-center"
                >
                    <span className="text-green-600">Processing complete!</span>
                </motion.div>
            )}

            {error && (
                <div className="text-red-600">
                    Error: {error}
                </div>
            )}
        </motion.div>
    );
};

export default ProcessingProgress;