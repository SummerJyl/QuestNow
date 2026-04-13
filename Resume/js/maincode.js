// Create global scope variable to keep track of all emails
let arrListOfEmails = [];

// Function that runs the game initialization
function fnAppInit() {
  console.log("fnAppInit() is running");

  // Get emails from localStorage to then check if you are a new or returning player
  let tmpAllPlayers = JSON.parse(localStorage.getItem("lsAllPlayers"));

  // Conditional statement to determine which screen to SHOW at startup
  if (!tmpAllPlayers) {
    console.log("no saved games yet");
    // Show the Welcome screen
    document.querySelector("#pgWelcome").classList.add("active");
    // Set footer to Zero
    document.querySelector("#spnLGNumber").innerHTML = "0";
    // Since no games were saved, disable load button
    document.querySelector("#pgWelcome main p button").disabled = "true";
  } else {
    console.log("yes saved games");
    // Show Load Game screen
    document.querySelector("#pgLoadGame").classList.add("active");
    // Set footer to number of saved games
    document.querySelector("#spnLGNumber").innerHTML = tmpAllPlayers.length;
    // Use #pLGTribe placeholder and populate with all our saved games
    // >>>First Clear (ONLY =) The <p> Placeholder
    document.querySelector("#pLGTribe").innerHTML = "";
    // Set up a Conditional Statement (loop) to iterate x number times based on saved games via a
    for (let i = 0; i < tmpAllPlayers.length; i++) {
      console.log("Loop #", i);
      // For the current saved game, get their data, based on their email
      let tmpCurrentTribeData = JSON.parse(
        localStorage.getItem(tmpAllPlayers[i]),
      );

      // >>>Add to (WITH +=) the <p> Placeholder
      document.querySelector("#pLGTribe").innerHTML +=
        "<p>" +
        tmpCurrentTribeData.pMain.hName +
        //" button onclick='fnGameLoad(`" + tmpAllPlayers[i] + "`);'># + tmpAllPlayers[i] + "</button>" +
        " <button onclick='fnGameLoad(`" +
        tmpAllPlayers[i] +
        "`);'>" +
        "Start" +
        "</button>" +
        "</p>";
    } // END For loop
  } // END // If..else checker
} // End fnAppInit()

// Run this function at app start
window.fnAppInit();

// Function when loading a specific game
function fnGameLoad(gData) {
  console.log("fnGameLoad() is about to load", gData);

  // Read all the data of THIS tribe, so we can see their last progress
  let tmpAllTribeData = JSON.parse(localStorage.getItem(gData));
  console.log(tmpAllTribeData);
  console.log(tmpAllTribeData._currentScreen);

  // Send them to their level
  fnGameNav("#pgLoadGame", tmpAllTribeData._currentScreen, tmpAllTribeData._id);
} // End fnGameLoad()

// Function takes an array and randomly picks a value from it
function fnFromArray(anArray) {
  console.log("fnFromArray() is running with", anArray);
  // Output (return) to the rest of the app, the result of the calculation
  return anArray[Math.floor(Math.random() * anArray.length)];
} // End fnFromArray()

// Function to pick random number from a minimum to a maximum (inclusive)
function fnRandomNumRange(minNum, maxNum) {
  console.log("Pick a random number", minNum, "to", maxNum);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
} // END fnRandomNumRange

// Create Lookup Tables - collection of values to use
let arrWeapons = ["Sword", "Staff", "Club", "Bow", "Slingshot", "Magic Wand"];
let arrClasses = [
  "Knight",
  "Healer",
  "Magician",
  "Ninja",
  "Jester",
  "Farmer",
  "Noble",
  "Sage",
];
let arrStats = [10, 25, 50, 75, 100];
// Luck table: From 50 chances, 1x 40/50    // 2x 5/50  // 3x 4/50  // 10x 1/50
let arrLuck = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 10,
];
let arrNames = [
  "Montgomery",
  "Humphrey",
  "Cedron",
  "Dyllya",
  "Egot",
  "Fonsina",
  "Gaelan",
  "Helitropia",
  "Indor",
  "Jakka",
  "Keol",
  "Lornara",
  "Melort",
  "Nardada",
  "Ozorr",
  "Pryli",
  "Qbort",
  "Rascala",
  "Stenn",
  "Tuntuxia",
  "Uvay",
  "Vatricia",
  "Wex",
  "Xuxi",
  "Yorr",
  "Zaa",
];

let arrNamesMiniBoss = [
  "Malachar",
  "Dreadmore",
  "Vexon",
  "Grimtusk",
  "Shadowfen",
  "Morthuul",
  "Darkspine",
  "Wraithclaw",
  "Venomblade",
  "Skullgorr",
];

// Define meaning of the main character/tribe member players
class Heroes {
  constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
    // Assign the Attributes of main characters/tribe member players
    this.hName = hName;
    this.hHP = hHP;
    this.hSTR = hSTR;
    this.hSPD = hSPD;
    this.hMP = hMP;
    this.hLUK = hLUK;
    this.hWEP = hWEP;
    this.hCLS = hCLS;
  } // END Constructor (attributes)
} // END Class of Heroes

// Code to navigate from screen to screen, when not playing the game
function fnScreenNav(pgHide, pgShow) {
  console.log("fnScreenNav() is running");
  console.log("Closing:", pgHide);
  console.log("Opening:", pgShow);

  document.querySelector(pgHide).classList.remove("active"); // Hide old screen
  document.querySelector(pgShow).classList.add("active"); // Show new screen
} // End fnScreenNav()

// Code to navigate from screen to screen, when PLAYING the game
function fnGameNav(pgHide, pgShow, currTribe) {
  console.log("fnGameNav() is running with ", currTribe);
  console.log("Closing:", pgHide);
  console.log("Opening:", pgShow);

  document.querySelector(pgHide).classList.remove("active");
  document.querySelector(pgShow).classList.add("active");
  // Probably should move these to each case

  // if..Else - pick from 2 possibilities
  // for() - loop for x number of times
  // switch() - switch between x possibilities
  // Depending on what screen we go to, make a decision via a switch()
  switch (pgShow) {
    case "#pgTavern":
      console.log("Go to Tavern");
      fnTavern(currTribe);
      break;
    case "#pgForest":
      console.log("Go to Forest");
      fnForest(currTribe);
      break;
    case "#pgLake":
      console.log("Go to Lake");
      fnLake(currTribe);
      break;
    case "#pgMountain":
      console.log("Go to Mountain");
      fnMountain(currTribe);
      break;
    case "#pgBridge":
      console.log("Go to Bridge");
      fnBridge(currTribe);
      break;
    case "#pgDungeon":
      console.log("Go to Dungeon");
      tmpLevel(currTribe);
      break;
    default:
      console.log("Default condition:", pgShow);
      break;
  } // End switch() to check WHICH level to load
  /*
                             / > #pgLake   \
        #pgTavern > #pgForest -> #pgMountain -> #pgDungeon
                             \ > #pgBridge /
  */
} // End fnGameNav()

// Code to nav when a game is loaded (when playing the game)
// function fnGameNav(){};

// Write a message in the Game Start screen when you visit it
document.querySelector("#pGSMsg").innerHTML =
  "Welcome to QUEST to Now! Are you ready for the adventure?";

// Function create a new tribe in Game START screen
function fnGSSubmit() {
  console.log("fnGSSubmit() is running");

  // Read what is in the <input>s in the Game Start screen
  let valGSName = document.querySelector("#inGSName").value;
  let valGSEmail = document.querySelector("#inGSEmail").value;

  console.log("valGSName is currenly holding: ", valGSName);
  console.log("valGSEmail is holding: ", valGSEmail);

  // Conditional Statement to check if BOTH fields are filled in, before proceeding
  if (valGSName && valGSEmail) {
    console.log("True, BOTH <input> were filled in");

    // Generate Main Character
    let tmpMainChar = new Heroes(
      valGSName,
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrLuck),
      fnFromArray(arrWeapons),
      fnFromArray(arrClasses),
    ); // END generate main char
    console.log("Main Character:", tmpMainChar);

    // Generate second character
    let tmpChar02 = new Heroes(
      fnFromArray(arrNames),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrLuck),
      fnFromArray(arrWeapons),
      fnFromArray(arrClasses),
    ); // END generate 2nd char

    // Generate third character
    let tmpChar03 = new Heroes(
      fnFromArray(arrNames),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrStats),
      fnFromArray(arrLuck),
      fnFromArray(arrWeapons),
      fnFromArray(arrClasses),
    ); // END generate 3rd char
    console.log("Char2", tmpChar02);
    console.log("Char3", tmpChar03);

    // Show the new Tribe on-screen. Use (=) on FIRST setup
    document.querySelector("#pGSRes").innerHTML =
      "Name: <strong>" + tmpMainChar.hName;

    // Use (+=) on subsequent additions
    document.querySelector("#pGSRes").innerHTML +=
      "</strong><br>HP: " + tmpMainChar.hHP;
    document.querySelector("#pGSRes").innerHTML +=
      "<br>STR: " + tmpMainChar.hSTR;
    document.querySelector("#pGSRes").innerHTML +=
      "<br>SPD: " + tmpMainChar.hSPD;
    document.querySelector("#pGSRes").innerHTML += "<br>MP: " + tmpMainChar.hMP;
    document.querySelector("#pGSRes").innerHTML +=
      "<br>LUK: " + tmpMainChar.hLUK;
    document.querySelector("#pGSRes").innerHTML +=
      "<br>WEP: " + tmpMainChar.hWEP;
    document.querySelector("#pGSRes").innerHTML +=
      "<br>CLS: " + tmpMainChar.hCLS;

    // Show second character, add to previous (+=)
    document.querySelector("#pGSRes").innerHTML +=
      "<br><br>Name: <strong>" + tmpChar02.hName;
    document.querySelector("#pGSRes").innerHTML +=
      "</strong><br>HP: " + tmpChar02.hHP;
    document.querySelector("#pGSRes").innerHTML += "<br>STR: " + tmpChar02.hSTR;
    document.querySelector("#pGSRes").innerHTML += "<br>SPD: " + tmpChar02.hSPD;
    document.querySelector("#pGSRes").innerHTML += "<br>MP: " + tmpChar02.hMP;
    document.querySelector("#pGSRes").innerHTML += "<br>LUK: " + tmpChar02.hLUK;
    document.querySelector("#pGSRes").innerHTML += "<br>WEP: " + tmpChar02.hWEP;
    document.querySelector("#pGSRes").innerHTML += "<br>CLS: " + tmpChar02.hCLS;

    // Show third character, add to previous (+=)
    document.querySelector("#pGSRes").innerHTML +=
      "<br><br>Name: <strong>" + tmpChar03.hName;
    document.querySelector("#pGSRes").innerHTML +=
      "</strong><br>HP: " + tmpChar03.hHP;
    document.querySelector("#pGSRes").innerHTML += "<br>STR: " + tmpChar03.hSTR;
    document.querySelector("#pGSRes").innerHTML += "<br>SPD: " + tmpChar03.hSPD;
    document.querySelector("#pGSRes").innerHTML += "<br>MP: " + tmpChar03.hMP;
    document.querySelector("#pGSRes").innerHTML += "<br>LUK: " + tmpChar03.hLUK;
    document.querySelector("#pGSRes").innerHTML += "<br>WEP: " + tmpChar03.hWEP;
    document.querySelector("#pGSRes").innerHTML += "<br>CLS: " + tmpChar03.hCLS;

    // Then hide the buttons, we're done with them.
    document.querySelector("#pGSAction").style.display = "none";

    // Then display the button to journey to the first level and say a message
    // Removed old way
    document.querySelector("#pGSRes").innerHTML +=
      "<p>Excellent! Your tribe is complete. Now, journey to Aesop's Tavern <button onclick='fnGameNav(`#pgGameStart`, `#pgTavern`, `" +
      valGSEmail +
      "`)'>Go</button></p>";
    // 2026-03-10 ---------------- MAKE THIS WORK^

    // Bundle the data of these 3 characters together, and any other relevant data
    let tmpTribe = {
      _id: valGSEmail,
      _questCompleted: false,
      _currentScreen: "#pgTavern",
      pMain: tmpMainChar,
      pComp02: tmpChar02,
      pComp03: tmpChar03,
    }; // END bundle of data in JSON format
    // Changed currentScreen to the actual Level 1 (pgTavern),
    // also HTML file

    // Save the list of emails to localStorage, for later use
    // First, check for previously saved games
    // Next, convert the complex Array of emails into a simple String
    // Simplify a complex Variable:                JSON.stringify(asdfasdfasdfadsfsdafsfda;
    // Restore simple data back to Complex data:   JSON.parse(qwerqwerweqrwreq);
    let tmpAllPlayers = JSON.parse(localStorage.getItem("lsAllPlayers"));
    if (tmpAllPlayers) {
      // TRUE data, save new entry
      // Add new Tribe to pre-existing Array
      tmpAllPlayers.push(valGSEmail);
      // Re-save the Array back to localStorage, Stringified
      localStorage.setItem("lsAllPlayers", JSON.stringify(tmpAllPlayers));
      // Create new memory location for new tribe
      localStorage.setItem(tmpTribe._id, JSON.stringify(tmpTribe));
      console.log("Saved an additional tribe");
    } else {
      // False data, save new entry
      // Add the FIRST tribe to the EMPTY ARRAY
      arrListOfEmails.push(valGSEmail);
      // Save the Array with new data for the first time to localStorage, Stringified
      localStorage.setItem("lsAllPlayers", JSON.stringify(arrListOfEmails));
      // Create new memory location for THIS new tribe
      localStorage.setItem(tmpTribe._id, JSON.stringify(tmpTribe));
      console.log("Saved a tribe for the first time");
    } // END If..else localStorage check
  } else {
    console.log("FALSE, BOTH fields were NOT filled in");
    window.alert("Please enter all fields");
  } // END If..Else checker to make sure both <input> are filled
} // fnGSSubmit() END

// Function to clear the inputs of the Game Start screen (only) (Specific Purpose) //
function fnGSClear() {
  console.log("fnGSClear() is running");
  document.querySelector("#inGSName").value = "";
  document.querySelector("#inGSEmail").value = "";
} // END fnGSClear()

// For all the action at the Tavern level
function fnTavern(currTribe) {
  console.log("At the Tavern with", currTribe);

  // Load all the data for this tribe
  let myTribe = JSON.parse(localStorage.getItem(currTribe));
  console.log("All tribe data", myTribe);

  // Update placeholders with new text
  document.querySelector("#pTvnMsg").innerHTML =
    "Welcome, heroes! Grab some refreshments and chat with various patrons about recent land happenings.";
  document.querySelector("#pTvnMsg").innerHTML +=
    "<p>At this level, challenge an opponent to a contest of STATS.</p>";

  // Build the Tribe list and show on-screen
  document.querySelector("#pTvnTribe").innerHTML =
    "<table border='1'><tr>" +
    "<td><strong>" +
    myTribe.pMain.hName +
    "</strong><br>HP:" +
    myTribe.pMain.hHP +
    "<br>STR:" +
    myTribe.pMain.hSTR +
    "<br>SPD:" +
    myTribe.pMain.hSPD +
    "<br>MP:" +
    myTribe.pMain.hMP +
    "<br>LUK:" +
    myTribe.pMain.hLUK +
    "<br>WEP:" +
    myTribe.pMain.hWEP +
    "<br>CLS:" +
    myTribe.pMain.hCLS +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp02.hName +
    "</strong><br>HP:" +
    myTribe.pComp02.hHP +
    "<br>STR:" +
    myTribe.pComp02.hSTR +
    "<br>SPD:" +
    myTribe.pComp02.hSPD +
    "<br>MP:" +
    myTribe.pComp02.hMP +
    "<br>LUK:" +
    myTribe.pComp02.hLUK +
    "<br>WEP:" +
    myTribe.pComp02.hWEP +
    "<br>CLS:" +
    myTribe.pComp02.hCLS +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp03.hName +
    "</strong><br>HP:" +
    myTribe.pComp03.hHP +
    "<br>STR:" +
    myTribe.pComp03.hSTR +
    "<br>SPD:" +
    myTribe.pComp03.hSPD +
    "<br>MP:" +
    myTribe.pComp03.hMP +
    "<br>LUK:" +
    myTribe.pComp03.hLUK +
    "<br>WEP:" +
    myTribe.pComp03.hWEP +
    "<br>CLS:" +
    myTribe.pComp03.hCLS +
    "</td>" +
    "</tr></table>"; // END Tribe Table

  // Create villains battle
  let tvnEnemy01 = new Heroes(
    fnFromArray(arrNames),
    fnFromArray(arrStats),
    fnFromArray(arrStats),
    fnFromArray(arrStats),
    fnFromArray(arrStats),
    fnFromArray(arrLuck),
    fnFromArray(arrWeapons),
    fnFromArray(arrClasses),
  );

  document.querySelector("#pTvnEnemy").innerHTML =
    "<table border='1'><tr>" +
    "<td><strong>" +
    tvnEnemy01.hName +
    "</strong><br>WEP:" +
    tvnEnemy01.hWEP +
    "<br>CLS:" +
    tvnEnemy01.hCLS +
    "</td>" +
    "</tr></table>"; // End of villain table

  // Create buttons for each ACTION, with a unique ID
  document.querySelector("#pTvnAction").innerHTML =
    "<button id='btnTvnStr'>STR</button>" +
    " <button id='btnTvnSpd'>SPD</button> " +
    " <button id='btnTvnMp'>MP</button>";

  // Create Event Listeners to detect when each button is clicked, keep track which was clicked
  // they then all run the same Function and know what to do
  document.querySelector("#btnTvnStr").addEventListener("click", function () {
    fnTvnAction("#btnTvnStr");
  });
  document.querySelector("#btnTvnSpd").addEventListener("click", function () {
    fnTvnAction("#btnTvnSpd");
  });
  document.querySelector("#btnTvnMp").addEventListener("click", function () {
    fnTvnAction("#btnTvnMp");
  });
  function fnTvnAction(tmpBtn) {
    console.log("fnTvnAction is running. Action was", tmpBtn);
    // Pick a Hero which will battle
    let tmpRandomHeroArray = [myTribe.pMain, myTribe.pComp02, myTribe.pComp03];
    let tmpRandomHero =
      tmpRandomHeroArray[Math.floor(Math.random() * tmpRandomHeroArray.length)];
    console.log(tmpRandomHero);
    // Switch between actions
    switch (tmpBtn) {
      case "#btnTvnStr":
        fnTvnBattler("hSTR", "hSTR");
        break;
      case "#btnTvnSpd":
        fnTvnBattler("hSPD", "hSPD");
        break;
      case "#btnTvnMp":
        fnTvnBattler("hMP", "hMP");
        break;
      default:
        console.log(tmpBtn);
        break;
    } // End Switch() of actions

    // Function to choose which attributes are battling at this level
    function fnTvnBattler(hAttrib, vAttrib) {
      console.log(hAttrib, "vs", vAttrib);
      console.log(
        tmpRandomHero.hName,
        tmpRandomHero[hAttrib],
        tvnEnemy01[vAttrib],
      );
      // Conditional Statement to compare stats, give/remove bonuses
      if (tmpRandomHero[hAttrib] > tvnEnemy01[vAttrib]) {
        // best result +100
        console.log("Stronger Than");
        // Add the max amount of More Strength
        tmpRandomHero[hAttrib] += 10;
        console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib]);
        // Update _currentScreen to the new level (#pgForest)
        myTribe._currentScreen = "#pgForest";
        // Re-save to localStorage to progress the game
        localStorage.setItem(currTribe, JSON.stringify(myTribe));
        // Say the message on-screen
        document.querySelector("#pTvnRes").innerHTML =
          tmpRandomHero.hName +
          " stepped forward to battle " +
          tvnEnemy01.hName +
          " and WON! They earned 10 more Strength. Now, continue your quest!";
        document.querySelector("#pTvnRes").innerHTML +=
          "<p><button id='btnTvnGo'>Go</button></p>";
        document
          .querySelector("#btnTvnGo")
          .addEventListener("click", function () {
            fnGameNav("#pgTavern", "#pgForest", currTribe);
          });
        // NOTE: the .addEventListener() for this button is at the end of fnTvnAction() below...
        // Deactivate the buttons, to go to the next level
        document.querySelector("#btnTvnStr").disabled = true;
        document.querySelector("#btnTvnSpd").disabled = true;
        document.querySelector("#btnTvnMp").disabled = true;

        // Update the boon on-screen
        // NOTE: Not another let to create the variable
        myTribe = JSON.parse(localStorage.getItem(currTribe));
        document.querySelector("#pTvnTribe").innerHTML =
          "<table border='1' class='contentCenter boxHero'><tr>" +
          "<td id='pMain'><strong>" +
          myTribe.pMain.hName +
          "</strong><br>HP:" +
          myTribe.pMain.hHP +
          "<br>STR:" +
          myTribe.pMain.hSTR +
          "<br>SPD:" +
          myTribe.pMain.hSPD +
          "<br>MP:" +
          myTribe.pMain.hMP +
          "<br>LUK:" +
          myTribe.pMain.hLUK +
          "<br>WEP:" +
          myTribe.pMain.hWEP +
          "<br>CLS:" +
          myTribe.pMain.hCLS +
          "</td>" +
          "<td id='pComp'><strong>" +
          myTribe.pComp02.hName +
          "</strong><br>HP:" +
          myTribe.pComp02.hHP +
          "<br>STR:" +
          myTribe.pComp02.hSTR +
          "<br>SPD:" +
          myTribe.pComp02.hSPD +
          "<br>MP:" +
          myTribe.pComp02.hMP +
          "<br>LUK:" +
          myTribe.pComp02.hLUK +
          "<br>WEP:" +
          myTribe.pComp02.hWEP +
          "<br>CLS:" +
          myTribe.pComp02.hCLS +
          "</td>" +
          "<td id='pComp03'><strong>" +
          myTribe.pComp03.hName +
          "</strong><br>HP:" +
          myTribe.pComp03.hHP +
          "<br>STR:" +
          myTribe.pComp03.hSTR +
          "<br>SPD:" +
          myTribe.pComp03.hSPD +
          "<br>MP:" +
          myTribe.pComp03.hMP +
          "<br>LUK:" +
          myTribe.pComp03.hLUK +
          "<br>WEP:" +
          myTribe.pComp03.hWEP +
          "<br>CLS:" +
          myTribe.pComp03.hCLS +
          "</td>" +
          "</tr></table>"; // END Re-draw Tribe Table
      } else if (tmpRandomHero[hAttrib] < tvnEnemy01[vAttrib]) {
        // worst result -10
        console.log("WEAKER THAN");
        // Subtract some amount of Strength
        tmpRandomHero[hAttrib] -= 5;
        console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib]);
        myTribe._currentScreen = "#pgForest";
        localStorage.setItem(currTribe, JSON.stringify(myTribe));
        document.querySelector("#pTvnRes").innerHTML =
          tmpRandomHero.hName +
          " stepped forward to battle " +
          tvnEnemy01.hName +
          " and it was a ROUT! They lost 5 STRENGTH. Begone!";
        document.querySelector("#pTvnRes").innerHTML +=
          "<p><button id='btnTvnGo'>Go</button></p>";
        document
          .querySelector("#btnTvnGo")
          .addEventListener("click", function () {
            fnGameNav("#pgTavern", "#pgForest", currTribe);
          });
        document.querySelector("#btnTvnStr").disabled = true;
        document.querySelector("#btnTvnSpd").disabled = true;
        document.querySelector("#btnTvnMp").disabled = true;
        myTribe = JSON.parse(localStorage.getItem(currTribe));
        document.querySelector("#pTvnTribe").innerHTML =
          "<table border ='1' class='contentCenter boxHero'><tr>" +
          "<td id='pMain'><strong>" +
          myTribe.pMain.hName +
          "</strong><br>HP:" +
          myTribe.pMain.hHP +
          "<br>STR:" +
          myTribe.pMain.hSTR +
          "<br>SPD:" +
          myTribe.pMain.hSPD +
          "<br>MP:" +
          myTribe.pMain.hMP +
          "<br>LUK:" +
          myTribe.pMain.hLUK +
          "<br>WEP:" +
          myTribe.pMain.hWEP +
          "<br>CLS:" +
          myTribe.pMain.hCLS +
          "</td>" +
          "<td id='pComp02'><strong>" +
          myTribe.pComp02.hName +
          "</strong><br>HP:" +
          myTribe.pComp02.hHP +
          "<br>STR:" +
          myTribe.pComp02.hSTR +
          "<br>SPD:" +
          myTribe.pComp02.hSPD +
          "<br>MP:" +
          myTribe.pComp02.hMP +
          "<br>LUK:" +
          myTribe.pComp02.hLUK +
          "<br>WEP:" +
          myTribe.pComp02.hWEP +
          "<br>CLS:" +
          myTribe.pComp02.hCLS +
          "</td>" +
          "<td id='pComp03'><strong>" +
          myTribe.pComp03.hName +
          "</strong><br>HP:" +
          myTribe.pComp03.hHP +
          "<br>STR:" +
          myTribe.pComp03.hSTR +
          "<br>SPD:" +
          myTribe.pComp03.hSPD +
          "<br>MP:" +
          myTribe.pComp03.hMP +
          "<br>LUK:" +
          myTribe.pComp03.hLUK +
          "<br>WEP:" +
          myTribe.pComp03.hWEP +
          "<br>CLS:" +
          myTribe.pComp03.hCLS +
          "</td>" +
          "</tr></table>"; // END Re-draw Tribe Table
      } else {
        // neutral (equal) +10
        console.log("EQUAL TO");
        // Add the minimum amont of STRENGTH
        tmpRandomHero[hAttrib] += 5;
        console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib]);
        myTribe._currentScreen = "#pgForest";
        localStorage.setItem(currTribe, JSON.stringify(myTribe));
        document.querySelector("#pTvnRes").innerHTML =
          tmpRandomHero.hName +
          " stepped forward to battle " +
          tvnEnemy01.hName +
          " and TIED! Take 5 Strength for your efforts and continue to the quest!";
        document.querySelector("#pTvnRes").innerHTML +=
          "<p><button id='btnTvnGo'>Go</button></p>";
        document
          .querySelector("#btnTvnGo")
          .addEventListener("click", function () {
            fnGameNav("#pgTavern", "#pgForest", currTribe);
          });
        document.querySelector("#btnTvnStr").disabled = true;
        document.querySelector("#btnTvnSpd").disabled = true;
        document.querySelector("#btnTvnMp").disabled = true;
        myTribe = JSON.parse(localStorage.getItem(currTribe));
        document.querySelector("#pTvnTribe").innerHTML =
          "<table border='1' class='contentCenter boxHero'><tr>" +
          "<td id='pMain'><strong>" +
          myTribe.pMain.hName +
          "</strong><br>HP:" +
          myTribe.pMain.hHP +
          "<br>STR:" +
          myTribe.pMain.hSTR +
          "<br>SPD:" +
          myTribe.pMain.hSPD +
          "<br>MP:" +
          myTribe.pMain.hMP +
          "<br>LUK:" +
          myTribe.pMain.hLUK +
          "<br>WEP:" +
          myTribe.pMain.hWEP +
          "<br>CLS:" +
          myTribe.pMain.hCLS +
          "</td>" +
          "<td id='pMain'><strong>" +
          myTribe.pComp02.hName +
          "</strong><br>HP:" +
          myTribe.pComp02.hHP +
          "<br>STR:" +
          myTribe.pComp02.hSTR +
          "<br>SPD:" +
          myTribe.pComp02.hSPD +
          "<br>MP:" +
          myTribe.pComp02.hMP +
          "<br>LUK:" +
          myTribe.pComp02.hLUK +
          "<br>WEP:" +
          myTribe.pComp02.hWEP +
          "<br>CLS:" +
          myTribe.pComp02.hCLS +
          "</td>" +
          "<td id='pMain'><strong>" +
          myTribe.pComp03.hName +
          "</strong><br>HP:" +
          myTribe.pComp03.hHP +
          "<br>STR:" +
          myTribe.pComp03.hSTR +
          "<br>SPD:" +
          myTribe.pComp03.hSPD +
          "<br>MP:" +
          myTribe.pComp03.hMP +
          "<br>LUK:" +
          myTribe.pComp03.hLUK +
          "<br>WEP:" +
          myTribe.pComp03.hWEP +
          "<br>CLS:" +
          myTribe.pComp03.hCLS +
          "</td>" +
          "</tr></table>"; // END Re-draw Tribe Table
      } // End If..Else..If
    } // End fnTvnBattler()
  } // End fnTvnAction()
} // End fnTavern()

// this.hName = hName;
// this.hHP   = hHP;
// this.hSTR  = hSTR;
// this.hSPD  = hSPD;
// this.hMP   = hMP;
// this.hLUK  = hLUK;
// this.hWEP  = hWEP;
// this.hCLS  = hCLS;

function tmpLevel(currTribe) {
  console.log("Dungeon() is running");

  let myTribe = JSON.parse(localStorage.getItem(currTribe));
  console.log("All tribe data", myTribe);

  let arrRegions = [
    "Haus",
    "Verdania",
    "Stonekeep",
    "Ironmoor",
    "Duskfen",
    "Cresthaven",
  ];
  let valRegion = fnFromArray(arrRegions);

  document.querySelector("#pDngMsg").innerHTML =
    "You have reached the Dungeon! Cross the lake and claim " +
    valRegion +
    " for your Tribe!";

  document.querySelector("#pDngTribe").innerHTML =
    "<table border='1' class='contentCenter boxHero'><tr>" +
    "<td><strong>" +
    myTribe.pMain.hName +
    "<strong><br>HP:" +
    myTribe.pMain.hHP +
    "<br>STR:" +
    myTribe.pMain.hSTR +
    "<td>" +
    "<td><strong>" +
    myTribe.pComp02.hName +
    "<strong><br>HP:" +
    myTribe.pComp02.hHP +
    "<br>STR:" +
    myTribe.pComp02.hSTR +
    "<td>" +
    "<td><strong>" +
    myTribe.pComp03.hName +
    "<strong><br>HP:" +
    myTribe.pComp03.hHP +
    "<br>STR:" +
    myTribe.pComp03.hSTR +
    "<td>" +
    "</tr></table>";

  // Genereate final boss
  let dngBoss = new Heroes(
    fnFromArray(arrNamesMiniBoss),
    fnRandomNumRange(100, 150),
    fnRandomNumRange(20, 35),
    null,
    null,
    fnFromArray(arrLuck),
    "Evil " + fnFromArray(arrWeapons),
    "Dark " + fnFromArray(arrClasses),
  ); // END dngBoss
  console.log("Final Boss:", dngBoss);

  document.querySelector("#pDngEnemy").innerHTML =
    "<strong>" +
    dngBoss.hName +
    "</strong> blocks your path! " +
    "They wield a " +
    dngBoss.hWEP +
    " and command the " +
    dngBoss.hCLS +
    ", They. have <strong>" +
    dngBoss.hHP +
    "HP</strong>. Your tribe must attack together!";

  document.querySelector("#pDngAction").innerHTML =
    "<button id='btnDngAttack'>⚔️ Combined Attack!</button>";

  let elBtnDngAttack = document.querySelector("#btnDngAttack");
  elBtnDngAttack.addEventListener("click", function () {
    fnDngFight();
  });

  function fnDngFight() {
    console.log("fnDngFight() is running");

    // Combined STR of all three tribe members
    let totalSTR =
      myTribe.pMain.hSTR + myTribe.pComp02.hSTR + myTribe.pComp03.hSTR;
    console.log("Combined STR:", totalSTR, "VS Boss HP:", dngBoss.hHP);

    elBtnDngAttack.disabled = true;

    if (totalSTR >= dngBoss.hHP) {
      // WIN
      let tmpGold = fnRandomNumRange(2000, 5000);
      myTribe._gold += tmpGold;
      myTribe._region = valRegion;
      myTribe._currentScreen = "#pgDungeon";
      localStorage.setItem(myTribe._id, JSON.stringify(myTribe));

      document.querySelector("#pDngRes").innerHTML =
        "<p>Congratulations! Your tribe has defeated " +
        dngBoss.hName +
        "!</p>" +
        "<p>You have conquered <strong>" +
        valRegion +
        "</strong>! Glory to your Tribe!</p>" +
        "<p><button onclick=\"fnScreenNav('#pgDungeon','#pgWelcome');\">Play Again</button></p>";
    } else {
      // LOSE
      myTribe._currentScreen = "#pDungeon";
      localStorage.setItem(myTribe._id, JSON.stringify(myTribe));

      document.querySelector("#pDngRes").innerHTML =
        "<p>Alas! Your tribe was defeated by " +
        dngBoss.hName +
        "!</p>" +
        "<p><strong>" +
        valRegion +
        "</strong> remains unconquered... for now.</p>" +
        "<p>Your combined strength of " +
        totalSTR +
        " was not enough against " +
        dngBoss.hHP +
        "HP. Train harder!</p>" +
        "<p><button onclick=\"fnScreenNav('#pgDungeon','#pgWelcome');\">Try Again</button></p>";
    } // END if..else
  } // END fnDngFight()
} // END tmpLevel()

// For all the action at the Tavern level
function fnForest(currTribe) {
  console.log("In the Forest with", currTribe);

  // Load all the data of this tribe
  let myTribe = JSON.parse(localStorage.getItem(currTribe));
  console.log("All Tribe data", myTribe);
  // console.log(fnRandomNumRange(7, 12));

  // Lookup table, as a multidimesional Array ( 3 in one)
  let arrFrstData = [
    ["Aba", "Beb", "Cab"],
    ["Book of Spells", "Holy Codex", "Lost Artifact", "Gothic Scroll"],
    ["Power", "Wisdom", "Validation", "Insight", "Experience"],
  ]; // END arrFrstData

  // Using the MDA Lookup Table, generate a Sage, with their Artifact, and Attribute
  let valFrstName = arrFrstData[0][fnRandomNumRange(0, 2)];
  let valFrstArti = arrFrstData[1][fnRandomNumRange(0, 3)];
  let valFrstAttr = arrFrstData[2][fnRandomNumRange(0, 4)];

  // Update the placeholders with new text
  document.querySelector("#pFrstMsg").innerHTML =
    "You have reached The Forbiden Forest. You meet a wise sage. <br><br>Say hello to " +
    valFrstName +
    " who possesses the " +
    valFrstArti +
    " and seeks " +
    valFrstAttr +
    "!";

  document.querySelector("#pFrstTribe").innerHTML =
    "<table border='1' class='contentCenter boxHero'><tr>" +
    "<td><strong>" +
    myTribe.pMain.hName +
    "</strong><br>HP:" +
    myTribe.pMain.hHP +
    "<br>MP:" +
    myTribe.pMain.hMP +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp02.hName +
    "</strong><br>HP:" +
    myTribe.pComp02.hHP +
    "<br>MP:" +
    myTribe.pComp02.hMP +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp03.hName +
    "</strong><br>HP:" +
    myTribe.pComp03.hHP +
    "<br>MP:" +
    myTribe.pComp03.hMP +
    "</td>" +
    "</tr></table>"; // END Tribe Table

  document.querySelector("#pFrstAction").innerHTML =
    "<p>You will ask " +
    valFrstName +
    " to help you on your adventure by giving you some of their " +
    valFrstAttr +
    " from their " +
    valFrstArti +
    "!</p>";
  document.querySelector("#pFrstAction").innerHTML +=
    "<p><button id='btnFrstHP'>Ask for HP</button> <button id='btnFrstMP'>Ask for MP</button></p>";

  // Create Objects about theose <button. So wehn can .addEventListener() to interact
  let elBtnFrstHP = document.querySelector("#btnFrstHP");
  let elBtnFrstMP = document.querySelector("#btnFrstMP");
  // If we need to pass Parameters to a function
  // elBtnFrstHP.addEventListener("click", function(){fnSomeFunction(a, b, c)});
  // If we DO NOT need to pass Parameters to a function
  // // elBtnFrstHP.addEventListener("click", fnSomeFunction);
  // OR this way, but no, please!
  // // elBtnFrstHP.addEventListener("click", function(){fnSomeFunction()});
  elBtnFrstHP.addEventListener("click", fnFrstGetHP);
  elBtnFrstMP.addEventListener("click", fnFrstGetMP);

  // Function to get a Hit Point boost
  function fnFrstGetHP() {
    console.log("Getting MP");

    // Only one button can be pressed per playthrough
    elBtnFrstHP.disabled = true;
    elBtnFrstMP.disabled = true;

    // Generate the Sage
    // constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
    let frstNPC = new Heroes(
      valFrstName,
      fnRandomNumRange(10, 50),
      null,
      null,
      null,
      null,
      valFrstArti,
      valFrstAttr,
    ); // END frstNPC
    console.log("Sage is", frstNPC);

    // Generate a fraction so that we can addsome X amount of a bonus
    let tmpRndFrac = Math.random();
    // Based on that Random Fraction, generate the bonus
    let tmpNewHP = frstNPC.hHP * tmpRndFrac;
    console.log(tmpRndFrac, Math.ceil(tmpNewHP));
    // Add those bonuses
    myTribe.pMain.hHP += Math.ceil(tmpNewHP);
    myTribe.pComp02.hHP += Math.ceil(tmpNewHP);
    myTribe.pComp03.hHP += Math.ceil(tmpNewHP);
    // Pass on the Artifact to the tribe, via a NEW Tribe Attribute, an ARRAY
    myTribe._inventory = [frstNPC.hWEP];
    // For the future, add a new item, at the end of the Array via.push()
    // myTribe._inventory.push("Cat");
    myTribe._gold = fnRandomNumRange(999, 1234); // Earned some gold, too!
    // Next, determine next level, via conditional statement
    let tmpRndPath = ["#pgLake", "#pgMountain", "#pgBridge"];
    let tmpRndPathPICKED = tmpRndPath[fnRandomNumRange(0, 2)];
    switch (tmpRndPathPICKED) {
      case "#pgLake":
        console.log("Going to Lake");
        myTribe._currentScreen = tmpRndPathPICKED;
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        tmpRndPathPICKED = "Lake";
        break;
      case "#pgMountain":
        myTribe._currentScreen = tmpRndPathPICKED;
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        console.log("Going to Mountain");
        tmpRndPathPICKED = "Mountain";
        break;
      case "#pgBridge":
        myTribe._currentScreen = tmpRndPathPICKED;
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        console.log("Going to Bridge");
        tmpRndPathPICKED = "Bridge";
        break;
      default:
        console.log("Error?", tmpRndPathPICKED);
        break;
    } // END Switch()
    // Update on screen the results, (lore, stats) and add the Next Level button
    // next time
    // document.querySelector("#pFrstRes").innerHTML = "<p>Congratulations! " + frstNPC.hName + " has given you their " + frstNPC.hWEP + ", " + myTribe._gold + "</p>";
    document.querySelector("#pFrstRes").innerHTML =
      "<table border='1' class='contentCenter boxHero'><tr>" +
      "<td><strong>" +
      myTribe.pMain.hName +
      "</strong><br>HP:" +
      myTribe.pMain.hHP +
      "<br>MP:" +
      myTribe.pMain.hMP +
      "</td>" +
      "<td><strong>" +
      myTribe.pComp02.hName +
      "</strong><br>HP:" +
      myTribe.pComp02.hHP +
      "<br>MP:" +
      myTribe.pComp02.hMP +
      "</td>" +
      "<td><strong>" +
      myTribe.pComp03.hName +
      "</strong><br>HP:" +
      myTribe.pComp03.hHP +
      "<br>MP:" +
      myTribe.pComp03.hMP +
      "</td>" +
      "</tr></table>"; // END Tribe Table

    document.querySelector("#pFrstRes").innerHTML +=
      "<p>Now, head to The " +
      tmpRndPathPICKED +
      " and continue.<br><button id='btnFrstGoNext'>Go</button></p>";

    let elBtnFrstGoNext = document.querySelector("#btnFrstGoNext");
    elBtnFrstGoNext.addEventListener("click", function () {
      fnGameNav("#pgForest", myTribe._currentScreen, myTribe._id);
    });
  } //END fnFrstGetHP

  // Function to get Magic boost
  function fnFrstGetMP() {
    console.log("MP");

    elBtnFrstHP.disabled = true;
    elBtnFrstMP.disabled = true;

    let frstNPC = new Heroes(
      valFrstName,
      null,
      null,
      null,
      fnRandomNumRange(10, 50),
      null,
      valFrstArti,
      valFrstAttr,
    ); // END frstNPC
    console.log("Sage is", frstNPC);

    let tmpRndFrac = Math.random();
    let tmpNewMP = frstNPC.hMP * tmpRndFrac;
    console.log(tmpRndFrac, Math.ceil(tmpNewMP));

    myTribe.pMain.hMP += Math.ceil(tmpNewMP);
    myTribe.pComp02.hMP += Math.ceil(tmpNewMP);
    myTribe.pComp03.hMP += Math.ceil(tmpNewMP);

    myTribe._inventory = [frstNPC.hWEP];

    myTribe._gold = fnRandomNumRange(999, 1234);

    let tmpRndPath = ["#pgLake", "#pgMountain", "#pgBridge"];
    let tmpRndPathPICKED = tmpRndPath[fnRandomNumRange(0, 2)];
    switch (tmpRndPathPICKED) {
      case "#pgLake":
        console.log("Going to Lake");
        myTribe._currentScreen = tmpRndPathPICKED;
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        tmpRndPathPICKED = "Lake";
        break;
      case "#pgMountain":
        myTribe._currentScreen = tmpRndPathPICKED;
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        console.log("Going to Mountain");
        tmpRndPathPICKED = "Mountain";
        break;
      case "#pgBridge":
        myTribe._currentScreen = tmpRndPathPICKED;
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        console.log("Going to Bridge");
        tmpRndPathPICKED = "Bridge";
        break;
      default:
        console.log("Error?", tmpRndPathPICKED);
        break;
    } // END Switch()
    // Update on screen the results (lore, stats) and add the Next Level Button
    // next time
    document.querySelector("#pFrstRes").innerHTML =
      "<p>Congratulations! " +
      frstNPC.hName +
      " has given you their " +
      frstNPC.hWEP +
      ", " +
      myTribe._gold +
      " GOLD, and enchanced your MP by " +
      Math.ceil(tmpNewMP) +
      "!</p>";
    document.querySelector("#pFrstRes").innerHTML +=
      "<table border='1' class='contentCenter boxHero'><tr>" +
      "<td><strong>" +
      myTribe.pMain.hName +
      "</strong><br>HP:" +
      myTribe.pMain.hHP +
      "<br>MP:" +
      myTribe.pMain.hMP +
      "</td>" +
      "<td><strong>" +
      myTribe.pComp02.hName +
      "</strong><br>HP:" +
      myTribe.pComp02.hHP +
      "<br>MP:" +
      myTribe.pComp02.hMP +
      "</td>" +
      "<td><strong>" +
      myTribe.pComp03.hName +
      "</strong><br>HP:" +
      myTribe.pComp03.hHP +
      "<br>MP:" +
      myTribe.pComp03.hMP +
      "</td>" +
      "</tr></table>"; // END Tribe Table

    document.querySelector("#pFrstRes").innerHTML +=
      "<p>Now, head to The " +
      tmpRndPathPICKED +
      " and continue.<br><button id='btnFrstGoNext'>Go</button></p>";

    let elBtnFrstGoNext = document.querySelector("#btnFrstGoNext");
    elBtnFrstGoNext.addEventListener("click", function () {
      fnGameNav("#pgForest", myTribe._currentScreen, myTribe._id);
    });
  } // END fnFrstGetMP()

  // Instead of and ID on the <h4>, specify its "path" (via DOM) to the right Element
  // c:\users\summers\desktop\homework.html
  document.querySelector("#pgForest footer h4").innerHTML =
    "Show the LUK value here";
  // CSS: #pgForest footer h4 {text-align: center;}
  document.querySelector("#pgForest footer h4").style.textAlign = "center";
} // END fnForest()

// Function for Lake level
function fnLake(currTribe) {
  console.log("At the Lake with", currTribe);

  // Load all the data of this tribe
  let myTribe = JSON.parse(localStorage.getItem(currTribe));
  console.log("All tribe data", myTribe);

  document.querySelector("#pLakMsg").innerHTML =
    "Welcome to Eel Lake. A powerful foe stands before you! You must all join together to defeat them!";

  document.querySelector("#pLakTribe").innerHTML =
    "<table border='1' class='contentCenter boxHero'><tr>" +
    "<td><strong>" +
    myTribe.pMain.hName +
    "</strong><br>HP: " +
    myTribe.pMain.hHP +
    "<br>CLS: " +
    myTribe.pMain.hCLS +
    "<br>WEP: " +
    myTribe.pMain.hWEP +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp02.hName +
    "</strong><br>HP:" +
    myTribe.pComp02.hHP +
    "<br>CLS: " +
    myTribe.pComp02.hCLS +
    "<br>WEP: " +
    myTribe.pComp02.hWEP +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp03.hName +
    "</strong><br>HP: " +
    myTribe.pComp03.hHP +
    "<br>CLS: " +
    myTribe.pComp03.hCLS +
    "<br>WEP: " +
    myTribe.pComp03.hWEP +
    "</td>" +
    "</tr></table>"; // End Tribe Table

  // Generate this level's mini-boss
  // constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
  let lakBoss = new Heroes(
    fnFromArray(arrNamesMiniBoss),
    fnRandomNumRange(50, 75),
    fnRandomNumRange(10, 19),
    null,
    null,
    null,
    "Evil " + fnFromArray(arrWeapons),
    "Dark " + fnFromArray(arrClasses),
  ); // End lakBoss()
  console.log(lakBoss);

  // Display on-screen this miniboss
  document.querySelector("#pLakEnemy").innerHTML =
    lakBoss.hName +
    " stands before you! They hold an " +
    lakBoss.hWEP +
    " and align with the " +
    lakBoss.hCLS +
    ". They have " +
    lakBoss.hHP +
    "HP and challenge you! Who of your tribe will strike first?";

  // Display level actions
  document.querySelector("#pLakAction").innerHTML =
    myTribe.pMain.hName +
    " uses " +
    myTribe.pMain.hWEP +
    " <button id='btnLakMain'>Go</button><br>" +
    myTribe.pComp02.hName +
    " uses " +
    myTribe.pComp02.hWEP +
    " <button id='btnLakC02'>Go</button><br>" +
    myTribe.pComp03.hName +
    " uses " +
    myTribe.pComp03.hWEP +
    " <button id='btnLakC03'>Go</button>";

  // JS Objects referencing this dynamically-generated buttons
  let elBtnLakMain = document.querySelector("#btnLakMain");
  let elBtnLakC02 = document.querySelector("#btnLakC02");
  let elBtnLakC03 = document.querySelector("#btnLakC03");

  elBtnLakMain.addEventListener("click", function () {
    fnLakFight(myTribe.pMain, elBtnLakMain);
  });
  elBtnLakC02.addEventListener("click", function () {
    fnLakFight(myTribe.pComp02, elBtnLakC02);
  });
  elBtnLakC03.addEventListener("click", function () {
    fnLakFight(myTribe.pComp03, elBtnLakC03);
  });

  function fnLakFight(pChar, pBtn) {
    console.log(pChar, "will fight");
    console.log("Button of", pBtn.id);
    console.log(pChar.hName, pChar.hSTR, "VS", lakBoss.hHP);

    // Disable the button of the currently-fighting character
    switch (pBtn.id) {
      case "btnLakMain":
        elBtnLakMain.disabled = "true";
        break;
      case "btnLakC02":
        elBtnLakC02.disabled = "true";
        break;
      case "btnLakC03":
        elBtnLakC03.disabled = "true";
        break;
      default:
        console.log("Error", pBtn.id);
        break;
    } // END switch() button disabler

    // Attack the boss
    lakBoss.hHP = lakBoss.hHP - pChar.hSTR;
    console.log("Boss weakened:", lakBoss.hHP);

    if (lakBoss.hHP <= 0) {
      // Defeated
      console.log("Defeated them!");
      //Turn off all button before moving on
      elBtnLakMain.disabled = "true";
      elBtnLakC02.disabled = "true";
      elBtnLakC03.disabled = "true";
      // Add more gold
      let tmpGold = fnRandomNumRange(999, 1234);
      myTribe._gold += tmpGold;
      // Update next level property
      myTribe._currentScreen = "#pgDungeon"; // Next level
      // Save to localStorage
      localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
      // Say the Best Message
      document.querySelector("#pLakRes").innerHTML =
        "<p>Hurrah, " +
        pChar.hName +
        "!</p>" +
        "<p>You defeated " +
        lakBoss.hName +
        " and earned " +
        tmpGold.toLocaleString("en-US") +
        " Gold!</p>" +
        "<p>Strut off to the " +
        myTribe._currentScreen +
        " <button id='btnLakRes'>Go!</button></p>";
      // END #pLakRes
      let elBtnLakRes = document.querySelector("#btnLakRes");
      elBtnLakRes.addEventListener("click", function () {
        fnGameNav("#pgLake", myTribe._currentScreen, myTribe._id);
      });
    } else {
      // Keep fighting
      console.log("Keep fighting them", lakBoss.hHP);

      // You take damage, determine 10% of a damage

      // Then subtract and re-set the value of the property
      pChar.hHP -= lakBoss.hSTR;
      console.log("Down to", pChar.hHP);

      // Then update the weaker
      document.querySelector("#pLakRes").innerHTML =
        "<p>You have weakened " +
        lakBoss.hName +
        " down to " +
        lakBoss.hHP +
        "HP! Keep fighting and choose another Tribe Member!</p>" +
        "<p>" +
        pChar.hName +
        " is weakened: " +
        pChar.hHP +
        "HP!</p>";

      // If all 3 characters have taken their chance and failed
      if (
        elBtnLakMain.disabled == true &&
        elBtnLakC02.disabled == true &&
        elBtnLakC03.disabled == true
      ) {
        // All defeated
        console.log("All three tried, move on");
        // No gold

        // Set next level
        myTribe._currentScreen = "#pgDungeon";
        // Save back to localStorage
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        // Update Result messae (NEG)
        document.querySelector("#pLakRes").innerHTML =
          "<p>Alas!</p>" +
          "<p>You all failed to defeat " +
          lakBoss.hName +
          "!</p>" +
          "<p>Take leave of the Dungeon <button id='btnLakRes'>Go!</button></p>"; // END #pLakRes
        let elBtnLakRes = document.querySelector("#btnLakRes");
        elBtnLakRes.addEventListener("click", function () {
          fnGameNav("#pgLake", myTribe._currentScreen, myTribe._id);
        });
      } else {
        console.log("keep fighting!");
      } // END if..Else all 3
    } // END if..Else fight
  } // END fnLakFight
} // END fnLake()

function fnMountain(currTribe) {
  console.log("At the Mountain with", currTribe);

  // Load all the data of this tribe
  let myTribe = JSON.parse(localStorage.getItem(currTribe));
  console.log("All tribe data", myTribe);

  document.querySelector("#pMntMsg").innerHTML =
    "Welcome to the Monty Mountain. A powerful foe stands before you! You must all join forces to defeat them!";

  document.querySelector("#pMntTribe").innerHTML =
    "<table border='1' class='contentCenter boxHero'><tr>" +
    "<td><strong>" +
    myTribe.pMain.hName +
    "</strong><br>HP: " +
    myTribe.pMain.hHP +
    "<br>CLS: " +
    myTribe.pMain.hCLS +
    "<br>WEP: " +
    myTribe.pMain.hWEP +
    "<br>LUK: " +
    myTribe.pMain.hLUK +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp02.hName +
    "</strong><br>HP: " +
    myTribe.pComp02.hHP +
    "<br>CLS: " +
    myTribe.pComp02.hCLS +
    "<br>WEP: " +
    myTribe.pComp02.hWEP +
    "<br>LUK: " +
    myTribe.pComp02.hLUK +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp03.hName +
    "</strong><br>HP: " +
    myTribe.pComp03.hHP +
    "<br>CLS: " +
    myTribe.pComp03.hCLS +
    "<br>WEP: " +
    myTribe.pComp03.hWEP +
    "<br>LUK: " +
    myTribe.pComp03.hLUK +
    "</td>" +
    "</tr></table>"; // End Tribe Table

  // Generate this level's mini-boss
  // contructor(hName, hHP, hSTR, hMP, hLUK, hWEP, hCLS) {
  let mntBoss = new Heroes(
    fnFromArray(arrNamesMiniBoss),
    fnRandomNumRange(55, 80),
    fnRandomNumRange(10, 19),
    null,
    null,
    fnFromArray(arrLuck),
    "Evil " + fnFromArray(arrWeapons),
    "Dark " + fnFromArray(arrClasses),
  ); // END mntBoss()
  console.log(mntBoss);

  // Display on-screen this miniboss
  document.querySelector("#pMntEnemy").innerHTML =
    mntBoss.hName +
    " stands before you! They hold an " +
    mntBoss.hWEP +
    " and align with the " +
    mntBoss.hCLS +
    ". They have " +
    mntBoss.hHP +
    "HP and challenge you! Who of your Tribe will strike first?";

  // Display level actions
  document.querySelector("#pMntAction").innerHTML =
    myTribe.pMain.hName +
    " uses " +
    myTribe.pMain.hWEP +
    " <button id='btnMntMain'>Go</button><br>" +
    myTribe.pComp02.hName +
    " uses " +
    myTribe.pComp02.hWEP +
    " <button id='btnMntC02'>Go</button><br>" +
    myTribe.pComp03.hName +
    " uses " +
    myTribe.pComp03.hWEP +
    " <button id='btnMntC03'>Go</button>";

  // JS Objects referencing this dynamically-generated buttons
  let elBtnMntMain = document.querySelector("#btnMntMain");
  let elBtnMntC02 = document.querySelector("#btnMntC02");
  let elBtnMntC03 = document.querySelector("#btnMntC03");

  elBtnMntMain.addEventListener("click", function () {
    fnMntFight(myTribe.pMain, elBtnMntMain);
  });
  elBtnMntC02.addEventListener("click", function () {
    fnMntFight(myTribe.pComp02, elBtnMntC02);
  });
  elBtnMntC03.addEventListener("click", function () {
    fnMntFight(myTribe.pComp03, elBtnMntC03);
  });

  // Mountain fight code
  function fnMntFight(pChar, pBtn) {
    console.log("Who fights:", pChar, "Which button:", pBtn);

    // Disable the button of the currently-fighting character
    switch (pBtn.id) {
      case "btnMntMain":
        elBtnMntMain.disabled = "true";
        break;
      case "btnMntC02":
        elBtnMntC02.disabled = "true";
        break;
      case "btnMntC03":
        elBtnMntC03.disabled = "true";
        break;
      default:
        console.log("Error", pBtn.id);
        break;
    } // END switch() button disabler

    // // Attack the boss
    mntBoss.hHP -= pChar.hSTR;
    console.log("Boss weakend:", mntBoss.hHP);

    if (mntBoss.hHP <= 0) {
      // Defeated
      console.log("Defeated them!");
      // Turn off all buttons before moving on
      elBtnMntMain.disabled = "true";
      elBtnMntC02.disabled = "true";
      elBtnMntC03.disabled = "true";
      // Add this much more gold
      let tmpGold = fnRandomNumRange(999, 1234);
      myTribe._gold += Math.round(tmpGold * pChar.hLUK);
      // Update next level property
      myTribe._currentScreen = "#pgDungeon"; // Next level
      // Save to localStorage
      localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
      // Say the Best message
      document.querySelector("#pMntRes").innerHTML =
        "<p>HURRAH, " +
        pChar.hName +
        "!</p>" +
        "<p>You defeated " +
        mntBoss.hName +
        " and earned " +
        tmpGold.toLocaleString("en-US") +
        " GOLD!</p>" +
        "<p>Strut off to the Dungeon <button id='btnMntRes'>Go!</button></p>"; // END #pMntRes
      let elBtnMntRes = document.querySelector("#btnMntRes");
      elBtnMntRes.addEventListener("click", function () {
        fnGameNav("#pgMountain", myTribe._currentScreen, myTribe._id);
      });
    } else {
      // Keep fighting
      console.log("Keep fighting them", mntBoss.hHP);

      // // You take damage, determine 10% of a damage
      // let tmpHIT = pChar.hHP / 10;
      // // Then subtract and re-set the value of the property
      // pChar.hHP = Math.round(pChar.hHP - tmpHIT);

      pChar.hHP -= mntBoss.hSTR;
      console.log(
        "HIT AMOUNT",
        mntBoss.hSTR,
        pChar.hName,
        "down to",
        pChar.hHP,
      );

      // Then update the weaker state
      document.querySelector("#pMntRes").innerHTML =
        "<p>You have weakened " +
        mntBoss.hName +
        " down to " +
        mntBoss.hHP +
        "HP! Keep fighting and choose another Tribe Member!</p>" +
        "<p>" +
        pChar.hName +
        " is weakened: " +
        pChar.hHP +
        "HP!</p>";

      // If all 3 characters took their chance and failed
      if (
        elBtnMntMain.disabled == true &&
        elBtnMntC02.disabled == true &&
        elBtnMntC03.disabled == true
      ) {
        // All defeated
        console.log("All three tried, so move on");
        // No gold

        // Set next level
        myTribe._currentScreen = "#pgDungeon";
        // Save back to localStorage
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        // Update Result message (NEG)
        document.querySelector("#pMntRes").innerHTML =
          "<p>Alas!</p>" +
          "<p>You all failed to defeat " +
          mntBoss.hName +
          "!</p>" +
          "<p>Scamper off to the Dungeon <button id='btnMntRes'>Go!</button></p>"; // END #pMntRes
        let elBtnMntRes = document.querySelector("#btnMntRes");
        elBtnMntRes.addEventListener("click", function () {
          fnGameNav("#pgMountain", myTribe._currentScreen, myTribe._id);
        });
      } else {
        console.log("Keep fighting more");
      } // END If..Else all 3
    } // END if..else fight
  } // END fnMntFight(a, b)
} // END fnMountain

function fnBridge(currTribe) {
  console.log("At the BRIDGE with", currTribe);

  // Load all the data for this tribe
  let myTribe = JSON.parse(localStorage.getItem(currTribe));
  console.log("All tribe data", myTribe);

  document.querySelector("#pBrdMsg").innerHTML =
    "Welcome to the Bridge. A powerful foe stands before you! You must all join forces to defeat them!";

  document.querySelector("#pBrdTribe").innerHTML =
    "<table border='1' class='contentCenter boxHero'><tr>" +
    "<td><strong>" +
    myTribe.pMain.hName +
    "</strong><br>HP: " +
    myTribe.pMain.hHP +
    "<br>CLS: " +
    myTribe.pMain.hCLS +
    "<br>WEP: " +
    myTribe.pMain.hWEP +
    "<br>LUK: " +
    myTribe.pMain.hLUK +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp02.hName +
    "</strong><br>HP: " +
    myTribe.pComp02.hHP +
    "<br>CLS: " +
    myTribe.pComp02.hCLS +
    "<br>WEP: " +
    myTribe.pComp02.hWEP +
    "<br>LUK: " +
    myTribe.pComp02.hLUK +
    "</td>" +
    "<td><strong>" +
    myTribe.pComp03.hName +
    "</strong><br>HP: " +
    myTribe.pComp03.hHP +
    "<br>CLS: " +
    myTribe.pComp03.hCLS +
    "<br>WEP: " +
    myTribe.pComp03.hWEP +
    "<br>LUK: " +
    myTribe.pComp03.hLUK +
    "</td>" +
    "</tr></table>"; // End Tribe Table

  // Generate this level's mini-boss
  // constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
  let brdBoss = new Heroes(
    fnFromArray(arrNamesMiniBoss),
    fnRandomNumRange(55, 80),
    fnRandomNumRange(10, 19),
    null,
    null,
    fnFromArray(arrLuck),
    "Evil " + fnFromArray(arrWeapons),
    "Dark " + fnFromArray(arrClasses),
  ); // END brdBoss()
  console.log(brdBoss);

  // Display on-screen this miniboss
  document.querySelector("#pBrdEnemy").innerHTML =
    brdBoss.hName +
    " stands before you! They hold an " +
    brdBoss.hWEP +
    " and align with the " +
    brdBoss.hCLS +
    ". They have " +
    brdBoss.hHP +
    "HP and challenge you! Who of your Tribe will strike first?";

  // Display level actions
  document.querySelector("#pBrdAction").innerHTML =
    myTribe.pMain.hName +
    " uses " +
    myTribe.pMain.hWEP +
    " <button id='btnBrdMain'>Go</button><br>" +
    myTribe.pComp02.hName +
    " uses " +
    myTribe.pComp02.hWEP +
    " <button id='btnBrdC02'>Go</button><br>" +
    myTribe.pComp03.hName +
    " uses " +
    myTribe.pComp03.hWEP +
    " <button id='btnBrdC03'>Go</button>";

  // JS Objects referencing this dynamically-generated buttons
  let elBtnBrdMain = document.querySelector("#btnBrdMain");
  let elBtnBrdC02 = document.querySelector("#btnBrdC02");
  let elBtnBrdC03 = document.querySelector("#btnBrdC03");

  elBtnBrdMain.addEventListener("click", function () {
    fnBrdFight(myTribe.pMain, elBtnBrdMain);
  });
  elBtnBrdC02.addEventListener("click", function () {
    fnBrdFight(myTribe.pComp02, elBtnBrdC02);
  });
  elBtnBrdC03.addEventListener("click", function () {
    fnBrdFight(myTribe.pComp03, elBtnBrdC03);
  });

  // Bridge fight code
  function fnBrdFight(pChar, pBtn) {
    console.log("Who fights:", pChar, "Which button:", pBtn);

    // Disable the button of the currently-fighting character
    switch (pBtn.id) {
      case "btnBrdMain":
        elBtnBrdMain.disabled = "true";
        break;
      case "btnBrdC02":
        elBtnBrdC02.disabled = "true";
        break;
      case "btnBrdC03":
        elBtnBrdC03.disabled = "true";
        break;
      default:
        console.log("Error", pBtn.id);
        break;
    } // END switch() button disabler

    // // Attack the boss
    brdBoss.hHP -= pChar.hSTR;
    console.log("Boss weakend:", brdBoss.hHP);

    if (brdBoss.hHP <= 0) {
      // Defeated
      console.log("Defeated them!");
      // Turn off all buttons before moving on
      elBtnBrdMain.disabled = "true";
      elBtnBrdC02.disabled = "true";
      elBtnBrdC03.disabled = "true";
      // Add this much more gold
      let tmpGold = fnRandomNumRange(999, 1234);
      myTribe._gold += Math.round(tmpGold * pChar.hLUK);
      // Update next level property
      myTribe._currentScreen = "#pgDungeon"; // Next level
      // Save to localStorage
      localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
      // Say the Best message
      document.querySelector("#pBrdRes").innerHTML =
        "<p>HURRAH, " +
        pChar.hName +
        "!</p>" +
        "<p>You defeated " +
        brdBoss.hName +
        " and earned " +
        tmpGold.toLocaleString("en-US") +
        " GOLD!</p>" +
        "<p>Strut off to the Dungeon <button id='btnBrdRes'>Go!</button></p>"; // END #pBrdRes
      let elBtnBrdRes = document.querySelector("#btnBrdRes");
      elBtnBrdRes.addEventListener("click", function () {
        fnGameNav("#pgBridge", myTribe._currentScreen, myTribe._id);
      });
    } else {
      // Keep fighting
      console.log("Keep fighting them", brdBoss.hHP);

      // // You take damage, dtermine 10% of a damage
      // let tmpHIT = pChar.hHP / 10;
      // // Then subtract and re-set the value of the property
      // pChar.hHP = Math.round(pChar.hHP - tmpHIT);

      pChar.hHP -= brdBoss.hSTR;
      console.log(
        "HIT AMOUNT",
        brdBoss.hSTR,
        pChar.hName,
        "down to",
        pChar.hHP,
      );

      // Then update the weaker state
      document.querySelector("#pBrdRes").innerHTML =
        "<p>You have weakened " +
        brdBoss.hName +
        " down to " +
        brdBoss.hHP +
        "HP! Keep fighting and choose another Tribe Member!</p>" +
        "<p>" +
        pChar.hName +
        " is weakened: " +
        pChar.hHP +
        "HP!</p>";

      // If all 3 characters took their chance and failed
      if (
        elBtnBrdMain.disabled == true &&
        elBtnBrdC02.disabled == true &&
        elBtnBrdC03.disabled == true
      ) {
        // All defeated
        console.log("All three tried, so move on");
        // No gold

        // Set next level
        myTribe._currentScreen = "#pgDungeon";
        // Save back to localStorage
        localStorage.setItem(myTribe._id, JSON.stringify(myTribe));
        // Update Result message (NEG)
        document.querySelector("#pBrdRes").innerHTML =
          "<p>Alas!</p>" +
          "<p>You all failed to defeat " +
          brdBoss.hName +
          "!</p>" +
          "<p>Scamper off to the Dungeon <button id='btnBrdRes'>Go!</button></p>"; // END #pBrdRes
        let elBtnBrdRes = document.querySelector("#btnBrdRes");
        elBtnBrdRes.addEventListener("click", function () {
          fnGameNav("#pgBridge", myTribe._currentScreen, myTribe._id);
        });
      } else {
        console.log("Keep fighting more");
      } // END If..Else all 3
    } // END if..else fight
  } // END fnBrdFight(a, b)
} // END fnBridge
