package com.prilax.lm.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.prilax.lm.account.entity.LmAccount;

public interface LmAccountRepository extends JpaRepository<LmAccount, Long> {

	@Query("SELECT entity FROM LmAccount entity WHERE entity.status = 'Disbursed'")
	List<LmAccount> findDisburedAccounts();
}
