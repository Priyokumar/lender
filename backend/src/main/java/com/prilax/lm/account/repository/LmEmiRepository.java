package com.prilax.lm.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.prilax.lm.account.entity.LmEmi;

public interface LmEmiRepository extends JpaRepository<LmEmi, Long> {

	@Query("SELECT entity FROM LmEmi entity WHERE entity.account.accountNo = :accountNo")
	List<LmEmi> findListByAccountNo(@Param("accountNo") String accountNo);
}
