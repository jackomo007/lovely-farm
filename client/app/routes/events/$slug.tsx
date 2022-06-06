import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getEvent } from "~/models/event.server";
import type { Event } from "~/models/event.server";

type LoaderData = { event: Event };

export const loader: LoaderFunction = async ({
    params,
}) => {
    invariant(params.slug, `params.slug is required`);

    const event = await getEvent(params.slug);
    invariant(event, `Event not found: ${params.slug}`);

    return json<LoaderData>({ event });
};

export default function EventSlug() {
    const { event } = useLoaderData<LoaderData>();
    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {event?.title}
            </h1>
            <img className="my-6 border-b-2 text-center" src={event?.image} width={100} height={100} />
            <h2 className="my-6 border-b-2 text-center text-2xl">
                {event?.description}
            </h2>
            <p className="my-6 border-b-2 text-center text-1xl">
                {event?.location}
            </p>
        </main>
    );
}