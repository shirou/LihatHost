import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";

export async function clientLoader() {
	return redirect("/section/");
}

export const links: LinksFunction = () => [];
export const meta: MetaFunction = () => {
	return [
		{ title: "Lihat Host" },
		{ name: "description", content: "Know your host" },
	];
};
export default function Index() {
	return <Outlet />;
}
