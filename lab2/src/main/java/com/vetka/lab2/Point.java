package com.vetka.lab2;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class Point {
    private final double x;
    private final double y;
    private final double r;
    private String result;


    private long time;
    private Date data;

    public Point(HttpServletRequest req) {
        x = Double.parseDouble(req.getParameter("x"));
        y = Double.parseDouble(req.getParameter("y"));
        r = Double.parseDouble(req.getParameter("r"));
    }

    public void checkArea() {
        long now = System.nanoTime();
        result = ((x <= 0 && y <= 0 && y >= -0.5 * x - 0.5 * r) ||
                (x <= 0 && y >= 0 && x >= -0.5 * r && y <= r) ||
                (x >= 0 && y <= 0 && x * x + y * y <= 0.25 * r * r)) ? "yes" : "no";
        time = System.nanoTime() - now;
        data = new Date();
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getResult() {
        return result;
    }

    public Date getData() {
        return data;
    }

    public long getTime() {
        return time;
    }

}
