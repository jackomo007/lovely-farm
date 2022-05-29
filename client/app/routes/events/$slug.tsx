import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getEvent } from "~/models/event.server";
import type { Event } from "~/models/event.server";

type LoaderData = { event: Event; html: string };

export const loader: LoaderFunction = async ({
    params,
}) => {
    invariant(params.slug, `params.slug is required`);

    const event = await getEvent(params.slug);
    invariant(event, `Post not found: ${params.slug}`);    
    
    const html = marked(event.markdown);
    return json<LoaderData>({ event, html });
};

export default function EventSlug() {
    const { event, html } = useLoaderData<LoaderData>();
    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {event.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    );
}