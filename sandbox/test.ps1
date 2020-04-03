###############################################################################
# Script      : CIT 353 PowerShell Script - Manage-Users
# Description : 

# Author      : Ronaldo Correa - Apr-2020
###############################################################################

# 1.a. Create the required string parameter "filepath" and provide help message
Param(
    [Parameter(Mandatory=$true,HelpMessage="Please enter the XML filename")]
    [String]$filepath
)


# 2. Read the XML file
$l = Get-Location
$location = $l.Path + "\" + $filepath
($users = [xml]'<root></root>').Load($location)



# 3.Create the users
$users.root.user | ForEach-Object -process { 

   
   # 3.a. create the OU if not exist
   #$checkOU = Get-ADOrganizationalUnit -Filter 'Name -like "$_.ou"'
   #if (!$checkUO){
   #   New-ADOrganizationalUnit -Name $_.ou -Path "DC=s1t4,DC=esage,DC=us" -ProtectedFromAccidentalDeletion $False
   #}
  
   
   # 3.b.c. ADD New User and the username to the value in <account> / Set Set the other information as listed
   #New-ADUser 
   #     -Name $_.account 
   #     -GivenName $_.firstname 
   #     -Surname $_.lastname 
   #     -Description $_.description
   #     -AccountPassword (ConvertTo-SecureString $_.password -AsPlainText -Force)
   #     -manager $_.manager
   #     -Path "OU=$_.ou,DC=s1t4,DC=esage,DC=us" 
   #     -SamAccountName $_.account 
   #     -UserPrincipalName "$_.account@s1t4.esage.us"


   # 3.d. make sure each account is not disable
   #Get-ADUser -Searckbase "OU=$_.ou,DC=s1t4,DC-esage,DC=us" -Filter 'samAccountName -like "$_.account"' | Set-ADUser -Enable $true

   

   # 3.e. Require the user to change their password next time they log in
   #Get-ADUser -Searckbase "OU=$_.ou,DC=s1t4,DC-esage,DC=us" -Filter 'samAccountName -like "$_.account"' | Set-ADUser -ChangePasswordAtLogon $true   



   # 3.f. ADD the user to the domain global security group(s)
   $_.memberOf.group | ForEach-Object -process { 
        
        #check if group exist - if not create one
   #     $checkGroup = Get-ADGroup -SearchBase "OU=$_.ou,DC=s1t4,DC=esage,DC=us" -Filter 'SamAccountName -like "$_.account"' 
   #     if (!$checkGroup){
   #        New-ADGroup -Name $_.group -SamAccountName $_.group -Path "OU=$_.ou,DC=s1t4,DC=esage,DC=us" -GroupCategory Security -GroupScope Global
   #     }

        #ADD user member of group
   #     Get-ADGroup -SearchBase "OU=$_.ou,DC=s1t4,DC=esage,DC=us" -Filter 'SamAccountName -like "$_.group"' |
   #     Add-ADGroupMember -Members "CN=$_.account,OU=$_.ou,DC=s1t4,DC=esage,DC=us"

   }

}




