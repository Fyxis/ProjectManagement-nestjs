/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class DateService {
    formatter(data: string): string {
        return moment(data).format('YYYY-MM-DD HH:mm:ss')
    }
    
    getCurrentDateTime(): string {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    parseDateString(dateString: string): Date {
        return moment(dateString).toDate();
    }
}