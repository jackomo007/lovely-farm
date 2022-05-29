import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { createEvent } from "~/models/event.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

type ActionData =
    | {
        title: null | string;
        slug: null | string;
        markdown: null | string;
    }
    | undefined;

export const action: ActionFunction = async ({ request }) => {
    await new Promise((res) => setTimeout(res, 1000));

    const formData = await request.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const markdown = formData.get("markdown");

    const errors: ActionData = {
        title: title ? null : "Title is required",
        slug: slug ? null : "Slug is required",
        markdown: markdown ? null : "Markdown is required",
    };

    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );

    if (hasErrors) {
        return json<ActionData>(errors);
    }

    await createEvent({ title, slug, markdown });

    return redirect("/events");
};

export default function NewEvent() {
    const errors = useActionData();

    const transition = useTransition();
    const isCreating = Boolean(transition.submission);

    return (
        <Form method="post">
          <p>
            <label>
              Post Title:{" "}
              {errors?.title ? (
                <em className="text-red-600">{errors.title}</em>
              ) : null}
              <input type="text" name="title" className={inputClassName} />
            </label>
          </p>
          <p>
            <label>
              Post Slug:{" "}
              {errors?.slug ? (
                <em className="text-red-600">{errors.slug}</em>
              ) : null}
              <input type="text" name="slug" className={inputClassName} />
            </label>
          </p>
          <p>
            <label htmlFor="markdown">
              Markdown:{" "}
              {errors?.markdown ? (
                <em className="text-red-600">
                  {errors.markdown}
                </em>
              ) : null}
            </label>
            <br />
            <textarea
              id="markdown"
              rows={20}
              name="markdown"
              className={`${inputClassName} font-mono`}
            />
          </p>
          <p className="text-right">
            <button
              type="submit"
              disabled={isCreating}
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            >
              {isCreating ? "Creating..." : "Create Event"}
            </button>
          </p>
        </Form>
      );
    }