package com.musicme.musicme;

import com.musicme.musicme.config.AppProperties;
import com.musicme.musicme.config.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({AppProperties.class, FileStorageProperties.class})
public class MusicmeApplication{

	public static void main(String[] args) {
		SpringApplication.run(MusicmeApplication.class, args);
	}
	
}
