package com.resort.website.service;

import com.resort.website.entity.Enquiry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final String from;
    private final String managerEmail;
    private final boolean enabled;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${app.mail.from}") String from,
            @Value("${app.mail.manager}") String managerEmail,
            @Value("${app.mail.enabled:false}") boolean enabled
    ) {
        this.mailSender = mailSender;
        this.from = from;
        this.managerEmail = managerEmail;
        this.enabled = enabled;
    }

    @Async
    public void sendManagerNotification(Enquiry enquiry) {
        if (!enabled) {
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(managerEmail);
        message.setSubject("New Resort Enquiry - " + enquiry.getGuestName());
        message.setText("""
                NEW RESORT ENQUIRY

                Guest Details
                -------------
                Name: %s
                Gender: %s
                Phone: %s
                Email: %s

                Stay Details
                ------------
                Check-in: %s
                Check-out: %s
                Number of nights: %d
                Adults: %d
                Children: %d

                Room
                ----
                Selected room: %s

                Message
                -------
                %s

                Enquiry ID: %d
                Created at: %s
                """.formatted(
                enquiry.getGuestName(),
                enquiry.getGender(),
                enquiry.getPhone(),
                enquiry.getEmail(),
                enquiry.getCheckIn(),
                enquiry.getCheckOut(),
                enquiry.getNumberOfNights(),
                enquiry.getAdults(),
                enquiry.getChildren(),
                valueOrDash(enquiry.getSelectedRoom()),
                valueOrDash(enquiry.getMessage()),
                enquiry.getId(),
                enquiry.getCreatedAt()
        ));
        try {
            mailSender.send(message);
        } catch (RuntimeException error) {
            System.err.println("Failed to send enquiry notification email for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        }
    }

    private String valueOrDash(String value) {
        return value == null || value.isBlank() ? "-" : value;
    }
}
