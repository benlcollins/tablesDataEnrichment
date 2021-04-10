/**
 * Global Variables
 */
const API_KEY = '';


/**
 * function to retrieve company data from Mattermark
 */
function mattermarkCompanyDetails(company) {
	  
	company = 'facebook'

	// set up the api
	const base = 'https://api.mattermark.com/';
	const endpoint = 'companies/'
	const query = '?key=' + API_KEY + '&company_name=' + company;
	const url = base + endpoint + query;

	// call the api
	const response = UrlFetchApp.fetch(url);
	console.log(response.getResponseCode());
	console.log(response.getContentText());
	

}
