package dev.mikoto2000.maitta.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CsrfController {
    @GetMapping("/csrf")
    public ResponseEntity<Map<String, String>> csrf(CsrfToken csrfToken) {
        return ResponseEntity.ok(
            Map.of(
                "token", csrfToken.getToken(),
                "headerName", csrfToken.getHeaderName()));
    }
}
