import { NextResponse } from "next/server";

function toStringValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function buildRedirectUrl(
  request: Request,
  pathname: string,
  result?: "error" | "success"
) {
  const url = new URL(
    pathname,
    process.env.NEXT_PUBLIC_SITE_URL ?? request.url
  );

  if (result) {
    url.searchParams.set(result, "1");
  }

  return url;
}

function redirectAfterPost(
  request: Request,
  pathname: string,
  result?: "error" | "success"
) {
  return NextResponse.redirect(
    buildRedirectUrl(request, pathname, result),
    { status: 303 }
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = toStringValue(formData.get("name"));
    const company = toStringValue(formData.get("company"));
    const phone = toStringValue(formData.get("phone"));
    const email = toStringValue(formData.get("email"));
    const message = toStringValue(formData.get("message"));

    /*
     * Validate required fields
     */
    if (!name || !email) {
      console.warn("[contact] Invalid form submission");

      return redirectAfterPost(
        request,
        "/",
        "error"
      );
    }

    /*
     * Send to Contact Lambda
     */
    const response = await fetch(
      "https://0gc19khxz3.execute-api.us-east-1.amazonaws.com/default/sendEuDealersemail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          phone,
          email,
          message,
        }),
      }
    );

    /*
     * Lambda error
     */
    if (!response.ok) {
      console.error(
        "[contact] Contact Lambda returned:",
        response.status
      );

      return redirectAfterPost(
        request,
        "/",
        "error"
      );
    }

    /*
     * Success
     */
    return redirectAfterPost(
      request,
      "/thank-you",
      "success"
    );
  } catch (error) {
    console.error(
      "[contact] Failed to send contact form:",
      error
    );

    return redirectAfterPost(
      request,
      "/",
      "error"
    );
  }
}