import {Request, Response} from 'express';
import {Document, Packer, Paragraph, TextRun} from 'docx';
import {compressPDFUtil, convertPDFToWordUtil, mergePDFUtil, splitPDFUtil} from "../utils/pdfUtils";

export const compressPDF = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({success: false, message: 'No file uploaded'});
        }

        const compressedPDF = await compressPDFUtil(req.file.buffer);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(compressedPDF);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to compress PDF',
            error: error.message
        });
    }
};

export const convertPDFToWord = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({success: false, message: 'No file uploaded'});
        }

        const wordContent = await convertPDFToWordUtil(req.file.buffer);

        const doc = new Document({
            sections: [{
                children: wordContent.split('\n').map(line =>
                    new Paragraph({
                        children: [
                            new TextRun(line)
                        ]
                    })
                )
            }]
        });

        const buffer = await Packer.toBuffer(doc);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=converted.docx');
        res.send(buffer);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to convert PDF to Word',
            error: error.message
        });
    }
};

export const splitPDF = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({success: false, message: 'No file uploaded'});
        }

        let {pages} = req.body;
        if (typeof pages === 'string') {
            pages = pages.split(',').map((page: string) => parseInt(page.trim(), 10));
        }

        if (!Array.isArray(pages) || pages.some(isNaN)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid pages format. Expected an array of valid page numbers.'
            });
        }

        const splitPDFs = await splitPDFUtil(req.file.buffer, pages);

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=split_pdfs.zip');

        const JSZip = require('jszip');
        const zip = new JSZip();

        splitPDFs.forEach((pdf, index) => {
            zip.file(`page-${pages[index]}.pdf`, pdf);
        });

        const zipBuffer = await zip.generateAsync({type: 'nodebuffer'});
        res.send(zipBuffer);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to split PDF',
            error: error.message
        });
    }
};

export const mergePDF = async (req: Request, res: Response) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({success: false, message: 'No files uploaded'});
        }

        const pdfBuffers = req.files.map((file: Express.Multer.File) => file.buffer);
        const mergedPDF = await mergePDFUtil(pdfBuffers);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=merged.pdf');
        res.send(Buffer.from(mergedPDF));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to merge PDFs',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};