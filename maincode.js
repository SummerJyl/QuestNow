// Create global scope variable to keep track of all emails
let arrListOfEmails = [];

// Function that runs at game initialization
function fnAppInit(){
    console.log("fnAppInit() is running");

    // Get the emails from localStorage to then check if you are a New or Returning player
    let tmpLsAllPlayers = JSON.parse(localStorage.getItem("lsAllPlayers"));

    // Conditional statement to determine which screen to SHOW at startup
    if(!tmpLsAllPlayers){
        console.log("no saved games yet");
        // So, show the Welcome screen                       
        document.querySelector("#pgWelcome").style.display = "block";
        // Set footer to Zero
        document.querySelector("#spnLGNumber").innerHTML = "0";
        // Since no saved games, disable the button to Load Games 
        document.querySelector("#pgWelcome main p button").disabled = "true";
    }else{
        console.log("yes saved games");
        // So, show the Load Game screen
        document.querySelector("#pgLoadGame").style.display = "block";
        // Set footer to number of saved games
        document.querySelector("#spnLGNumber").innerHTML = tmpLsAllPlayers.length; 
        // Use the #pLGParty placeholder and populate it with al our save games
        // >>>FIRST CLEAR (ONLY =) THE <p> PLACHOLDER
        document.querySelector("#pLGParty").innerHTML = "";
        // Set up a Conditional Statement (Loop) to iterate x number times based on saved games via a
        for(let i = 0; i < tmpLsAllPlayers.length; i++){
            console.log("Loop #", i);
            // For the current saved game, get their data, based on their Email
            let tmpCurrentPartyData  = JSON.parse(localStorage.getItem(tmpLsAllPlayers[i]));

            // >>>THEN ADD TO (WITH +=) THE <p> PLACEHOLDER
            document.querySelector("#pLGParty").innerHTML += "<p>" +
                   tmpCurrentPartyData.pMain.hName +
                   //" <button onclick='fnGameLoad(`" + tmpLsAllPlayers[i] + "`);'>" + tmpLsAllPlayers[i] + "</button>" +
                   " <button onclick='fnGameLoad(`" + tmpLsAllPlayers[i] + "`);'>" + "Start" + "</button>" +
                "</p>";
        }; // END For loop
        
    }; // END // If..else checker
}; // END fnAppInit()

// Run this function at app start
window.fnAppInit();

// Function when loading a specifici game
function fnGameLoad(gData){
    console.log("fnGameLoad() is about to load ", gData);
    
    // Read all the data of THIS party, so we can see their last progress
    let tmpAllPartyData = JSON.parse(localStorage.getItem(gData));
    console.log(tmpAllPartyData);
    console.log(tmpAllPartyData._currentScreen);

    // Then send them to their level
    fnGameNav("#pgLoadGame", tmpAllPartyData._currentScreen, tmpAllPartyData._id);
}; // END fnGameLoad()

// Function takes an array and randomly picks a value from it
function fnFromArray(anArray){
    console.log("fnFromArray() is running with", anArray);
    // Output (return) to the rest of the app, the result of the calculation
    return anArray[Math.floor(Math.random() * anArray.length)];
}; // END fnFromArray()

// Function to pick random number from a minium to a maximum (inclusive)
function fnRandomNumRange(minNum, maxNum){
    console.log("Pick a random number", minNum, "to", maxNum);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}; // END fnRandomNumRange()

// Create Lookup Tables - the collection of valid values to use
let arrWeapons = ["Sword", "Staff", "Club", "Bow", "Slingshot", "Magic Wand"];
let arrClasses = ["Knight", "Healer", "Magician", "Ninja", "Jester", "Farmer", "Noble", "Sage"];
let arrStats = [10, 25, 50, 75, 100];
// Luck table: From 50 chances, 1x 40/50  // 2x 5/50  // 3x 4/50   // 10x 1/50
let arrLuck = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                2, 2, 2, 2, 2, 3, 3, 3, 3, 10 ];   // END arrLuck
let arrNames = ["Atrax", "Bonana", "Cedron", "Dyllya", "Egot", 
                "Fonsina", "Gaelan", "Helitropia", "Indor", "Jakka",
                "Keol", "Lornara", "Melort", "Nardada", "Ozorr",
                "Pryli", "Qbort", "Rascala",  "Stenn", "Tuntuxia", 
                "Uvay", "Vatricia",  "Wex", "Xuxi", "Yorr", "Zaa"]; // END arrNames

let arrNamesMiniBoss = ["Ab", "Cd", "Ef", "Gh"];

// Define the meaning of the main character/party member players
class Heroes { 
    constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
        // Assign the Attributes of a character, based on input
        this.hName = hName;
        this.hHP   = hHP;
        this.hSTR  = hSTR;
        this.hSPD  = hSPD;
        this.hMP   = hMP;
        this.hLUK  = hLUK;
        this.hWEP  = hWEP;
        this.hCLS  = hCLS;
    };  // END Constructor (the Attributes)   
}; // END Class of Heroes

// Code to navigate from screen to screen, when not playing the game
function fnScreenNav(pgHide, pgShow){
    console.log("fnScreenNav() is running");
    console.log("Closing:", pgHide);
    console.log("Opening:", pgShow);

    document.querySelector(pgHide).style.display = "none";  // Hide the old screen
    document.querySelector(pgShow).style.display = "block"; // Show the new screen
}; // END fnScreenNav()

// Code to navigate from screen to screen, WHEN PLAYING THE GAME
function fnGameNav(pgHide, pgShow, currParty){
    console.log("fnGameNav() is running with ", currParty);
    console.log("Closing:", pgHide);
    console.log("Opening:", pgShow);

    document.querySelector(pgHide).style.display = "none";  
    document.querySelector(pgShow).style.display = "block"; 
    /// PROBABLY SHOULD MOVE THESE TO EACH case...

    // if..Else - pick from 2 possibilities
    // for() - loop for x number of times
    // switch() - switch between x possibilities
    // Depending on what screen we go to, make a decision via a switch()
    switch(pgShow){
        case "#pgTavern":
            console.log("Go to the Tavern");
            fnTavern(currParty);
            break;
        case "#pgForest":
            console.log("Go to the Forest");
            fnForest(currParty);
            break;
        case "#pgLake":
            console.log("Go to the Lake");
            fnLake(currParty);
            break;
        case "#pgMountain":
            console.log("Go to the Mountain");
            fnMountain(currParty);
            break;
        case "#pgBridge":
            console.log("Go to the Bridge");
            fnBridge(currParty);
            break;
        case "#pgDungeon":
            console.log("Go to the dungeon");
            tmpLevel(currParty);
            break;      
        default:
            console.log("Default condition:", pgShow);
            break;
    }; // END switch() to check WHICH level to load
    /*
                             / > #pgLake    \
        #pgTavern > #pgForest -> #pgMountain -> #pgDungeon
                             \ > #pgBridge  /
    */
}; // END fnGameNav()

// Code to nav when a game is loaded (when playing the game)
// function fnGameNav(){};

// Write a nice message in the Game Start screen when you visit it
document.querySelector("#pGSMsg").innerHTML = "Welcome to QUEST OF ADVENTURE! Are you ready for the challenge?";

// Function to create a new party in Game Start screen
function fnGSSubmit(){
    console.log("fnGSSubmit() is running");

    // Read what is in the <input>s in the Game Start screen
    let valGSName = document.querySelector("#inGSName").value;
    let valGSEmail = document.querySelector("#inGSEmail").value;
    
    console.log("valGSName is currenly holding: ", valGSName);
    console.log("valGSEmail is holding: ", valGSEmail);

    // Conditional Statement to check if BOTH fields are filled in, before proceeding
    if(valGSName && valGSEmail) { 
        console.log("True, BOTH <input> were filled in");
        
        // Generate Main Character
        let tmpMainChar = new Heroes(valGSName, 
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrLuck),
                            fnFromArray(arrWeapons),
                            fnFromArray(arrClasses)
                            ); // END generate main char
        console.log("Main Character:", tmpMainChar);

        // Generate second character
        let tmpChar02 = new Heroes(fnFromArray(arrNames), 
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrLuck),
                            fnFromArray(arrWeapons),
                            fnFromArray(arrClasses)
                            ); // END generate 2nd char

        // Generate third character
        let tmpChar03 = new Heroes(fnFromArray(arrNames), 
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrStats),
                            fnFromArray(arrLuck),
                            fnFromArray(arrWeapons),
                            fnFromArray(arrClasses)
                            ); // END generate 3rd char
            console.log("Char2", tmpChar02);
            console.log("Char3", tmpChar03);
            
            // Show the new party on-screen. Use (=) on FIRST setup
            document.querySelector("#pGSRes").innerHTML = "Name: <strong>" + tmpMainChar.hName;
            
            // Use (+=) on subsequent addtions
            document.querySelector("#pGSRes").innerHTML += "</strong><br>HP: " + tmpMainChar.hHP;
            document.querySelector("#pGSRes").innerHTML += "<br>STR: " + tmpMainChar.hSTR;
            document.querySelector("#pGSRes").innerHTML += "<br>SPD: " + tmpMainChar.hSPD;
            document.querySelector("#pGSRes").innerHTML += "<br>MP: " + tmpMainChar.hMP;
            document.querySelector("#pGSRes").innerHTML += "<br>LUK: " + tmpMainChar.hLUK;
            document.querySelector("#pGSRes").innerHTML += "<br>WEP: " + tmpMainChar.hWEP;
            document.querySelector("#pGSRes").innerHTML += "<br>CLS: " + tmpMainChar.hCLS;

            // Show second character, add to previous (+=)
            document.querySelector("#pGSRes").innerHTML += "<br><br>Name: <strong>" + tmpChar02.hName;
            document.querySelector("#pGSRes").innerHTML += "</strong><br>HP: " + tmpChar02.hHP;
            document.querySelector("#pGSRes").innerHTML += "<br>STR: " + tmpChar02.hSTR;
            document.querySelector("#pGSRes").innerHTML += "<br>SPD: " + tmpChar02.hSPD;
            document.querySelector("#pGSRes").innerHTML += "<br>MP: " + tmpChar02.hMP;
            document.querySelector("#pGSRes").innerHTML += "<br>LUK: " + tmpChar02.hLUK;
            document.querySelector("#pGSRes").innerHTML += "<br>WEP: " + tmpChar02.hWEP;
            document.querySelector("#pGSRes").innerHTML += "<br>CLS: " + tmpChar02.hCLS;

            // Show third character, add to previous (+=)
            document.querySelector("#pGSRes").innerHTML += "<br><br>Name: <strong>" + tmpChar03.hName;
            document.querySelector("#pGSRes").innerHTML += "</strong><br>HP: " + tmpChar03.hHP;
            document.querySelector("#pGSRes").innerHTML += "<br>STR: " + tmpChar03.hSTR;
            document.querySelector("#pGSRes").innerHTML += "<br>SPD: " + tmpChar03.hSPD;
            document.querySelector("#pGSRes").innerHTML += "<br>MP: " + tmpChar03.hMP;
            document.querySelector("#pGSRes").innerHTML += "<br>LUK: " + tmpChar03.hLUK;
            document.querySelector("#pGSRes").innerHTML += "<br>WEP: " + tmpChar03.hWEP;
            document.querySelector("#pGSRes").innerHTML += "<br>CLS: " + tmpChar03.hCLS;

            // Then hide the buttons, we're done with them.  
            document.querySelector("#pGSAction").style.display = "none";

            // Then display the button to journey to the first level and say a message 
                //document.querySelector("#pGSRes").innerHTML += "<p>Excellent! Your party is complete. Now, journey to Aesop's Tavern <button>Go</button></p>"; // OLD WAY REMOE IT
            document.querySelector("#pGSRes").innerHTML += "<p>Excellent! Your party is complete. Now, journey to Aesop\'s Tavern <button onclick='fnGameNav(`#pgGameStart`, `#pgTavern`, `" + valGSEmail + "`)'>Go</button></p>";
                // 2026-03-10 ---------------- MAKE THIS WORK^

            // Bundle the data of these 3 characters together, and any any other relevant data
            let tmpParty = {
                "_id":valGSEmail, 
                "_questCompleted":false, 
                "_currentScreen":"#pgTavern",
                "pMain":tmpMainChar,
                "pComp02":tmpChar02,
                "pComp03":tmpChar03
            }; // END bundle of data in JSON format
                // 2026-03-10 --------------- Changed the _currentScreen to the actual Level 1 (pgTavern)
                //                            And also in the HTML File
            
            // Save the list of emails to localStorage, for later use
            // BUT FIRST, CHECK IF THERE ARE ALREADY SAVED GAMES PREVIOUSLY SAVED!
            // First, convert the complex Array of emails into a simple String
            //  Simplify a complex Variable:                JSON.stringify(asdfasdfasdfadsfsdafsfda);
            //  Restore simple data back to Complex data:   JSON.parse(qwerqwerweqrwreq);
            let tmpAllPlayers = JSON.parse(localStorage.getItem("lsAllPlayers"));
            if(tmpAllPlayers){
                // TRUE data, we will save a new entry
                // Add new Party to the pre-existing Array
                tmpAllPlayers.push(valGSEmail);
                // Re-save the Array back to localStorage, Stringified
                localStorage.setItem("lsAllPlayers", JSON.stringify(tmpAllPlayers));
                // Create a new memory location for this new party
                localStorage.setItem(tmpParty._id, JSON.stringify(tmpParty));
                console.log("Saved an additional party");
            }else{
                // FALSE data, we will save the first entry
                // Add the FIRST party to the EMPTY Array
                arrListOfEmails.push(valGSEmail); 
                // Save the Array with new data for the first time to localStorage, Stringified
                localStorage.setItem("lsAllPlayers", JSON.stringify(arrListOfEmails));
                // Create a new memory location for this new party
                localStorage.setItem(tmpParty._id, JSON.stringify(tmpParty));
                console.log("Saved a party for the first time");
            }; // END If..else localStorage check
    } else {
        console.log("FALSE, they were NOT BOTH filled in");
        window.alert("Please enter all fields");
    }; // END If..Else checker to make sure both <input> are filled
}; // fnGSSubmit() END

// Function to clear the inputs of the Game Start screen (only) (Specific Purpose)///
function fnGSClear(){
    console.log("fnGSClear() is running");
    document.querySelector("#inGSName").value = ""; 
    document.querySelector("#inGSEmail").value = "";
}; // END fnGSClear()

// For all the action in the Tavern level
function fnTavern(currParty){
    console.log("At the Tavern with", currParty);

    // Load all the data of this party
    let myParty = JSON.parse(localStorage.getItem(currParty));
    console.log("All party data", myParty);

    // Update the placeholders with new text
    document.querySelector("#pTvnMsg").innerHTML = "Welcome, heroes! Grab some refreshments and chat with various patrons about recent happens around the land.";
    document.querySelector("#pTvnMsg").innerHTML += "<p>In this level, challenge an opponent to a contest of STATS.</p>";

    // Build the Party list and show on-screen
    document.querySelector("#pTvnParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 
            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP:" + myParty.pMain.hHP + 
                "<br>STR:" + myParty.pMain.hSTR + 
                "<br>SPD:" + myParty.pMain.hSPD + 
                "<br>MP:" + myParty.pMain.hMP + 
                "<br>LUK:" + myParty.pMain.hLUK +
                "<br>WEP:" + myParty.pMain.hWEP + 
                "<br>CLS:" + myParty.pMain.hCLS + 
                "</td>" + 

            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>STR:" + myParty.pComp02.hSTR + 
                "<br>SPD:" + myParty.pComp02.hSPD + 
                "<br>MP:" + myParty.pComp02.hMP + 
                "<br>LUK:" + myParty.pComp02.hLUK +
                "<br>WEP:" + myParty.pComp02.hWEP + 
                "<br>CLS:" + myParty.pComp02.hCLS + 
                "</td>" + 

            "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>STR:" + myParty.pComp03.hSTR + 
                "<br>SPD:" + myParty.pComp03.hSPD + 
                "<br>MP:" + myParty.pComp03.hMP + 
                "<br>LUK:" + myParty.pComp03.hLUK +
                "<br>WEP:" + myParty.pComp03.hWEP + 
                "<br>CLS:" + myParty.pComp03.hCLS + 
                "</td>" + 

            "</tr></table>"; // END Party Table

    // Create villains battle
    let tvnEnemy01 = new Heroes(fnFromArray(arrNames), fnFromArray(arrStats), fnFromArray(arrStats),
        fnFromArray(arrStats), fnFromArray(arrStats), fnFromArray(arrLuck), 
        fnFromArray(arrWeapons), fnFromArray(arrClasses));

    document.querySelector("#pTvnEnemy").innerHTML = "<table border='1' class='contentCenter boxVill'><tr>" + 
            "<td><strong>" + tvnEnemy01.hName + 
            "</strong><br>WEP:" + tvnEnemy01.hWEP + 
            "<br>CLS:" + tvnEnemy01.hCLS + 
            "</td>" + 
            "</tr></table>"; // END Villain Table

    // Create buttons for each Action, with a unique ID
    document.querySelector("#pTvnAction").innerHTML = "<div class='contentCenter'><button id='btnTvnStr'>STR</button>" +
        " <button id='btnTvnSpd'>SPD</button> " + 
        " <button id='btnTvnMp'>MP</button></div>";
    
    // Create Event Listeners to detect when each button is CLICKED, and keep track which was clicked
    // they then all run the same Function and know what to do
    document.querySelector("#btnTvnStr").addEventListener("click", function(){fnTvnAction("#btnTvnStr")});
    document.querySelector("#btnTvnSpd").addEventListener("click", function(){fnTvnAction("#btnTvnSpd")});
    document.querySelector("#btnTvnMp").addEventListener("click", function(){fnTvnAction("#btnTvnMp")});
    function fnTvnAction(tmpBtn) { 
        console.log("fnTvnAction is running. Action was", tmpBtn)
        // Pick a Hero which will battle   // // 3/17 CODE
        let tmpRandomHeroArray = [myParty.pMain, myParty.pComp02, myParty.pComp03];
        let tmpRandomHero = tmpRandomHeroArray[Math.floor(Math.random() * tmpRandomHeroArray.length)];
        console.log(tmpRandomHero);
        // Switch between actions
        switch(tmpBtn){
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
        }; // END Switch() of actions

        // Function to choose which attributes are battling in this level
        function fnTvnBattler(hAttrib, vAttrib){
            console.log(hAttrib, "vs", vAttrib);
                console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib], tvnEnemy01[vAttrib]);
                // Conditional Statement to compare stats and give/remove bonuses
                if(tmpRandomHero[hAttrib] > tvnEnemy01[vAttrib]){
                    // best result +100
                    console.log("STRONGER THAN");
                    // Add the max amount of MORE STRENGTH
                    tmpRandomHero[hAttrib] += 10;
                    console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib]);
                    // Update _currentScreen to the new level (#pgForest)
                    myParty._currentScreen = "#pgForest";
                    // Re-save to localStorage to progress in the game
                    localStorage.setItem(currParty, JSON.stringify(myParty));
                    // Say the message on-screen
                    document.querySelector("#pTvnRes").innerHTML = tmpRandomHero.hName + " stepped forward to battle " + tvnEnemy01.hName + " and WON! They earned 10 MORE Strength. Now, continue your quest!";
                    document.querySelector("#pTvnRes").innerHTML += "<p><button id='btnTvnGo'>Go</button></p>";
                    // NOTE: the .addEventListener() for this button is at the end of fnTvnAction() below...
                    // Deactivate the buttons, to be able to go to the next level
                    document.querySelector("#btnTvnStr").style.display = "none";
                    document.querySelector("#btnTvnSpd").style.display = "none";
                    document.querySelector("#btnTvnMp").style.display = "none";


                    // Update the boon on-screen
                    // NOTE: not another let to create the Variable
                    myParty = JSON.parse(localStorage.getItem(currParty));
                    document.querySelector("#pTvnParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 
                        "<td id='pMain'><strong>" + myParty.pMain.hName + 
                            "</strong><br>HP:" + myParty.pMain.hHP + 
                            "<br>STR:" + myParty.pMain.hSTR + 
                            "<br>SPD:" + myParty.pMain.hSPD + 
                            "<br>MP:" + myParty.pMain.hMP + 
                            "<br>LUK:" + myParty.pMain.hLUK +
                            "<br>WEP:" + myParty.pMain.hWEP + 
                            "<br>CLS:" + myParty.pMain.hCLS + 
                            "</td>" + 

                        "<td id='pComp02'><strong>" + myParty.pComp02.hName + 
                            "</strong><br>HP:" + myParty.pComp02.hHP + 
                            "<br>STR:" + myParty.pComp02.hSTR + 
                            "<br>SPD:" + myParty.pComp02.hSPD + 
                            "<br>MP:" + myParty.pComp02.hMP + 
                            "<br>LUK:" + myParty.pComp02.hLUK +
                            "<br>WEP:" + myParty.pComp02.hWEP + 
                            "<br>CLS:" + myParty.pComp02.hCLS + 
                            "</td>" + 

                        "<td id='pComp03'><strong>" + myParty.pComp03.hName + 
                            "</strong><br>HP:" + myParty.pComp03.hHP + 
                            "<br>STR:" + myParty.pComp03.hSTR + 
                            "<br>SPD:" + myParty.pComp03.hSPD + 
                            "<br>MP:" + myParty.pComp03.hMP + 
                            "<br>LUK:" + myParty.pComp03.hLUK +
                            "<br>WEP:" + myParty.pComp03.hWEP + 
                            "<br>CLS:" + myParty.pComp03.hCLS + 
                            "</td>" + 
                        "</tr></table>"; // END RE-DRAW Party Table



                }else if(tmpRandomHero[hAttrib] < tvnEnemy01[vAttrib]){
                    // worst result -10
                    console.log("WEAKER THAN");
                    // Subtract some amount of STRENGTH
                    tmpRandomHero[hAttrib] -= 5;
                    console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib]);
                    myParty._currentScreen = "#pgForest";
                    localStorage.setItem(currParty, JSON.stringify(myParty));
                    document.querySelector("#pTvnRes").innerHTML = tmpRandomHero.hName + " stepped forward to battle " + tvnEnemy01.hName + " and it was a ROUT! They lost 5 Strength. Begone!";
                    document.querySelector("#pTvnRes").innerHTML += "<p><button id='btnTvnGo'>Go</button></p>";
                    document.querySelector("#btnTvnStr").style.display = "none";
                    document.querySelector("#btnTvnSpd").style.display = "none";
                    document.querySelector("#btnTvnMp").style.display = "none";
                    myParty = JSON.parse(localStorage.getItem(currParty));
                    document.querySelector("#pTvnParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 
                        "<td id='pMain'><strong>" + myParty.pMain.hName + 
                            "</strong><br>HP:" + myParty.pMain.hHP + 
                            "<br>STR:" + myParty.pMain.hSTR + 
                            "<br>SPD:" + myParty.pMain.hSPD + 
                            "<br>MP:" + myParty.pMain.hMP + 
                            "<br>LUK:" + myParty.pMain.hLUK +
                            "<br>WEP:" + myParty.pMain.hWEP + 
                            "<br>CLS:" + myParty.pMain.hCLS + 
                            "</td>" + 

                        "<td id='pComp02'><strong>" + myParty.pComp02.hName + 
                            "</strong><br>HP:" + myParty.pComp02.hHP + 
                            "<br>STR:" + myParty.pComp02.hSTR + 
                            "<br>SPD:" + myParty.pComp02.hSPD + 
                            "<br>MP:" + myParty.pComp02.hMP + 
                            "<br>LUK:" + myParty.pComp02.hLUK +
                            "<br>WEP:" + myParty.pComp02.hWEP + 
                            "<br>CLS:" + myParty.pComp02.hCLS + 
                            "</td>" + 

                        "<td id='pComp03'><strong>" + myParty.pComp03.hName + 
                            "</strong><br>HP:" + myParty.pComp03.hHP + 
                            "<br>STR:" + myParty.pComp03.hSTR + 
                            "<br>SPD:" + myParty.pComp03.hSPD + 
                            "<br>MP:" + myParty.pComp03.hMP + 
                            "<br>LUK:" + myParty.pComp03.hLUK +
                            "<br>WEP:" + myParty.pComp03.hWEP + 
                            "<br>CLS:" + myParty.pComp03.hCLS + 
                            "</td>" + 
                        "</tr></table>"; // END RE-DRAW Party Table
                } else {
                    // neutral (equal) +10
                    console.log("EQUAL TO");
                    // Add the minimum amount STRENGTH
                    tmpRandomHero[hAttrib] += 5;
                    console.log(tmpRandomHero.hName, tmpRandomHero[hAttrib]);
                    myParty._currentScreen = "#pgForest";
                    localStorage.setItem(currParty, JSON.stringify(myParty));
                    document.querySelector("#pTvnRes").innerHTML = tmpRandomHero.hName + " stepped forward to battle " + tvnEnemy01.hName + " and TIED! Take 5 Strength for your efforts and continue the quest!";
                    document.querySelector("#pTvnRes").innerHTML += "<p><button id='btnTvnGo'>Go</button></p>";
                    document.querySelector("#btnTvnStr").style.display = "none";
                    document.querySelector("#btnTvnSpd").style.display = "none";
                    document.querySelector("#btnTvnMp").style.display = "none";
                    myParty = JSON.parse(localStorage.getItem(currParty));
                    document.querySelector("#pTvnParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 
                        "<td id='pMain'><strong>" + myParty.pMain.hName + 
                            "</strong><br>HP:" + myParty.pMain.hHP + 
                            "<br>STR:" + myParty.pMain.hSTR + 
                            "<br>SPD:" + myParty.pMain.hSPD + 
                            "<br>MP:" + myParty.pMain.hMP + 
                            "<br>LUK:" + myParty.pMain.hLUK +
                            "<br>WEP:" + myParty.pMain.hWEP + 
                            "<br>CLS:" + myParty.pMain.hCLS + 
                            "</td>" + 

                        "<td id='pComp02'><strong>" + myParty.pComp02.hName + 
                            "</strong><br>HP:" + myParty.pComp02.hHP + 
                            "<br>STR:" + myParty.pComp02.hSTR + 
                            "<br>SPD:" + myParty.pComp02.hSPD + 
                            "<br>MP:" + myParty.pComp02.hMP + 
                            "<br>LUK:" + myParty.pComp02.hLUK +
                            "<br>WEP:" + myParty.pComp02.hWEP + 
                            "<br>CLS:" + myParty.pComp02.hCLS + 
                            "</td>" + 

                        "<td id='pComp03'><strong>" + myParty.pComp03.hName + 
                            "</strong><br>HP:" + myParty.pComp03.hHP + 
                            "<br>STR:" + myParty.pComp03.hSTR + 
                            "<br>SPD:" + myParty.pComp03.hSPD + 
                            "<br>MP:" + myParty.pComp03.hMP + 
                            "<br>LUK:" + myParty.pComp03.hLUK +
                            "<br>WEP:" + myParty.pComp03.hWEP + 
                            "<br>CLS:" + myParty.pComp03.hCLS + 
                            "</td>" + 
                        "</tr></table>"; // END RE-DRAW Party Table
                }; // END If..Else..If
        }; // END fnTvnBattler()

        document.querySelector("#btnTvnGo").addEventListener("click", function(){fnGameNav('#pgTavern', '#pgForest', currParty);});
    }; // END fnTvnAction()
}; // END fnTavern()

        // this.hName = hName;
        // this.hHP   = hHP;
        // this.hSTR  = hSTR;
        // this.hSPD  = hSPD;
        // this.hMP   = hMP;
        // this.hLUK  = hLUK;
        // this.hWEP  = hWEP;
        // this.hCLS  = hCLS;

// Placeholder for future levels
function tmpLevel(currParty){
    console.log("tmplevel() is running");
}; // END tmpLevel()

// For all the action in the Tavern level
function fnForest(currParty){
    console.log("At the Forest with", currParty);

    // Load all the data of this party
    let myParty = JSON.parse(localStorage.getItem(currParty));
    console.log("All party data", myParty);
    // console.log(fnRandomNumRange(7, 12));

    // Lookup table, as a Multidimensional Array (3 in one)
    let arrFrstData = [
            ["Aba", "Beb", "Cab"],
            ["Secret Book","Holy Codex", "Lost Parchment", "Gothic Scroll"],   
            ["Power", "Wisdom", "Validation", "Insight", "Experience"]
        ]; // END arrFrstData

    // Using the MDA Lookup Table, generate a Sage, with their Artifact, and Attribute
    let valFrstName = arrFrstData[0][fnRandomNumRange(0, 2)];
    let valFrstArti = arrFrstData[1][fnRandomNumRange(0, 3)];
    let valFrstAttr = arrFrstData[2][fnRandomNumRange(0, 4)];

    // Update the placeholders with new text
    document.querySelector("#pFrstMsg").innerHTML = "You have reached The Forbidden Forest. You meet a wise sage. <br><br>Say hello to " + valFrstName + " who possesses the " + valFrstArti + " and seeks " + valFrstAttr + "!"; 
    
    document.querySelector("#pFrstParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 

            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP:" + myParty.pMain.hHP + 
                "<br>MP:" + myParty.pMain.hMP + 
                "</td>" + 
            
            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>MP:" + myParty.pComp02.hMP + 
                "</td>" + 

                "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>MP:" + myParty.pComp03.hMP + 
                "</td>" + 

            "</tr></table>"; // END Party Table


            document.querySelector("#pFrstAction").innerHTML = "<p>You will ask " + valFrstName + " to help you on your quest by giving you some of their " + valFrstAttr + " from their " + valFrstArti + "!</p>";
            document.querySelector("#pFrstAction").innerHTML += "<p><button id='btnFrstHP'>Ask for HP</button> <button id='btnFrstMP'>Ask for MP</button></p>";

            // Create Objects about those <button. so we can .addEventListener() to interact
            let elBtnFrstHP = document.querySelector("#btnFrstHP");
            let elBtnFrstMP = document.querySelector("#btnFrstMP");
            // If we need to pass Paramaters to a function
                 // // elBtnFrstHP.addEventListener("click", function(){fnSomeFunction(a, b, c)});
            // If we DO NOT need to pass Paramaters to a function
                 // // elBtnFrstHP.addEventListener("click", fnSomeFunction);
                 // OR this way, but no, please!
                 // // elBtnFrstHP.addEventListener("click", function(){fnSomeFunction()});
            elBtnFrstHP.addEventListener("click", fnFrstGetHP);
            elBtnFrstMP.addEventListener("click", fnFrstGetMP)

            // Function to get a Hit Point boost
            function fnFrstGetHP(){
                console.log("Getting HP");

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
                    valFrstAttr
                 ); // END frstNPC
                 console.log("Sage is", frstNPC);

                 // Generate a fraction so that we can add some X amount of a bonus
                 let  tmpRndFrac = Math.random();
                 // Based on that Random Fraction, generate the bonus
                 let tmpNewHP = frstNPC.hHP * tmpRndFrac;
                 console.log(tmpRndFrac, Math.ceil(tmpNewHP));
                 // Add those bonuses
                 myParty.pMain.hHP += Math.ceil(tmpNewHP);
                 myParty.pComp02.hHP += Math.ceil(tmpNewHP);
                 myParty.pComp03.hHP += Math.ceil(tmpNewHP);
                 // AND pass on the Artifcat to the party, via a NEW Party Attribute, an ARRAY
                 myParty._inventory = [frstNPC.hWEP];
                 // For the future, add a new item, at the end of the Array via .push()
                 // myParty._inventory.push("Cat");
                 myParty._gold = fnRandomNumRange(999, 1234); // Earned some gold, too! 
                 // Next, determine our next level, via conditional statement
                 let tmpRndPath = ["#pgLake", "#pgMountain", "#pgBridge"];
                 let tmpRndPathPICKED = tmpRndPath[fnRandomNumRange(0, 2)];
                 switch(tmpRndPathPICKED){
                     case "#pgLake": 
                        console.log("Going to Lake");
                        myParty._currentScreen = tmpRndPathPICKED;
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        tmpRndPathPICKED = "Lake";
                     break;
                     case "#pgMountain":
                        myParty._currentScreen = tmpRndPathPICKED;
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        console.log("Going to Mountain");
                        tmpRndPathPICKED = "Mountain";
                     break;
                     case "#pgBridge":
                        myParty._currentScreen = tmpRndPathPICKED;
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        console.log("Going to Bridge");
                        tmpRndPathPICKED = "Bridge";
                     break;
                     default:
                        console.log("Error?", tmpRndPathPICKED);
                     break;
                 }; // END Switch()
                 // Update on screen the results (lore, stats) and add the Next Level Button
                 // next time
            document.querySelector("#pFrstRes").innerHTML = "<p>Congratulations! " + frstNPC.hName + " has given you their " + frstNPC.hWEP + ", " + myParty._gold + " GOLD, and enchanced your HP by " + Math.ceil(tmpNewHP) + "!</p>";
            document.querySelector("#pFrstRes").innerHTML += "<table border='1' class='contentCenter boxHero'><tr>" + 

            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP:" + myParty.pMain.hHP + 
                "<br>MP:" + myParty.pMain.hMP + 
                "</td>" + 
            
            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>MP:" + myParty.pComp02.hMP + 
                "</td>" + 

                "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>MP:" + myParty.pComp03.hMP + 
                "</td>" + 

            "</tr></table>"; // END Party Table

            document.querySelector("#pFrstRes").innerHTML += "<p>Now, head to The " + tmpRndPathPICKED + " and continue.<br><button id='btnFrstGoNext'>Go</button></p>";

            let elBtnFrstGoNext = document.querySelector("#btnFrstGoNext");
            elBtnFrstGoNext.addEventListener("click", function(){fnGameNav("#pgForest", myParty._currentScreen, myParty._id)});
            }; // END fnFrstGetHP

            // Function to get a Magic boost
            function fnFrstGetMP(){
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
                    valFrstAttr
                 ); // END frstNPC
                 console.log("Sage is", frstNPC);

                 let tmpRndFrac = Math.random();
                 let tmpNewMP = frstNPC.hMP * tmpRndFrac;
                 console.log(tmpRndFrac, Math.ceil(tmpNewMP));
                 
                 myParty.pMain.hMP += Math.ceil(tmpNewMP);
                 myParty.pComp02.hMP += Math.ceil(tmpNewMP);
                 myParty.pComp03.hMP += Math.ceil(tmpNewMP);
                 
                 myParty._inventory = [frstNPC.hWEP];
                 
                 myParty._gold = fnRandomNumRange(999, 1234); 
                 
                 let tmpRndPath = ["#pgLake", "#pgMountain", "#pgBridge"];
                 let tmpRndPathPICKED = tmpRndPath[fnRandomNumRange(0, 2)];
                 switch(tmpRndPathPICKED){
                     case "#pgLake": 
                        console.log("Going to Lake");
                        myParty._currentScreen = tmpRndPathPICKED;
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        tmpRndPathPICKED = "Lake";
                     break;
                     case "#pgMountain":
                        myParty._currentScreen = tmpRndPathPICKED;
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        console.log("Going to Mountain");
                        tmpRndPathPICKED = "Mountain";
                     break;
                     case "#pgBridge":
                        myParty._currentScreen = tmpRndPathPICKED;
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        console.log("Going to Bridge");
                        tmpRndPathPICKED = "Bridge";
                     break;
                     default:
                        console.log("Error?", tmpRndPathPICKED);
                     break;
                 }; // END Switch()
                 // Update on screen the results (lore, stats) and add the Next Level Button
                 // next time
            document.querySelector("#pFrstRes").innerHTML = "<p>Congratulations! " + frstNPC.hName + " has given you their " + frstNPC.hWEP + ", " + myParty._gold + " GOLD, and enchanced your MP by " + Math.ceil(tmpNewMP) + "!</p>";
            document.querySelector("#pFrstRes").innerHTML += "<table border='1' class='contentCenter boxHero'><tr>" + 

            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP:" + myParty.pMain.hHP + 
                "<br>MP:" + myParty.pMain.hMP + 
                "</td>" + 
            
            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>MP:" + myParty.pComp02.hMP + 
                "</td>" + 

                "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>MP:" + myParty.pComp03.hMP + 
                "</td>" + 

            "</tr></table>"; // END Party Table

            document.querySelector("#pFrstRes").innerHTML += "<p>Now, head to The " + tmpRndPathPICKED + " and continue.<br><button id='btnFrstGoNext'>Go</button></p>";

            let elBtnFrstGoNext = document.querySelector("#btnFrstGoNext");
            elBtnFrstGoNext.addEventListener("click", function(){fnGameNav("#pgForest", myParty._currentScreen, myParty._id)});
            }; // END fnFrstGetMP()

    // Instead of an ID on the <h4>, we can specify its "path" (via DOM) to the right Element
    // c:\users\campos\desktop\homework.html
    document.querySelector("#pgForest footer h4").innerHTML = "SHOW THEY LUK VALUE HERE";
    // CSS: #pgForest footer h4 {text-align: center;}
    document.querySelector("#pgForest footer h4").style.textAlign = "center";
}; // END fnForest()

// Function for Lake level
function fnLake(currParty){
    console.log("At the Lake with", currParty);

    // Load all the data of this party
    let myParty = JSON.parse(localStorage.getItem(currParty));
    console.log("All party data", myParty);

    document.querySelector("#pLakMsg").innerHTML = "Welcome to Eel Lake. A powerful foe stands before you! You must all join together to defeat them!";

    document.querySelector("#pLakParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 

            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP: " + myParty.pMain.hHP + 
                "<br>CLS: " + myParty.pMain.hCLS + 
                "<br>WEP: " + myParty.pMain.hWEP + 
                "</td>" + 
            
            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>CLS: " + myParty.pComp02.hCLS + 
                "<br>WEP: " + myParty.pComp02.hWEP + 
                "</td>" + 

                "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>CLS: " + myParty.pComp03.hCLS + 
                "<br>WEP: " + myParty.pComp03.hWEP + 
                "</td>" + 

            "</tr></table>"; // END Party Table

            // Generate this level's mini-boss
             // constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
            let lakBoss = new Heroes(
                fnFromArray(arrNamesMiniBoss),
                fnRandomNumRange(50, 75),
                null,
                null,
                null,
                null,
                ("Evil " + fnFromArray(arrWeapons)),
                ("Dark " + fnFromArray(arrClasses))
            ); // END lakBoss()
            console.log(lakBoss);

            // Display on-screen this miniboss
            document.querySelector("#pLakEnemy").innerHTML = lakBoss.hName + " stands before you! They hold an " + 
                lakBoss.hWEP + " and align with the " + lakBoss.hCLS + 
                ". They have " + lakBoss.hHP +"HP and challenge you! Who of your Party will strike first?";

            // Display level actions
            document.querySelector("#pLakAction").innerHTML = 
            myParty.pMain.hName   + " uses " + myParty.pMain.hWEP   + " <button id='btnLakMain'>Go</button><br>" +
            myParty.pComp02.hName + " uses " + myParty.pComp02.hWEP + " <button id='btnLakC02'>Go</button><br>" +
            myParty.pComp03.hName + " uses " + myParty.pComp03.hWEP + " <button id='btnLakC03'>Go</button>";

            // JS Objects referencing this dynamically-generated buttons
            let elBtnLakMain = document.querySelector("#btnLakMain");
            let elBtnLakC02  = document.querySelector("#btnLakC02");
            let elBtnLakC03  = document.querySelector("#btnLakC03");

            elBtnLakMain.addEventListener("click", function(){fnLakFight(myParty.pMain,   elBtnLakMain);});
            elBtnLakC02.addEventListener("click",  function(){fnLakFight(myParty.pComp02, elBtnLakC02);});
            elBtnLakC03.addEventListener("click",  function(){fnLakFight(myParty.pComp03, elBtnLakC03);});

            function fnLakFight(pChar, pBtn){
                console.log(pChar, "will fight");
                console.log("Button of", pBtn.id);
                console.log(pChar.hName, pChar.hSTR, "VS", lakBoss.hHP);

                // Disable the button of the currently-fighting character
                switch(pBtn.id) {
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
                }; // END switch() button disabler

                // Attack the boss
                lakBoss.hHP = lakBoss.hHP - pChar.hSTR;
                console.log("Boss weakend:", lakBoss.hHP);

                if(lakBoss.hHP <= 0) {
                    // Defeated
                    console.log("Defeated them!");
                    // Turn off all buttons before moving on
                    elBtnLakMain.disabled = "true";
                    elBtnLakC02.disabled  = "true";
                    elBtnLakC03.disabled  = "true";
                    // Add this much more gold
                    let tmpGold = fnRandomNumRange(999, 1234);
                    myParty._gold += tmpGold;
                    // Update next level property
                    myParty._currentScreen = "#pgDungeon"; // Next level
                    // Save to localStorage
                    localStorage.setItem(myParty._id, JSON.stringify(myParty));
                    // Say the Best message 
                    document.querySelector("#pLakRes").innerHTML = "<p>HURRAH, " + pChar.hName + "!</p>" +
                        "<p>You defeated " + lakBoss.hName + " and earned " + tmpGold.toLocaleString("en-US") + " GOLD!</p>" +
                        "<p>Strut off to the Dungeon <button id='btnLakRes'>Go!</button></p>"
                    ; // END #pLakRes
                    let elBtnLakRes = document.querySelector("#btnLakRes");
                    elBtnLakRes.addEventListener("click", function(){fnGameNav("#pgLake", myParty._currentScreen, myParty._id)});
                } else {
                    // Keep fighting
                    console.log("Keep fighting them", lakBoss.hHP);

                    // You take damage, dtermine 10% of a damage
                    let tmpHIT = pChar.hHP / 10;
                    // Then subtract and re-set the value of the property
                    pChar.hHP = Math.round(pChar.hHP - tmpHIT);
                    console.log(pChar.hName, "down to", pChar.hHP);

                    // Then update the weaker state
                    document.querySelector("#pLakRes").innerHTML = "<p>You have weakened " + lakBoss.hName + " down to " + lakBoss.hHP + "HP! Keep fighting and choose another Party Member!</p>" +
                    "<p>" + pChar.hName + " is weakened: " + pChar.hHP + "HP!</p>";

                    // If all 3 characters took their chance and failed
                    if(
                        elBtnLakMain.disabled == true && 
                        elBtnLakC02.disabled  == true && 
                        elBtnLakC03.disabled  == true
                    ){
                        // All defeated
                        console.log("All three tried, so move on");
                        // No gold

                        // Set next level
                        myParty._currentScreen = "#pgDungeon";
                        // Save back to localStorage
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        // Update Result message (NEG)
                        document.querySelector("#pLakRes").innerHTML = "<p>Alas!</p>" +
                         "<p>You all failed to defeat " + lakBoss.hName + "!</p>" +
                         "<p>Scamper off to the Dungeon <button id='btnLakRes'>Go!</button></p>"
                        ; // END #pLakRes
                        let elBtnLakRes = document.querySelector("#btnLakRes");
                        elBtnLakRes.addEventListener("click", function(){fnGameNav("#pgLake", myParty._currentScreen, myParty._id)});
                    }else{
                        console.log("Keep fighting more");
                    }; // END If..Else all 3
                }; // END if..else fight
            }; // END fnLakFight
}; // END fnLake()


function fnMountain(currParty){
    console.log("At the Mountain with", currParty);

    // Load all the data of this party
    let myParty = JSON.parse(localStorage.getItem(currParty));
    console.log("All party data", myParty);

    document.querySelector("#pMntMsg").innerHTML = "Welcome to the Monty Mountain. A powerful foe stands before you! You must all join forces to defeat them!";

    document.querySelector("#pMntParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 

            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP: " + myParty.pMain.hHP + 
                "<br>CLS: " + myParty.pMain.hCLS + 
                "<br>WEP: " + myParty.pMain.hWEP + 
                "<br>LUK: " + myParty.pMain.hLUK + 
                "</td>" + 
            
            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>CLS: " + myParty.pComp02.hCLS + 
                "<br>WEP: " + myParty.pComp02.hWEP + 
                "<br>LUK: " + myParty.pComp02.hLUK + 
                "</td>" + 

                "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>CLS: " + myParty.pComp03.hCLS + 
                "<br>WEP: " + myParty.pComp03.hWEP + 
                "<br>LUK: " + myParty.pComp03.hLUK + 
                "</td>" + 

            "</tr></table>"; // END Party Table

            // Generate this level's mini-boss
             // constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
            let mntBoss = new Heroes(
                fnFromArray(arrNamesMiniBoss),
                fnRandomNumRange(55, 80),
                fnRandomNumRange(10, 19),
                null,
                null,
                fnFromArray(arrLuck),
                ("Evil " + fnFromArray(arrWeapons)),
                ("Dark " + fnFromArray(arrClasses))
            ); // END mntBoss()
            console.log(mntBoss);

            // Display on-screen this miniboss
            document.querySelector("#pMntEnemy").innerHTML = mntBoss.hName + " stands before you! They hold an " + 
                mntBoss.hWEP + " and align with the " + mntBoss.hCLS + 
                ". They have " + mntBoss.hHP +"HP and challenge you! Who of your Party will strike first?";

            // Display level actions
            document.querySelector("#pMntAction").innerHTML = 
            myParty.pMain.hName   + " uses " + myParty.pMain.hWEP   + " <button id='btnMntMain'>Go</button><br>" +
            myParty.pComp02.hName + " uses " + myParty.pComp02.hWEP + " <button id='btnMntC02'>Go</button><br>" +
            myParty.pComp03.hName + " uses " + myParty.pComp03.hWEP + " <button id='btnMntC03'>Go</button>";

            // JS Objects referencing this dynamically-generated buttons
            let elBtnMntMain = document.querySelector("#btnMntMain");
            let elBtnMntC02  = document.querySelector("#btnMntC02");
            let elBtnMntC03  = document.querySelector("#btnMntC03");

            elBtnMntMain.addEventListener("click", function(){fnMntFight(myParty.pMain,   elBtnMntMain);});
            elBtnMntC02.addEventListener("click",  function(){fnMntFight(myParty.pComp02, elBtnMntC02);});
            elBtnMntC03.addEventListener("click",  function(){fnMntFight(myParty.pComp03, elBtnMntC03);});

            // Mountain fight code
            function fnMntFight(pChar, pBtn){
                console.log("Who fights:", pChar, "Which button:", pBtn);

                // Disable the button of the currently-fighting character
                switch(pBtn.id) {
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
                }; // END switch() button disabler

                // // Attack the boss
                mntBoss.hHP -= pChar.hSTR;
                console.log("Boss weakend:", mntBoss.hHP);

                if(mntBoss.hHP <= 0) {
                    // Defeated
                    console.log("Defeated them!");
                    // Turn off all buttons before moving on
                    elBtnMntMain.disabled = "true";
                    elBtnMntC02.disabled  = "true";
                    elBtnMntC03.disabled  = "true";
                    // Add this much more gold
                    let tmpGold = fnRandomNumRange(999, 1234);
                    myParty._gold += Math.round(tmpGold * pChar.hLUK);
                    // Update next level property
                    myParty._currentScreen = "#pgDungeon"; // Next level
                    // Save to localStorage
                    localStorage.setItem(myParty._id, JSON.stringify(myParty));
                    // Say the Best message 
                    document.querySelector("#pMntRes").innerHTML = "<p>HURRAH, " + pChar.hName + "!</p>" +
                        "<p>You defeated " + mntBoss.hName + " and earned " + tmpGold.toLocaleString("en-US") + " GOLD!</p>" +
                        "<p>Strut off to the Dungeon <button id='btnMntRes'>Go!</button></p>"
                    ; // END #pMntRes
                    let elBtnMntRes = document.querySelector("#btnMntRes");
                    elBtnMntRes.addEventListener("click", function(){fnGameNav("#pgMountain", myParty._currentScreen, myParty._id)});
                } else {
                    // Keep fighting
                    console.log("Keep fighting them", mntBoss.hHP);

                    // // You take damage, dtermine 10% of a damage
                    // let tmpHIT = pChar.hHP / 10;
                    // // Then subtract and re-set the value of the property
                    // pChar.hHP = Math.round(pChar.hHP - tmpHIT);

                    pChar.hHP -= mntBoss.hSTR
                    console.log("HIT AMOUNT", mntBoss.hSTR, pChar.hName, "down to", pChar.hHP);

                    // Then update the weaker state
                    document.querySelector("#pMntRes").innerHTML = "<p>You have weakened " + mntBoss.hName + " down to " + mntBoss.hHP + "HP! Keep fighting and choose another Party Member!</p>" +
                    "<p>" + pChar.hName + " is weakened: " + pChar.hHP + "HP!</p>";

                    // If all 3 characters took their chance and failed
                    if(
                        elBtnMntMain.disabled == true && 
                        elBtnMntC02.disabled  == true && 
                        elBtnMntC03.disabled  == true
                    ){
                        // All defeated
                        console.log("All three tried, so move on");
                        // No gold

                        // Set next level
                        myParty._currentScreen = "#pgDungeon";
                        // Save back to localStorage
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        // Update Result message (NEG)
                        document.querySelector("#pMntRes").innerHTML = "<p>Alas!</p>" +
                         "<p>You all failed to defeat " + mntBoss.hName + "!</p>" +
                         "<p>Scamper off to the Dungeon <button id='btnMntRes'>Go!</button></p>"
                        ; // END #pMntRes
                        let elBtnMntRes = document.querySelector("#btnMntRes");
                        elBtnMntRes.addEventListener("click", function(){fnGameNav("#pgMountain", myParty._currentScreen, myParty._id)});
                    }else{
                        console.log("Keep fighting more");
                    }; // END If..Else all 3
                }; // END if..else fight
            }; // END fnMntFight(a, b)
}; // END fnMountain


function fnBridge(currParty){
    console.log("At the BRIDGE with", currParty);

    // Load all the data of this party
    let myParty = JSON.parse(localStorage.getItem(currParty));
    console.log("All party data", myParty);

    document.querySelector("#pBrdMsg").innerHTML = "Welcome to the Bridge. A powerful foe stands before you! You must all join forces to defeat them!";

    document.querySelector("#pBrdParty").innerHTML = "<table border='1' class='contentCenter boxHero'><tr>" + 

            "<td><strong>" + myParty.pMain.hName + 
                "</strong><br>HP: " + myParty.pMain.hHP + 
                "<br>CLS: " + myParty.pMain.hCLS + 
                "<br>WEP: " + myParty.pMain.hWEP + 
                "<br>LUK: " + myParty.pMain.hLUK + 
                "</td>" + 
            
            "<td><strong>" + myParty.pComp02.hName + 
                "</strong><br>HP:" + myParty.pComp02.hHP + 
                "<br>CLS: " + myParty.pComp02.hCLS + 
                "<br>WEP: " + myParty.pComp02.hWEP + 
                "<br>LUK: " + myParty.pComp02.hLUK + 
                "</td>" + 

                "<td><strong>" + myParty.pComp03.hName + 
                "</strong><br>HP:" + myParty.pComp03.hHP + 
                "<br>CLS: " + myParty.pComp03.hCLS + 
                "<br>WEP: " + myParty.pComp03.hWEP + 
                "<br>LUK: " + myParty.pComp03.hLUK + 
                "</td>" + 

            "</tr></table>"; // END Party Table

            // Generate this level's mini-boss
             // constructor(hName, hHP, hSTR, hSPD, hMP, hLUK, hWEP, hCLS) {
            let brdBoss = new Heroes(
                fnFromArray(arrNamesMiniBoss),
                fnRandomNumRange(55, 80),
                fnRandomNumRange(5, 9),
                null,
                null,
                fnFromArray(arrLuck),
                ("Evil " + fnFromArray(arrWeapons)),
                ("Dark " + fnFromArray(arrClasses))
            ); // END brdBoss()
            console.log(brdBoss);

            // Display on-screen this miniboss
            document.querySelector("#pBrdEnemy").innerHTML = brdBoss.hName + " stands before you! They hold an " + 
                brdBoss.hWEP + " and align with the " + brdBoss.hCLS + 
                ". They have " + brdBoss.hHP +"HP and challenge you! Who of your Party will strike first?";

            // Display level actions
            document.querySelector("#pBrdAction").innerHTML = 
            myParty.pMain.hName   + " uses " + myParty.pMain.hWEP   + " <button id='btnBrdMain'>Go</button><br>" +
            myParty.pComp02.hName + " uses " + myParty.pComp02.hWEP + " <button id='btnBrdC02'>Go</button><br>" +
            myParty.pComp03.hName + " uses " + myParty.pComp03.hWEP + " <button id='btnBrdC03'>Go</button>";

            // JS Objects referencing this dynamically-generated buttons
            let elBtnBrdMain = document.querySelector("#btnBrdMain");
            let elBtnBrdC02  = document.querySelector("#btnBrdC02");
            let elBtnBrdC03  = document.querySelector("#btnBrdC03");

            elBtnBrdMain.addEventListener("click", function(){fnBrdFight(myParty.pMain,   elBtnBrdMain);});
            elBtnBrdC02.addEventListener("click",  function(){fnBrdFight(myParty.pComp02, elBtnBrdC02);});
            elBtnBrdC03.addEventListener("click",  function(){fnBrdFight(myParty.pComp03, elBtnBrdC03);});

            // Mountain fight code
            function fnBrdFight(pChar, pBtn){
                console.log("Who fights:", pChar, "Which button:", pBtn);

                // Disable the button of the currently-fighting character
                switch(pBtn.id) {
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
                }; // END switch() button disabler

                // // Attack the boss
                brdBoss.hHP -= pChar.hSTR;
                console.log("Boss weakend:", brdBoss.hHP);

                if(brdBoss.hHP <= 0) {
                    // Defeated
                    console.log("Defeated them!");
                    // Turn off all buttons before moving on
                    elBtnBrdMain.disabled = "true";
                    elBtnBrdC02.disabled  = "true";
                    elBtnBrdC03.disabled  = "true";
                    // Add this much more gold
                    let tmpGold = fnRandomNumRange(999, 1234);
                    myParty._gold += Math.round(tmpGold * pChar.hLUK);
                    // Update next level property
                    myParty._currentScreen = "#pgDungeon"; // Next level
                    // Save to localStorage
                    localStorage.setItem(myParty._id, JSON.stringify(myParty));
                    // Say the Best message 
                    document.querySelector("#pBrdRes").innerHTML = "<p>HURRAH, " + pChar.hName + "!</p>" +
                        "<p>You defeated " + brdBoss.hName + " and earned " + tmpGold.toLocaleString("en-US") + " GOLD!</p>" +
                        "<p>Strut off to the Dungeon <button id='btnBrdRes'>Go!</button></p>"
                    ; // END #pBrdRes
                    let elBtnBrdRes = document.querySelector("#btnBrdRes");
                    elBtnBrdRes.addEventListener("click", function(){fnGameNav("#pgBridge", myParty._currentScreen, myParty._id)});
                } else {
                    // Keep fighting
                    console.log("Keep fighting them", brdBoss.hHP);

                    // // You take damage, dtermine 10% of a damage
                    // let tmpHIT = pChar.hHP / 10;
                    // // Then subtract and re-set the value of the property
                    // pChar.hHP = Math.round(pChar.hHP - tmpHIT);

                    pChar.hHP -= brdBoss.hSTR
                    console.log("HIT AMOUNT", brdBoss.hSTR, pChar.hName, "down to", pChar.hHP);

                    // Then update the weaker state
                    document.querySelector("#pBrdRes").innerHTML = "<p>You have weakened " + brdBoss.hName + " down to " + brdBoss.hHP + "HP! Keep fighting and choose another Party Member!</p>" +
                    "<p>" + pChar.hName + " is weakened: " + pChar.hHP + "HP!</p>";

                    // If all 3 characters took their chance and failed
                    if(
                        elBtnBrdMain.disabled == true && 
                        elBtnBrdC02.disabled  == true && 
                        elBtnBrdC03.disabled  == true
                    ){
                        // All defeated
                        console.log("All three tried, so move on");
                        // No gold

                        // Set next level
                        myParty._currentScreen = "#pgDungeon";
                        // Save back to localStorage
                        localStorage.setItem(myParty._id, JSON.stringify(myParty));
                        // Update Result message (NEG)
                        document.querySelector("#pBrdRes").innerHTML = "<p>Alas!</p>" +
                         "<p>You all failed to defeat " + brdBoss.hName + "!</p>" +
                         "<p>Scamper off to the Dungeon <button id='btnBrdRes'>Go!</button></p>"
                        ; // END #pBrdRes
                        let elBtnBrdRes = document.querySelector("#btnBrdRes");
                        elBtnBrdRes.addEventListener("click", function(){fnGameNav("#pgBridge", myParty._currentScreen, myParty._id)});
                    }else{
                        console.log("Keep fighting more");
                    }; // END If..Else all 3
                }; // END if..else fight
            }; // END fnBrdFight(a, b)
}; // END fnMountain