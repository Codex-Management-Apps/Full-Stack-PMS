package com.ancientstudents.backend.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

    // Format pattern for date (e.g., "yyyy-MM-dd HH:mm:ss")
    private static final String DATE_FORMAT_PATTERN = "yyyy-MM-dd HH:mm:ss";

    // Method to convert Date to String with the specified format
    public static String formatDate(Date date) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_PATTERN);
        return sdf.format(date);
    }
}