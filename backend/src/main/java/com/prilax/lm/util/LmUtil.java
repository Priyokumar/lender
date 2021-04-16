package com.prilax.lm.util;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import com.prilax.lm.dto.RecordAudit;
import com.prilax.lm.entity.LmRecordAudit;
import com.prilax.lm.security.dto.User;
import com.prilax.lm.security.entity.ScUser;


public class LmUtil {

	public static boolean isAllPresent(Object... objects) {

		if (objects == null || objects.length <= 0)
			return false;

		for (int i = 0; i < objects.length; i++) {

			Object obj = objects[i];

			if (obj == null)
				return false;
			else {

				if (obj instanceof String)
					return !((String) obj).isEmpty();
				else if (obj instanceof List || obj instanceof Map || obj instanceof Set)
					return !((Collection<?>) obj).isEmpty();
			}
		}

		return true;
	}

	public static String getGeneratedNumber(String prefix) {

		LocalDateTime now = LocalDateTime.now();
		int month = now.getMonth().getValue();
		int year = now.getYear();
		int hour = now.getHour();
		int minute = now.getMinute();
		int second = now.getSecond();
		Random rand = new Random();
		int rndNo = rand.nextInt(100) + 1;

		prefix += year + "" + month + "" + hour + "" + minute + "" + second + "" + rndNo;

		return prefix;

	}

	public static LmRecordAudit recordAudit(ScUser user, Long id) {

		if (LmUtil.isAllPresent(user))
			return null;
		LmRecordAudit recordAudit = new LmRecordAudit();

		if (LmUtil.isAllPresent(id)) {
			recordAudit.setUpdatedBy(user);
			recordAudit.setUpdatedDate(LmDateUtil.now());
		} else {
			recordAudit.setCreatedBy(user);
			recordAudit.setCreatedDate(LmDateUtil.now());
			recordAudit.setUpdatedBy(user);
			recordAudit.setUpdatedDate(LmDateUtil.now());
		}

		return recordAudit;
	}

	public static RecordAudit recordAuditToDto(LmRecordAudit recordAudit) {

		RecordAudit dtoRecordAudit = new RecordAudit();

		dtoRecordAudit.setCreatedBy(userToDto(recordAudit.getCreatedBy()));
		dtoRecordAudit.setCreatedDate(LmDateUtil.dateToString(recordAudit.getCreatedDate()));
		dtoRecordAudit.setUpdatedBy(userToDto(recordAudit.getUpdatedBy()));
		dtoRecordAudit.setUpdatedDate(LmDateUtil.dateToString(recordAudit.getUpdatedDate()));

		return dtoRecordAudit;

	}

	private static User userToDto(ScUser user) {

		if (LmUtil.isAllPresent(user))
			return null;

		User dtoUser = new User();
		dtoUser.setId(user.getId());
		dtoUser.setName(user.getName());
		dtoUser.setEmail(user.getEmail());
		dtoUser.setMobile(user.getMobile());

		return dtoUser;
	}
}
