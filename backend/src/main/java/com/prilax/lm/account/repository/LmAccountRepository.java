package com.prilax.lm.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.prilax.lm.account.entity.LmAccount;

public interface LmAccountRepository extends JpaRepository<LmAccount, Long> {

	@Query("SELECT entity FROM LmAccount entity WHERE entity.status = 'Disbursed'")
	List<LmAccount> findDisburedAccounts();
	
	@Query("SELECT entity FROM LmAccount entity WHERE entity.lead.customer.customerId = :customerId")
	List<LmAccount> findAccountsByCustomerId(@Param("customerId") String customerId);
	
	@Query("SELECT entity FROM LmAccount entity WHERE entity.status = 'Disbursed' AND entity.lead.customer.customerId = :customerId")
	List<LmAccount> findDisburedAccountsByCustomerId(@Param("customerId") String customerId);
}
