const fs = require('fs');
const path=require("path");
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const data = require('./test.json');

// Function to create a PDF file
async function createPDF(filePath, text) {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a new page to the document
    const page = pdfDoc.addPage();

    // Set font and font size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.setFont(font);

    // Set text color and position
    page.drawText(text, {
        x: 50,
        y: 500,
        size: 30,
        color: rgb(0, 0, 0), // Black color
    });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, pdfBytes);

    console.log(`PDF file created at: ${filePath}`);
}

// Loop through the data and create PDF files
data.forEach((obj) => {
    obj[obj.grade].weeks.forEach((week) => {
        if (week.download && week.download.length > 0) {
            const filePath = path.join("C:/Users/QWINGS/Desktop/lms system/lms/importantData", week.download[0]);
            const textContent = `${obj.grade} - Week ${week.week}: ${week.info}`;
            createPDF(filePath, textContent);
        }
    });
});
