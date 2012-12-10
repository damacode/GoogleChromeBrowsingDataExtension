document.addEventListener('DOMContentLoaded', on_load);
function on_load(){
  restore_options()
  document.getElementById('save').onclick = handle_save;
  document.getElementById('button').onclick = handle_click;
}
function restore_options() {
  if(localStorage["appcache"] == 'true'){
    document.getElementById('appcache').checked = true;
  }else{
    document.getElementById('appcache').checked = false;
  }
  if(localStorage["cache"] == 'true'){
    document.getElementById('cache').checked = true;
  }else{
    document.getElementById('cache').checked = false;
  }
  if(localStorage["cookies"] == 'true'){
    document.getElementById('cookies').checked = true;
  }else{
    document.getElementById('cookies').checked = false;
  }
  if(localStorage["downloads"] == 'true'){
    document.getElementById('downloads').checked = true;
  }else{
    document.getElementById('downloads').checked = false;
  }
  if(localStorage["fileSystems"] == 'true'){
    document.getElementById('fileSystems').checked = true;
  }else{
    document.getElementById('fileSystems').checked = false;
  }
  if(localStorage["formData"] == 'true'){
    document.getElementById('formData').checked = true;
  }else{
    document.getElementById('formData').checked = false;
  }
  if(localStorage["history"] == 'true'){
    document.getElementById('history').checked = true;
  }else{
    document.getElementById('history').checked = false;
  }
  if(localStorage["indexedDB"] == 'true'){
    document.getElementById('indexedDB').checked = true;
  }else{
    document.getElementById('indexedDB').checked = false;
  }
  if(localStorage["localStorage"] == 'true'){
    document.getElementById('localStorage').checked = true;
  }else{
    document.getElementById('localStorage').checked = false;
  }
  if(localStorage["serverBoundCertificates"] == 'true'){
    document.getElementById('serverBoundCertificates').checked = true;
  }else{
    document.getElementById('serverBoundCertificates').checked = false;
  }
  if(localStorage["pluginData"] == 'true'){
    document.getElementById('pluginData').checked = true;
  }else{
    document.getElementById('pluginData').checked = false;
  }
  if(localStorage["passwords"] == 'true'){
    document.getElementById('passwords').checked = true;
  }else{
    document.getElementById('passwords').checked = false;
  }
  if(localStorage["webSQL"] == 'true'){
    document.getElementById('webSQL').checked = true;
  }else{
    document.getElementById('webSQL').checked = false;
  }
  if(localStorage["time"]){
    document.getElementById('time').value = localStorage["time"];
  }
  if(localStorage["timeframe"]){
    document.getElementById('timeframe').value = localStorage["timeframe"];
  }
}
function handle_save() {
  save_options();
  overlay('Options saved.', 1000);
}
function save_options() {
  localStorage["appcache"] = document.getElementById('appcache').checked;  
  localStorage["cache"] = document.getElementById('cache').checked;  
  localStorage["cookies"] = document.getElementById('cookies').checked;  
  localStorage["downloads"] = document.getElementById('downloads').checked;  
  localStorage["fileSystems"] = document.getElementById('fileSystems').checked;  
  localStorage["formData"] = document.getElementById('formData').checked;  
  localStorage["history"] = document.getElementById('history').checked;  
  localStorage["indexedDB"] = document.getElementById('indexedDB').checked;  
  localStorage["localStorage"] = document.getElementById('localStorage').checked;  
  localStorage["serverBoundCertificates"] = document.getElementById('serverBoundCertificates').checked;  
  localStorage["pluginData"] = document.getElementById('pluginData').checked;  
  localStorage["passwords"] = document.getElementById('passwords').checked;  
  localStorage["webSQL"] = document.getElementById('webSQL').checked;  
  localStorage["time"] = document.getElementById('time').value;  
  localStorage["timeframe"] = document.getElementById('timeframe').value;  
}
function handle_click() {
	  	var removal_start = parseMilliseconds(document.getElementById('timeframe').value);
    if (removal_start != null) {
      chrome.browsingData.remove({ "since" : removal_start }, {
        "appcache": document.getElementById('appcache').checked,
        "cache": document.getElementById('cache').checked,
        "cookies": document.getElementById('cookies').checked,
        "downloads": document.getElementById('downloads').checked,
        "fileSystems": document.getElementById('fileSystems').checked,
        "formData": document.getElementById('formData').checked,
        "history": document.getElementById('history').checked,
        "indexedDB": document.getElementById('indexedDB').checked,
        "localStorage": document.getElementById('localStorage').checked,
        "serverBoundCertificates": document.getElementById('serverBoundCertificates').checked,
        "pluginData": document.getElementById('pluginData').checked,
        "passwords": document.getElementById('passwords').checked,
        "webSQL": document.getElementById('webSQL').checked,
      }, overlay('Browsing data removed.', 1000));
    }else{
		overlay('No time selected.', 1000);
	}
}
function parseMilliseconds(timeframe) {
    var now = new Date().getTime();
    var milliseconds = {
      'minute': 60 * 1000,
      'hour': 60 * 60 * 1000,
      'day': 24 * 60 * 60 * 1000,
      'week': 7 * 24 * 60 * 60 * 1000,
      'year': 365 * 7 * 24 * 60 * 60 * 1000
    };
	var time = document.getElementById('time');
	if(time.value == 0 && timeframe != 'forever'){
	  return null;
	}
    if (milliseconds[timeframe]){
	  var ms = time.value * milliseconds[timeframe];
      return now - ms;
	}
    if (timeframe === 'forever'){
      return 0;
	}
    return null;
}



function overlay(message, time) {
    var success = document.createElement('div');
    success.classList.add('overlay');
    success.setAttribute('id', 'success');
    success.setAttribute('role', 'alert');
    success.textContent = message;
    document.body.appendChild(success);

    setTimeout(function() { success.classList.add('visible'); }, 10);
    setTimeout(function() { success.classList.remove('visible'); }, time);
}


