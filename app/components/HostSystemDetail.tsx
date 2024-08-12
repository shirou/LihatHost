import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import { useTranslation } from "react-i18next";
import type { HostSystemType } from "~/routes/section.host";
import Loading from "~/components/Loading";

type HostSystemDetailProps = {
	data: HostSystemType | undefined;
};

export default function HostSystemDetail(props: HostSystemDetailProps) {
	const { t } = useTranslation("host_system");
	const { data } = props;

	if (!data) {
		return <Loading />;
	}

	const rows = [
		{ name: t("Name"), value: data.Name },
		{ name: t("Description"), value: data.Description },
		{ name: t("Status"), value: data.Status },
		{ name: t("Manufacturer"), value: data.Manufacturer },
		{ name: t("Model"), value: data.Model },
		{ name: t("SystemFamily"), value: data.SystemFamily },
		{ name: t("UserName"), value: data.UserName },
		{ name: t("Workgroup"), value: data.Workgroup },
		{ name: t("Domain"), value: data.Domain },
		{ name: t("SystemType"), value: data.SystemType },
		{ name: t("BootupState"), value: data.BootupState },
	];

	return (
		<div className="w-full border rounded-lg p-2">
			<h3 className="text-lg font-bold">{t("System")}</h3>
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
