import {PDFDocument} from 'pdf-lib';
import {Request, Response, NextFunction} from 'express';
import {validatePDFBuffer} from "./validatePdfBuffer";

export const validatePDF = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
        res.status(400).json({success: false, message: 'No file uploaded'});
        return;
    }

    if (req.file.mimetype !== 'application/pdf') {
        res.status(400).json({success: false, message: 'Invalid file type. Only PDFs are allowed.'});
        return;
    }

    next();
};
