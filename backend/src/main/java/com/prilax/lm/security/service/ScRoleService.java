package com.prilax.lm.security.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.security.dto.Role;
import com.prilax.lm.security.dto.RoleResponse;
import com.prilax.lm.security.dto.RolesResponse;
import com.prilax.lm.security.entity.ScRole;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;

@Service
public class ScRoleService {

	@Autowired
	private CommonService commonService;

	public RolesResponse findAllRoles() {

		RolesResponse res = new RolesResponse();

		List<ScRole> roles = commonService.findAll(ScRole.class);

		if (!LmUtil.isAllPresent(roles))
			throw new NotFoundException("No role can be found !");

		List<Role> dtoRoles = new ArrayList<>();
		roles.forEach(role -> {

			Role dtoRole = setRoleToDto(role);
			dtoRoles.add(dtoRole);

		});

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoRoles);
		return res;
	}

	private Role setRoleToDto(ScRole role) {

		Role dtoRole = new Role();
		dtoRole.setDesc(role.getDesc());
		dtoRole.setId(role.getId());
		dtoRole.setName(role.getName());

		/*
		 * List<ScMenu> menus = role.getMenus(); if (ScUtil.isAllPresent(menus)) {
		 * 
		 * List<Menu> dtoMenus = new ArrayList<>(); menus.forEach(menu -> {
		 * 
		 * Menu dtoMenu = new Menu(); dtoMenu.setHasSubmenu(menu.getHasSubmenu());
		 * dtoMenu.setIcon(menu.getIcon()); dtoMenu.setId(menu.getId());
		 * dtoMenu.setOrder(menu.getOrder()); dtoMenu.setPath(menu.getPath());
		 * dtoMenu.setTitle(menu.getTitle());
		 * 
		 * List<ScSubMenu> subMenus = menu.getSubMenus(); if
		 * (ScUtil.isAllPresent(menus)) {
		 * 
		 * List<SubMenu> dtoSubMenus = new ArrayList<>(); subMenus.forEach(subMenu -> {
		 * SubMenu dtoSubMenu = new SubMenu(); dtoSubMenu.setIcon(subMenu.getIcon());
		 * dtoSubMenu.setId(subMenu.getId()); dtoSubMenu.setOrder(subMenu.getOrder());
		 * dtoSubMenu.setPath(subMenu.getPath());
		 * dtoSubMenu.setTitle(subMenu.getTitle()); dtoSubMenus.add(dtoSubMenu); });
		 * 
		 * dtoMenu.setSubmenu(dtoSubMenus); } dtoMenus.add(dtoMenu); });
		 * dtoRole.setMenus(dtoMenus); }
		 */
		return dtoRole;
	}

	public ActionResponse createOrUpdateRole(Role dtoRole, Long id) {

		ActionResponse res = new ActionResponse();

		ScRole role = new ScRole();

		if (LmUtil.isAllPresent(id))
			role = commonService.findById(id, ScRole.class);

		if (!LmUtil.isAllPresent(role))
			throw new NotFoundException("No role can be found !");

		setDtoToRole(dtoRole, role);
		commonService.save(role);

		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated the role's data";
			res.setApiMessage(ApiUtil.createdMessage(message));
		} else {
			message = "Successfully created a role";
			res.setApiMessage(ApiUtil.okMessage(message));
			res.setActionMessage(message);
		}

		return res;
	}

	private void setDtoToRole(Role dtoRole, ScRole role) {
		role.setDesc(dtoRole.getDesc());
		role.setName(dtoRole.getName());
		role.setRecordAudit(null);

		/*
		 * if (ScUtil.isAllPresent(role.getMenus())) role.getMenus().clear(); List<Menu>
		 * dtoMenus = dtoRole.getMenus(); if (!ScUtil.isAllPresent(dtoMenus)) return;
		 * 
		 * List<ScMenu> menus = new ArrayList<>();
		 * 
		 * for (Menu dtoMenu : dtoMenus) {
		 * 
		 * ScMenu menu = new ScMenu(); menu.setHasSubmenu(dtoMenu.getHasSubmenu());
		 * menu.setIcon(dtoMenu.getIcon()); menu.setId(dtoMenu.getId());
		 * menu.setOrder(dtoMenu.getOrder()); menu.setPath(dtoMenu.getPath());
		 * menu.setRole(role); menu.setTitle(dtoMenu.getTitle());
		 * 
		 * List<SubMenu> dtoSubMenus = dtoMenu.getSubmenu(); List<ScSubMenu> subMenus =
		 * new ArrayList<>();
		 * 
		 * dtoSubMenus.forEach(dtoSubMenu -> {
		 * 
		 * ScSubMenu subMenu = new ScSubMenu(); subMenu.setIcon(dtoSubMenu.getIcon());
		 * subMenu.setId(dtoSubMenu.getId()); subMenu.setMenu(menu);
		 * subMenu.setOrder(dtoSubMenu.getOrder());
		 * subMenu.setPath(dtoSubMenu.getPath());
		 * subMenu.setTitle(dtoSubMenu.getTitle());
		 * 
		 * subMenus.add(subMenu);
		 * 
		 * });
		 * 
		 * menu.setSubMenus(subMenus); menus.add(menu); }
		 * 
		 * role.getMenus().addAll(menus);
		 */
	}

	public RoleResponse findRole(Long id) {

		RoleResponse res = new RoleResponse();

		ScRole role = commonService.findById(id, ScRole.class);

		if (!LmUtil.isAllPresent(role))
			throw new NotFoundException("No role can be found !");

		Role dtoRole = setRoleToDto(role);

		res.setApiMessage(ApiUtil.okMessage("Success"));
		res.setData(dtoRole);

		return res;
	}

	public ActionResponse deleteRole(Long id) {

		ActionResponse res = new ActionResponse();

		ScRole role = commonService.findById(id, ScRole.class);

		if (!LmUtil.isAllPresent(role))
			throw new NotFoundException("No role can be found !");

		commonService.delete(role);

		res.setApiMessage(ApiUtil.okMessage("Successfully deleted"));
		return res;
	}
}
