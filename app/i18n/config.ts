import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import jaJP from "./ja-JP.json";

const resources = {
	"en-US": {
		common: {},
	},
	"ja-JP": jaJP,
};

i18n.use(initReactI18next).init({
	resources,
	debug: true,
	supportedLngs: ["en", "ja-JP"],
	fallbackLng: "en",
	defaultNS: "common",
	load: "currentOnly",
	interpolation: {
		escapeValue: false,
	},
	react: { useSuspense: false },
});

export default i18n;
