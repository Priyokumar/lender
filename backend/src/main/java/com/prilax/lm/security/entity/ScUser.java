package com.prilax.lm.security.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.prilax.lm.entity.LmRecordAudit;

@Entity
@Table(name = "LM_USER")
public class ScUser implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;

	@Column(name = "PASSWORD")
	private String password;

	@Column(name = "NAME")
	private String name;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "MOBILE")
	private String mobile;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "GENDER")
	private String gender;

	@OneToMany(targetEntity = SCUserRole.class, cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "USER_ID", referencedColumnName = "LM_ID")
	@Fetch(value = FetchMode.SUBSELECT)
	private List<SCUserRole> userRoles = new ArrayList<>();

	@Embedded
	private LmRecordAudit recordAudit = new LmRecordAudit();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public List<SCUserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(List<SCUserRole> userRoles) {
		this.userRoles = userRoles;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LmRecordAudit getRecordAudit() {
		return recordAudit;
	}

	public void setRecordAudit(LmRecordAudit recordAudit) {
		this.recordAudit = recordAudit;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

}
