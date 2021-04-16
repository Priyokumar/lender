package com.prilax.lm.account.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.prilax.lm.account.entity.LmEmi;
import com.prilax.lm.account.vo.LmEmiStatus;

@Service
public class LmEmiService {

	public List<LmEmi> generateEmi(Double amount, Integer tenure, Double interest, Date dateOfCreation) {

		Double interestInMonth = interest / (100 * 12);
		
		Double emi = amount * interestInMonth
				* ((Math.pow((1 + interestInMonth), tenure)) / ((Math.pow((1 + interestInMonth), tenure)) - 1));

		List<LmEmi> emis = new ArrayList<LmEmi>();
		
		for (int i = 1; i <= tenure; i++) {
			
			LmEmi emiTemp = new LmEmi();
			emiTemp.setEmiAmount(emi);
			emiTemp.setStatus(LmEmiStatus.NOT_PAID);
			
			Calendar calender = Calendar.getInstance();
			calender.setTime(dateOfCreation);
			calender.add(Calendar.MONTH, i);
			emiTemp.setDueDate(calender.getTime());
			emis.add(emiTemp);
			
		}

		return emis;
	}
	
	public Double generateMonthlyInterest(Double amount, Double interest) {

		Double monthlyInterest = amount * (interest / 100);

		return monthlyInterest;
	}

}
