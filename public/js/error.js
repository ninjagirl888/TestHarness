

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

  return (message ?? "") + "." + (error_description ?? "");
};


// Will run when page finishes loading
window.onload = async () => {

  document.getElementById("errorText").innerHTML =  extractErrorMessages();
};
