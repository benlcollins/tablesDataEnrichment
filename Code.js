/**
 * Global Variables
 */
const API_KEY = ''; // <-- enter your Mattermark API key here
const TABLE_NAME = ''; // <-- enter your Google Tables table ID here


/**
 * function to retrieve company data from Mattermark
 */
function mattermarkCompany(companyName) {
	  
	companyName = 'facebook'; // example

	// set up the api
	const base = 'https://api.mattermark.com/';
	const endpoint = 'companies/'
	const query = '?key=' + API_KEY + '&company_name=' + companyName;
	const url = base + endpoint + query;

	// call the api
	const response = UrlFetchApp.fetch(url);
	console.log(response.getResponseCode());
	console.log(response.getContentText());
	
}

/**
 * function to retrive company details
 */
function mattermarkCompanyDetails(tablesData,recordID) {

	// parse incoming data from Google Tables
	//const companyID = tablesData.Company;
	const rowId = recordID;
	const companyID = '159108'; // example

	// set up the api
	const base = 'https://api.mattermark.com/';
	const endpoint = 'companies/' + companyID;
	const query = '?key=' + API_KEY;
	const url = base + endpoint + query;

	// call the api
	const response = UrlFetchApp.fetch(url);
	const data = JSON.parse(response.getContentText());
	console.log(response.getResponseCode());
	//console.log(response.getContentText());

	// parse data
	const companyName = data.name;
	const companyDescription = data.description;
	const companyEmployees = data.employees;
	const companyEmployeesSixMonthsAgo = data.employees_6_months_ago;
	const websiteUniques = data.website_uniques;
	const mobileDownloads = data.mobile_downloads;
	const fundingStage = data.stage;
	const totalFunding = data.total_funding;
	const city = data.city;
	const state = data.state;
	const country = data.country;

	const enrichmentData = {
		'Company Name': companyName,
		'Company Description': companyDescription,
		'Company Employees': companyEmployees,
		'Company Employees 6-Months Ago': companyEmployeesSixMonthsAgo,
		'Website Uniques': websiteUniques,
		'Mobile Downloads': mobileDownloads,
		'Funding Stage': fundingStage,
		'Total Funding': totalFunding,
		'City': city,
		'State': state,
		'Country': country
    };
    console.log(enrichmentData);


	// send data back to Google Tables
    const rowName = 'tables/' + TABLE_NAME + '/rows/' + rowId;
    Area120Tables.Tables.Rows.patch({values: enrichmentData}, rowName);

}
