package com.prilax.lm.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prilax.lm.account.dto.Account;
import com.prilax.lm.account.service.LmAccountService;
import com.prilax.lm.dto.ActionResponse;

@RestController
@RequestMapping("/api/v1/accounts")
public class LmAccountController {

	@Autowired
	private LmAccountService accountService;

	@GetMapping
	public List<Account> findAllAccounts() {
		return accountService.findAllAccounts();
	}

	@GetMapping(value = "/{id}")
	public Account findAccount(@PathVariable("id") Long id) {
		return accountService.findAccountById(id);
	}

	@PostMapping
	public ActionResponse createAccount(@RequestBody Account account) {
		return accountService.createOrUpdateAccount(account, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateAccount(@RequestBody Account account, @PathVariable("id") Long id) {
		return accountService.createOrUpdateAccount(account, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteAccount(@PathVariable("id") Long id) {
		return accountService.deleteAccount(id);
	}
}
