package dev.mikoto2000.maitta.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableConfigurationProperties(CorsProperties.class)
public class WebMvcCorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(CorsProperties corsProperties) {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                if (!corsProperties.isEnabled()) {
                    return;
                }

                CorsRegistration registration = registry.addMapping("/**");
                if (!corsProperties.getAllowedOrigins().isEmpty()) {
                    registration.allowedOrigins(corsProperties.getAllowedOrigins().toArray(new String[0]));
                } else {
                    registration.allowedOriginPatterns("*");
                }

                if (!corsProperties.getAllowedMethods().isEmpty()) {
                    registration.allowedMethods(corsProperties.getAllowedMethods().toArray(new String[0]));
                } else {
                    registration.allowedMethods("*");
                }

                if (!corsProperties.getAllowedHeaders().isEmpty()) {
                    registration.allowedHeaders(corsProperties.getAllowedHeaders().toArray(new String[0]));
                } else {
                    registration.allowedHeaders("*");
                }

                if (!corsProperties.getExposedHeaders().isEmpty()) {
                    registration.exposedHeaders(corsProperties.getExposedHeaders().toArray(new String[0]));
                }

                registration.allowCredentials(corsProperties.isAllowCredentials());
                if (corsProperties.getMaxAge() != null) {
                    registration.maxAge(corsProperties.getMaxAge().toSeconds());
                }
            }
        };
    }
}
