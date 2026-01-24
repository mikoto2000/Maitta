package dev.mikoto2000.maitta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class MaittaApplication {

  public static void main(String[] args) {
    SpringApplication.run(MaittaApplication.class, args);
  }
}
