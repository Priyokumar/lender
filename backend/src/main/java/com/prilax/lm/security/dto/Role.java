package com.prilax.lm.security.dto;

import com.prilax.lm.dto.RecordAudit;

public class Role {

	private Long id;

	private String name;
	
	private String desc;
	
	/* private List<Menu> menus; */

	private RecordAudit recordAudit;

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

	public RecordAudit getRecordAudit() {
		return recordAudit;
	}

	public void setRecordAudit(RecordAudit recordAudit) {
		this.recordAudit = recordAudit;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	/*
	 * public List<Menu> getMenus() { return menus; }
	 * 
	 * public void setMenus(List<Menu> menus) { this.menus = menus; }
	 */

}
