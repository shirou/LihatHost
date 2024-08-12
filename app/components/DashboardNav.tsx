import { Link } from "@remix-run/react";
import { Siren } from "lucide-react";
import { cn } from "~/lib/utils";

export interface NavItem {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	//    icon?: keyof typeof Icons;
	label?: string;
	group?: boolean;
}

interface DashboardNavProps {
	items: NavItem[];
	path: string;
}

export default function DashboardNav({ items, path }: DashboardNavProps) {
	return (
		<div className="flex h-full max-h-screen flex-col gap-2">
			<div className="flex h-12 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<Link to="/" className="flex items-center gap-2 font-semibold">
					<Siren className="h-6 w-6" />
					<span className="">Lihat Host</span>
				</Link>
			</div>
			<div className="flex-1">
				<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
					{items.map((item) => {
						if (item.group) {
							return (
								<h2
									key={item.title}
									className="px-1 py-4 text-xl font-semibold tracking-tight"
								>
									{item.title}
								</h2>
							);
						}
						return (
							<Link
								to={item.href || "#"}
								key={item.title}
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
									path === item.href ? "text-primary" : "text-muted-foreground",
									item.disabled && "text-muted-foreground",
									item.external && "text-primary",
								)}
							>
								{item.title}
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
