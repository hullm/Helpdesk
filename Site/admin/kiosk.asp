<%@LANGUAGE="VBSCRIPT" CODEPAGE="1252"%>
<%
'Created by Matthew Hull on 3/28/12
'Last Updated 6/16/14

'This page is designed to run on a TV to give important information on one page and auto update.

Option Explicit

On Error Resume Next

Dim objNetwork, strUser, strSQL, objNameCheckSet, strRole, objRecentTickets, objNumOpenTicketsPerLocation
Dim objNumOpenTicketsPerTech, objCompletedTickets, objTodaysNewTickets, intTodaysNewTickets
Dim objCompleteTicketCount, intCompleteCount, objTodaysTicketCount, intTicketCount, objTotalOpenTickets
Dim intTotalOpenTickets, intMinute, strUserAgent, intMoveScreen, objFeedback, strURLRoot, strRating
Dim intLatestTicket, intOldLatestTicket, bolNewTicketArrived, intActiveLocationCount, intOldID
Dim intActiveTechCount, intLatestOpenCount, objOverallRating, intIndex, objFSO, strRoot, objFolder, objFile
Dim intFileCount, strImageName, bolFound, intFeedbackCount, bolEnbableFeedback, bolShowLogout
Dim bolShowCharts, objTicketsOpenPerTech, objTicketsOpenPerLocation, strTechName

'Redirect the user the SSL version if required
If Application("ForceSSL") Then
  If Request.ServerVariables("SERVER_PORT")=80 Then
    If Request.ServerVariables("QUERY_STRING") = "" Then
      Response.Redirect "https://" & Request.ServerVariables("SERVER_NAME") & Request.ServerVariables("URL")
    Else
      Response.Redirect "https://" & Request.ServerVariables("SERVER_NAME") & Request.ServerVariables("URL") & "?" & Request.ServerVariables("QUERY_STRING")
    End If
  End If
End If

'If the database and the website are not the same version then let them know
If Application("VersionError") Then
  VersionProblem
End If

'Get the users logon name
Set objNetwork = CreateObject("WSCRIPT.Network")
strUser = objNetwork.UserName
strUserAgent = Request.ServerVariables("HTTP_USER_AGENT")

'Check and see if anonymous access is enabled
If LCase(Left(strUser,4)) = "iusr" Then
  strUser = GetUser
  bolShowLogout = True
Else
  bolShowLogout = False
End If

'Build the SQL string
strSQL = "Select Username, UserLevel, Active, Theme, MobileVersion, TaskListRole, DocumentationRole" & vbCRLF
strSQL = strSQL & "From Tech" & vbCRLF
strSQL = strSQL & "WHERE (((Tech.UserName)='" & strUser & "'));"

bolEnbableFeedback = False

Set objNameCheckSet = Application("Connection").Execute(strSQL)
strRole = objNameCheckSet(1)

'See if the user has the rights to visit this page
If objNameCheckSet(2) Then

  'An error would be generated if the user has NTFS rights to get in but is not found
  'in the database.  In this case the user is denied access.
  If Err Then
    AccessDenied
  Else
    AccessGranted
  End If
Else
  AccessDenied
End If

Sub AccessGranted

On Error Resume Next

'Get the information on the last 6 tickets
strSQL = "SELECT Top 6 Main.ID, DisplayName, Location, SubmitTime, SubmitDate, TicketViewed, Problem, Custom1, StudentID, name, Custom2, EMail" & vbCRLF
strSQL = strSQL & "FROM Main" & vbCRLF
strSQL = strSQL & "LEFT OUTER JOIN People ON Main.Name = People.UserName" & vbCRLF
strSQL = strSQL & "WHERE Status <> 'Complete'" & vbCRLF
strSQL = strSQL & "ORDER BY Main.ID DESC;"
Set objRecentTickets = Application("Connection").Execute(strSQL)

'Get the latest ticket number from the result
If objRecentTickets.EOF Then
	intLatestTicket = 0
Else
	intLatestTicket = objRecentTickets(0)
End If

'Get the last latest ticket number from the URL, and use it to determine if a new ticket was submitted
intOldLatestTicket = Request.QueryString("LatestTicket")
If CInt(intLatestTicket) > CInt(intOldLatestTicket) Then
	bolNewTicketArrived = True
Else
	bolNewTicketArrived = False
End If
If IsNull(intOldLatestTicket) Or intOldLatestTicket = "" Then
	bolNewTicketArrived = False
End If

'This is for the ajax code to get the latest ticket number from the database.
If Request.QueryString("GetLatest") Then
	Response.Write intLatestTicket
	Response.End
End If

'Get the total number of open tickets
strSQL = "SELECT Count(Name) AS CountOfName" & vbCRLF
strSQL = strSQL & "FROM Main" & vbCRLF
strSQL = strSQL & "WHERE Status<>""Complete"""
Set objTotalOpenTickets = Application("Connection").Execute(strSQL)
If objTotalOpenTickets.EOF Then
	intTotalOpenTickets = 0
Else
	intTotalOpenTickets = objTotalOpenTickets(0)
End If

'This is for the ajax code to get the number of open tickets.
If Request.QueryString("TicketCount") Then
	Response.Write intTotalOpenTickets
	Response.End
End If
%>

<!DOCTYPE HTML>
<html>
<head>
	<title>Help Desk Kiosk</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="../assets/kiosk.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="../assets/kiosk.js" type="text/javascript"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script> console.log(localStorage.getItem("ShowClock"));
  console.log(localStorage.getItem("DayType"));
  </script>
  <script type="text/javascript">
    // Find out if their are open tickets
    var openTickets;
    if (<% =intLatestTicket %> == 0){
      openTickets = false;
    }
    else {
      openTickets = true;
    }

    // Update the clock every second
    setInterval(function(){
      var date=new Date();
      var time=date.toLocaleTimeString();
      var dayType=localStorage.getItem("DayType");
      document.getElementById("TopClock").innerHTML=time;
      document.getElementById("BottomClock").innerHTML=time;
      getCurrentPeriod(<%=Application("BellScheduleOffset")%>,localStorage.getItem("DayType"));
    },1000);

    // Check for a change in the tickets on the server
    setInterval(function() {
      $.get("kiosk.asp?GetLatest=True", function(data, status){
        if (<%=intLatestTicket%> < data){
          window.location.href = "kiosk.asp?LatestTicket=<%=intLatestTicket%>";
        }
      });
      $.get("kiosk.asp?TicketCount=True", function(data, status){
        if (<%=intTotalOpenTickets%> != data ){
          window.location.href = "kiosk.asp?LatestTicket=<%=intLatestTicket%>";
        }
      });
    }, 5000);

    setInterval('__weatherwidget_init()', 900000)
  </script>
</head>

<body id = "main" onload="onStart()">

  <!-- Play sound when a ticket is received -->
  <%If bolNewTicketArrived Then %>
    <%If objNameCheckSet(3) = "" or IsNull(objNameCheckSet(3)) Then %>
        <audio src="../themes/<%=Application("Theme")%>/sounds/alert.mp3" autoplay="autoplay"> </audio>
    <%Else%>
        <audio src="../themes/<%=objNameCheckSet(3)%>/sounds/alert.mp3" autoplay="autoplay"> </audio>
    <%End If%>
  <%End If%>

  <!-- Side bar for settings etc -->
  <div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="#myModal" data-toggle="modal">Settings</a>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div vertical-alignment-helper>
      <div class="modal-dialog vertical-align-center" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Settings</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form class = "checkbox form-horizontal">
              <div class = "row sliderWrapper row_middle">
                <div class = "col-sm-6"> Enable Test Mode </div>
                <label class= "switch">
                  <input type = "checkbox" name = "testMode" id = "testMode" value = "" autocomplete = "off" onchange = "testModeSwitch()">
                  <span class ="slider round"></span>
                </label>
              </div>
              <div class = "row sliderWrapper row_middle" id = "sampleCardOption">
                <div class = "col-sm-6">Show Sample Card <span class="glyphicon glyphicon-info-sign"></span> </div>
                <label class = "switch">
                  <input type = "checkbox" name = "showSampleCard" id = "showSampleCard" value = "" autocomplete = "off">
                  <span class ="slider round"></span>
                </label>
              </div>
              <div class = "row sliderWrapper row_middle">
                <div class = "col-sm-6"> Show Period Information </div>
                <label class= "switch">
                  <input type = "checkbox" name = "showPeriod" id = "showPeriod" value = "" autocomplete = "off">
                  <span class ="slider round"></span>
                </label>
              </div>
              <div class = "row sliderWrapper row_middle">
                <div class = "col-sm-6">Show User Pictures</div>
                <label class = "switch">
                  <input type = "checkbox" name = "showPicture" id = "showPicture" value = "" autocomplete = "off">
                  <span class ="slider round"></span>
                </label>
              </div>
              <div class = "row row_middle">
                <span style="white-space: nowrap">
                  <label for = "ShowClock" class = "col-sm-6" style="padding-right: 40px;"> Show Clock: </label>
                  <select class = "form-control" id="ShowClock" style = "display:inline-block">
                    <option id = "NoClock" value = "NoClock">No</option>
                    <option id = "ClockAtTop" value = "ClockAtTop">Top</option>
                    <option id = "ClockAtBottom" value = "ClockAtBottom">Bottom</option>
                  </select>
                </span>
              </div>
              <div class = "row row_middle">
                <span style="white-space: nowrap">
                  <label for = "DayType" class = "col-sm-6" style="padding-right: 40px;"> Day Type: </label>
                  <select class = "form-control" id="DayType" style = "display:inline-block">
                    <option id = "Regular" value = "Regular">Regular</option>
                    <option id = "Extended" value = "Extended">Extended Guide Room</option>
                    <option id = "Half" value = "Half">Half Day</option>
                    <option id = "OneHourDelay" value = "OneHourDelay">One-Hour Delay</option>
                    <option id = "TwoHourDelay" value = "TwoHourDelay">Two-Hour Delay</option>
                    <option id = "PMAssembly" value = "PMAssembly">PM Assembly</option>
                  </select>
                </span>
              </div>
              <div style="height:15px;"></div>
              <div class = "row row_middle">
                <span style="white-space: nowrap">
                <!-- <div class = "col-sm-6">Widget For No Tickets</div> -->
                  <label for = "widget" class = "col-sm-6" > Widget: </label>
                  <select class = "form-control" id="widget" style = "display:inline-block">
                    <option id = "None" value = "None"> None</option>
                    <option id = "Weather" value = "Weather">Weather</option>
                    <% If Application("LibreNMSServer") <> "" Then %>
                      <option id = "Bandwidth" value = "Bandwidth">Bandwidth Info</option>
                    <% End If %>
                  </select>
                </span>
              </div>
              <div class = "row row_middle">
                <span style="white-space: nowrap">
                <!-- <div class = "col-sm-6">Widget For Alert Sound</div> -->
                  <label for = "alert" class = "col-sm-6" > Alert Sound: </label>
                  <select class = "form-control" id="widget" style = "display:inline-block">
                    <option id = "Chime" value = "Chime"> Chime</option>
                    <option id = "HeeHee" value = "HeeHee">Hee Hee</option>
                  </select>
                </span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button onclick = "storeSettings()" type="button" class="btn btn-primary" data-dismiss-"modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class = "container-fluid">
      <div class = "row info_bar row_middle">

        <div class = "col-md-1">
          <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>
        </div>
        <!-- Single Column Logo -->
        <div class = "col-md-1 page_title">
          <img src="../assets/kiosk-logo.png" >
        </div>

        <!-- Current Period and Time Information -->
        <div class="col-md-7 center">
          <span class="info_bar_text">
            <div class="information" id="currentPeriod"></div>
          </span>
          <div id="TopClock"></div>
        </div>
        <div class = "col-md-3">
          <span class = "info_bar_text">

            <!-- Weather Widget -->
            <div id>
              <a class="weatherwidget-io right"
              href="<%=Application("WeatherURL")%>"
              data-label_1="<%=Application("WeatherSite")%>"
              data-icons="Climacons Animated"
              data-mode="Current" data-textcolor="#ffffff"
              data-suncolor="#ffee00"
              data-mooncolor="#f1f1f1"
              data-cloudcolor="#f1f1f1"
              data-raincolor="#086eff"
              data-snowcolor="#ffffff"><%=Application("WeatherSite")%> WEATHER</a>
              <script>
                !function(d,s,id){
                var js,fjs=d.getElementsByTagName(s)[0];
                if(!d.getElementById(id)){
                  js=d.createElement(s);
                  js.id=id;
                  js.src='https://weatherwidget.io/js/widget.min.js';
                  fjs.parentNode.insertBefore(js,fjs);
                }
              }
              (document,'script','weatherwidget-io-js');
              </script>
            </div>
          </span>
        </div>
      </div>
      <!-- Large Weather Widget -->
      <div class = "container" id = "full-weather" style = "display: none; align-items-center; padding-top: 70px !important;">
        <a class="weatherwidget-io"
        href="<%=Application("WeatherURL")%>"
        data-icons="Climacons Animated"
        data-label_1="<%=Application("WeatherSite")%>"
        data-theme="pure"><%=Application("WeatherSite")%></a>
        <script>
          !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
            if(!d.getElementById(id)){
              js=d.createElement(s);
              js.id=id;
              js.src='https://weatherwidget.io/js/widget.min.js';
              fjs.parentNode.insertBefore(js,fjs);
            }
          }(document,'script','weatherwidget-io-js');
        </script>
      </div>

      <!-- Bandwidth Widget -->
      <div class = "container" id = "bandwidth-info" style = "background-color: white; display: none; align-items-center; padding-top 70px !important;">
        <div class = "row">
          <div col-sm-12>
            <img src="<%=Application("LibreNMSServer")%>/graph.php?id=<%=Application("BandwidthPort")%>&type=port_bits&width=450&height=150&from=end-24h">
          </div>
        </div>
      </div>

      <!-- Sample Card -->
      <div class = "row" id = "sample-card"  style = "display:none">
        <div class = "col-xs-6 col-md-4 col-lg-4">
          <div class="card card_space">
            <div class="header_secondary card-header small_header py-3 d-flex align-items-center">
              <strong><center>Jaime Smith</center></strong>
            </div>
            <div class="card-block">
              <div class = "row">
                <div class = "col-md-4 picture">
                  <img src="/photos/Students/1904.jpg" alt="Avatar" style="width:100%;">
                </div>
                <div class = "col-md-8">
                  <div class = "container">
                    <div class = "row">
                      <ticket_info>HS - 116</ticket_info>
                    </div>
                    <div class = "row">
                      <ticket_info>Date: 3/26/18</ticket_info>
                    </div>
                    <div class = "row">
                      <ticket_info>Time: 12:00 PM</ticket_info>
                    </div>
                    <div class = "row">
                      <ticket_info>Phone: 1116</ticket_info>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container desc_container">
                <div class = "row" style="padding-left: 5px; padding-right: 5px;">
                  <ticket_desc>I'm the one who designed the cards and photographed the background images.</ticket_desc>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card/Ticket -->
      <div class = "row ticket">
        <% Do Until objRecentTickets.EOF %>
          <div class = "col-xs-6 col-sm-6 col-md-4 col-lg-4">

            <!-- Card Design By Jaime Elizabeth Smith -->
            <div class="card card_space">
              <div class="header_secondary card-header small_header py-3 d-flex align-items-center">
                <strong><center><%=objRecentTickets(1)%></center></strong>
              </div>
              <div class="card-block">
                <div class = "row">
                  <div class = "col-md-4 picture">
                    <% If IsNumeric(Left(objRecentTickets(9),1)) or InStr(Left(objRecentTickets(11),InStr(objRecentTickets(11),"@")),".") > 0 Then
                      Set objFSO = CreateObject("Scripting.FileSystemObject")
                        If objFSO.FileExists(Application("PhotoLocation") & "\students\" & objRecentTickets(8) & ".jpg") Then %>
                          <img src="/photos/Students/<%=objRecentTickets(8)%>.jpg" alt="Avatar" style="width:100%;">
                        <% Else %>
                          <img src="/photos/Students/missing.png" alt="Avatar" style="width:100%;">
                        <% End If %>
                    <% Else
                      Set objFSO = CreateObject("Scripting.FileSystemObject")
                      If objFSO.FileExists(Application("PhotoLocation") & "\teachers\" & objRecentTickets(8) & ".jpg") Then %>
                        <img src="/photos/Teachers/<%=objRecentTickets(8)%>.jpg" alt="Avatar" style="width:100%;">
                      <% Else %>
                        <img src="/photos/Teachers/missing.png" alt="Avatar" style="width:100%;">
                      <%End If%>
                    <% End If %>
                  </div>
                  <div class = "col-md-8">
                    <div class = "container">
                      <div class = "row">
                  <% If objRecentTickets(2) = "High School" Then%>
                          <ticket_info>HS - <%=objRecentTickets(7)%></ticket_info>
                  <% ElseIf objRecentTickets(2) = "Elementary" Then%>
                          <ticket_info>ES - <%=objRecentTickets(7)%></ticket_info>
                  <% ElseIf objRecentTickets(2) = "Middle School" Then%>
                          <ticket_info>MS - <%=objRecentTickets(7)%></ticket_info>
                  <% ElseIf objRecentTickets(2) = "Business Office" Then%>
                          <ticket_info>BO - <%=objRecentTickets(7)%></ticket_info>
                  <% ElseIf objRecentTickets(2) = "Bus Garage" Then%>
                          <ticket_info>Garage - <%=objRecentTickets(7)%></ticket_info>
                  <% Else %>
                  <ticket_info><%=objRecentTickets(2)%> - <%=objRecentTickets(7)%></ticket_info>
                  <% End If %>
                </div>
                <div class = "row">
                  <ticket_info>Date: <%=ShortenDate(objRecentTickets(4))%></ticket_info>
                </div>
                <div class = "row">
                  <ticket_info>Time: <%=ShortenTime(objRecentTickets(3))%></ticket_info>
                </div>
                <div class = "row">
                  <ticket_info>Phone: <%=objRecentTickets(10)%></ticket_info>
                </div>
              </div>
            </div>
          </div>
          <div class="container desc_container">
            <div class = "row" style="padding-left: 5px; padding-right: 5px;">
              <ticket_desc> <%=objRecentTickets(6)%></ticket_desc>
            </div>
            </div>
          </div>
        </div>
      </div>
      <%  objRecentTickets.MoveNext
      Loop%>
    </div>
    <div class="footer_left"><div id="BottomClock"></div></div>
  	 <div class="footer_center">Copyright &copy; 2012-2020 Matt Hull & Dane Davis. All Rights Reserved; Designed By Jaime Smith</div>
  <% If intTotalOpenTickets >= 6 Then %>
      <div class="footer_right"><%=intTotalOpenTickets-6%> additional ticket(s)</div>
  <% End If %>
	</div>


</body>
</html>
<%End Sub%>

<%
'Function to Shorten Date
Function ShortenDate(strDate)

	If Not IsNull(strDate) Then
		If strDate <> "" Then
			ShortenDate = Left(strDate,Len(strDate) - 4) & Right(strDate,2)
		End If
	End If

End Function %>


<%
' Function to Shorten Time
Function ShortenTime(strTime)

	If Not IsNull(strTime) Then
		If strTime <> "" Then
			ShortenTime = Left(strTime,Len(strTime) - 6) & " " & Right(strTime,2)
		End If
	End If

End Function %>

<%Sub AccessDenied

  If bolShowLogout Then
    Response.Redirect("login.asp?action=logout")
  Else %>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
      <head>
        <title>HDL - Admin</title>
        <link rel="stylesheet" type="text/css" href="../themes/<%=Application("Theme")%>/<%=Application("Theme")%>.css" />
        <link rel="apple-touch-icon-precomposed" href="<%=Application("IconLocation")%>/ipadadminicon.png" />
        <link rel="shortcut icon" href="<%=Application("IconLocation")%>/helpdesk.ico" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        <center><b>Access Denied</b></center>
      </body>
    </html>

<% End If

End Sub%>

<%Function GetUser

  Const USERNAME = 1

  Dim strUserAgent, strSessionID, objSessionLookup

  'Get some needed data
  strSessionID = Request.Cookies("SessionID")
  strUserAgent = Request.ServerVariables("HTTP_USER_AGENT")

  'Send them to the logon screen if they don't have a Session ID
  If strSessionID = "" Then
    SendToLogonScreen

  'Get the username from the database
  Else

    strSQL = "SELECT ID,UserName,SessionID,IPAddress,UserAgent,ExpirationDate FROM Sessions "
    strSQL = strSQL & "WHERE UserAgent='" & Left(Replace(strUserAgent,"'","''"),250) & "' And SessionID='" & Replace(strSessionID,"'","''") & "'"
    strSQL = strSQL & " And ExpirationDate > Date()"
    Set objSessionLookup = Application("Connection").Execute(strSQL)

    'If a session isn't found for then kick them out
    If objSessionLookup.EOF Then
      SendToLogonScreen
    Else
      GetUser = objSessionLookup(USERNAME)
    End If
  End If

End Function%>

<%Sub SendToLogonScreen

	Dim strReturnLink, strSourcePage

  'Build the return link before sending them away.
  strSourcePage = Request.ServerVariables("SCRIPT_NAME")
  strSourcePage = Right(strSourcePage,Len(strSourcePage) - InStrRev(strSourcePage,"/"))
  If strReturnLink = "" Then
    strReturnLink = "?SourcePage=" & strSourcePage
  Else
    strReturnLink = strReturnLink & "&SourcePage=" & strSourcePage
  End If

  Response.Redirect("login.asp" & strReturnLink)

End Sub %>

<%Sub VersionProblem %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
  <title>HDL - Admin</title>
  <link rel="stylesheet" type="text/css" href="../themes/<%=Application("Theme")%>/<%=Application("Theme")%>.css" />
  <link rel="apple-touch-icon-precomposed" href="<%=Application("IconLocation")%>/ipadadminicon.png" />
  <link rel="shortcut icon" href="<%=Application("IconLocation")%>/helpdesk.ico" />
  <meta name="viewport" content="width=device-width" />
</head>
<body>
  <center><b>Web and Database versions don't match</b></center>
</body>
</html>

<%
Response.End

End Sub%>
