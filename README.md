# PDF Edit

A web application for splitting, merging, compressing, and converting PDF files, with a React client and an Express API that does the processing.

## Features

- **Split PDF**: extracts the pages you list (for example `1,3,5`) into separate one-page PDFs, returned together as a ZIP archive. Done on the server with `pdf-lib`; the ZIP is built with `jszip`.
- **Merge PDF**: combines up to 10 PDFs, in upload order, into a single PDF. Done on the server with `pdf-lib`.
- **Compress PDF**: copies all pages into a new document and saves it with object streams enabled (`pdf-lib`). This is structural re-saving only; images are not resampled, so the size reduction depends on the input file.
- **PDF to Word**: extracts plain text with `pdf-parse` and writes it, one paragraph per line, into a `.docx` file with `docx`. Layout, images, and formatting are not preserved.

All processing happens on the server. The client uploads files and offers the result for download.

## Tech Stack

- **Client**: React 18, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, axios, react-dropzone, react-toastify
- **Server**: Node.js, Express 4, TypeScript, multer (in-memory uploads), pdf-lib, pdf-parse, docx, cors, dotenv

## Architecture

1. The user picks a tool in the client and drops file(s) into an upload area that accepts `.pdf` files only (one file, or up to 10 for merge).
2. The `usePDFProcessor` hook sends the files as `multipart/form-data` to `${VITE_SERVER_URL}/api/pdf/<operation>` with axios and tracks upload progress.
3. On the server, multer keeps uploads in memory (nothing is written to disk). For split, compress, and convert, the `validatePDF` middleware rejects requests with no file or with a MIME type other than `application/pdf`. The merge route does not run this middleware.
4. The controller calls the matching function in `utils/pdfUtils.ts` and sends the result back as a binary response (PDF, ZIP, or DOCX).
5. The client wraps the response in a Blob and triggers a download with a timestamped filename.

Error handling: each controller catches its own errors and responds with HTTP 400 for missing or invalid input (for example, a malformed page list) or HTTP 500 with a JSON body `{ success, message, error }` for processing failures. A global error handler in `middlewares/errorHandler.ts` catches anything else. On the client, failed requests set an error state on the page.

Limits: the client UI states a 100 MB maximum, but the server does not configure a multer size limit, so it is not enforced server-side.

Database: `server/src/config/db.ts` contains a MongoDB (Mongoose) connection helper, but the call to it in `server.ts` is commented out. The application does not use a database.

## Project Structure

```
pdf-edit/
├── client/
│   └── src/
│       ├── components/     # Header, Footer, FileUploader, progress UI, home page sections
│       ├── hooks/
│       │   └── usePDFProcessor.ts   # Upload, request, and download logic
│       ├── pages/          # Home, SplitPDF, MergePDF, CompressPDF, PDFToWord
│       └── App.tsx         # Routes
└── server/
    └── src/
        ├── app.ts          # Express app, CORS, routes, error handler
        ├── server.ts       # Entry point
        ├── config/db.ts    # MongoDB helper (currently not called)
        ├── controllers/pdfController.ts
        ├── middlewares/    # validatePdf, validatePdfBuffer, errorHandler
        ├── routes/pdfRoutes.ts
        └── utils/          # pdfUtils (PDF operations), asyncHandler
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Environment Variables

**Server** (`server/.env`, optional):

```
PORT=5000
# Only needed if the MongoDB connection in server.ts is re-enabled
MONGO_URI=mongodb://<host>:<port>/<database>
```

`PORT` defaults to `5000`.

**Client** (`client/.env`):

```
VITE_SERVER_URL=http://localhost:5000
```

This is the base URL of the API, without a trailing slash.

### Run the Server

```bash
cd server
npm install
npm run dev        # development, runs src/server.ts with nodemon
```

For a production build:

```bash
npm run build      # compiles TypeScript to dist/
npm start          # runs dist/server.js
```

### Run the Client

```bash
cd client
npm install
npm run dev        # Vite dev server, http://localhost:5173 by default
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## API Endpoints

All endpoints accept `multipart/form-data` and are mounted under `/api/pdf`.

| Method | Path               | Purpose                                                                                   |
|--------|--------------------|-------------------------------------------------------------------------------------------|
| POST   | `/api/pdf/split`   | Field `file` (PDF) and `pages` (comma-separated page numbers). Returns a ZIP of one-page PDFs. |
| POST   | `/api/pdf/merge`   | Field `files` (up to 10 PDFs). Returns the merged PDF.                                    |
| POST   | `/api/pdf/compress`| Field `file` (PDF). Returns the re-saved PDF.                                             |
| POST   | `/api/pdf/convert` | Field `file` (PDF). Returns a `.docx` containing the extracted text.                      |
