import {PDFDocument} from 'pdf-lib';

export const validatePDFBuffer = async (buffer: Buffer): Promise<boolean> => {
    try {
        await PDFDocument.load(buffer);
        return true;
    } catch (error) {
        return false;
    }
};
