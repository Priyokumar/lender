package com.prilax.lm.lead.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.lead.dto.Lead;
import com.prilax.lm.lead.entity.LmLead;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;

@Service
public class LmLeadService {

	@Autowired
	private CommonService commonService;

	ModelMapper modelMapper = new ModelMapper();

	public List<Lead> findAllLeads() {

		List<LmLead> leads = commonService.findAll(LmLead.class);

		List<Lead> leadsDto = new ArrayList<>();
		leads.forEach(lead -> {
			Lead leadDto = setLeadToDto(lead);
			leadsDto.add(leadDto);
		});

		return leadsDto;
	}

	public Lead findLeadById(Long id) {

		LmLead lead = commonService.findById(id, LmLead.class);

		if (!LmUtil.isAllPresent(lead))
			throw new NotFoundException("No Lead can be found !");

		Lead leadDto = setLeadToDto(lead);

		return leadDto;
	}

	public ActionResponse createOrUpdateLead(Lead leadDto, Long id) {

		ActionResponse res = new ActionResponse();

		LmLead lead = modelMapper.map(leadDto, LmLead.class);
		
		
		if(LmUtil.isAllPresent(id)) {
			LmLead leadOld = commonService.findById(id, LmLead.class);
			lead.setId(id);
			if(!LmUtil.isAllPresent(leadOld.getLeadId())) {
				lead.setLeadId(LmUtil.getGeneratedNumber("LEAD"));
			} else {
				lead.setLeadId(leadOld.getLeadId());
			}
		} else {
			lead.setLeadId(LmUtil.getGeneratedNumber("PROD"));
		}
		lead.setId(id);

		commonService.save(lead);
		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated Lead data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created Product";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteLead(Long id) {

		ActionResponse res = new ActionResponse();

		LmLead lead = commonService.findById(id, LmLead.class);

		if (!LmUtil.isAllPresent(lead))
			throw new NotFoundException("No Lead can be found !");

		commonService.delete(lead);

		res.setActionMessage("Lead has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Lead has been deleted successfully"));
		return res;
	}

	private Lead setLeadToDto(LmLead lead) {

		Lead leadDto = modelMapper.map(lead, Lead.class);

		return leadDto;
	}

}
