import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // value = query object
        // example: { status: 'stable' }

        if (!value || Object.keys(value).length === 0) {
            return value;
        }

        // attach filter info to request
        return value;
    }

    // custom method (not required but useful)
    static applyFilter(data: any[], filterObj: any) {
        if (!filterObj || Object.keys(filterObj).length === 0) {
            return data;
        }

        return data.filter(item => {
            return Object.keys(filterObj).every(key => {
                return item[key] == filterObj[key];
            });
        });
    }
}