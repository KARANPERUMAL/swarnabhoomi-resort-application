package com.resort.website.service;

import com.resort.website.dto.EnquiryRequest;
import com.resort.website.dto.EnquiryResponse;
import com.resort.website.entity.Enquiry;
import com.resort.website.entity.EnquiryStatus;
import com.resort.website.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;

@Service
public class EnquiryService {
    private final EnquiryRepository enquiryRepository;
    private final EmailService emailService;

    public EnquiryService(EnquiryRepository enquiryRepository, EmailService emailService) {
        this.enquiryRepository = enquiryRepository;
        this.emailService = emailService;
    }

    @Transactional
    public EnquiryResponse create(EnquiryRequest request) {
        long nights = ChronoUnit.DAYS.between(request.checkIn(), request.checkOut());
        if (nights <= 0) {
            throw new IllegalArgumentException("Check-out must be after check-in.");
        }

        Enquiry enquiry = new Enquiry();
        enquiry.setGuestName(request.guestName().trim());
        enquiry.setPhone(request.phone().trim());
        enquiry.setEmail(request.email().trim());
        enquiry.setGender(request.gender());
        enquiry.setAdults(request.adults());
        enquiry.setChildren(request.children());
        enquiry.setCheckIn(request.checkIn());
        enquiry.setCheckOut(request.checkOut());
        enquiry.setNumberOfNights(nights);
        enquiry.setSelectedRoom(blankToNull(request.selectedRoom()));
        enquiry.setMessage(blankToNull(request.message()));
        enquiry.setStatus(EnquiryStatus.NEW);

        Enquiry saved = enquiryRepository.save(enquiry);
        emailService.sendManagerNotification(saved);

        return new EnquiryResponse(
                true,
                saved.getId(),
                "Your request has been received. Our resort team will contact you shortly.",
                saved.getNumberOfNights()
        );
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
