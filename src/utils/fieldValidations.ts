export const isAdult = (date: Date) => {
    const now = new Date();
    const min = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
    return date <= min;
};