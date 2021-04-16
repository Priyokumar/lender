package com.prilax.lm.util;

import java.util.concurrent.ThreadLocalRandom;

public class LmOTPUtils {

	public static int generateOTP() {
		int randomNum = ThreadLocalRandom.current().nextInt(1000, 9999);
		return randomNum;
	}
}
