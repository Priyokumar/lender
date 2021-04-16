package com.prilax.lm.account.service;

import java.util.Date;
import java.util.List;

import com.prilax.lm.account.entity.LmEmi;

public class Ass {

	public static void main(String[] args) {
		
		List<LmEmi> emis = new LmEmiService().generateEmi(100000.00, 60, 11.00, new Date());
		
		System.out.println(emis);

	}

}
