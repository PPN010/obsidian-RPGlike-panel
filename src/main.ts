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
	
	
	

	async onload() {
		await this.loadSettings();
		new Notice('Timing Bar Opening...')
		if(this.existSettingTab==0){
			this.SettingTab = new ShowTimeSettingTab(this.app, this);
			this.existSettingTab++;
			this.addSettingTab(this.SettingTab);
		}




	}

	onunload() {

	}









	//Using setting values
	async loadSettings() {this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());}
	//Sava setting values
	async saveSettings() {await this.saveData(this.settings);}
}
