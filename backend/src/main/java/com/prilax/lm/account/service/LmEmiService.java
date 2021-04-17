package com.prilax.lm.account.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.account.dto.Emi;
import com.prilax.lm.account.entity.LmAccount;
import com.prilax.lm.account.entity.LmEmi;
import com.prilax.lm.account.repository.LmEmiRepository;
import com.prilax.lm.account.vo.LmEmiStatus;

@Service
public class LmEmiService {
	
	@Autowired
	private LmEmiRepository emiRepository;
	
	ModelMapper modelMapper = new ModelMapper();
	
	public List<Emi> findEmiListByAccountNo(String accountNo) {
		
		List<LmEmi> emis = emiRepository.findListByAccountNo(accountNo);
		
		List<Emi> emisDto = new ArrayList<>();
		emis.forEach(emi -> {
			Emi emiDto = modelMapper.map(emi, Emi.class);
			emisDto.add(emiDto);
		});
		return emisDto;
	}

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
	
	public Double updateClosingBalance(LmAccount account) {
		return 0.0;
	}

}
