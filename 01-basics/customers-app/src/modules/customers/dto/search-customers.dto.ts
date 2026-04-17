export class SearchCustomersDto {
    type?: 'PREMIUM' | 'NORMAL' | 'VIP';
    age?: number;
    city?: string;
}