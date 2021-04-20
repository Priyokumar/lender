package com.prilax.lm.repayment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.repayment.dto.Repayment;
import com.prilax.lm.repayment.service.LmRepaymentService;

@RestController
@RequestMapping("/api/v1/repayments")
public class LmRepaymentController {

	@Autowired
	private LmRepaymentService repaymentService;

	@GetMapping
	public List<Repayment> findAllRepayments(@RequestParam(name = "accountNo", required = false) String accountNo) {
		return repaymentService.findAllRepayments(accountNo);
	}

	@GetMapping(value = "/{id}")
	public Repayment findRepayment(@PathVariable("id") Long id) {
		return repaymentService.findRepaymentById(id);
	}

	@PostMapping
	public ActionResponse createRepayment(@RequestBody Repayment repayment) {
		return repaymentService.createOrUpdateRepayment(repayment, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateRepayment(@RequestBody Repayment repayment, @PathVariable("id") Long id) {
		return repaymentService.createOrUpdateRepayment(repayment, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteRepayment(@PathVariable("id") Long id) {
		return repaymentService.deleteRepayment(id);
	}
}
