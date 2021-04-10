/**
 * Global Variables
 */
const API_KEY = '';


/**
 * function to retrieve company data from Mattermark
 */
function mattermarkCompany(companyName) {
	  
	companyName = 'facebook'

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
function mattermarkCompanyDetails(companyID) {

	//const companyDomain = companyName + '.com';
	companyID = '163595';

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
	/*const companyEmployeesSixMonthsAgo = data.employees_6_months_ago;
	const websiteUniques = data.website_uniques;
	const mobileDownloads = data.mobile_downloads;
	const fundingStage = data.stage;
	const totalFunding = data.total_funding;
	const city = data.city;
	const state = data.state;
	const country = data.country;*/

	const enrichmentData = {
      'Company Name': companyName,
      'Company Description': companyDescription,
      'Company Employees': companyEmployees
    };
    console.log(enrichmentData);
    
    //Area120Tables.Tables.Rows.patch({values: enrichmentData}, rowName);

}

/*
COMPANY SEARCH:

{
	"meta":{
		"total_record_count":2,
		"total_pages":1,
		"current_page":1,
		"per_page":2},
	"companies":[
		{
			"id":"163595",
			"url":"https://api.mattermark.com/companies/163595",
			"company_name":"Facebook",
			"domain":"facebook.com"
		},
		{
			"id":"14083821",
			"url":"https://api.mattermark.com/companies/14083821",
			"company_name":"Facebook",
			"domain":"nhanhieulogo.com"
		}
	],
	"total_companies":2,
	"page":1,
	"per_page":2
}

COMPANY DETAILS:

*/