import express from 'express';
import multer from 'multer';
import asyncHandler from '../utils/asyncHandler';
import {compressPDF, convertPDFToWord, mergePDF, splitPDF} from '../controllers/pdfController';
import {validatePDF} from "../middlewares/validatePdf";

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.post('/compress', upload.single('file'), validatePDF, asyncHandler(compressPDF));
router.post('/convert', upload.single('file'), validatePDF, asyncHandler(convertPDFToWord));
router.post('/split', upload.single('file'), validatePDF, asyncHandler(splitPDF));
router.post('/merge', upload.array('files', 10), asyncHandler(mergePDF));

export default router;
