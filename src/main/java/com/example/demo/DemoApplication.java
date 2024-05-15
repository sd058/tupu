package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        try {
            Runtime.getRuntime().exec("cmd /c start http://localhost:8080/");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
