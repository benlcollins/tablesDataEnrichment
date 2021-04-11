/**
 * Global Variables
 */
const API_KEY = ''; // <-- enter your Mattermark API key here
const TABLE_NAME = ''; // <-- enter your Google Tables table ID here


/**
 * function to retrive logo url
 */
function retrieveCompanyLogo(companyWebsite) {

	// for testing
	companyWebsite = 'bench.co'

	// setup the api
	const base = 'https://s2.googleusercontent.com/s2/favicons?domain=';
	const url = base + companyWebsite;

	// call the api
	const response = UrlFetchApp.fetch(url);
	console.log(response);

}




/**
 * function to retrieve company data from Mattermark
 */
function mattermarkCompany(companyName,recordID) {
	  
	//companyName = 'facebook'; // example

	// set up the api
	const base = 'https://api.mattermark.com/';
	const endpoint = 'companies/'
	const query = '?key=' + API_KEY + '&company_name=' + companyName;
	const url = base + endpoint + query;

	// call the api
	const response = UrlFetchApp.fetch(url);
	const data = JSON.parse(response.getContentText());

	// parse the data
	const companies = data.companies;
	const firstCompany = companies[0];
	const companyID = firstCompany.id;

	console.log(companies);
	console.log(firstCompany);
	console.log(companyID);

	// call the api to get specific company details
	mattermarkCompanyDetails(companyID,recordID);
	
}

/**
 * function to retrive company details
 */
function mattermarkCompanyDetails(companyID,recordID) {

	// example data from Google Tables
	//const companyID = '159108';

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
	const companyWebsite = data.website;
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
		'Company Website': companyWebsite,
		'Company Description': companyDescription,
		'Company Employees': parseInt(companyEmployees),
		'Company Employees 6-Months Ago': parseInt(companyEmployeesSixMonthsAgo),
		'Website Uniques': parseInt(websiteUniques) || 0,
		'Mobile Downloads': parseInt(mobileDownloads) || 0,
		'Funding Stage': fundingStage,
		'Total Funding': parseInt(totalFunding),
		'City': city,
		'State': state,
		'Country': country
    };
    console.log(enrichmentData);


	// send data back to Google Tables
    const rowName = 'tables/' + TABLE_NAME + '/rows/' + recordID;
    Area120Tables.Tables.Rows.patch({values: enrichmentData}, rowName);

}
