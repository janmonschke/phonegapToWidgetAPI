/**
 * This script enables you to access parts of the PhoneGap API through a W3C Widget API interface
 */
document.addEventListener("deviceready",function(){
// first check if the Widget object exists. If so, you don't need to execute any of this script
	if(!window.Widget){
		window.Widget = {};
		window.Widget.Device = {};
		window.Widget.Device.DeviceStateInfo = {};
		/**
		 * Retrieves GPS position and calls window.Widget.Device.DeviceStateInfo.onPositionRetrieved on success and failure
		 * @param {String} method The geo method to use -- currently it doesn't matter what you specify, the gps position will be requested
		 */ 
		window.Widget.Device.DeviceStateInfo.requestPositionInfo = function(method){
			navigator.geolocation.getCurrentPosition(function(pgResult){ // win
				var info = {};
				info.latitude = pgResults.coords.latitude;
				info.longitude = pgResults.coords.longitude;
				Widget.Device.DeviceStateInfo.onPositionRetrieved(locationinfo, "gps");
			},function(){ // fail
				Widget.Device.DeviceStateInfo.onPositionRetrieved(undefined, "gps");
			});
		};
		// navigator.geolocation.getCurrentPosition(win, fail); <- PG 
		// Widget.Device.DeviceStateInfo.onPositionRetrieved(locationinfo, method)
	}else{
		// the Widget object exists, so don't do anything
	}
});	
