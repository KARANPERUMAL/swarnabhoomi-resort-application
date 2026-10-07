package com.resort.website.dto;

import com.resort.website.entity.Gender;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record EnquiryRequest(
        @NotBlank @Size(max = 120) String guestName,
        @NotBlank @Size(max = 32) String phone,
        @NotBlank @Email @Size(max = 180) String email,
        @NotNull Gender gender,
        @Min(1) @Max(20) int adults,
        @Min(0) @Max(20) int children,
        @NotNull LocalDate checkIn,
        @NotNull LocalDate checkOut,
        @Size(max = 160) String selectedRoom,
        @Size(max = 1200) String message
) {}
