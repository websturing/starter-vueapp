// src/utils/dateUtils.ts
interface DateRange {
    start: string;
    end: string;
}

export const getDateRange = (range: string): DateRange => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay(); // 0 (Minggu) sampai 6 (Sabtu)

    // Format tanggal ke YYYY-MM-DD
    const formatDate = (d: Date) => {
        const y = d.getFullYear();
        const m = (d.getMonth() + 1).toString().padStart(2, '0');
        const dd = d.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${dd}`;
    };

    switch (range) {
        case 'today':
            return {
                start: formatDate(now),
                end: formatDate(now)
            };

        case 'this_week':
            // Hitung awal minggu (Senin)
            const weekStart = new Date(year, month, date - day + (day === 0 ? -6 : 1));
            // Hitung akhir minggu (Minggu)
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return {
                start: formatDate(weekStart),
                end: formatDate(weekEnd)
            };

        case 'this_month':
            // Awal bulan
            const monthStart = new Date(year, month, 1);
            // Akhir bulan
            const monthEnd = new Date(year, month + 1, 0);
            return {
                start: formatDate(monthStart),
                end: formatDate(monthEnd)
            };

        case 'this_year':
            // Awal tahun
            const yearStart = new Date(year, 0, 1);
            // Akhir tahun
            const yearEnd = new Date(year, 11, 31);
            return {
                start: formatDate(yearStart),
                end: formatDate(yearEnd)
            };

        default:
            return { start: '', end: '' };
    }
};