import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import { useTranslation } from "react-i18next";
import type { HostOperatingSystemType } from "~/routes/section.host";
import Loading from "~/components/Loading";

type HostOperatingSystemDetailProps = {
	data: HostOperatingSystemType | undefined;
};

export default function HostOperatingSystemDetail(
	props: HostOperatingSystemDetailProps,
) {
	const { t } = useTranslation("host_system");
	const { data } = props;

	if (!data) {
		return <Loading />;
	}

	const rows = [
		{ name: t("Name"), value: data.Name },
		{ name: t("Caption"), value: data.Caption },
		{ name: t("LastBootUpTime"), value: data.LastBootUpTime },
		{ name: t("LocalDateTime"), value: data.LocalDateTime },
		{ name: t("SerialNumber"), value: data.SerialNumber },
	];

	return (
		<div className="w-full border rounded-lg p-2">
			<h3 className="text-lg font-bold">{t("OS")}</h3>

			<Table className="min-w-full table-fixed text-left">
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
							<TableCell className="p-2 break-words whitespace-normal">
								{row.name}
							</TableCell>
							<TableCell className="break-words whitespace-normal">
								{row.value}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
