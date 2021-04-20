package com.prilax.lm.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prilax.lm.dashboard.service.LmDashboardService;

@RestController
@RequestMapping("/api/v1/dashboard")
public class LmDashboardController {

	@Autowired
	private LmDashboardService dashboardService;

	@GetMapping(value = "/investment-vs-repayment")
	public String findRepaymentAgainstInvestment() {
		return dashboardService.findRepaymentAgainstInvestment();
	}
	
	@GetMapping(value = "/investment-vs-repayment-by-customerId/{customerId}")
	public String findRepaymentAgainstInvestmentByCustomerId(@PathVariable("customerId") String customerId) {
		return dashboardService.findRepaymentAgainstInvestmentByCustomerId(customerId);
	}
	
	@GetMapping(value = "/total-investment")
	public Double findTotalInvestment() {
		return dashboardService.findTotalInvestment();
	}
	
	@GetMapping(value = "/current-last-month-repayments")
	public String findCurrentAndLastMonthRepayments() {
		return dashboardService.findCurrentAndLastMonthRepayments();
	}
	
	@GetMapping(value = "/month-wise-repayments")
	public String findALLMonthRepayments() {
		return dashboardService.findMonthWiseRepayments();
	}
}
