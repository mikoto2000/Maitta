package dev.mikoto2000.maitta.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        @Value("${app.security.oauth2.frontend-success-url}") String frontendSuccessUrl) throws Exception {
        CookieCsrfTokenRepository csrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        csrfTokenRepository.setHeaderName("X-XSRF-TOKEN");

        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.csrfTokenRepository(csrfTokenRepository))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(
                    "/",
                    "/error",
                    "/login",
                    "/oauth2/**",
                    "/login/oauth2/**",
                    "/api/csrf",
                    "/h2-console/**")
                .permitAll()
                .anyRequest().authenticated())
            .oauth2Login(oauth2 -> oauth2.successHandler(
                (request, response, authentication) -> response.sendRedirect(frontendSuccessUrl)))
            .logout(logout -> logout.logoutSuccessHandler(
                (request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_FOUND);
                    response.setHeader("Location", frontendSuccessUrl);
                }));

        http.exceptionHandling(exceptions -> exceptions
            .defaultAuthenticationEntryPointFor(
                authenticationEntryPoint(),
                request -> request.getRequestURI().startsWith("/api/"))
            .accessDeniedHandler(accessDeniedHandler()));
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));
        http.addFilterAfter(new CsrfCookieFilter(), CsrfFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            logger.warn("AuthenticationEntryPoint: method={}, uri={}, message={}",
                request.getMethod(), request.getRequestURI(), authException.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        };
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            logger.warn("AccessDeniedHandler: method={}, uri={}, message={}",
                request.getMethod(), request.getRequestURI(), accessDeniedException.getMessage());
            response.setStatus(HttpStatus.FORBIDDEN.value());
        };
    }
}
