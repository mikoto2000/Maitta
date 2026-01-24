package dev.mikoto2000.maitta.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthUserController {
    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> me(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        String name = principal.getAttribute("name");
        String login = principal.getAttribute("login");
        if (login == null || login.isBlank()) {
            login = principal.getName();
        }
        if (login == null || login.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return ResponseEntity.ok(Map.of(
            "name", name == null ? "" : name,
            "login", login));
    }
}
