import UserAnimationsShim from './view/UserAnimations'
import WorldAnimationsShim from './view/WorldAnimations'
import type { JSONData } from './storage/AnimCore'
import { TJSGameSettings, TJSLiveGameSettings } from '#runtime/svelte/store/fvtt/settings'

export const liveSettings = new TJSGameSettings('pf2e-graphics')
export let settings: TJSLiveGameSettings & {
	windowPosition: 'sidebar' | 'onTop'
	quality: 0 | 1 | 2 | 3
	buttonPosition: 0 | 1
	dev: boolean
	worldAnimations: JSONData
}

const settingsData = [
	{
		namespace: 'pf2e-graphics',
		key: 'worldAnimations',
		folder: 'PF2e Graphics',
		options: {
			name: 'pf2e-graphics.settings.worldAnimations.name',
			hint: 'pf2e-graphics.settings.worldAnimations.hint',
			scope: 'world',
			config: false,
			type: Object,
			default: {},
		},
	},
	{
		namespace: 'pf2e-graphics',
		key: 'windowPosition',
		folder: 'PF2e Graphics',
		options: {
			name: 'pf2e-graphics.settings.windowPosition.name',
			hint: 'pf2e-graphics.settings.windowPosition.hint',
			scope: 'client',
			config: true,
			type: String,
			default: 'sidebar',
			choices: {
				sidebar: 'pf2e-graphics.settings.windowPosition.sidebar',
				onTop: 'pf2e-graphics.settings.windowPosition.onTop',
			},
		},
	},
	{
		namespace: 'pf2e-graphics',
		key: 'quality',
		folder: 'PF2e Graphics',
		options: {
			name: 'pf2e-graphics.settings.quality.name',
			hint: 'pf2e-graphics.settings.quality.hint',
			scope: 'client',
			config: true,
			type: Number,
			default: 1,
			choices: {
				0: 'pf2e-graphics.settings.quality.0',
				1: 'pf2e-graphics.settings.quality.1',
				2: 'pf2e-graphics.settings.quality.2',
				3: 'pf2e-graphics.settings.quality.3',
			},
		},
	},
	{
		namespace: 'pf2e-graphics',
		key: 'buttonPosition',
		folder: 'PF2e Graphics',
		options: {
			name: 'pf2e-graphics.settings.buttonPosition.name',
			hint: 'pf2e-graphics.settings.buttonPosition.hint',
			scope: 'client',
			config: true,
			type: Number,
			default: 0,
			choices: {
				0: 'pf2e-graphics.settings.buttonPosition.0',
				1: 'pf2e-graphics.settings.buttonPosition.1',
			},
		},
	},
	{
		namespace: 'pf2e-graphics',
		key: 'dev',
		folder: 'PF2e Graphics',
		options: {
			name: 'pf2e-graphics.settings.dev.name',
			hint: 'pf2e-graphics.settings.dev.hint',
			scope: 'client',
			config: true,
			type: Boolean,
			default: false,
		},
	},
] as const

Hooks.on('init', () => {
	liveSettings.registerAll(settingsData, true)

	settings = new TJSLiveGameSettings(liveSettings) as typeof settings

	window.pf2eGraphics.settings = settings

	game.settings.registerMenu('pf2e-graphics', 'userAnimations', {
		name: 'pf2e-graphics.settings.userMenu.name',
		hint: 'pf2e-graphics.settings.userMenu.hint',
		label: 'pf2e-graphics.settings.userMenu.label',
		icon: 'fas fa-user',
		type: UserAnimationsShim,
		restricted: false,
	})

	game.settings.registerMenu('pf2e-graphics', 'worldAnimationsMenu', {
		name: 'pf2e-graphics.settings.worldMenu.name',
		hint: 'pf2e-graphics.settings.worldMenu.hint',
		label: 'pf2e-graphics.settings.worldMenu.label',
		icon: 'fas fa-user',
		type: WorldAnimationsShim,
		restricted: false,
	})
})
