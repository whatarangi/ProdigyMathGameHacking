// @ts-nocheck
import { Swal, Toast, NumberInput, Input, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { _, getItem, VERY_LARGE_NUMBER, prodigy, game, saveCharacter} from "../utils/util";
import { Item } from "../../../typings/item";
import { TODO } from "../../../typings/util";


// made by gemsvidø
new Hack(category.beta, "Max Account [BETA]").setClick(async () => {

    // ============================================
    // PRE MAXING PROCESS



     if (!(
    		await Confirm.fire("Are you sure that you want to max your account?", "We reccomend doing this on an alt.")
    ).value) {
    console.log("Cancelled");
    return;
    }



    // FIRST, Escape any battle to prevent random glitching.
    const currentState = game.state.current;
    	if (currentState === "PVP") Object.fromEntries(_.instance.game.state.states).PVP.endPVP();
    	else if (currentState === "CoOp") prodigy.world.$(_.player.data.zone);
    	else if (!["Battle", "SecureBattle"].includes(currentState)) {
    	} else {
    		Object.fromEntries(_.instance.game.state.states)[currentState].runAwayCallback();
    	}
    console.log("Escaped any battle.");


    // NOW, fix the morph crash bug
    _.player.getPlayerData().playerTransformation = undefined;
    _.player.appearanceChanged = true;
    console.log("Fixed morph crash");


    // ALSO, fix the battle crash bug
    _.player.kennel.petTeam.forEach((v: any) => {
		if (v && (v as any).assignRandomSpells) (v as any).assignRandomSpells();
	});
	console.log("Fixed battle crash.")

    // PRE MAXING PROCESS
    // ============================================
    // ============================================
    // PLAYER HACKS

    // Set the players gold to 09900000
    _.player.data.gold = 9900000;
    console.log("Set player gold to 9900000.")


    // Set the players level to 100
    const level = 100;
    	const h = level.value - 2;
    	const xpConstant = 1.042;
    	_.player.data.stars = Math.round((1 - Math.pow(xpConstant, h)) / (1 - xpConstant) * 20 + 10);
    	_.player.data.level = 100;
    	_.player.getLevel = () => { return _.player.data.level; };
    console.log("Set player level to 100");


    // Set the players bounty points to 100 (max)
    _.player.data.bountyScore = 100;
    console.log("Set player's bounty points to 100.");


    // Set the players conjure cubes to 100 (max)
	for (let i = 0; i < Math.min(99, 100); i++) { prodigy.giftBoxController.receiveGiftBox(null, getItem("giftBox", 1)); }
    console.log("Obtained 100 conjure cubes.");


    // Set the player's wins to VERY_LARGE_NUMBER
    _.player.data.win = VERY_LARGE_NUMBER;
    console.log("Set player's wins to VERY_LARGE_NUMBER");


    // Set the player's losses to -9223372036854775808 (Java long limit, ik its irrelevant)
    _.player.data.loss = -9223372036854775808;
    console.log("Set player's losses to -9223372036854775808.");



    // Set the players damage multiplier to VERY_LARGE_NUMBER
    _.player.modifiers.damage = VERY_LARGE_NUMBER;
    console.log("Enabled damage multiplier.");


    // Set the players PVP health to VERY_LARGE_NUMBER
    _.player.pvpHP = VERY_LARGE_NUMBER;
    _.player.getMaxHearts = () => VERY_LARGE_NUMBER;
    console.log("PvP health obtained.")


    // Enable premium membership
    function getMemberModule () { return _.player.hasMembership.toString().split("\"")[1]; }
    _.instance.prodigy.gameContainer.get(getMemberModule()).data.membership.active = true;
    _.player.appearanceChanged = true;
    console.log("Premium membership enabled.");


    // Get all achievements
    for (var i = 0; i < 100; i ++) {
    	_.player.achievements.data.progress[i] = 10;
    }
    console.log("Obtained all achievements.");

    // Set the players dark tower floor to 100
    _.player.data.tower = 100;
    console.log("Set tower floor to 100.");

    // PLAYER HACKS
    // ============================================
    // ============================================
    // BATTLE HACKS



    // Disable Math
    _.constants.constants["GameConstants.Debug.EDUCATION_ENABLED"] = false;
    console.log("Math Disabled.");

    // Max out the players HP
    _.player.getMaxHearts = () => VERY_LARGE_NUMBER;
    _.player.pvpHP = VERY_LARGE_NUMBER;
    _.player.data.hp = VERY_LARGE_NUMBER;
    console.log("Maxed out PvE health.");


    // BATTLE HACKS
    // ============================================
    // ============================================
    // INVENTORY HACKS


    // load sum typings and stuff
    const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"];
    const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"];
    const itemify = (item: Item[], amount: number) =>
    	item.map(x => ({
    		ID: x.ID,
    		N: amount
    	})).filter(v => v !== undefined);


    // Get 990000 of all items
    const num = 990000;

    	ids.forEach(id => {
    		_.player.backpack.data[id] = itemify(_.gameData[id].filter(l => id === "follow" ? ![125,126,127,128,129,134,135,136,137].includes(l.ID) : l), num.value);
    	});
    	_.gameData.dorm.forEach(x =>
    		_.player.house.data.items[x.ID] = { A: [], N: num.value }
    	);

    	// Remove bounty notes
    	const bountyIndex = () => _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86);
    	while (bountyIndex() > -1) _.player.backpack.data.item.splice(bountyIndex(), 1);
    	Toast.fire("Success!", "All items added!", "success");

    console.log("All items added!");



    // Get all Mounts
    _.player.backpack.data.mount = itemify(_.gameData.mount, 1);
    console.log("Added all mounts.");


    // Get 990000 of all furniture
    const amt = 990000;
    	_.gameData.dorm.forEach(x =>
    		_.player.house.data.items[x.ID] = { A: [], N: amt.value }
    	);
    console.log("Added 990000 of all furniture.");


    // INVENTORY HACKS
    // ============================================
    // ============================================
    // PET HACKS


    // Get All Pets

        // add pets
    	_.gameData.pet.forEach(x => {
    		_.player.kennel.addPet(x.ID.toString(), VERY_LARGE_NUMBER, 26376, 100);
    	});

    	// add encounter info
    	_.player.kennel._encounterInfo._data.pets = [];
    	_.gameData.pet.map((pet: {ID: number}) => {
    		_.player.kennel._encounterInfo._data.pets.push({
    			firstSeenDate: Date.now(),
    			ID: pet.ID,
    			timesBattled: 1,
    			timesRescued: 1
    		});
    	});
    	// Fix broken pets
    	_.player.kennel.petTeam.forEach((v: any) => {
    		if (v && (v as any).assignRandomSpells) (v as any).assignRandomSpells();
    	});
    	console.log("Added all pets.");




    // PET HACKS
    // ============================================
    // ============================================
    // UTILITY HACKS




    // 20x walkspeed
    _.player._playerContainer.walkSpeed = 20;
    console.log("Player walkspeed set to 20.");


    // UTILITY HACKS
    // ============================================
    // ============================================
    // POST MAXING PROCESS


    // Save the player data to make sure that the max worked
    saveCharacter();
    console.log("Character Saved.");

    // Refresh the players appearance
    _.player.appearanceChanged = true;
    console.log("Appearance Refreshed.");


    // Close all popups
    _.instance.prodigy.open.menuCloseAll();
    console.log("Popups closed.");

    // Save again after closing popups, for good measure.
    saveCharacter();
    console.log("Character Saved.");


    // POST MAXING PROCESS
    // ============================================
    console.log("Max Account Successful.");

	Toast.fire("Maxed!", `Check your backpack!`, "success");
});







// DANGEROUS HACK made by gemsvidø
new Hack(category.beta, "Hypermax Account [BETA]").setClick(async () => {

    // ============================================
    // PRE MAXING PROCESS



     if (!(
    		await Confirm.fire("This hack may damage your account with various bugs, for example you may be unable to do Rune Run.", "We recommend you use an alt.")
    ).value) {
    console.log("Cancelled");
    return;
    }



    // FIRST, Escape any battle to prevent random glitching.
    const currentState = game.state.current;
    	if (currentState === "PVP") Object.fromEntries(_.instance.game.state.states).PVP.endPVP();
    	else if (currentState === "CoOp") prodigy.world.$(_.player.data.zone);
    	else if (!["Battle", "SecureBattle"].includes(currentState)) {
    	} else {
    		Object.fromEntries(_.instance.game.state.states)[currentState].runAwayCallback();
    	}
    console.log("Escaped any battle.");


    // NOW, fix the morph crash bug
    _.player.getPlayerData().playerTransformation = undefined;
    _.player.appearanceChanged = true;
    console.log("Fixed morph crash");


    // ALSO, fix the battle crash bug
    _.player.kennel.petTeam.forEach((v: any) => {
		if (v && (v as any).assignRandomSpells) (v as any).assignRandomSpells();
	});
	console.log("Fixed battle crash.")

    // PRE MAXING PROCESS
    // ============================================
    // ============================================
    // PLAYER HACKS

    // Set the players gold to 09900000
    _.player.data.gold = 9900000;
    console.log("Set player gold to 9900000.")


    // Set the players level to 100
    const level = 100;
    	const h = level.value - 2;
    	const xpConstant = 1.042;
    	_.player.data.stars = Math.round((1 - Math.pow(xpConstant, h)) / (1 - xpConstant) * 20 + 10);
    	_.player.data.level = 100;
    	_.player.getLevel = () => { return _.player.data.level; };
    console.log("Set player level to 100");


    // Set the players bounty points to 100 (max)
    _.player.data.bountyScore = 100;
    console.log("Set player's bounty points to 100.");


    // Set the players conjure cubes to 100 (max)
	for (let i = 0; i < Math.min(99, 100); i++) { prodigy.giftBoxController.receiveGiftBox(null, getItem("giftBox", 1)); }
    console.log("Obtained 100 conjure cubes.");


    // Set the player's wins to VERY_LARGE_NUMBER
    _.player.data.win = VERY_LARGE_NUMBER;
    console.log("Set player's wins to VERY_LARGE_NUMBER");


    // Set the player's losses to -9223372036854775808 (Java long limit, ik its irrelevant)
    _.player.data.loss = -9223372036854775808;
    console.log("Set player's losses to -9223372036854775808.");



    // Set the players damage multiplier to VERY_LARGE_NUMBER
    _.player.modifiers.damage = VERY_LARGE_NUMBER;
    console.log("Enabled damage multiplier.");


    // Set the players PVP health to VERY_LARGE_NUMBER
    _.player.pvpHP = VERY_LARGE_NUMBER;
    _.player.getMaxHearts = () => VERY_LARGE_NUMBER;
    console.log("PvP health obtained.")


    // Enable premium membership
    function getMemberModule () { return _.player.hasMembership.toString().split("\"")[1]; }
    _.instance.prodigy.gameContainer.get(getMemberModule()).data.membership.active = true;
    _.player.appearanceChanged = true;
    console.log("Premium membership enabled.");


    // Get all achievements
    for (var i = 0; i < 100; i ++) {
    	_.player.achievements.data.progress[i] = 10;
    }
    console.log("Obtained all achievements.");

    // Set the players dark tower floor to 100
    _.player.data.tower = 100;
    console.log("Set tower floor to 100.");

    // PLAYER HACKS
    // ============================================
    // ============================================
    // BATTLE HACKS



    // Disable Math
    _.constants.constants["GameConstants.Debug.EDUCATION_ENABLED"] = false;
    console.log("Math Disabled.");

    // Max out the players HP
    _.player.getMaxHearts = () => VERY_LARGE_NUMBER;
    _.player.pvpHP = VERY_LARGE_NUMBER;
    _.player.data.hp = VERY_LARGE_NUMBER;
    console.log("Maxed out PvE health.");


    // BATTLE HACKS
    // ============================================
    // ============================================
    // INVENTORY HACKS


    // load sum typings and stuff
    const names = ["Boots", "Buddies", "Fossils", "Hats", "Items", "Key Items", "Tower Town Frames", "Tower Town Interiors", "Mounts", "Outfits", "Relics", "Weapons", "Currencies"];
    const ids = ["boots", "follow", "fossil", "hat", "item", "key", "mathTownFrame", "mathTownInterior", "mount", "outfit", "spellRelic", "weapon", "currency"];
    const itemify = (item: Item[], amount: number) =>
    	item.map(x => ({
    		ID: x.ID,
    		N: amount
    	})).filter(v => v !== undefined);


    // Get 990000 of all items
    const num = 990000;

    	ids.forEach(id => {
    		_.player.backpack.data[id] = itemify(_.gameData[id].filter(l => id === "follow" ? ![125,126,127,128,129,134,135,136,137].includes(l.ID) : l), num.value);
    	});
    	_.gameData.dorm.forEach(x =>
    		_.player.house.data.items[x.ID] = { A: [], N: num.value }
    	);

    	// Remove bounty notes
    	const bountyIndex = () => _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86);
    	while (bountyIndex() > -1) _.player.backpack.data.item.splice(bountyIndex(), 1);
    	Toast.fire("Success!", "All items added!", "success");

    console.log("All items added!");



    // Get all Mounts
    _.player.backpack.data.mount = itemify(_.gameData.mount, 1);
    console.log("Added all mounts.");


    // Get 990000 of all furniture
    const amt = 990000;
    	_.gameData.dorm.forEach(x =>
    		_.player.house.data.items[x.ID] = { A: [], N: amt.value }
    	);
    console.log("Added 990000 of all furniture.");


    // INVENTORY HACKS
    // ============================================
    // ============================================
    // PET HACKS


    // Get All Pets

        // add pets
    	_.gameData.pet.forEach(x => {
    		_.player.kennel.addPet(x.ID.toString(), VERY_LARGE_NUMBER, 26376, 100);
    	});

    	// add encounter info
    	_.player.kennel._encounterInfo._data.pets = [];
    	_.gameData.pet.map((pet: {ID: number}) => {
    		_.player.kennel._encounterInfo._data.pets.push({
    			firstSeenDate: Date.now(),
    			ID: pet.ID,
    			timesBattled: 1,
    			timesRescued: 1
    		});
    	});
    	// Fix broken pets
    	_.player.kennel.petTeam.forEach((v: any) => {
    		if (v && (v as any).assignRandomSpells) (v as any).assignRandomSpells();
    	});
    	console.log("Added all pets.");




    // Get all Mythical Epics
    const mythepics = _.gameData.pet.filter(x => [158, 166, 168].includes(x.ID));
	mythepics.forEach(x => {
		_.player.kennel.addPet(x.ID.toString(), VERY_LARGE_NUMBER, 26376, 100);
	});
	// Fix broken pets
	_.player.kennel.petTeam.forEach((v: any) => {
		if (v && (v as any).assignRandomSpells) (v as any).assignRandomSpells();
	});
	console.log("Added Mythical Epics.");



    // Get all Legacy Epics
	const legepics = _.gameData.pet.filter(x => [125, 126, 127, 128, 129, 130, 131, 132, 133].includes(x.ID));
    	legepics.forEach(x => {
    		_.player.kennel.addPet(x.ID.toString(), VERY_LARGE_NUMBER, 26376, 100);
    	});
    	// Fix broken pets
    	_.player.kennel.petTeam.forEach((v: any) => {
    		if (v && (v as any).assignRandomSpells) (v as any).assignRandomSpells();
    	});
    console.log("Added Legacy Epics.");


    // PET HACKS
    // ============================================
    // ============================================
    // UTILITY HACKS


    // Disable Inactivity Kick
    _.constants.constants["GameConstants.Inactivity.LOG_OUT_TIMER_SECONDS"] = 0;
    console.log("Inactivity Kick Disabled.");

    // 20x walkspeed
    _.player._playerContainer.walkSpeed = 20;
    console.log("Player walkspeed set to 20.");


    // UTILITY HACKS
    // ============================================
    // ============================================
    // RUNES


    const amount = parseInt((await NumberInput.fire({
    		title: "Amount of Runes",
    		text: "How many of each rune would you like?",
    		icon: "question",
    		inputValidator: (res: any) => res ? "" : "Please select which you'd like to get."
    	})).value);
    	if (isNaN(amount)) return;
    	let mod;

    	Array.from(_.instance.prodigy.gameContainer._inversifyContainer._bindingDictionary._map).forEach(e => {
    		try {
    			if (_.instance.prodigy.gameContainer.get(e[0]).battleData) {
    				mod = e[0];
    			}
    		} catch {
    			console.log(`Error for ${e[0]}`);
    		}
    	});

    	const runeify = (item, amount) =>
    		item.map(x => ({
    			ID: x.ID,
    			quantity: amount
    		})).filter(v => v !== undefined);

    	_.instance.prodigy.gameContainer.get(mod).battleData._secureCharacterState._data.inventory.orb = runeify(_.gameData.orb, amount);









    // RUNES
    // ============================================
    // ============================================
    // POST MAXING PROCESS


    // Save the player data to make sure that the max worked
    saveCharacter();
    console.log("Character Saved.");

    // Refresh the players appearance
    _.player.appearanceChanged = true;
    console.log("Appearance Refreshed.");


    // Close all popups
    _.instance.prodigy.open.menuCloseAll();
    console.log("Popups closed.");

    // Save again after closing popups, for good measure.
    saveCharacter();
    console.log("Character Saved.");


    // POST MAXING PROCESS
    // ============================================
    console.log("Max Account Successful.");

	Toast.fire("Maxed!", `Check your backpack!`, "success");
});





new Hack(category.beta, "Get all runes [BETA]").setClick(async () => {
	if (!(await Confirm.fire({
		title: "Hang on!",
		html: "This feature is in <strong>beta</strong>. Using this could break your account in a specific way. This should be used for experimentation <strong>only</strong>.<br><br>Proceed?",
		icon: "warning"
	})).value) return;

	const amount = parseInt((await NumberInput.fire({
		title: "Amount",
		text: "How many of each would you like?",
		icon: "question",
		inputValidator: (res: any) => res ? "" : "Please select which you'd like to get."
	})).value);
	if (isNaN(amount)) return;
	let mod;

	Array.from(_.instance.prodigy.gameContainer._inversifyContainer._bindingDictionary._map).forEach(e => {
		try {
			if (_.instance.prodigy.gameContainer.get(e[0]).battleData) {
				mod = e[0];
			}
		} catch {
			console.log(`Error for ${e[0]}`);
		}
	});

	const runeify = (item, amount) =>
		item.map(x => ({
			ID: x.ID,
			quantity: amount
		})).filter(v => v !== undefined);

	_.instance.prodigy.gameContainer.get(mod).battleData._secureCharacterState._data.inventory.orb = runeify(_.gameData.orb, amount);
	Toast.fire("Runes Added!", "Your runes have been added!", "success");
});