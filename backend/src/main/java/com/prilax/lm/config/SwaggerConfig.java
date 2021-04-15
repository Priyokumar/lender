package com.prilax.lm.config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
    public Docket api() { 
		
		 Contact contact = new Contact("priyon999@gmail.com", "Priyo", "www.priyokumar.in");
		 @SuppressWarnings("rawtypes")
		ApiInfo apiInfo = new ApiInfo("My School REST APIs", "APIs for My School.", "0.0.1", "",
				 contact, "", "", new ArrayList<VendorExtension>());
		
		
        return new Docket(DocumentationType.SWAGGER_2)
          .apiInfo(apiInfo)
          .select()                                  
          .apis(RequestHandlerSelectors.basePackage("com.prilax"))              
          .paths(PathSelectors.any())                          
          .build();                                           
    }
	
}
