package com.prilax.lm.security.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.prilax.lm.entity.LmRecordAudit;

@Entity
@Table(name = "LM_ROLE")
public class ScRole implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id	
	@GeneratedValue
	@Column(name = "LM_ID")
	private Long id;

	@Column(name = "NAME")
	private String name;
	
	@Column(name = "ROLE_DESC")
	private String desc;
	
	/*
	 * @OneToMany(targetEntity = ScMenu.class, cascade = CascadeType.ALL,
	 * orphanRemoval = true, fetch = FetchType.EAGER)
	 * 
	 * @JoinColumn(name = "ROLE_ID", referencedColumnName = "SC_ID")
	 * 
	 * @Fetch(value = FetchMode.SUBSELECT) private List<ScMenu> menus = new
	 * ArrayList<>();
	 */

	@Embedded
	private LmRecordAudit recordAudit = new LmRecordAudit();

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

	/*
	 * public List<ScMenu> getMenus() { return menus; }
	 * 
	 * public void setMenus(List<ScMenu> menus) { this.menus = menus; }
	 */
	
	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public LmRecordAudit getRecordAudit() {
		return recordAudit;
	}

	public void setRecordAudit(LmRecordAudit recordAudit) {
		this.recordAudit = recordAudit;
	}

}
