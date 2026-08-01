from pypdf import PdfReader
from pypdf.errors import PdfReadError
import pikepdf
import io

def extract_text(pdf_bytes):
    try:
        pdf_reader = PdfReader(io.BytesIO(pdf_bytes), strict=False)
        if len(pdf_reader.pages) == 0:
            raise PdfReadError("No pages found")
    except Exception:
        # Fall back: try to repair the PDF structure with pikepdf, then re-parse
        repaired = io.BytesIO()
        with pikepdf.open(io.BytesIO(pdf_bytes)) as pdf:
            pdf.save(repaired)
        repaired.seek(0)
        pdf_reader = PdfReader(repaired, strict=False)

    text = ""

    for page in pdf_reader.pages:
        extracted = page.extract_text()

        if extracted:
            text += extracted

    return text