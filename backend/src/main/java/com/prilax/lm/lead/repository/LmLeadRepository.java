package com.prilax.lm.lead.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prilax.lm.lead.entity.LmLead;

@Repository
public interface LmLeadRepository extends JpaRepository<LmLead, Long>{

	@Query("SELECT entity FROM LmLead entity WHERE entity.leadId = :leadId")
	List<LmLead> findByLeadId(@Param("leadId") String leadId);
	
	@Query("SELECT entity FROM LmLead entity WHERE entity.status = :status")
	List<LmLead> findByStatus(@Param("status") String status);
	
	@Query("SELECT entity FROM LmLead entity WHERE entity.customer.customerId = :customerId")
	List<LmLead> findByCustomerId(@Param("customerId") String customerId);
	
	@Query("SELECT entity FROM LmLead entity WHERE entity.customer.mobileNo = :mobileNo")
	List<LmLead> findByMobileNo(@Param("mobileNo") String mobileNo);
	
}
