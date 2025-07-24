export interface MenuItem {
    action: string;
    permission_name: string;
}


export interface Menu {
    id: number;
    name: string;
    slug: string;
    icon: string;
    permissions: MenuItem[];
    children: Menu[];

}


