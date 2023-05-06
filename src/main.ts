import { read, write, writeFile, writeFileSync } from 'fs';
import { App, Editor, FileSystemAdapter, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Plugin_2, Setting, View, WorkspaceLeaf } from 'obsidian';
import { moment } from 'obsidian';
import { ShowTimeSettingTab } from './settingTab';
import { ShowTimeSettings, DEFAULT_SETTINGS } from './values';


export default class ShowTime extends Plugin {
	//import setting values
	settings: ShowTimeSettings;
	existSettingTab = 0;
	SettingTab: ShowTimeSettingTab;

	//--- change values ---
	currentBar: HTMLElement;
	waitingBar: HTMLElement;
	cutdownBar: HTMLElement;
	
	

	async onload() {
		await this.loadSettings();
		new Notice('Timing Bar Opening...')
		//--- Add Status Bar ---
		this.waitingBar = this.addStatusBarItem();
		this.currentBar = this.addStatusBarItem();
		this.cutdownBar = this.addStatusBarItem();

		
		this.CloseCutdownToggle();

		this.waitingBar.toggle(this.settings.waitingStatusBarToggle);
		this.updatewaitingStatusBar();
		this.registerInterval(
			window.setInterval(() => this.updatewaitingStatusBar(), 250)
		);

		
		this.currentBar.toggle(this.settings.CurrentStatusBarToggle);
		this.updateStatusBar();
		this.registerInterval(
			window.setInterval(() => this.updateStatusBar(), 1000)
		);


		this.cutdownBar.toggle(this.settings.CutdownStatusBarToggle);
		this.cutdown();
		this.registerInterval(
			window.setInterval(()=> this.cutdown(),1000)
		)

		//--- Add Commands ---
		this.registerEvent(this.app.vault.on('create',()=>{
			this.addCommand({
				id: 'obsidian-showtime-Start-Cutdown',
				name: 'Start Cutdown',
				callback: () => {
					new Notice('The countdown has been reset.');
					console.log('Change StartTime and restart Cutdown');
					this.resetStartTime();
				}
			});
			this.addCommand({
				id: 'obsidian-showtime-Close-Cutdown',
				name: 'Close Cutdown',
				callback: () => {
					new Notice('The countdown has been Close.');
					console.log('Change StartTime and restart Cutdown');
					this.CloseCutdownToggle();
				}
			});
	
		}))
		//--- Add SettingTab ---
		if(this.existSettingTab==0){
			this.SettingTab = new ShowTimeSettingTab(this.app, this);
			this.existSettingTab++;
			this.addSettingTab(this.SettingTab);
		}
	}

	onunload() {

	}

	onChange: () => {
		// ...
	}


	//Using setting values
	async loadSettings() {this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());}

	//Sava setting values
	async saveSettings() {await this.saveData(this.settings);}

	updateStatusBar() {this.currentBar.setText(moment().format("H") + "-" + Math.floor(parseInt(moment().format("mm"))/15) +"q" );}

	updatewaitingStatusBar() {
		var ms = parseInt(moment().format("SSS"));

		if(ms<250){
			this.waitingBar.setText('-');
		}
		else if(ms>=250 && ms<500){
			this.waitingBar.setText("\\");
		}
		else if(ms>=500 && ms<750){
			this.waitingBar.setText("|");
		}
		else if(ms>=750){
			this.waitingBar.setText("/");
		}
	}

	cutdown(){
		var end =  moment(this.settings.StartTime,'YYYY:MM:DD:HH:mm:ss').add(parseInt(this.settings.Keep),'minutes').format('YYYY:MM:DD:HH:mm:ss');
		var diff = this.getTimeDiff(this.getTimestamp(),end);
		this.cutdownBar.setText(diff.toString()+'/'+parseInt(this.settings.Keep)*60 + 's' + ' ' +parseInt(this.settings.Keep)+ 'm Total');
	}




	getTimestamp():string{
		console.log('Current:' + moment().format('YYYY:MM:DD:HH:mm:ss'));
		return moment().format('YYYY:MM:DD:HH:mm:ss');
	}
	getTimeDiff(timestamp_Start:string,timestamp_End:string):number{
		console.log(timestamp_Start+"->"+timestamp_End);
		var s = moment(timestamp_Start,'YYYY:MM:DD:HH:mm:ss');
		var e = moment(timestamp_End,'YYYY:MM:DD:HH:mm:ss');
		var diff = e.diff(s,'seconds');
		if(diff==0){
			var logmessage = this.getTimestamp + ' Close ; ' + this.settings.Keep + 'm Total' + '\n';
			writeFileSync(this.settings.LogUrl,logmessage);
		}
		console.log('Timediff:'+diff);
		if(diff<=0){
			this.CloseCutdownToggle();
			return 0;
		}else{
			return diff;
		}
	}
	async resetStartTime(){
		this.settings.StartTime = this.getTimestamp();
		await this.saveSettings();
	}
	async CloseCutdownToggle(){
		this.settings.cutdownToggle = false;
		console.log('Close Cutdown Toggle' + this.settings.cutdownToggle );
		await this.saveSettings();
	}

}
