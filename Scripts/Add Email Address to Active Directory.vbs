'Created by Matthew Hull on 9/8/14

'This script will fix all email address in AD  Run as admin.

Option Explicit

'On Error Resume Next

Dim strServer, strOU, strEMailSuffix

strServer = "server.domain.com"
strEMailSuffix = "@domain.com"
strOU = "Enter the DN of the User's Root OU"

FixAccounts(strOU)

Sub FixAccounts(strOU)

   Dim strLDAPAddress, objOU, objUser

   strLDAPAddress = "LDAP://" & strServer & "/"

   Set objOU = GetObject(strLDAPAddress & strOU)

   For Each objUser in objOU

      Select Case objUser.Class

         Case "organizationalUnit"
            FixAccounts(objUser.DistinguishedName)
            
         Case "user"
            objUser.Put "mail", LCase(objUser.samAccountName) & strEMailSuffix
            objUser.SetInfo
      
      End Select

   Next

End Sub

MsgBox "Email Addresses Added to Users in Active Directory"