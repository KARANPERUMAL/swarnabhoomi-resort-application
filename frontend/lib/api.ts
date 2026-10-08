import type { EnquiryPayload, EnquiryResponse } from "@/types/enquiry";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const REQUEST_TIMEOUT_MS = 10_000;

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as EnquiryResponse | null;

    if (!response.ok) {
      throw new Error(data?.message ?? "Something went wrong while sending your enquiry.");
    }

    return data ?? { success: true, message: "Thank you for your enquiry." };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The enquiry request is taking too long. Please try again in a moment.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
