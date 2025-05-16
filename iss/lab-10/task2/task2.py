'''
TASK: Make a page that has information about you, use Jinja and FastApi for the same

    Route 1: Home Page (3 Marks)
        Basic details about you.

    Route 2: Hobbies Page (4 Marks)
        All that you like to do

    Route 3: Resume Page (3 Marks)
        Should be a basic formal description about you
        
    Things to keep in mind. You should be able to go from 1 page to the other.
    You have have header/footer in your css page.
    Keep one cs page only.
    Keep one js page with 2 functionality ( upto you )
    use base and inheritance property here

'''

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn

app = FastAPI()

# Mount static files directory for CSS and JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Route 1: Home Page
@app.get("/", response_class=HTMLResponse)
async def home_page(request: Request):
    return templates.TemplateResponse(
        "home.html", 
        {"request": request, "title": "Home"}
    )

# Route 2: Hobbies Page
@app.get("/hobbies", response_class=HTMLResponse)
async def hobbies_page(request: Request):
    hobbies = [
        {"name": "Singing", "description": "Passionate about vocal performance", "icon": "music"},
        {"name": "Art", "description": "Creative expression through visual arts", "icon": "palette"},
        {"name": "Music", "description": "Exploring various genres and instruments", "icon": "headphones"},
        {"name": "Painting", "description": "Creating colorful visual compositions", "icon": "brush"},
        {"name": "Coding", "description": "Developing software solutions and applications", "icon": "code"},
        {"name": "Dancing", "description": "Expressing myself through movement and rhythm", "icon": "music-note"}
    ]
    return templates.TemplateResponse(
        "hobbies.html", 
        {"request": request, "title": "Hobbies", "hobbies": hobbies}
    )

# Route 3: Resume Page
@app.get("/resume", response_class=HTMLResponse)
async def resume_page(request: Request):
    education = [
        {"institution": "International Institute of Information Technology, Hyderabad", "degree": "Bachelor of Technology (B.Tech), Computer Science", "year": "2024-Present"},
        {"institution": "G.D.Birla Centre for Education", "degree": "Higher Secondary Education", "year": "Previous Years"}
    ]
    
    experience = [
        {"company": "Volunteer Experience", "role": "Volunteer", "period": "Recent"},
        {"company": "JBNSTS Scholarship", "role": "Scholarship Recipient", "period": "2022"}
    ]
    
    skills = ["Python", "HTML/CSS", "JavaScript", "Data Structures", "Algorithms", "Problem Solving", 
              "Web Development", "FastAPI", "Creative Arts", "Communication"]
    
    certifications = [
        "JBNSTS Scholarship (2022)",
        "Python for Data Science and Machine Learning Bootcamp (Udemy)",
        "Web Development Masterclass (Udemy)",
        "Introduction to Computer Science (Coursera)"
    ]
    
    social_links = {
        "github": "https://github.com/chandranisaha",
        "linkedin": "Your LinkedIn Profile" # Replace with your actual LinkedIn profile link
    }
    
    contact_info = {
        "email": "chandranis026@gmail.com",
        "mobile": "9007434664",
        "location": "Hyderabad, India"
    }
    
    return templates.TemplateResponse(
        "resume.html", 
        {
            "request": request, 
            "title": "Resume",
            "education": education,
            "experience": experience,
            "skills": skills,
            "certifications": certifications,
            "social_links": social_links,
            "contact_info": contact_info
        }
    )

# Route 4: Contact Page
@app.get("/contact", response_class=HTMLResponse)
async def contact_page(request: Request):
    contact_info = {
        "email": "chandranis026@gmail.com",
        "mobile": "9007434664",
        "location": "Hyderabad, India"
    }
    
    return templates.TemplateResponse(
        "contact.html", 
        {"request": request, "title": "Contact Me", "contact_info": contact_info}
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
