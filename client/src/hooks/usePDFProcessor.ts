import {useState} from 'react';
import axios from 'axios';

type ProcessingType = 'compress' | 'split' | 'merge' | 'convert';

interface UsePDFProcessorOptions {
    type: ProcessingType;
    additionalData?: Record<string, any>;
}

export const usePDFProcessor = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [downloadLinks, setDownloadLinks] = useState<{ [key: string]: string }>({});
    const [downloadFileNames, setDownloadFileNames] = useState<{ [key: string]: string }>({});

    const startProcessing = async (
        files: File[],
        options: UsePDFProcessorOptions
    ) => {
        setIsProcessing(true);
        setProgress(0);
        setResult(null);
        setError(null);
        setDownloadLinks({});
        setDownloadFileNames({});

        try {
            const formData = new FormData();

            switch (options.type) {
                case 'merge':
                    files.forEach((file) => {
                        formData.append('files', file);
                    });
                    break;
                case 'convert':
                case 'compress':
                case 'split':
                    formData.append('file', files[0]);
                    break;
            }

            if (options.type === 'split' && options.additionalData?.pages) {
                formData.append('pages', options.additionalData.pages);
            }

            const endpoints: Record<ProcessingType, string> = {
                'compress': '/api/pdf/compress',
                'split': '/api/pdf/split',
                'merge': '/api/pdf/merge',
                'convert': '/api/pdf/convert'
            };

            const fileTypes: Record<ProcessingType, { mimeType: string, extension: string }> = {
                'compress': {mimeType: 'application/pdf', extension: 'pdf'},
                'split': {mimeType: 'application/zip', extension: 'zip'},
                'merge': {mimeType: 'application/pdf', extension: 'pdf'},
                'convert': {
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    extension: 'docx'
                }
            };

            const {mimeType, extension} = fileTypes[options.type];
            const endpoint: string = import.meta.env.VITE_SERVER_URL + endpoints[options.type];

            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percentCompleted);
                },
                responseType: 'blob'
            });

            if (options.type === 'split') {
                const blob = new Blob([response.data], {type: 'application/zip'});
                const url = window.URL.createObjectURL(blob);
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const filename = `split-pdf-${timestamp}.zip`;

                setDownloadFileNames({default: filename});
                setDownloadLinks({default: url});
            } else {
                const blob = new Blob([response.data], {type: mimeType});
                const url = window.URL.createObjectURL(blob);
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const filename = `${options.type}-${timestamp}.${extension}`;

                setDownloadLinks({default: url});
                setDownloadFileNames({default: filename});
            }

            setProgress(100);
            setResult('File processed successfully');
            setIsProcessing(false);

            return downloadLinks;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setIsProcessing(false);
            return null;
        }
    };

    const downloadFile = (pageNumber?: string) => {
        const link = pageNumber
            ? downloadLinks[pageNumber]
            : downloadLinks['default'];

        const filename = pageNumber
            ? downloadFileNames[pageNumber]
            : downloadFileNames['default'];

        if (!link) return;

        const a = document.createElement('a');
        a.href = link;
        a.download = filename || 'processed-file';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(link);
    };

    const resetState = () => {
        setIsProcessing(false);
        setProgress(0);
        setResult(null);
        setError(null);
        setDownloadLinks({});
        setDownloadFileNames({});
    };

    return {
        isProcessing,
        progress,
        result,
        error,
        downloadLinks,
        startProcessing,
        downloadFile,
        resetState
    };
};
