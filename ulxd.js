// =========== VARS ===========================
var flashtime = 2.5; //time the flashing indicator stays lit
var device_flashtime = 0;
var channel_1_flashtime = 0;
var channel_2_flashtime = 0;
var channel_3_flashtime = 0;
var channel_4_flashtime = 0;
var todo = false;
var string= "" ;
var contain = {
	"flash"	:		["Flash", "b", "FLASH"],
	"name"	:		["Chan Name", "s", "CHAN_NAME"],
	"trans" : 		["Transmitter", "s","TX_TYPE"],
	"pwrlock" : 	["Power Lock", "s","TX_PWR_LOCK"],
	"menlock" : 	["Menu Lock", "s","TX_MENU_LOCK"],
	"gain" : 		["Audio Gain", "s","AUDIO_GAIN"],
	"txoffset" : 	["Gain Offset", "s","TX_OFFSET"],
	"txmute" : 		["Mute", "s","TX_MUTE_STATUS "],
	"rfpower" : 	["RF Power", "s","TX_RF_PWR"],
	"frequ" : 		["Frequency", "s","FREQUENCY"],
	"rfgroup" : 	["RF Group", "s","GROUP_CHAN"],
	"rfchann" : 	["RF Channel", "s",""],
	"antenna" : 	["Antenna", "s","RF_ANTENNA"],
	"rflvl" : 		["RF", "s", ""],
	"rfgpeak" : 	["RF Level", "f1", "RX_RF_LVL"],
	"audiolvl" : 	["Audio Level", "s", ""],
	"audlvlpk" : 	["Audio Peak", "f2", "AUDIO_LVL"],	
	"encrypt" : 	["Encryption Warn", "s", "ENCRYPTION_WARNING"],
	"battcycle" : 	["Battery Cycles", "s", "BATT_CYCLE"],
	"batthealth" : 	["Battery Health", "s", "BATT_HEALTH"],
	"battrun" : 	["Battery Runtime", "s", "BATT_RUN_TIME"],
	"battype" : 	["Battery Type", "s", "BATT_TYPE"],
	"battcharge" : 	["Battery Charge", "f3", "BATT_CHARGE"],
	"battbars" : 	["Battery Bars", "en", "BATT_BARS"]};

// =======================================
//			FUNCTION INIT
// =======================================

function init() {
  		script.setUpdateRate(1);
  		getAll();
  
//=========== Insert Parameters ====================
  	reset = local.parameters.addTrigger("Reset" , "Reset Update Rate Values" , false);
  	rCh1= local.parameters.addEnumParameter("Update Rate Ch 1", "Update Rate Ch 1","no Updates","00000","very slow (15sec)","15000","slow (5sec)","05000","medium (2,5sec)","02500","fast (1sec)","01000","faster (0,5sec)","00500","very fast (0.2sec)","00200","fastest (0,1sec)","00100");
	rCh2= local.parameters.addEnumParameter("Update Rate Ch 2", "Update Rate Ch 2","no Updates","00000","very slow (15sec)","15000","slow (5sec)","05000","medium (2,5sec)","02500","fast (1sec)","01000","faster (0,5sec)","00500","very fast (0.2sec)","00200","fastest (0,1sec)","00100");
	rCh3= local.parameters.addEnumParameter("Update Rate Ch 3", "Update Rate Ch 3","no Updates","00000","very slow (15sec)","15000","slow (5sec)","05000","medium (2,5sec)","02500","fast (1sec)","01000","faster (0,5sec)","00500","very fast (0.2sec)","00200","fastest (0,1sec)","00100");
	rCh4= local.parameters.addEnumParameter("Update Rate Ch 4", "Update Rate Ch 4","no Updates","00000","very slow (15sec)","15000","slow (5sec)","05000","medium (2,5sec)","02500","fast (1sec)","01000","faster (0,5sec)","00500","very fast (0.2sec)","00200","fastest (0,1sec)","00100");

	
// =======================================
//			CREATE CONTAINERS
// =======================================

  
//=============== Device Container ==================
	var dev = local.values.addContainer("Device");
		dev.setCollapsed(true);	
		dev.addBoolParameter("Flash", "",false);	
		r=dev.addStringParameter("Model Name", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Receiver ID", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("MAC Address", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("IP Address", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("RF Band", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Lock Status", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Encryption", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Summing Mode", "","Only for Multi-Ch-Models");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Diversity Mode", "","Only for Multi-Ch-Models");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("High Density", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("FW Version", "","");
		r.setAttribute("readonly" ,true);
		
//============== Channels Container ==================
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	 var chan = local.values.addContainer("Channel 1");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "b") {
			p=chan.addBoolParameter(contain[champs[n]][0], "",false);  }
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -50,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,100); 
			p.setAttribute("readonly" ,true);}
			else if (contain[champs[n]][1] == "en") {			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	} }
			
	var chan = local.values.addContainer("Channel 2");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "b") {
			p=chan.addBoolParameter(contain[champs[n]][0], "",false);  }
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -50,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,100); 
			p.setAttribute("readonly" ,true);}
			else if (contain[champs[n]][1] == "en") { 			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	}  }
			
	var chan = local.values.addContainer("Channel 3");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "b") {
			p=chan.addBoolParameter(contain[champs[n]][0], "",false);  }
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -50,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,100); 
			p.setAttribute("readonly" ,true);} 
			else if (contain[champs[n]][1] == "en") {			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	}  }
			
	var chan = local.values.addContainer("Channel 4");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "b") {
			p=chan.addBoolParameter(contain[champs[n]][0], "",false); }
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -50,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,100); 
			p.setAttribute("readonly" ,true);} 
			else if (contain[champs[n]][1] == "en") {		
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	}	}
			
			
			
}

function update(delta){
  }
  
// =======================================
//			HELPER
// =======================================

function toInt(input) {
  //function is used to parse strings with leading 0 to int, parseInt assumes a number in octal representation due to the leading 0, so 05000 becomes 2560. with this function 05000 will be parsed as 5000.
  string = input;
  notNull = false;
  res = "";
  for (indx = 0; indx < string.length; indx++) {
    char = string.substring(indx, indx + 1);
    if (char != 0 || notNull) {
      res += char;
      notNull = true;
    }
  }

  return parseInt(res);
}

function setFlash(ch) {
  if (typeof ch == "undefined" || ch == 0) {
    local.send("< SET FLASH ON >");
  } else if (ch == 1 || ch == 2 || ch == 3 || ch == 4) {
    local.send("< SET " + ch + " FLASH ON >");
  }
}


// =======================================
//			DATA RECEIVED
// =======================================

function dataReceived(inputData) {
  // example of incoming messages:
  // < REP x GROUP_CHANNEL {6,100} >  |  x is replaced by the channel number
  // < REP x CHAN_NAME {yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy} >
  // < REP MODEL {SLXD4yyyyyyyyyyyyyyyyyyyyyyyyyyy} >
  // < SAMPLE 1 ALL 102 102 086 >
  // it is possible that we receive multiple messages in one data packet, we need to split them

  splitData = inputData.split(">");
  for (item = 0; item < splitData.length; item++) {
    data = splitData[item];
    // Removing the surrounding "<" and ">"
    trimmedStr = data.substring(2, data.length - 1);
    // remove possible string answers
    if (trimmedStr.indexOf("{") > -1) {
      string = trimmedStr.substring(
        trimmedStr.indexOf("{"),
        trimmedStr.indexOf("}") + 1
      );
      trimmedStr = trimmedStr.replace(string, "");
      string = string.replace("{", "").replace("}", "");
    }

// ========= Splitting the string by spaces ==========
    parts = trimmedStr.split(" ");

    if (parts[0] == "REP") {
      //message is a return value from the receiver
      //TODO: do something with it
      //script.log(parts[2]);

// =======================================
// 				DEVICE INFOS 
// =======================================
      if (parts[1] == "MODEL") {
        local.values.device.modelName.set(string);
      }
      if (parts[1] == "DEVICE_ID") {
        local.values.device.receiverID.set(string);
      }
      
      if (parts[1] == "NET_SETTINGS") {
        local.values.device.macAddress.set(parts[7]);
        local.values.device.ipAddress.set(parts[4]);
      }
      if (parts[1] == "FW_VER") {
        local.values.device.fwVersion.set(string);
      }
      if (parts[1] == "RF_BAND") {
        local.values.device.rfBand.set(string);
      }
      if (parts[1] == "LOCK_STATUS") {
        local.values.device.lockStatus.setData(string);
      }
      if (parts[1] == "ENCRYPTION") {
        local.values.device.encryption.set(parts[2]);
      }
      if (parts[1] == "FLASH") {
        if (parts[2] == "ON") {
          local.values.device.flash.set(true);
        } else {
          local.values.device.flash.set(false);
        }
      }
// =======================================
//			 CHANNEL INFOS 
// =======================================

      if (parts[2] == "FLASH") {
        if (parts[3] == "ON") {
          local.values.getChild("channel" + parts[1]).flash.set(true);
        } else {
          local.values.getChild("channel" + parts[1]).flash.set(false);
        }
      }
      if (parts[2] == "CHAN_NAME") {
        local.values.getChild("channel" + parts[1]).chanName
          .set(string);
      } 
      if (parts[2] == "TX_TYPE") {
        local.values.getChild("channel" + parts[1]).transmitter
          .set(parts[3]);
      }
      if (parts[2] == "TX_PWR_LOCK") {
        local.values.getChild("channel" + parts[1]).powerLock.set(parts[3]);
      }
      if (parts[2] == "TX_MENU_LOCK") {
        local.values.getChild("channel" + parts[1]).menuLock.set(parts[3]);
      }
      if (parts[2] == "METER_RATE") {
        local.parameters.getChild("updateRateCh" + parts[1]).setData(parts[3]);
      }
      if (parts[2] == "GROUP_CHAN") {
      	var grp_chan = parts[3];
        grp_chan =  grp_chan.split(",");     
        local.values.getChild("channel" + parts[1]).rfGroup.set(grp_chan[0]);
        local.values.getChild("channel" + parts[1]).rfChannel.set(grp_chan[1]);
      }
      if (parts[2] == "AUDIO_GAIN") {
          parts[3] = parts[3].substring(1, parts[3].length);
          var val = parseFloat(parts[3]) - 18 ;
          val = val+" db" ;
        local.values.getChild("channel" + parts[1]).audioGain.set(val);
      }
      if (parts[2] == "TX_OFFSET") {
      var val = parseFloat(parts[3])-12 ;
		if (val > 21) { val = "NO TRANSMITTER" ;}
		else {val = val+" db" ;}
        local.values.getChild("channel" + parts[1]).gainOffset.set(val);
      }
       if (parts[2] == "TX_MUTE_STATUS") {
        local.values.getChild("channel" + parts[1]).mute.set(parts[3]);
      }
      if (parts[2] == "RX_RF_LVL") {
      var rfparse = parseFloat(parts[3]) -115;
      	if (rfparse > -10) {rf = rfparse+" dBm - OverLoad!";}
         if (rfparse < -75) {rf = "RF too low !";}
         else {rf = rfparse+" dBm";}
        local.values.getChild("channel" + parts[1]).rf.set(rf);
        local.values.getChild("channel" + parts[1]).rfLevel.set(rfparse);
      }               
      if (parts[2] == "AUDIO_LVL") {
      var parselvl = parseFloat(parts[3]) -50 ;
      if (parselvl <  -45) { var lvlstring = "NO SIGNAL!" ;}
      else
      {var lvlstring = parselvl+" dbFS" ;}
     	local.values.getChild("channel" + parts[1]).audioLevel.set(lvlstring);
        local.values.getChild("channel" + parts[1]).audioPeak.set(parselvl);
      }
           
      if (parts[2] == "TX_RF_PWR") {
        local.values.getChild("channel" + parts[1]).rfPower.set(parts[3]);
      }
      
      if (parts[2] == "RF_ANTENNA") {
      	var ant = parts[3];
      	if (ant== "XX" || ant== "" ){ ant = "RF no antenna" ;}
      	if (ant== "AX"){ ant = "antenna A" ;}
      	if (ant== "XB"){ ant = "antenna B" ;}
      	if (ant== "AB"){ ant = "antenna A & B" ;}
        local.values.getChild("channel" + parts[1]).antenna.set(ant);
      }
      if (parts[2] == "FREQUENCY") {
        dec = parts[3].substring(parts[3].length - 3, parts[3].length);
        lead = parts[3].substring(0, parts[3].length - 3);
        local.values.getChild("channel" + parts[1]).frequency.set(lead + "." + dec);
         var band = "--" ;
        if(lead >470 && lead< 534){ band = "G51" ;}
        else if(lead >534 && lead< 598){ band = "H51" ;}
        else if(lead >606 && lead< 670){ band = "K51" ;}
        local.values.device.rfBand.set(band);
      }
      
      if (parts[2] == "ENCRYPTION_WARNING") {
        local.values.getChild("channel" + parts[1]).encryptionWarn.set(parts[3]);
      }
      
       if (parts[2] == "BATT_TYPE") {
        local.values.getChild("channel" + parts[1]).batteryType.set(parts[3]);
      }
      if (parts[2] == "BATT_BARS") {
      var charge = parseFloat(parts[3]) ;
      if ( charge > 5){charge = 0 ;}
        local.values.getChild("channel" + parts[1]).batteryBars.setData(parseInt(parts[3]));
      }
      if (parts[2] == "BATT_CHARGE") {
      var charge = parseFloat(parts[3]) ;
      if ( charge > 5){charge = 0 ;}
        local.values.getChild("channel" + parts[1]).batteryCharge.set(charge);
      }
       if (parts[2] == "BATT_CYCLE") {
      	var cycle = parseFloat(parts[3]);
      	 if (cycle == 65535) {
          local.values.getChild("channel" + parts[1]).batteryCycles.set("SHOWN ONLY FOR SB900 !");}
          else
          {local.values.getChild("channel" + parts[1]).batteryCycles.set(""+cycle+" cycles");}
      }
      if (parts[2] == "BATT_HEALTH") {
      	var health = parseFloat(parts[3]);
      	 if (health == 255) {
          local.values.getChild("channel" + parts[1]).batteryHealth.set("SHOWN ONLY FOR SB900 !");}
          else
          {local.values.getChild("channel" + parts[1]).batteryHealth.set(""+health+" %");}
      }
      if (parts[2] == "BATT_RUN_TIME") {
        mins = parseFloat(parts[3]);
        if (mins <= 65532) {
          hrs = Math.floor(mins / 60);
          min = mins - hrs * 60;
          lbl = hrs + " hrs " + min + " min";
        } else if (mins == 65533) {
          lbl = "Battery communication warning";
        } else if (mins == 65534) {
          lbl = "Battery time calculating";
        } else if (mins == 65535) {
          lbl = "SHOWN ONLY FOR SB900 !";
        }  
        local.values.getChild("channel" + parts[1]).batteryRuntime.set(lbl);
      }
      if (parts[2] == "TX_BATT_MINS") {
        mins = parseFloat(parts[3]);
        if (mins <= 65532) {
          hrs = Math.floor(mins / 60);
          min = mins - hrs * 60;
          lbl = hrs + " hrs " + min + " min";
        } else if (mins == 65533) {
          lbl = "Battery communication warning";
        } else if (mins == 65534) {
          lbl = "Battery time calculating";
        } else if (mins == 65535) {
          lbl = "UNKNOWN";
        }
        local.values.getChild("channel" + parts[1]).batteryRuntime.set(lbl);
      }
    } else if (parts[0] == "SAMPLE") {
      if (parts[2] == "ALL") {
      	//A/B Antenna
      	var ant = parts[3];
      	if (ant== "XX" || ant== "" ){ ant = "RF no antenna" ;}
      	if (ant== "AX"){ ant = "antenna A" ;}
      	if (ant== "XB"){ ant = "antenna B" ;}
        local.values.getChild("channel" + parts[1]).antenna.set(ant);
        
         //RF Level
         var rfparse = parseFloat(parts[4]) - 115 ;
         if (rfparse > -10) {rf = rfparse+" dBm - OverLoad!";}
         if (rfparse < -75) {rf = "RF too low !";}
         else {rf = rfparse+" dBm";}
        local.values.getChild("channel" + parts[1]).rf.set(rf);
        local.values.getChild("channel" + parts[1]).rfLevel.set(rfparse);
        
        //Audio Level Peak
        var parselvl = parseFloat(parts[5]) -50;
//		var level = parselvl - 50 ;
		if (parselvl < -45)  {level = "NO SIGNAL!" ;}
        else if (parselvl >= -10)  {level = parselvl+" dbFS - Clip!" ;}
        else {level = parselvl+" dbFS" ;}
        var lvlstring = parselvl - 50 ;
        local.values.getChild("channel" + parts[1]).audioLevel.set(level);
        local.values.getChild("channel" + parts[1]).audioPeak.set(parselvl);
      }
    }
  }
}

// =======================================
// 				PARAM CHANGE
// =======================================


function moduleParameterChanged(param) {
  		if (param.name == "isConnected" && param.get() == 1) {
    	getAll();  }
    	
    	if (param.name == "reset") {
    	local.parameters.updateRateCh1.set("no Updates");
    	local.parameters.updateRateCh2.set("no Updates");
    	local.parameters.updateRateCh3.set("no Updates");
    	local.parameters.updateRateCh4.set("no Updates");
    	}
    	
    	if (param.name == "updateRateCh1") {
    	setMeterRate(1, param.get());  }	
  		if (param.name == "updateRateCh2") {
    	setMeterRate(2, param.get()); }
    	if (param.name == "updateRateCh3") {
    	setMeterRate(3, param.get());  }
  		if (param.name == "updateRateCh4") {
    	setMeterRate(4, param.get()); }

}

// =======================================
// 				 VALUE CHANGE 
// =======================================

function moduleValueChanged(value) {
  
  if (value.name == "update") {
      local.send("< GET 1 ALL >");
    }
  if (value.getParent().name == "device") {
    if (value.name == "flash" && value.get() == 1) {
      setFlash(0);
    }
    if (value.name == "deviceID") {
      setDeviceID(value.get());
    }
  }
  if (value.getParent().name.substring(0, 7) == "channel") {
    channel = value.getParent().name.substring(7, 8);
    if (value.name == "flash" && value.get() == 1) {
      setFlash(channel);
    }

  }
}

// =======================================
// 				 REQUESTS 
// =======================================

function requestModel() {
  //< GET MODEL >
  local.send("< GET MODEL >");
}

function requestDeviceID() {
  //< GET DEVICE_ID >
  local.send("< GET DEVICE_ID >");
}

function requestRfBand() {
  //< GET RF_BAND >
  local.send("< GET RF_BAND >");
}

function requestLockState() {
  //< GET LOCK_STATUS >
  local.send("< GET LOCK_STATUS >");
}

function requestFwVersion() {
  //< GET FW_VER >
  local.send("< GET FW_VER >");
}

function requestChName(ch) {
  //< GET x CHAN_NAME >
  local.send("< GET " + ch + " CHAN_NAME >");
}

function requestChAGain(ch) {
  //< GET x AUDIO_GAIN >
  local.send("< GET " + ch + " AUDIO_GAIN >");
}

function requestChAudioOutLvlSwitch(ch) {
  //< GET x AUDIO_OUT_LVL_SWITCH >
  local.send("< GET " + ch + " AUDIO_OUT_LVL_SWITCH >");
}

function requestChGroup(ch) {
  //< GET x GROUP_CHANNEL >
  local.send("< GET " + ch + " GROUP_CHANNEL >");
}

function requestChFreq() {
  //< GET x FREQUENCY >
  local.send("< GET " + ch + " FREQUENCY >");
}

function getAll() {
  local.send("< GET 0 ALL >");
}

function requests(string) {
  local.send(string);
}


// =======================================
//  			 COMMANDS 
// =======================================


// >>>>>>>> RECEIVER ACTIONS
function divSum(mode) {
  local.send("< FREQUENCY_DIVERSITY_MODE " + mode + " >");
}

function audioSum(mode) {
  local.send("< AUDIO_SUMMING_MODE " + mode + " >");
}

function highDens(mode) {
  local.send("< SET HIGH_DENSITY " + mode + " >");
}

function scanLock(mode) {
  local.send("< SCAN_LOCK " + mode + " >");
}

function syncLock(mode) {
  local.send("< SYNC_LOCK " + mode + " >");
}

function setDeviceID(name) {
  local.send("< SET DEVICE_ID {" + name + "} >");
}

// >>>>>>>> CHANNEL ACTIONS
function sendLine(line) {
    local.send(line );
}

function setChannelName(ch,newName) {
    local.send(
      "< SET " + ch + " CHAN_NAME {" +newName+ "} >" );
}

function setAudioGain(ch,gain) {
    local.send("< SET " + ch + " AUDIO_GAIN " + (gain + 18) + " >");
}

function incAudioGain(ch,addgain) {
    local.send("< SET " + ch + " AUDIO_GAIN INC " + addgain + " >");
}

function decAudioGain(ch,addgain) {
	local.send("< SET " + ch + " AUDIO_GAIN DEC " + addgain + " >");

}

// >>>>>>>> DIVERS
function setMeterRate(ch , rate) {
    local.send("< SET " + ch + " METER_RATE " + rate + " >");
}
