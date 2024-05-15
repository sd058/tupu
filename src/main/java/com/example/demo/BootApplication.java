package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@MapperScan(basePackages = {"com.example.demo.dao"})
public class BootApplication {

    public static void main(String[] args) {
        SpringApplicationBuilder builder = new SpringApplicationBuilder(BootApplication.class);
        //builder.bannerMode(Banner.Mode.OFF).run(args);
        

        // 切换开发运行环境
        // builder.application().setAdditionalProfiles("test");
        builder.run(args);

        //SpringApplication.run(Boot0202Application.class, args);
    }

}