import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

import { useTranslation } from "react-i18next";
import type { HostProcessorType } from "~/routes/section.host";
import Loading from "~/components/Loading";

type HostProcessorDetailProps = {
	data: HostProcessorType | undefined;
};

export default function HostProcessorDetail(props: HostProcessorDetailProps) {
	const { t } = useTranslation("host_system");
	const { data } = props;

	if (!data) {
		return <Loading />;
	}

	const rows = [
		{ name: t("Name"), value: data.Name },
		{ name: t("Description"), value: data.Description },
		{ name: t("AddressWidth"), value: data.AddressWidth },
		{ name: t("L2CacheSize"), value: data.L2CacheSize },
		{ name: t("L3CacheSize"), value: data.L3CacheSize },
		{ name: t("Manufacturer"), value: data.Manufacturer },
		{ name: t("ProcessorId"), value: data.ProcessorId },
	];

	return (
		<div className="w-full border rounded-lg p-2">
			<h3 className="text-lg font-bold">{t("Processor")}</h3>

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
