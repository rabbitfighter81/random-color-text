import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'randomColor'
})
export class RandomColorPipe implements PipeTransform {
  constructor(private _sanitizer?: DomSanitizer) {}
  transform(value: any): any {
    const v = value.split('');
    let html = '';
    v.map(letter => {
      const color = this.getRandomColor();
      html +=
      /*tslint:disable*/
        "<span style=\"color:" + color + "\">"
        + letter +
        "</span>";
      /*tslint:enable*/
    });
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  colToHex(c) {
    // Hack so colors are bright enough on a dark bg
    // Lower this number to get a full spectrum...
    const color = (c < 75) ? c + 75 : c;
    const hex = color.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  rgbToHex(r, g, b) {
    return '#' + this.colToHex(r) + this.colToHex(g) + this.colToHex(b);
  }

  getRandomColor() {
    return this.rgbToHex(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255));
  }

}
