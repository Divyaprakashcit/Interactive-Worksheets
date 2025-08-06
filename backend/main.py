from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Any
from datetime import datetime
import os
import json
import re
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder setup
os.makedirs("backend/data", exist_ok=True)
os.makedirs("backend/reports", exist_ok=True)

# Prettify key filter
def prettify_key(key) -> str:
    if not isinstance(key, str):
        key = str(key)
    key = re.sub(r'(?<!^)(?=[A-Z])', ' ', key)
    return key.title()

# Templates setup
env = Environment(loader=FileSystemLoader("backend/templates"))
env.filters['prettify'] = prettify_key

# Routes
@app.post("/submit")
async def submit_worksheet(request: Request):
    data = await request.json()
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    filename = f"worksheet_{timestamp}.json"
    filepath = os.path.join("backend/data", filename)

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

    return {"message": "Saved successfully", "filename": filename}

from fastapi.responses import FileResponse, Response

@app.get("/report/{filename}")
async def generate_pdf(filename: str):
    json_path = os.path.join("backend/data", filename)
    if not os.path.exists(json_path):
        return JSONResponse(status_code=404, content={"error": "File not found"})

    with open(json_path, 'r') as f:
        data = json.load(f)

    template = env.get_template("report_template.html")
    html_content = template.render(data=data, filename=filename)

    pdf_filename = filename.replace(".json", ".pdf")
    pdf_path = os.path.join("backend/reports", pdf_filename)
    HTML(string=html_content).write_pdf(pdf_path)

    # Manually create the response with CORS headers
    response = FileResponse(
        path=pdf_path,
        media_type='application/pdf',
        filename=pdf_filename
    )
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

