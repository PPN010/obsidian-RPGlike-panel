import { App, PluginSettingTab, Setting } from "obsidian";
import ShowTime from "./main";

class ShowTimeSettingTab extends PluginSettingTab {
	plugin: ShowTime;

	constructor(app: App, plugin: ShowTime) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('p', {text: ''});
		

		
	}
}

export{ShowTimeSettingTab}