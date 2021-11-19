from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

user = {}

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/paintplz/v1/login")
async def login(request: LoginRequest):
    if request.username not in user:
        return {
            "log" : "failed to login"
        }
    
    if user[request.username]["password"] != request.password:
        return {
            "log" : "failed to login"
        }
    
    return user[request.username]


class RegisterRequest(BaseModel):
    username: str
    name: str
    surname: str
    email: str
    citizenID: str
    password: str
    userType: bool
    minimumPriceRate: Optional[int] = 0
    maximumPriceRate: Optional[int] = 0
    biography: Optional[str] = ""

@app.post("/api/paintplz/v1/register")
async def register(request: RegisterRequest):
    user[request.username] = request
    return {}

@app.get("/api/paintplz/v1/tags")
def get_tags(q: Optional[str] = None):
    return {
        "tags" : [ 
            {
                "tagID": 100,
                "tagName": "3D"
            },
            {
                "tagID": 103,
                "tagName": "House"
            }
        ]
    }


@app.get("/api/paintplz/v1/artist_profile/{username}")
def get_artist_profile(username: str, q: Optional[str] = None):
    if username is not "DengXiaoPing":
        return {
            "log": "Can't Find that user"
        }
    else:
        return {
            "username" : "DengXiaoPing",
            "name" : "XiaoPing",
            "surname" : "Deng",
            "rating" : 4.9,
            "minimunPriceRate": 1000,
            "maximumPriceRate": 2000,
            "Biography": "I’m the fastest man alive.",
            "artwork" : [
                {
                    "artworkID" : 25,
                    "title" : "Bastille Day",
                    "description" : "Bastille Day is the common name given in English-speaking countries to the national day of France",
                    "uploadDate" : "2016-11-11 20:20:20.444",
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Bastille_Exterior_1790_or_1791.jpg/375px-Bastille_Exterior_1790_or_1791.jpg",
                    "artTag": [ 
                    {
                        "tagID": 100,
                        "tagName": "3D"
                    },
                    {
                    "tagID": 103,
                    "tagName": "House"
                    }
                ]
                },
                {
                    "artworkID" : 26,
                    "title" : "Guillotine",
                    "description" : "apparatus designed for efficiently carrying out executions by beheading",
                    "uploadDate" : "2017-11-11 20:20:20.444",
                    "url" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Guillotine_Luxembourg_01.jpg/675px-Guillotine_Luxembourg_01.jpg",
                    "artTag": [ 
                    {
                        "tagID": 100,
                        "tagName": "3D"
                    },
                    {
                    "tagID": 103,
                    "tagName": "House"
                    }
                ]
                }
            ]
        }
