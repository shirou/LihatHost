import { useTranslation } from "react-i18next";

export default function Loading() {
	const { t } = useTranslation("network_interface");

	return <div className="w-lvh flex justify-center">{t("Loading...")}</div>;
}
