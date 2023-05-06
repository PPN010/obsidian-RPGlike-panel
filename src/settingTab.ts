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
		
		containerEl.createEl('h2', {text: 'Basic-ShowTime Toggle'});
		new Setting(containerEl)
			.setName('WaitingBar')
			.setDesc('When open, there will be a line run in circle at the statubar.')
			.addToggle( toggle => toggle 
				.setValue(this.plugin.settings.waitingStatusBarToggle)
				.onChange(async (toggle) => {
					console.log('TELL:' + toggle);
					this.plugin.settings.waitingStatusBarToggle = toggle;
					await this.plugin.saveSettings();
				})
			)
		;
		new Setting(containerEl)
			.setName('TimeBar')
			.setDesc('When open, there will be a TimeClockd at the statubar.')
			.addToggle( toggle => toggle 
				.setValue(this.plugin.settings.CurrentStatusBarToggle)
				.onChange(async (toggle) => {
					console.log('TELL:' + toggle);
					this.plugin.settings.CurrentStatusBarToggle = toggle;
					await this.plugin.saveSettings();

				})
			)
		;


		containerEl.createEl('h2', {text: 'Cutdown Settings'});
		containerEl.createEl('li', {text: "Use 'command:Start Cutdown' to start cutdown"});
		containerEl.createEl('li', {text: "Use 'command:Close Cutdown' to close cutdown"});
		new Setting(containerEl)
		.setName('CutdownBar')
		.setDesc('When open, there will be a Cutdown Timer at the statubar.')
		.addToggle( toggle => toggle 
			.setValue(this.plugin.settings.CutdownStatusBarToggle)
			.onChange(async (toggle) => {
				console.log('TELL:' + toggle);
				this.plugin.settings.CutdownStatusBarToggle = toggle;
				await this.plugin.saveSettings();

			})
		)
		;	
		new Setting(containerEl)
			.setName('Duration')
			.setDesc('The length of cutdown')
			.addTextArea(textline => textline
				.setPlaceholder('The length of cutdown')
				.setValue(this.plugin.settings.Keep)
				.onChange(async (text) =>{
					console.log('Lines: '+this.plugin.settings.Keep);
					this.plugin.settings.Keep = text;
				})
			)
		;




		containerEl.createEl('h2', {text: 'Positive Timing Settings'});
		containerEl.createEl('li', {text: "Use 'command:Start Positive' to start Positive Timing"});
		containerEl.createEl('li', {text: "Use 'command:Close Positive' to close Positive Timing"});
		new Setting(containerEl)
		.setName('Positive Timing Bar')
		.setDesc('When open, there will be a Cutdown Timer at the statubar.')
		.addToggle( toggle => toggle 
			.setValue(this.plugin.settings.PositiveTimingStatusBarToggle)
			.onChange(async (toggle) => {
				console.log('TELL:' + toggle);
				this.plugin.settings.PositiveTimingStatusBarToggle = toggle;
				await this.plugin.saveSettings();

			})
		)
		;	

		containerEl.createEl('h2', {text: 'Log'});
		new Setting(containerEl)
		.setName('Log Url')
		.setDesc('Where to log when timing complete')
		.addTextArea(textline => textline
			.setPlaceholder('The length of cutdown')
			.setValue(this.plugin.settings.LogUrl)
			.onChange(async (text) =>{
				console.log('Lines: '+this.plugin.settings.LogUrl);
				this.plugin.settings.LogUrl = text;
			})
		)


		containerEl.createEl('hr');
		containerEl.createEl('h4', {text: 'From N010, here is my github'});
		containerEl.createEl('a', {text: 'https://github.com/PPN010'});
		// var vaultline = '';
		// this.plugin.settings.vaults.forEach(element => {
		// 	vaultline += element + ','
		// });
		// new Setting(containerEl)
		// 	.setName('Vault-Lines')
		// 	.setDesc('鎼存挸鍨悰锟�')
		// 	.addTextArea(textline => textline
		// 		.setPlaceholder('鏉堟挸鍙嗘惔鎾虫倳閿涘奔濞囬悽銊ュ磹鐟欐帡鈧褰块梻鎾')
		// 		.setValue(vaultline)
		// 		.onChange(async (text) =>{
		// 			console.log('Lines: '+vaultline);
		// 			this.plugin.settings.vaults = text.split(',');
		// 		})
		// 	)
		// ;

		// containerEl.createEl('h1', {text: '閸忔湹绮�'});

	}
}

export{ShowTimeSettingTab}