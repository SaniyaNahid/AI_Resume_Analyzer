from fastapi import FastAPI, UploadFile, File,HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pdf_service import extract_text
from ai_service import analyze_resume

app = FastAPI()

# Enable frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Backend Running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    contents = await file.read()

    # Extract text from PDF
    try:
        resume_text = extract_text(contents)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Couldn't read this PDF — it may be corrupted, scanned as an image, or saved in a non-standard format. ({e})"
        )

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No extractable text found in this PDF. If it's a scanned/image-based resume, text extraction won't work — try a PDF exported directly from a word processor."
        )

    try:
        analysis = analyze_resume(resume_text)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    return {
        "analysis": analysis
    }