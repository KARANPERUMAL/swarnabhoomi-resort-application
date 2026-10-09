package com.resort.website.service;

import com.resort.website.entity.Enquiry;
import com.resort.website.repository.EnquiryRepository;
import jakarta.mail.internet.MimeMessage;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {
    private static final String EXCEL_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    private static final String EXCEL_FILENAME = "swarnabhoomi-enquiries.xlsx";
    private static final String[] EXCEL_HEADERS = {
            "ID",
            "Created At",
            "Guest Name",
            "Phone",
            "Email",
            "Gender",
            "Adults",
            "Children",
            "Check In",
            "Check Out",
            "Nights",
            "Selected Room",
            "Message",
            "Status"
    };

    private final EnquiryRepository enquiryRepository;
    private final JavaMailSender mailSender;
    private final RestClient resendClient;
    private final String from;
    private final String resendFrom;
    private final String managerEmail;
    private final String resendApiKey;
    private final boolean enabled;

    public EmailService(
            EnquiryRepository enquiryRepository,
            JavaMailSender mailSender,
            @Value("${app.mail.from}") String from,
            @Value("${app.mail.resend.from:}") String resendFrom,
            @Value("${app.mail.manager}") String managerEmail,
            @Value("${app.mail.resend.api-key:}") String resendApiKey,
            @Value("${app.mail.enabled:false}") boolean enabled
    ) {
        this.enquiryRepository = enquiryRepository;
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

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(managerEmail);
            helper.setSubject("New Resort Enquiry - " + enquiry.getGuestName());
            helper.setText(buildPlainText(enquiry));
            helper.addAttachment(EXCEL_FILENAME, new ByteArrayResource(buildEnquiriesWorkbook()), EXCEL_CONTENT_TYPE);
            mailSender.send(message);
        } catch (RuntimeException error) {
            System.err.println("Failed to send enquiry notification email for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        } catch (Exception error) {
            System.err.println("Failed to build enquiry notification email for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        }
    }

    private void sendViaResend(Enquiry enquiry) {
        try {
            String sender = resendFrom.isBlank() ? from : resendFrom;
            Map<String, Object> payload = Map.of(
                    "from", sender,
                    "to", List.of(managerEmail),
                    "subject", "New Resort Enquiry - " + enquiry.getGuestName(),
                    "text", buildPlainText(enquiry),
                    "attachments", List.of(Map.of(
                            "filename", EXCEL_FILENAME,
                            "content", Base64.getEncoder().encodeToString(buildEnquiriesWorkbook()),
                            "content_type", EXCEL_CONTENT_TYPE
                    ))
            );

            resendClient.post()
                    .uri("/emails")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("User-Agent", "swarnabhoomi-resort-api/1.0")
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RuntimeException error) {
            System.err.println("Failed to send Resend enquiry notification email for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        } catch (IOException error) {
            System.err.println("Failed to build enquiry attachment for enquiry #" + enquiry.getId() + ": " + error.getMessage());
        }
    }

    private byte[] buildEnquiriesWorkbook() throws IOException {
        List<Enquiry> enquiries = enquiryRepository.findAllByOrderByCreatedAtAscIdAsc();
        DateTimeFormatter timestampFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                .withZone(ZoneId.of("Asia/Kolkata"));

        try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            var sheet = workbook.createSheet("Enquiries");
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);

            Row headerRow = sheet.createRow(0);
            for (int column = 0; column < EXCEL_HEADERS.length; column++) {
                var cell = headerRow.createCell(column);
                cell.setCellValue(EXCEL_HEADERS[column]);
                cell.setCellStyle(headerStyle);
            }

            for (int index = 0; index < enquiries.size(); index++) {
                Enquiry enquiry = enquiries.get(index);
                Row row = sheet.createRow(index + 1);
                row.createCell(0).setCellValue(valueOrDash(enquiry.getId()));
                row.createCell(1).setCellValue(enquiry.getCreatedAt() == null ? "-" : timestampFormatter.format(enquiry.getCreatedAt()));
                row.createCell(2).setCellValue(valueOrDash(enquiry.getGuestName()));
                row.createCell(3).setCellValue(valueOrDash(enquiry.getPhone()));
                row.createCell(4).setCellValue(valueOrDash(enquiry.getEmail()));
                row.createCell(5).setCellValue(valueOrDash(enquiry.getGender()));
                row.createCell(6).setCellValue(enquiry.getAdults());
                row.createCell(7).setCellValue(enquiry.getChildren());
                row.createCell(8).setCellValue(valueOrDash(enquiry.getCheckIn()));
                row.createCell(9).setCellValue(valueOrDash(enquiry.getCheckOut()));
                row.createCell(10).setCellValue(enquiry.getNumberOfNights());
                row.createCell(11).setCellValue(valueOrDash(enquiry.getSelectedRoom()));
                row.createCell(12).setCellValue(valueOrDash(enquiry.getMessage()));
                row.createCell(13).setCellValue(valueOrDash(enquiry.getStatus()));
            }

            for (int column = 0; column < EXCEL_HEADERS.length; column++) {
                sheet.autoSizeColumn(column);
            }

            workbook.write(output);
            return output.toByteArray();
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

    private String valueOrDash(Object value) {
        return value == null ? "-" : value.toString();
    }
}
