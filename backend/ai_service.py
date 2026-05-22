import google.generativeai as genai
import os

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-3.5-flash")

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

    response = model.generate_content(prompt)

    return response.text