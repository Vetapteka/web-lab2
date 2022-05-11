<%@ page import="java.util.Calendar" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>lab 2</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
<div class='content'>
    <table>
        <tr>
            <td width="35%"><h2 class="header">Variant 76412</h2></td>
            <td><h2 class="header">Artemenko Svetlana</h2></td>
            <td><h2 class="header">Perevozchikov Ivan</h2></td>
            <td width="20%"><h2 class="header">P3233</h2></td>
        </tr>

        <tr>
            <td>
                <div class="graph-with-error">
                    <div class="element graph" >
                        <svg class="graph-content" height="500" width="500" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none">
                            <polygon points="0,250 250,250 250,375"
                                     style="fill:yellowgreen;stroke:purple;stroke-width:1"></polygon>
                            <polygon points="250,0 250, 250 125, 250 125, 0"
                                     style="fill:plum;stroke:purple;stroke-width:1"></polygon>
                            <path d="M 250 250 L 375 250 Q 355 355 250 375  Z"
                                  style="fill:yellow;stroke:purple;stroke-width:1"
                            ></path>

                            <line stroke="purple"
                                  x1="0" x2="500"
                                  y1="250" y2="250"
                                  stroke-width="2"
                                  stroke-linecap="round"
                            ></line>
                            <%--убрать--%>
                            <line stroke="purple"
                                  x1="0" x2="0"
                                  y1="0" y2="500"
                                  stroke-width="2"
                                  stroke-linecap="round"
                            ></line>

                            <line stroke="purple"
                                  x1="0" x2="500"
                                  y1="0" y2="0"
                                  stroke-width="2"
                                  stroke-linecap="round"
                            ></line>


                            <line stroke="purple"
                                  x1="250" x2="250"
                                  y1="0" y2="500"
                                  stroke-width="2"
                                  stroke-linecap="round"
                            ></line>
                        </svg>
                    </div>
                </div>
            </td>
            <td colspan="3" rowspan="2">
                <div class=table-res>
                    <table>
                        <thead>
                        <tr>
                            <th><h2>X</h2></th>
                            <th><h2>Y</h2></th>
                            <th><h2>R</h2></th>
                            <th><h2>Result</h2></th>
                            <th><h2>Date</h2></th>
                            <th><h2>Time</h2></th>
                        </tr>
                        <tr>
                            <th colspan="6">
                                <hr>
                            </th>
                        </tr>
                        </thead>
                        <tbody id="table-place">

                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <form class='form' action="hello-servlet" method="GET">
                    <div class="input-field">
                        <div class="element" id="generateRadioBtn">
                            <img src="images/icon-x.png" alt="x">
                            <script>
                                for (let i = -2; i < 2; i += 0.5) {
                                    let textNode = document.createTextNode(String(i));

                                    let btn = document.createElement("input");
                                    btn.type = "radio";
                                    btn.checked = true;
                                    btn.className = "x-field"
                                    btn.value = String(i);
                                    btn.name = "x";
                                    btn.style.width = "30px";
                                    btn.style.height = "30px";
                                    btn.style.borderRadius = "100%";

                                    document.getElementById("g" +
                                        "enerateRadioBtn").appendChild(btn);
                                    btn.after(textNode);
                                }
                            </script>
                        </div>
                        <div class="element">
                            <label>
                                <input type="text" class="y-field" name="y" maxlength="8"
                                       placeholder="number [-3 ; 3]">
                            </label>
                        </div>
                        <div class="element">
                            <label>
                                <input type="text" class="r-field" name="r" maxlength="8"
                                       placeholder="number [1 ; 4]">
                            </label>
                        </div>
                        <div class="element">
                            <button class="submit">submit</button>
                        </div>
                    </div>
                </form>
            </td>
        </tr>

        <tr>
            <td colspan="2"><h2><%= Calendar.getInstance().get(Calendar.YEAR)%>
            </h2></td>
            <td colspan="2"><h2>vsem spasibo vsem poka</h2></td>
        </tr>

    </table>
</div>
<script src="script.js"></script>
<script src="jquery-3.6.0.min.js"></script>
</body>
</html>