package com.prilax.lm.customer.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.customer.dto.Customer;
import com.prilax.lm.customer.entity.LmCustomer;
import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;

@Service
public class LmCustomerService {

	@Autowired
	private CommonService commonService;

	ModelMapper modelMapper = new ModelMapper();

	public List<Customer> findAllCustomers() {

		List<LmCustomer> customers = commonService.findAll(LmCustomer.class);

		List<Customer> customersDto = new ArrayList<>();
		customers.forEach(customer -> {
			Customer customerDto = setCustomerToDto(customer);
			customersDto.add(customerDto);
		});

		return customersDto;
	}

	public Customer findCustomerById(Long id) {

		LmCustomer customer = commonService.findById(id, LmCustomer.class);

		if (!LmUtil.isAllPresent(customer))
			throw new NotFoundException("No customer can be found !");

		Customer customerDto = setCustomerToDto(customer);

		return customerDto;
	}

	public ActionResponse createOrUpdateCustomer(Customer customerDto, Long id) {

		ActionResponse res = new ActionResponse();

		LmCustomer customer = modelMapper.map(customerDto, LmCustomer.class);
		
		
		if(LmUtil.isAllPresent(id)) {
			LmCustomer customerOld = commonService.findById(id, LmCustomer.class);
			customer.setId(id);
			if(!LmUtil.isAllPresent(customerOld.getCustomerId())) {
				customer.setCustomerId(LmUtil.getGeneratedNumber("CUST"));
			} else {
				customer.setCustomerId(customerOld.getCustomerId());
			}
		} else {
			customer.setCustomerId(LmUtil.getGeneratedNumber("CUST"));
		}
		customer.setId(id);

		commonService.save(customer);
		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated customer data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created customer";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteCustomer(Long id) {

		ActionResponse res = new ActionResponse();

		LmCustomer customer = commonService.findById(id, LmCustomer.class);

		if (!LmUtil.isAllPresent(customer))
			throw new NotFoundException("No customer can be found !");

		commonService.delete(customer);

		res.setActionMessage("customer has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("customer has been deleted successfully"));
		return res;
	}

	private Customer setCustomerToDto(LmCustomer customer) {

		Customer customerDto = modelMapper.map(customer, Customer.class);

		return customerDto;
	}

}
