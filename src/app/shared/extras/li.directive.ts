/**
 * Created by pc on 03/04/2017.
 */
import {Directive, HostBinding, HostListener} from "@angular/core";
@Directive({
  selector: '[appLi]'
})
export class LiDirective {
  @HostBinding('class.active') isActive = false;
  @HostListener('click') liActive(){
    this.isActive = !this.isActive;
  }
}
