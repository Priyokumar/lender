package com.prilax.lm.customer.controller;

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

import com.prilax.lm.customer.dto.Customer;
import com.prilax.lm.customer.service.LmCustomerService;
import com.prilax.lm.dto.ActionResponse;

@RestController
@RequestMapping("/api/v1/customers")
public class LmCustomerController {

	@Autowired
	private LmCustomerService customerService;

	@GetMapping
	public List<Customer> findAllCustomers() {
		return customerService.findAllCustomers();
	}

	@GetMapping(value = "/{id}")
	public Customer findCustomer(@PathVariable("id") Long id) {
		return customerService.findCustomerById(id);
	}

	@PostMapping
	public ActionResponse createCustomer(@RequestBody Customer employee) {
		return customerService.createOrUpdateCustomer(employee, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateCustomer(@RequestBody Customer customer, @PathVariable("id") Long id) {
		return customerService.createOrUpdateCustomer(customer, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteCustomer(@PathVariable("id") Long id) {
		return customerService.deleteCustomer(id);
	}
}
