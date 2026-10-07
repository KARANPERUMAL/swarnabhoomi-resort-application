package com.resort.website.dto;

public record EnquiryResponse(
        boolean success,
        Long enquiryId,
        String message,
        long numberOfNights
) {}
