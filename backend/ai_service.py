import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)

MODEL_NAME = "gemini-3.5-flash"


def analyze_resume(text):

    prompt = f"""
    You are an expert HR recruiter.

    Analyze this resume for a software engineering role.

    Resume:
    {text}

    Return:

    1. Key Skills
    2. Missing Skills
    3. ATS Score out of 100
    4. Improvement Suggestions
    """

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
    )

    return response.text