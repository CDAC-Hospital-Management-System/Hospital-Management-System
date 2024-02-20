package com.sunbeam.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailSenderService {
	
	@Autowired
	private JavaMailSender mailsender;
	
	 @Value("${spring.mail.username}")
	private String senderEmail;
	
	public void sendEmail(String toEmail, String subject,String body)
	{
		SimpleMailMessage message= new SimpleMailMessage();
		message.setFrom(senderEmail);
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		
		
		if(mailsender!=null)
		mailsender.send(message);
		
		System.out.println("Mail Send SucessFully....");
	}
	

}
