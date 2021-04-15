package com.prilax.lm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {

		SpringApplication.run(ServerApplication.class, args);
		
		BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
		String sc = bc.encode("admin");
		System.out.println("\n\n\n");
		System.out.println(sc);
		System.out.println("\n\n\n");

	}

}
