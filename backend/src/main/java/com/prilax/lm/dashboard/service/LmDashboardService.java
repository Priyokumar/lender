package com.prilax.lm.dashboard.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.prilax.lm.account.entity.LmAccount;
import com.prilax.lm.account.repository.LmAccountRepository;
import com.prilax.lm.repayment.entity.LmRepayment;
import com.prilax.lm.repayment.repository.LmRepaymentRepository;
import com.prilax.lm.util.LmUtil;

@Service
public class LmDashboardService {

	@Autowired
	private LmAccountRepository accountRepository;

	@Autowired
	private LmRepaymentRepository repaymentRepository;

	public String findRepaymentAgainstInvestment() {

		Double totalInvested = 0.0;

		List<LmAccount> accounts = accountRepository.findDisburedAccounts();

		if (LmUtil.isAllPresent(accounts)) {
			for (LmAccount account : accounts) {
				totalInvested += account.getLead().getRequestedAmount();
			}
		}

		List<LmRepayment> repayments = repaymentRepository.findPaidRepayments();

		Double totalRepayment = calculateTotal(repayments);

		Gson gson = new Gson();

		HashMap<String, Double> map = new HashMap<>();

		map.put("totalInvested", totalInvested);
		map.put("totalInterestCollection", totalRepayment);

		String jsonData = gson.toJson(map);

		return jsonData;
	}

	public Double findTotalInvestment() {

		Double totalInvested = 0.0;

		List<LmAccount> accounts = accountRepository.findDisburedAccounts();

		if (LmUtil.isAllPresent(accounts)) {
			for (LmAccount account : accounts) {
				totalInvested += account.getLead().getRequestedAmount();
			}
		}

		return totalInvested;
	}

	public String findCurrentAndLastMonthRepayments() {

		LocalDate now = LocalDate.now();
		int month = now.getMonthValue();
		int year = now.getYear();

		String currentMonthYear = year + "-" + month;
		String lastMonth = "";

		if (month == 0) {
			lastMonth = (year - 1) + "-" + 12;
		} else {
			lastMonth = year + "-" + (month - 1);
		}

		List<LmRepayment> lastMonthepayments = repaymentRepository.findByYearMonth(lastMonth);
		
		System.out.println("lastMonthepayments -- "+lastMonthepayments.size());

		Double totallastMonthInterestCollection = calculateTotal(lastMonthepayments);

		List<LmRepayment> currentMonthepayments = repaymentRepository.findByYearMonth(currentMonthYear);
		
		System.out.println("currentMonthepayments -- "+currentMonthepayments.size());

		Double totalCurrentMonthInterestCollection = calculateTotal(currentMonthepayments);

		Gson gson = new Gson();

		HashMap<String, Double> map = new HashMap<>();

		map.put("lastMonthRepayment", totallastMonthInterestCollection);
		map.put("currentMonthRepayment", totalCurrentMonthInterestCollection);

		String jsonData = gson.toJson(map);

		return jsonData;
	}

	public String findMonthWiseRepayments() {

		LocalDate now = LocalDate.now();
		int year = now.getYear();
		int monthVal = now.getMonthValue();

		Gson gson = new Gson();
		

		List<String> labels = new ArrayList<>();
		List<Double> values = new ArrayList<>();
		for (int i = 0; i < monthVal; i++) {

			String yearMonth = year + "-" + (i+1);
			List<LmRepayment> repayments = repaymentRepository.findByYearMonth(yearMonth);
			Double total = calculateTotal(repayments);
			String month = getMonthName(i);
			labels.add(month);
			values.add(total);
			
		}
		HashMap<String, Object> map = new HashMap<>();
		map.put("labels", labels);
		map.put("values", values);
		String jsonData = gson.toJson(map);
		return jsonData;
	}

	private Double calculateTotal(List<LmRepayment> currentMonthepayments) {

		Double total = 0.0;

		if (LmUtil.isAllPresent(currentMonthepayments)) {
			for (LmRepayment repayment : currentMonthepayments) {
				total += repayment.getAmountPaid();
			}
		}
		return total;
	}

	private String getMonthName(int val) {

		switch (val) {
		case 0:
			return "JAN";
		case 1:
			return "FEB";
		case 2:
			return "MAR";
		case 3:
			return "APR";
		case 4:
			return "MAY";
		case 5:
			return "JUN";
		case 6:
			return "JUL";
		case 7:
			return "AUG";
		case 8:
			return "SEPT";
		case 9:
			return "OCT";
		case 10:
			return "NOV";
		case 11:
			return "DEC";

		default:
			return null;
		}

	}

}
