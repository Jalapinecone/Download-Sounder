/*
This extension makes a sound and a notification when a download is finished in Chrome.

*/

var notificationID = null;
var downloadId = null;

var soundEnabled = true;
var notificationEnabled = true;

chrome.storage.onChanged.addListener(function(changes,namespace){
	//Assign the right values to the booleans based on what the user wants
	chrome.storage.local.get("check", function (sound){
		soundEnabled = sound.check;
		console.log("soundEnabled switched to: "+soundEnabled);
	});
	
	chrome.storage.local.get("nCheck", function (noti){
		notificationEnabled = noti.nCheck;
		console.log("notificationEnabled switched to: "+notificationEnabled);
	});
	
	
});

if (!this.DLFinished){
	DLFinished = {};
}

chrome.downloads.onChanged.addListener(function(DLFinished){

	if (DLFinished.state !== undefined){
		//make sure the change in the download is a completion
		if (DLFinished.state.current  == "complete"){
			
			//set the download id for opening the file later
			downloadId = DLFinished.id;
			console.log("Download ID: "+downloadId);
			
			//Check if sound is enabled
			if(soundEnabled == true){
				//plays the sound
				document.getElementById('DLSound').play();
				console.log("Sound Played");
				console.log("SoundEnabled: "+soundEnabled);
			}else{
				//Do Nothing
				console.log("No Sound Played");
				console.log("SoundEnabled: "+soundEnabled);
			}
			
			//Make the notification
			if(notificationEnabled == true){
				chrome.notifications.create('DownloadNotification', {
				type: "basic",
				iconUrl: "icon_128.png",
				title: "Downloaded File",
				message: "Enjoy!",
				
				buttons: [
					{ title: "Show in Folder" },
					{ title: "Open File" }
				]
				},
				function(id){
					notificationID = id;
				});	
				
				console.log("Notification Displayed");
				console.log("NotificationEnabled: "+notificationEnabled);
			}else{
				//Do Nothing
				console.log("Notification Not Displayed: ");
				console.log("NotificationEnabled: "+notificationEnabled);
			}
		}
	}
});

//detect if a notification button has been clicked
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === notificationID) {
        // Show in Folder
		if (btnIdx === 0) {
			chrome.downloads.show(downloadId)
        } 
		// Open File
		else if (btnIdx === 1) {
			chrome.downloads.open(downloadId)
        }
		chrome.notifications.clear(notificationID)
    }
});