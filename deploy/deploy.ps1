## https://www.c-sharpcorner.com/article/installing-sharepoint-framework-spfx-field-customizer-on-an-exisiting-list-col/

$siteUrl = "https://sanlotest.sharepoint.com/sites/talleres-team"
$listTitle = "EmployeesCategories"
$fieldTitle = "ActionsProgress"
Connect-PnPOnline -Url $siteUrl
$list = Get-PnPList -Identity $listTitle
$fld = Get-PnPField -List $list -Identity $fieldTitle
$fld.ClientSideComponentId = "5b1e1458-3f28-4689-9eb2-4f06227b1250"
$fld.Update()
Invoke-PnPQuery
