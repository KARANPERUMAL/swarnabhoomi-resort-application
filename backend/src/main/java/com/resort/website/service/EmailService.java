package com.resort.website.service;

import com.resort.website.entity.Enquiry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final RestClient resendClient;
    private final String from;
    private final String resendFrom;
    private final String managerEmail;
    private final String resendApiKey;
    private final boolean enabled;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${app.mail.from}") String from,
            @Value("${app.mail.resend.from:}") String resendFrom,
            @Value("${app.mail.manager}") String managerEmail,
            @Value("${app.mail.resend.api-key:}") String resendApiKey,
            @Value("${app.mail.enabled:false}") boolean enabled
    ) {
        this.mailSender = mailSender;
        this.resendClient = RestClient.builder().baseUrl("https://api.resend.com").build();
        this.from = from;
        this.resendFrom = resendFrom;
        this.managerEmail = managerEmail;
        this.resendApiKey = resendApiKey;
        this.enabled = enabled;
    }

    @Async
    public void sendManagerNotification(Enquiry enquiry) {
        if (!enabled) {
            return;
        }

        if (!resendApiKey.isBlank()) {
            sendViaResend(enquiry);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(managerEmail);
        message.setSubject("New Resort Enquiry - " + enquiry.getGuestName());
        message.setText(buildPlainText(enquiry));
        try {
            mailSender.send(message);
        } catch (RuntimeException error) {
            System.err.println("Failed to send enquiry notification email for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        }
    }

    private void sendViaResend(Enquiry enquiry) {
        String sender = resendFrom.isBlank() ? from : resendFrom;
        Map<String, Object> payload = Map.of(
                "from", sender,
                "to", List.of(managerEmail),
                "subject", "New Resort Enquiry - " + enquiry.getGuestName(),
                "text", buildPlainText(enquiry)
        );

        try {
            resendClient.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("User-Agent", "swarnabhoomi-resort-api/1.0")
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RuntimeException error) {
            System.err.println("Failed to send Resend enquiry notification email for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        }
    }

    private String buildPlainText(Enquiry enquiry) {
        return """
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
        );
    }

    private String valueOrDash(String value) {
        return value == null || value.isBlank() ? "-" : value;
    }
}
