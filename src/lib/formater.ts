export const formatDate = (date: Date | string | null): string => {
    if (!date) return '';

    // Jika input adalah string, cek apakah sudah sesuai format Y-m-d
    if (typeof date === 'string') {
        // Jika format sudah Y-m-d (contoh: "2023-12-31"), return langsung
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

        // Jika format tidak valid, lempar error atau return string kosong
        return ''; // atau throw new Error("Format tanggal tidak valid");
    }

    // Jika input adalah Date object
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month dimulai dari 0
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};