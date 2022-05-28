from typing import Optional
import uuid
from pydantic import BaseModel, Field

class EventModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    date: str = Field(...)
    image: str = Field(...)
    isFeatured: bool = False
    location: str = Field(...)


    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",      
                "date":"2022-05-12",
                "title":"Programming for everyone",
                "description":"Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
                "image":"images/coding-event.jpg",
                "isFeatured":"false",
                "location":"Somestreet 25, 12345 San Somewhereo",
            }
        }


class UpdateEventModel(BaseModel):
    title: Optional[str]
    description: Optional[str]
    isFeatured: Optional[bool]
    location: Optional[str]

    class Config:
        schema_extra = {
           "example": {
                "title":"Programming for everyone",
                "description":"Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
                "image":"images/coding-event.jpg",
                "isFeatured":"false",
                "location":"Somestreet 25, 12345 San Somewhereo",
            }
        }
