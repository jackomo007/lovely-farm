import { json } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";

import { getEvents } from "~/models/event.server";

type LoaderData = {
  events: Awaited<ReturnType<typeof getEvents>>;
};

export const loader = async () => {
  return json<LoaderData>({
    events: await getEvents(),
  });
};

export default function Events() {
  const { events } = useLoaderData<LoaderData>();
  return (
    <main>
      <h1>Events</h1>
      <ul>
        {events.map((event: any) => (
          <li key={event._id}>
            <Link
              to={event._id}
              className="text-blue-600 underline"
            >
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </main>
  );
}