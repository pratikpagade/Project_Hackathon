package com.app.OpenHack.util;

import java.util.concurrent.Executor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class SendEmail {

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	Executor executor;
	
	
	public void sendEmail(String to,String subject,String body) {
		executor.execute(new Runnable() {
			
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("Sending email...");

			    SimpleMailMessage message = new SimpleMailMessage();
			    message.setTo(to);
			    message.setFrom("manish0338@gmail.com");
			    message.setSubject(subject);
			    message.setText(body);
			    javaMailSender.send(message);
			}
		});
		
	}
	
}
