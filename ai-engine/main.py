from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
import numpy as np
import pdfplumber
import docx
import io
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = SentenceTransformer('all-MiniLM-L6-v2')

def cosine_similarity(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

def extract_text_from_pdf(file_bytes):
    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(file_bytes):
    doc = docx.Document(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])

@app.post("/match")
async def match_cv_to_jobs(
    cv: UploadFile = File(...),
    jobs: str = Form(...)
):
    # Read CV
    cv_bytes = await cv.read()
    if cv.filename.endswith(".pdf"):
        cv_text = extract_text_from_pdf(cv_bytes)
    elif cv.filename.endswith(".docx"):
        cv_text = extract_text_from_docx(cv_bytes)
    else:
        cv_text = cv_bytes.decode("utf-8")

    job_list = json.loads(jobs)
    cv_embedding = model.encode(cv_text)

    results = []
    for job in job_list:
        job_embedding = model.encode(job["description"])
        skill_score = cosine_similarity(cv_embedding, model.encode(job.get("skills", ""))) * 40
        exp_score = cosine_similarity(cv_embedding, model.encode(job.get("experience", ""))) * 25
        edu_score = cosine_similarity(cv_embedding, model.encode(job.get("education", ""))) * 15
        loc_score = cosine_similarity(cv_embedding, model.encode(job.get("location", ""))) * 10
        sal_score = cosine_similarity(cv_embedding, model.encode(job.get("salary", ""))) * 10

        total = skill_score + exp_score + edu_score + loc_score + sal_score

        results.append({
            "job_id": job["id"],
            "title": job["title"],
            "company": job["company"],
            "match_score": round(total, 1),
            "breakdown": {
                "skills": round(skill_score, 1),
                "experience": round(exp_score, 1),
                "education": round(edu_score, 1),
                "location": round(loc_score, 1),
                "salary": round(sal_score, 1)
            }
        })

    results.sort(key=lambda x: x["match_score"], reverse=True)
    return {"matches": results}

@app.get("/health")
def health():
    return {"status": "ok"}