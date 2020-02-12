package com.app.OpenHack;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.concurrent.Executor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class OpenHackApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpenHackApplication.class, args);
	}

	@Bean
	public FirebaseApp getFireBaseApp() {
		try {
			FileInputStream refreshToken = new FileInputStream(new ClassPathResource(
				      "openhack-403f7-firebase-adminsdk-o1ab9-8d4ece50de.json").getFile());
	
			FirebaseOptions options;
		
			options = new FirebaseOptions.Builder()
			    .setCredentials(GoogleCredentials.fromStream(refreshToken))
			    .setServiceAccountId("firebase-adminsdk-o1ab9@openhack-403f7.iam.gserviceaccount.com")
			    .build();
			return FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			e.printStackTrace();
			try {
			FileInputStream refreshToken = new FileInputStream(new File("/home/ec2-user/openhack-403f7-firebase-adminsdk-o1ab9-8d4ece50de.json"));
	
			FirebaseOptions options;
		
			options = new FirebaseOptions.Builder()
			    .setCredentials(GoogleCredentials.fromStream(refreshToken))
			    .setServiceAccountId("firebase-adminsdk-o1ab9@openhack-403f7.iam.gserviceaccount.com")
			    .build();
			return FirebaseApp.initializeApp(options);
			}catch(Exception e1) {}
		}

		return null;
	}
	
	@Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("Pre-");
        executor.initialize();
        return executor;
    }
}
