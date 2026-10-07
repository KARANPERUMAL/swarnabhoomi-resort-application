import type { EnquiryPayload, EnquiryResponse } from "@/types/enquiry";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  const response = await fetch(`${API_URL}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as EnquiryResponse | null;

  if (!response.ok) {
    throw new Error(data?.message ?? "Something went wrong while sending your enquiry.");
  }

  return data ?? { success: true, message: "Thank you for your enquiry." };
}
