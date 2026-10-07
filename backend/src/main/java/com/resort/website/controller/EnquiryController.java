package com.resort.website.controller;

import com.resort.website.dto.EnquiryRequest;
import com.resort.website.dto.EnquiryResponse;
import com.resort.website.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class EnquiryController {
    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }

    @PostMapping("/enquiries")
    public EnquiryResponse create(@Valid @RequestBody EnquiryRequest request) {
        return enquiryService.create(request);
    }
}
