import { read, write, writeFile, writeFileSync } from 'fs';
import { App, Editor, FileSystemAdapter, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View, WorkspaceLeaf } from 'obsidian';
import { moment } from 'obsidian';

interface RPGlikePanel_Settings {

}
const DEFAULT_SETTINGS: RPGlikePanel_Settings = {

}

export default class ShowTime extends Plugin {
	//import setting values
	settings: RPGlikePanel_Settings;

	async onload() {
		await this.loadSettings();
		this.registerCodeMirror(cm => {
			cm.on('change', this.onChange);
		});



	}

	onunload() {
		this.app.workspace.iterateCodeMirrors(cm => {
			cm.off('change', this.onChange);
		});
	}

	onChange: () => {
		// ...
	}


	//Using setting values
	async loadSettings() {this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());}

	//Sava setting values
	async saveSettings() {await this.saveData(this.settings);}

}

class ShowTimeSettingTab extends PluginSettingTab {
	plugin: ShowTime;

	constructor(app: App, plugin: ShowTime) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();




	}
}
