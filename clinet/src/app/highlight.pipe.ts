import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(list: any, searchText: string): unknown {
    if (!list) {
      return [];
    }
//to remove highlighted tags before any processing
    list = list.map(item => {
      item.value.product.name = item.value.product.name ? String(item.value.product.name).replace(/<[^>]+>/gm, '') : '';
      return item;
    });
    if (!searchText) {
      return list;
    }

    const re = new RegExp(searchText, 'gi');
    const value = list
      .map(item => {
        item.value.product.name = item.value.product.name.replace(re, '<span class=\'yellow\'>' + searchText + '</span>');
        return item;
      });
    return value;
  }

}
