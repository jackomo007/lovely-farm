const axios = require("axios");

export type Event = {
    _id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    isFeatured: boolean;
    location: string;
    slug: string;
};

export async function getEvents(): Promise<Array<Event>> {
    const events = await axios('http://localhost:8000/event/');
    return events?.data
}

export async function getEvent(id: string) {
    const event = await axios(`http://localhost:8000/event/${id}`);
    return event?.data
}

export async function createEvent(event: any) {
    return event;
}
