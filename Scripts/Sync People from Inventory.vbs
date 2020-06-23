'Created by Matthew Hull 6/23/20

On Error Resume Next

CONST USERNAME = 0
CONST STUDENTID = 1
CONST ID = 0

'Get the inventory database path
Set objFSO = CreateObject("Scripting.FileSystemObject")
strCurrentFolder = objFSO.GetAbsolutePathName(".")
strCurrentFolder = strCurrentFolder & "\..\..\Inventory\Database"
strInventoryDatabase = strCurrentFolder & "\Inventory.mdb"

'Get the helpdesk database path
strCurrentFolder = objFSO.GetAbsolutePathName(".")
strCurrentFolder = strCurrentFolder & "\..\Database"
strHelpDeskDatabase = strCurrentFolder & "\Helpdesk.mdb"

'Create the connection to the inventory database
Set objInventoryDB = CreateObject("ADODB.Connection")
strConnection = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" & strInventoryDatabase & ";"
objInventoryDB.Open strConnection

'Create the connection to the helpdesk database
Set objHelpdeskDB = CreateObject("ADODB.Connection")
strConnection = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" & strHelpDeskDatabase & ";"
objHelpdeskDB.Open strConnection

'Get the people from the inventory database
strSQL = "SELECT UserName,StudentID FROM People WHERE Active=True"
Set objPeople = objInventoryDB.Execute(strSQL)

'Loop through the results and look and see if each user is in the help desk
If Not objPeople.EOF Then
	Do Until objPeople.EOF 

		'Look for the user in the help desk
		strSQL = "SELECT ID FROM People WHERE UserName='" & Replace(objPeople(USERNAME),"'","''") & "'"
		Set objPerson = objHelpdeskDB.Execute(strSQL)

		'Add the user if they aren't in the database, if the exist them update the value
		If objPerson.EOF Then
			strSQL = "INSERT INTO People (UserName, StudentID) VALUES ('" & Replace(objPeople(USERNAME),"'","''") & "'," & objPeople(STUDENTID) & ")"
			objHelpdeskDB.Execute(strSQL)
		Else
			strSQL = "UPDATE People SET StudentID=" & objPeople(STUDENTID) & " WHERE ID=" & objPerson(ID)
			objHelpdeskDB.Execute(strSQL)
		End If

		'Move to the next person before restarting the loop
		objPeople.MoveNext
	Loop
End If

MsgBox "Sync Complete"

'Close open opjects
Set objFSO = Nothing
Set objInventoryDB = Nothing
Set objHelpdeskDB = Nothing
