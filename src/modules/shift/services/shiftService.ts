export class ShiftFormatter {
    // Optional: custom map kalau kamu mau override nama tertentu
    private static readonly displayMap: Record<string, string> = {
        // shiftSiang: 'Siang Shift', // contoh override manual
    };

    static getDisplayText(key: string): string {
        // Cek apakah ada override di map
        if (this.displayMap[key]) {
            return this.displayMap[key];
        }

        // Default: convert camelCase ke Title Case
        return key
            .replace(/([A-Z])/g, ' $1')  // tambahkan spasi sebelum huruf besar
            .replace(/^./, str => str.toUpperCase()); // kapitalisasi huruf pertama
    }
}