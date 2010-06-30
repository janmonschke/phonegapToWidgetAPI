/**
 * This script enables you to access parts of the PhoneGap API through a W3C Widget API interface
 */
document.addEventListener("deviceready",function(){
	/**
	 * A config Object
	 * @class
	 */
	var wrapperConfig = {};
	/**
	 * If true the wrapper will start watching the Accelerometer.
	 * If you don't need the Accelerometer in your App set this to false
	 * @type Boolean
	 */
	wrapperConfig.watchAccelerometer = true;
	wrapperConfig.accelerometerFrequency = 100;
			
	// first check if the Widget object exists. If so, you don't need to execute any of this script
	if(!window.Widget){
		window.Widget = {};
		window.Widget.Device = {};
		window.Widget.Device.DeviceStateInfo = {};

		////GPS////
		window.Widget.Device.DeviceStateInfo.onPositionRetrieved = function(){};
		/**
		 * Retrieves GPS position and calls window.Widget.Device.DeviceStateInfo.onPositionRetrieved on success and failure
		 * @param {String} method The geo method to use -- currently it doesn't matter what you specify, the gps position will be requested
		 */ 
		window.Widget.Device.DeviceStateInfo.requestPositionInfo = function(method){
			navigator.geolocation.getCurrentPosition(function(pgResult){ // win
				var info = {};
				info.latitude = pgResult.coords.latitude;
				info.longitude = pgResult.coords.longitude;
				window.Widget.Device.DeviceStateInfo.onPositionRetrieved(info, "gps");
			},function(){ // fail
				window.Widget.Device.DeviceStateInfo.onPositionRetrieved(undefined, "gps");
			});
		};
		
		////ACCELEROMETER////
		// The Widget specification sucks at this point imho
		// The wrapper will start watching the Accelerometer info only if you set
		// watchAccelerometer to true so that Apps that don't need it won't have that overhead  
		if(wrapperConfig.watchAccelerometer){
			/**
			 * The value of the xAxis
			 */
			window.Widget.Device.DeviceStateInfo.AccelerometerInfo.xAxis = 0;
			/**
			 * The value of the yAxis
			 */
			window.Widget.Device.DeviceStateInfo.AccelerometerInfo.yAxis = 0;
			/**
			 * The value of the zAxis
			 */
			window.Widget.Device.DeviceStateInfo.AccelerometerInfo.zAxis = 0;
			var accelOpt = {};
			// set the frequency to the defined frequency from wrapperConfig
			accelOpt.frequency = wrapperConfig.accelerometerFrequency;
			navigator.accelerometer.watchAcceleration(function(vals){ //win
				window.Widget.Device.DeviceStateInfo.AccelerometerInfo.xAxis = vals.x;
				window.Widget.Device.DeviceStateInfo.AccelerometerInfo.yAxis = vals.y;
				window.Widget.Device.DeviceStateInfo.AccelerometerInfo.zAxis = vals.z;
			}, 			
			function(){ // fail
				//do nothing
			}, 
			accelOpt
			);
		}
	}else{
		// the Widget object exists, so don't do anything
	}
});	
