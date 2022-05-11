package com.vetka.lab2;

import java.io.*;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import static com.vetka.lab2.AreaCheckServlet.ATTRIBUTE_POINTS;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class ControllerServlet extends HttpServlet {

    public void init() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        Map<String, String[]> params = request.getParameterMap();

        boolean isAllParams = params.containsKey("x") && params.containsKey("y") && params.containsKey("r") && (params.size() == 3);

        if (isAllParams) {
            if (isValidParams(params)) {
                request.getRequestDispatcher("/area-check").forward(request, response);
            }
        } else {
            PrintWriter out = response.getWriter();
            out.print("<tr<td colspan = " + 6 + "><h2>invalid request</h2></tr>");

        }
        PrintWriter out = response.getWriter();
    }

    public void destroy() {
    }

    public boolean isValidParams(Map<String, String[]> params) {
        double x;
        double y;
        double r;
        try {
            x = Double.parseDouble(params.get("x")[0]);
            y = Double.parseDouble(params.get("y")[0]);
            r = Double.parseDouble(params.get("r")[0]);
        } catch (NumberFormatException e) {
            return false;
        }
        return (-r <= x && x <= r && -r <= y && y <= r);
    }
}