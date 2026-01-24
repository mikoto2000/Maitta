package dev.mikoto2000.maitta.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthStatusController {
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status(@AuthenticationPrincipal OAuth2User principal) {
        boolean authenticated = principal != null;
        String login = null;
        String name = null;
        if (principal != null) {
            name = principal.getAttribute("name");
            login = principal.getAttribute("login");
            if (login == null || login.isBlank()) {
                login = principal.getName();
            }
        }
        return ResponseEntity.ok(Map.of(
            "authenticated", authenticated,
            "login", login == null ? "" : login,
            "name", name == null ? "" : name));
    }
}
