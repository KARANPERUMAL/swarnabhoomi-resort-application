export type Gender = "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY";

export interface EnquiryPayload {
  guestName: string;
  phone: string;
  email: string;
  gender: Gender;
  adults: number;
  children: number;
  checkIn: string;
  checkOut: string;
  selectedRoom?: string;
  message?: string;
}

export interface EnquiryResponse {
  success: boolean;
  enquiryId?: number;
  message: string;
  numberOfNights?: number;
}
