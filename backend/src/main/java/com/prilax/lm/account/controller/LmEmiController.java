package com.prilax.lm.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prilax.lm.account.dto.Emi;
import com.prilax.lm.account.service.LmEmiService;

@RestController
@RequestMapping("/api/v1/emis")
public class LmEmiController {

	@Autowired
	private LmEmiService emiService;

	@GetMapping(value = "/{accountNo}")
	public List<Emi> findAccount(@PathVariable("accountNo") String accountNo) {
		return emiService.findEmiListByAccountNo(accountNo);
	}

}
