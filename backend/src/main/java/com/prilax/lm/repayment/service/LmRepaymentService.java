package com.prilax.lm.repayment.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.product.vo.LmProductType;
import com.prilax.lm.repayment.dto.Repayment;
import com.prilax.lm.repayment.entity.LmRepayment;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;

@Service
public class LmRepaymentService {

	@Autowired
	private CommonService commonService;

	ModelMapper modelMapper = new ModelMapper();

	public List<Repayment> findAllRepayments() {

		List<LmRepayment> repayments = commonService.findAll(LmRepayment.class);

		List<Repayment> repaymentsDto = new ArrayList<>();
		repayments.forEach(repayment -> {
			Repayment repaymentDto = setRepaymentToDto(repayment);
			repaymentsDto.add(repaymentDto);
		});
		
		return repaymentsDto;
	}

	public Repayment findRepaymentById(Long id) {

		LmRepayment repayment = commonService.findById(id, LmRepayment.class);

		if (!LmUtil.isAllPresent(repayment))
			throw new NotFoundException("No Repayment can be found !");

		Repayment repaymentDto = setRepaymentToDto(repayment);

		return repaymentDto;
	}

	public ActionResponse createOrUpdateRepayment(Repayment repaymentDto, Long id) {

		ActionResponse res = new ActionResponse();

		LmRepayment repayment = modelMapper.map(repaymentDto, LmRepayment.class);

		if (LmUtil.isAllPresent(id)) {
			LmRepayment repaymentOld = commonService.findById(id, LmRepayment.class);
			repayment.setId(id);
			if (!LmUtil.isAllPresent(repaymentOld.getRepaymentId())) {
				repayment.setRepaymentId(LmUtil.getGeneratedNumber("REPMNT"));
			} else {
				repayment.setRepaymentId(repaymentOld.getRepaymentId());
			}
		} else {
			repayment.setRepaymentId(LmUtil.getGeneratedNumber("REPMNT"));
		}
		if (repayment.getAccount().getLead().getProduct().getType().equals(LmProductType.LOAN)) {
			
			
			
		}
		repayment.setId(id);

		commonService.save(repayment);
		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated Repayment data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created Account";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteRepayment(Long id) {

		ActionResponse res = new ActionResponse();

		LmRepayment repayment = commonService.findById(id, LmRepayment.class);

		if (!LmUtil.isAllPresent(repayment))
			throw new NotFoundException("No Repayment can be found !");

		commonService.delete(repayment);

		res.setActionMessage("Repayment has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Repayment has been deleted successfully"));
		return res;
	}

	private Repayment setRepaymentToDto(LmRepayment repayment) {

		Repayment repaymentDto = modelMapper.map(repayment, Repayment.class);

		return repaymentDto;
	}

}
