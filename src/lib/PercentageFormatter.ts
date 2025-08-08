export class PercentageFormatter {
    /**
     * Mengembalikan warna berdasarkan nilai persentase
     * - Hijau: >= 90
     * - Kuning: 70 - 89
     * - Merah: < 70
     */
    static getColor(percentage: number): 'text-success' | 'text-warning' | 'text-danger' {
        if (percentage >= 90) {
            return 'text-success';
        } else if (percentage >= 70) {
            return 'text-warning';
        } else {
            return 'text-danger';
        }
    }

    /**
     * Mengembalikan label teks untuk kategori
     * - Excellent, Warning, Poor
     */
    static getLabel(percentage: number): string {
        if (percentage >= 90) {
            return 'Excellent';
        } else if (percentage >= 70) {
            return 'Warning';
        } else {
            return 'Poor';
        }
    }

    /**
     * Mengembalikan nilai terformat sebagai string dengan simbol %
     * - Contoh: 85 → "85%"
     */
    static getFormat(percentage: number): string {
        return `${percentage}%`;
    }
}
