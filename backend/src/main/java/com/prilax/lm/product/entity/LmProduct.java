package com.prilax.lm.product.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.prilax.lm.entity.LmRecordAudit;

@Entity
@Table(name = "LM_PRODUCT")
public class LmProduct implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;
	
	@Column(name = "PRODUCT_ID")
	private String productId;

	@Column(name = "NAME")
	private String name;

	@Column(name = "TYPE")
	private String type;

	@Column(name = "INTEREST")
	private Double interest;
	
	@Column(name = "SECURED_PRODUCT")
	private boolean securedProduct;
	
	@Column(name = "FREQUENCY")
	private String frequency;

	@Embedded
	private LmRecordAudit audit;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getInterest() {
		return interest;
	}

	public void setInterest(Double interest) {
		this.interest = interest;
	}

	public LmRecordAudit getAudit() {
		return audit;
	}

	public void setAudit(LmRecordAudit audit) {
		this.audit = audit;
	} 

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public boolean isSecuredProduct() {
		return securedProduct;
	}

	public void setSecuredProduct(boolean securedProduct) {
		this.securedProduct = securedProduct;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

}
