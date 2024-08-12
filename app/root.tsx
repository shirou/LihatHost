import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import Loading from "./components/Loading";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<I18nextProvider i18n={i18n}>
			<Outlet />
		</I18nextProvider>
	);
}

export function HydrateFallback() {
	return (
		<div className="w-lvh flex justify-center">
			<Loading />
		</div>
	);
}
