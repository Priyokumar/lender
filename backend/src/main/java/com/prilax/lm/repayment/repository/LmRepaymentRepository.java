package com.prilax.lm.repayment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.prilax.lm.repayment.entity.LmRepayment;

public interface LmRepaymentRepository extends JpaRepository<LmRepayment, Long> {

	@Query("SELECT entity FROM LmRepayment entity WHERE entity.status = 'Paid'")
	List<LmRepayment> findPaidRepayments();
	
	@Query("SELECT entity FROM LmRepayment entity WHERE entity.status = 'Paid' AND CONCAT(YEAR(entity.dateOfPayment),'-',MONTH(entity.dateOfPayment)) = :yearMonth")
	List<LmRepayment> findByYearMonth(@Param("yearMonth") String yearMonth);

}
