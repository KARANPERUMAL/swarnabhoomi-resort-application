package com.resort.website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class ResortApplication {
    public static void main(String[] args) {
        SpringApplication.run(ResortApplication.class, args);
    }
}
