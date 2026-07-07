from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI(title="APISchool FastAPI")

jinja2_template = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return jinja2_template.TemplateResponse(
        "index.html",
        {"request": request},
    )


@app.get("/Users/Dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    return jinja2_template.TemplateResponse(
        "Dashboard.html",
        {"request": request},
    )
