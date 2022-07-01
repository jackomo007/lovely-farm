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
      {events.map((event: any) => (
        <div key={event._id} className="antialiased px-5 py-52">
          <div className="min-h-full flex flex-col justify-center">
            <div className="relative flex items-center justify-end z-10">
              <img className="absolute w-96 h-96 object-cover rounded-lg shadow-md" src={event.image} alt={event.title} />
            </div>
            <div className="relative px-4 -mt-16">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-screen-lg">
                <div className="flex items-baseline">
                  <span className="inline-block bg-blue-400  text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                    <Link
                      to={event._id}
                      className="text-white"
                    >
                      {event.title}
                    </Link>
                  </span>
                </div>
                <h4 className="mt-1 font-semibold text-lg leading-tight truncate"> {event.description}</h4>
                <div className="mt-1">
                  {event.location}
                  <span className="text-gray-600 text-sm"> / {event.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Outlet />
    </main>
  );
}