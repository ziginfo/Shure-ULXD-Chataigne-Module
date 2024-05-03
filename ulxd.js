// =========== VARS ===========================
var channel_1_flashtime = 0;
var todo = false;
var string= "" ;
var ch = 0 ;
var contain = {
	"name"	:	["Chan Name", "s", ""],
	"trans" : 	["Transmitter", "s",""],
	"pwrlock" : ["Power Lock", "s",""],
	"menlock" : ["Menu Lock", "s",""],
	"gain" : 	["Audio Gain", "s",""],
	"rfpower" : ["RF Power", "s",""],
	"frequ" : 	["Frequency", "s",""],
	"rfgroup" : ["RF Group", "s",""],
	"rfchann" : ["RF Channel", "s",""],
	"antenna" : ["Antenna", "s",""],
	"rflvl" : 	["RF", "s", ""],
	"rfgpeak" : ["RF Level", "f1", ""],
	"audiolvl" : ["Audio Level", "s", ""],
	"audlvlpk" : ["Audio Peak", "f2", ""],	
	"encrypt" : ["Encryption Warn", "s", ""],
	"battcycle" : ["Battery Cycles", "s", ""],
	"battrun" : ["Battery Runtime", "s", ""],
	"battype" : ["Battery Type", "s", ""],
	"battcharge" : ["Battery Charge", "f3", ""]};

// =======================================
//			FUNCTION INIT
// =======================================

function init() {
  script.setUpdateRate(1);
  //request all value fields
  getAll();
  
// =======================================
//			CREATE CONTAINERS
// =======================================

  
//=============== Device Container ==================
	var dev = local.values.addContainer("Device");
		dev.setCollapsed(true);		
		r=dev.addStringParameter("Model Name", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Device ID", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("MAC Address", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("RF Band", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Lock Status", "","");
		r.setAttribute("readonly" ,true);
		r=dev.addStringParameter("Encryption", "","");
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
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,5); 
			p.setAttribute("readonly" ,true);} }			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	
			
	var chan = local.values.addContainer("Channel 2");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,5); 
			p.setAttribute("readonly" ,true);} }			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	
			
	var chan = local.values.addContainer("Channel 3");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,5); 
			p.setAttribute("readonly" ,true);} }			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	
			
	var chan = local.values.addContainer("Channel 4");
		chan.setCollapsed(true);
		chan.addTrigger("Update", "Request all the Values from the Hardware !!" , false);				
		var champs = util.getObjectProperties(contain);
		for (var n = 0; n < champs.length; n++) {
			if (contain[champs[n]][1] == "s") {
			p=chan.addStringParameter(contain[champs[n]][0], "", ""); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f1") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", -115,-115,-1); 
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f2") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,-50,-1);
			p.setAttribute("readonly" ,true);}			
			else if (contain[champs[n]][1] == "f3") {
			p=chan.addFloatParameter(contain[champs[n]][0], "", 0,0,5); 
			p.setAttribute("readonly" ,true);} }			
			p=chan.addEnumParameter("Battery Bars", "Battery Bars","unknown","255","5/5 full","5","4/5 bars","4","3/5 bars","3","2/5 bars","2","1/5 bars","1","0/5 alerte !", "0");
			p.setAttribute("readonly" ,true);	
			
			
			
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
        local.values.device.modellName.set("QLXD");
      }
      if (parts[1] == "DEVICE_ID") {
        local.values.device.deviceID.set(string);
      }
      
      if (parts[1] == "MAC_ADDR") {
        local.values.device.macAddress.set(parts[2]);
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
          local.values.device.flashing.set(true);
        } else {
          local.values.device.flashing.set(false);
        }
      }
// =======================================
//			 CHANNEL INFOS 
// =======================================

      if (parts[2] == "FLASH") {
        if (parts[3] == "ON") {
          local.values.getChild("channel" + parts[1]).flashing.set(true);
        } else {
          local.values.getChild("channel" + parts[1]).flashing.set(false);
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
          var val = parseInt(parts[3]) - 18 ;
          val = val+" db" ;
        //root.modules.shureQLX_D.parameters.updateRateCh1
        local.values.getChild("channel" + parts[1]).audioGain.set(val);
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
      var parselvl = parseFloat(parts[3]);
      var level = parselvl - 50 ;
      var lvlstring = level+" dbFS" ;
     	local.values.getChild("channel" + parts[1]).audioLevel.set(level+" dbFS");
        local.values.getChild("channel" + parts[1]).audioPeak.set(level);
      }
           
      if (parts[2] == "TX_RF_PWR") {
        local.values.getChild("channel" + parts[1]).rfPower.set(parts[3]);
      }
      
      if (parts[2] == "RF_ANTENNA") {
      	var ant = parts[3];
      	if (ant== "XX" || ant== "" ){ ant = "RF no antenna" ;}
      	if (ant== "AX"){ ant = "antenna A" ;}
      	if (ant== "XB"){ ant = "antenna B" ;}
        local.values.getChild("channel" + parts[1]).antenna.set(ant);
      }
      if (parts[2] == "FREQUENCY") {
        //root.modules.shureQLX_D.parameters.updateRateCh1
        //root.modules.shureQLX_D.values.channel1.audioLevelRMS
        dec = parts[3].substring(parts[3].length - 3, parts[3].length);
        lead = parts[3].substring(0, parts[3].length - 3);
        local.values.getChild("channel" + parts[1]).frequency.set(lead + "." + dec);
      }
      
      if (parts[2] == "ENCRYPTION_WARNING") {
        local.values.getChild("channel" + parts[1]).encryptionWarn.set(parts[3]);
      }
      
       if (parts[2] == "BATT_TYPE") {
        //root.modules.shureQLX_D.values.channel1.batteryBars
        local.values.getChild("channel" + parts[1]).batteryType.set(parts[3]);
      }
      if (parts[2] == "BATT_BARS") {
      var charge = parseFloat(parts[3]) ;
      if ( charge > 5){charge = 0 ;}
        //root.modules.shureQLX_D.values.channel1.batteryBars
        local.values.getChild("channel" + parts[1]).batteryBars.setData(parseInt(parts[3]));
        local.values.getChild("channel" + parts[1]).batteryCharge.set(charge);
      }
       if (parts[2] == "BATT_CYCLE") {
      	var cycle = parseInt(parts[3]);
      	 if (cycle == 65535) {
          local.values.channel1.batteryCycles.set("SHOWN ONLY FOR SB900 !");}
          else
          {local.values.channel1.batteryCycles.set(""+cycle+"");}
      }
      if (parts[2] == "BATT_RUN_TIME") {
        mins = parseInt(parts[3]);
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
        //root.modules.shureQLX_D.values.channel1.batteryBars
        mins = parseInt(parts[3]);
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
        var parselvl = parseFloat(parts[5]) ;
		var level = parselvl - 50 ;
        if (level >= -10)
        {level = level+" dbFS - Clip!" ;}
        else {level = level+" dbFS" ;}
        var lvlstring = parselvl - 50 ;
        local.values.getChild("channel" + parts[1]).audioLevel.set(level);
        local.values.getChild("channel" + parts[1]).audioPeak.set(lvlstring);
      }
    }
  }
}

// =======================================
// 				PARAM CHANGE
// =======================================


function moduleParameterChanged(param) {
  //script.log(param.name + " parameter changed, new value: " + param.get());
  //root.modules.shureQLX_D.parameters.output.isConnected
  if (param.name == "isConnected" && param.get() == 1) {
    getAll();
  }
	  if (param.name == "updateRateCh1")
	  var value = local.parameters.updateRateCh1.get() ; 
	{local.send("< SET 1 METER_RATE " +value+ " >");}
}

// =======================================
// 				 VALUE CHANGE 
// =======================================

function moduleValueChanged(value) {
  
  if (value.name == "update") {
      local.send("< GET 1 ALL >");
    }
  if (value.getParent().name == "device") {
    if (value.name == "flashing" && value.get() == 1) {
      setFlashing(0);
    }
    if (value.name == "deviceID") {
      setDeviceID(value.get());
    }
  }
  if (value.getParent().name.substring(0, 7) == "channel") {
    channel = value.getParent().name.substring(7, 8);
    if (value.name == "flashing" && value.get() == 1) {
      setFlashing(channel);
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

function setDeviceID(newid) {
  local.send("< SET DEVICE_ID {" + newid + "} >");
}

function sendLine(line) {
    local.send(line );
}

function setChannelName(newName) {
    local.send(
      "< SET " + ch + " CHAN_NAME {" +newName+ "} >" );
}

function setAudioGain(gain) {
    local.send("< SET " + ch + " AUDIO_GAIN " + (gain + 18) + " >");

}

function incAudioGain(addgain) {
    local.send("< SET " + ch + " AUDIO_GAIN INC " + addgain + " >");

}

function decAudioGain(addgain) {
	local.send("< SET " + ch + " AUDIO_GAIN DEC " + addgain + " >");

}

function setMeterRate(rate) {
  rate = toInt(rate);
  //< SET x METER_RATE 01000 >
  if ((ch == 1 || ch == 2) && ((rate >= 100 && rate <= 65535) || rate == 0)) {
    local.send("< SET " + ch + " METER_RATE " + rate + " >");
  }
}
