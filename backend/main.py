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
    resume_text = extract_text(contents)
    try:
        analysis = analyze_resume(resume_text)
    except Exception as e:
        raise HTTPException(status_code=429, detail=str(e))

    return {
        "analysis": analysis
    }