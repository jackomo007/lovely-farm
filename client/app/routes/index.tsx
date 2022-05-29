import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="bg-gray-900 p-20 h-screen flex justify-center items-start flex-col">
    <Link
      to="/events"
      className="text-xl text-red-600 underline"
    >
      Go to Events
    </Link>
  </div>
  );
}
