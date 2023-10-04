import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatCountdown'
})
export class FormatCountdownPipe implements PipeTransform {
    transform(value: number): string {
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        return `${minutes} min ${seconds} sec`;
    }
}
