
interface ShowTimeSettings {
	//StatusBarToggle
	CurrentStatusBarToggle: boolean;
	waitingStatusBarToggle: boolean;
	CutdownStatusBarToggle: boolean;
	PositiveTimingStatusBarToggle: boolean;
	//Others
	cutdownToggle: boolean;
	LogUrl: string;
	StartTime: string;
	Keep: string;
}
const DEFAULT_SETTINGS: ShowTimeSettings = {
	//StatusBarToggle
	CurrentStatusBarToggle: false,
	waitingStatusBarToggle: true,
	CutdownStatusBarToggle: false,
	PositiveTimingStatusBarToggle: false,
	//Others
	cutdownToggle: false,
	LogUrl: "./Log",
	StartTime: "",
	Keep: "20",
}

export { DEFAULT_SETTINGS, type ShowTimeSettings };