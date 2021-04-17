package com.prilax.lm.lead.controller;

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
import com.prilax.lm.lead.dto.Lead;
import com.prilax.lm.lead.service.LmLeadService;

@RestController
@RequestMapping("/api/v1/leads")
public class LmLeadController {

	@Autowired
	private LmLeadService leadService;

	@GetMapping
	public List<Lead> findAllLeads(
			@RequestParam(name = "leadId", required = false) String leadId,
			@RequestParam(name = "status", required = false) String status,
			@RequestParam(name = "customerId", required = false) String customerId,
			@RequestParam(name = "mobileNo", required = false) String mobileNo
			) {
		return leadService.findAllLeads(leadId, status, customerId, mobileNo);	
	}

	@GetMapping(value = "/{id}")
	public Lead findLead(@PathVariable("id") Long id) {
		return leadService.findLeadById(id);
	}

	@PostMapping
	public ActionResponse createLead(@RequestBody Lead lead) {
		return leadService.createOrUpdateLead(lead, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateLead(@RequestBody Lead lead, @PathVariable("id") Long id) {
		return leadService.createOrUpdateLead(lead, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteLead(@PathVariable("id") Long id) {
		return leadService.deleteLead(id);
	}
}
