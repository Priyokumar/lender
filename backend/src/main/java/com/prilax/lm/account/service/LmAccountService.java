package com.prilax.lm.account.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.account.dto.Account;
import com.prilax.lm.account.entity.LmAccount;
import com.prilax.lm.account.entity.LmEmi;
import com.prilax.lm.account.repository.LmAccountRepository;
import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.product.vo.LmProductType;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;
import com.prilax.lm.vo.LeadStatus;

@Service
public class LmAccountService {

	@Autowired
	private CommonService commonService;

	@Autowired
	private LmAccountRepository accountRepository;

	@Autowired
	private LmEmiService emiService;

	ModelMapper modelMapper = new ModelMapper();

	public List<Account> findAllAccounts(String customerId, String status) {

		List<LmAccount> accounts = new ArrayList<LmAccount>();

		if (LmUtil.isAllPresent(status)) {
			accounts = accountRepository.findDisburedAccounts();
		} else if (LmUtil.isAllPresent(customerId)) {
			accounts = accountRepository.findAccountsByCustomerId(customerId);
		} else {
			accounts = commonService.findAll(LmAccount.class);
		}

		List<Account> accountsDto = new ArrayList<>();
		accounts.forEach(account -> {
			Account accountDto = setAccountToDto(account);
			accountsDto.add(accountDto);
		});

		return accountsDto;
	}

	public Account findAccountById(Long id) {

		LmAccount account = commonService.findById(id, LmAccount.class);

		if (!LmUtil.isAllPresent(account))
			throw new NotFoundException("No Account can be found !");

		Account accountDto = setAccountToDto(account);

		return accountDto;
	}

	public ActionResponse createOrUpdateAccount(Account accountDto, Long id) {

		ActionResponse res = new ActionResponse();

		LmAccount account = modelMapper.map(accountDto, LmAccount.class);

		if (LmUtil.isAllPresent(id)) {
			LmAccount accountOld = commonService.findById(id, LmAccount.class);
			account.setEmis(accountOld.getEmis());
			account.setId(id);
			if (!LmUtil.isAllPresent(accountOld.getAccountNo())) {
				account.setAccountNo(LmUtil.getGeneratedNumber("AC"));
			} else {
				account.setAccountNo(accountOld.getAccountNo());
			}
		} else {
			account.setAccountNo(LmUtil.getGeneratedNumber("AC"));
			account.getLead().setStatus(LeadStatus.ACCOUNT_CREATED);
			if (account.getLead().getProduct().getType().equals(LmProductType.LOAN)) {
				List<LmEmi> emis = emiService.generateEmi(account.getLead().getRequestedAmount(),
						account.getLead().getTenure(), account.getLead().getProduct().getInterest(),
						account.getDateOfCreation());
				account.setEmis(emis);
				account.setRepaymentDate(emis.get(0).getDueDate());
			} else if (account.getLead().getProduct().getType().equals(LmProductType.SENDOI)) {

				Calendar calender = Calendar.getInstance();
				calender.setTime(account.getDateOfCreation());
				calender.add(Calendar.MONTH, 1);
				account.setRepaymentDate(calender.getTime());
			}

		}

		account.setId(id);

		commonService.save(account);
		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated Account data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created Account";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteAccount(Long id) {

		ActionResponse res = new ActionResponse();

		LmAccount account = commonService.findById(id, LmAccount.class);

		if (!LmUtil.isAllPresent(account))
			throw new NotFoundException("No Account can be found !");

		commonService.delete(account);

		res.setActionMessage("Account has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Account has been deleted successfully"));
		return res;
	}

	private Account setAccountToDto(LmAccount account) {

		Account accountDto = modelMapper.map(account, Account.class);

		return accountDto;
	}

}
