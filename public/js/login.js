// The Auth0 client, initialized in configureClient()
let auth0 = null;

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Extract Error Messages
 */
function extractErrorMessages () {
  var message = getParameterByName('message'); 
  var error_description = getParameterByName('error_description');
  var success = getParameterByName('success');

  if(success=="true") return success;
  return (message ?? "") + "." + (error_description ?? "");
};


// Will run when page finishes loading
window.onload = async  () => {

  if(getParameterByName('success')=="false"){
    document.getElementById("errorText").innerHTML = extractErrorMessages();
  }
  else {
    await configureClient();
    return login();
  }
};

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
  try {
	console.log("Logging in", targetUrl);

    const options = {
      //redirect_uri: window.location.origin
      redirect_uri: "https://www.london.edu"
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};


/**
 * Retrieves the auth configuration from the server
 */
const fetchAuthConfig = () => fetch("/auth_config.json");

/**
 * Initializes the Auth0 client
 */
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId//,
	//audience: config.audience
  });
};

