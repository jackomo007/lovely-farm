from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import EventModel, UpdateEventModel

router = APIRouter()


@router.post("/", response_description="Add new event")
async def create_event(request: Request, event: EventModel = Body(...)):
    event = jsonable_encoder(event)
    new_event = await request.app.mongodb["events"].insert_one(event)
    created_event = await request.app.mongodb["events"].find_one(
        {"_id": new_event.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_event)

@router.get("/", response_description="List all events")
async def list_events(request: Request):
    events = []
    for doc in await request.app.mongodb["events"].find().to_list(length=100):
        events.append(doc)
    return events

@router.get("/{id}", response_description="Get a single event")
async def show_event(id: str, request: Request):
    if (event := await request.app.mongodb["events"].find_one({"_id": id})) is not None:
        return event

    raise HTTPException(status_code=404, detail=f"Event {id} not found")


@router.put("/{id}", response_description="Update a event")
async def update_event(id: str, request: Request, event: UpdateEventModel = Body(...)):
    event = {k: v for k, v in event.dict().items() if v is not None}

    if len(event) >= 1:
        update_result = await request.app.mongodb["events"].update_one(
            {"_id": id}, {"$set": event}
        )

        if update_result.modified_count == 1:
            if (
                updated_event := await request.app.mongodb["events"].find_one({"_id": id})
            ) is not None:
                return updated_event

    if (
        existing_event := await request.app.mongodb["events"].find_one({"_id": id})
    ) is not None:
        return existing_event

    raise HTTPException(status_code=404, detail=f"Event {id} not found")


@router.delete("/{id}", response_description="Delete Event")
async def delete_event(id: str, request: Request):
    delete_result = await request.app.mongodb["events"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Event {id} not found")
