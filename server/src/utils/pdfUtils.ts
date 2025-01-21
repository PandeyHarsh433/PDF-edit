import {PDFDocument} from "pdf-lib";
import pdfParse from 'pdf-parse';

export const compressPDFUtil = async (pdfData: Buffer): Promise<Buffer> => {
    const pdfDoc = await PDFDocument.load(pdfData);

    const newPdfDoc = await PDFDocument.create();

    const copiedPages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach(page => newPdfDoc.addPage(page));

    const compressedPDF = await newPdfDoc.save({useObjectStreams: true});
    return Buffer.from(compressedPDF);
};

export const convertPDFToWordUtil = async (pdfData: Buffer): Promise<string> => {
    try {
        const parsedData = await pdfParse(pdfData);
        return parsedData.text;
    } catch (error) {
        throw new Error('Failed to extract text from PDF');
    }
};

export const splitPDFUtil = async (pdfData: Buffer, pages: number[]): Promise<Buffer[]> => {
    const pdfDoc = await PDFDocument.load(pdfData);
    const splitDocs: Buffer[] = [];

    for (const page of pages) {
        const newDoc = await PDFDocument.create();

        if (page < 1 || page > pdfDoc.getPageCount()) {
            throw new Error(`Page number ${page} is out of bounds.`);
        }

        const [copiedPage] = await newDoc.copyPages(pdfDoc, [page - 1]);
        newDoc.addPage(copiedPage);

        splitDocs.push(Buffer.from(await newDoc.save()));
    }

    return splitDocs;
};

export const mergePDFUtil = async (buffers: Buffer[]): Promise<Uint8Array> => {
    try {
        const mergedPdf = await PDFDocument.create();

        for (const buffer of buffers) {
            const pdf = await PDFDocument.load(buffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
        }

        return await mergedPdf.save();
    } catch (error) {
        throw new Error(`Failed to merge PDFs: ${error instanceof Error ? error.message : String(error)}`);
    }
};