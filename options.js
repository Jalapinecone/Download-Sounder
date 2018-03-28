//*************
//  Options
//*************
document.getElementById('save').addEventListener('click', function(save_options){
	
	chrome.storage.local.clear;
	
	var soundChecked = document.getElementById('SoundOption').checked;
	console.log(soundChecked);//debugging
	
	var notificationChecked = document.getElementById('NotificationOption').checked;
	console.log(notificationChecked);//debugging
	
	//save the options
	chrome.storage.local.set({'check': soundChecked});
	chrome.storage.local.set({'nCheck': notificationChecked});
	
});