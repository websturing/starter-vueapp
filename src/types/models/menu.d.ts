export interface MenuItem {
    action: string;
    permission_name: string;
}


export interface Menu {
    id: number;
    name: string;
    slug: string;
    permissions: MenuItem[];
    children: Menu[];

}


