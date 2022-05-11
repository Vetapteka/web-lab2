package com.vetka.lab2;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;


@WebServlet(name = "AreaCheckServlet", value = "/area-check")
public class AreaCheckServlet extends HttpServlet {
    public static final String ATTRIBUTE_POINTS = "points";
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)throws IOException {
       Point point = new Point (request);
       point.checkArea();

        Object objPoints = request.getSession().getAttribute(ATTRIBUTE_POINTS);
        if (objPoints == null) objPoints = new ArrayList<Point>();

        if (objPoints instanceof ArrayList) {
            ArrayList<Point> points = (ArrayList<Point>) objPoints;
            points.add(point);
            request.getSession().setAttribute(ATTRIBUTE_POINTS, points);
        }

        PrintWriter out = response.getWriter();
        DecimalFormat df = new DecimalFormat("#.###");

        out.print("<tr>");
        out.print("<td><h2>" + df.format(point.getX()) + "</h2></td>");
        out.print("<td><h2>" + df.format(point.getY()) + "</h2></td>");
        out.print("<td><h2>" + df.format(point.getR()) + "</h2></td>");
        out.print("<td><h2>" + point.getResult() + "</h2></td>");
        out.print("<td><h2>" + point.getData() + "</h2></td>");
        out.print("<td><h2>" + point.getTime() + "</h2></td>");
        out.print("</tr>");

        out.close();
    }

}
