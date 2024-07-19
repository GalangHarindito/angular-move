import { Pipe, PipeTransform } from '@angular/core';
import { messageErrorCode } from '../errorsDetail';

@Pipe({
  name: 'errorMode',
  standalone: true,
})
export class ErrorMode implements PipeTransform {
  transform(value: any): any {
    return messageErrorCode(value);
  }
}
