package com.vetka.lab2;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Date;
import java.util.Map;

@WebServlet(name = "AreaCheckServlet", value = "/area-check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)throws IOException {
        long now = System.nanoTime();
        Map<String, String[]> params = request.getParameterMap();
//        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        double x = Double.parseDouble(params.get("x")[0]);
        double y = Double.parseDouble(params.get("y")[0]);
        double r = Double.parseDouble(params.get("r")[0]);

        String result = ((x <= 0 && y <= 0 && y >= -0.5 * x - 0.5 * r) ||
                (x <= 0 && y >= 0 && x >= -0.5 * r && y <= r) ||
                (x >= 0 && y <= 0 && x * x + y * y <= 0.25 * r * r)) ? "yes" : "no";

        out.print("<tr>");
        out.print("<td><h2>" + x + "</h2></td>");
        out.print("<td><h2>" + y + "</h2></td>");
        out.print("<td><h2>" + r + "</h2></td>");
        out.print("<td><h2>" + result + "</h2></td>");
        out.print("<td><h2>" + new Date() + "</h2></td>");

        long timestamp = System.currentTimeMillis();
        long executionTime = System.nanoTime() - now;

        out.print("<td><h2>" + executionTime + "</h2></td>");
        out.print("</tr>");


    }

}
