import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Translation, TRANSLATION } from '../../i18n/i18n.utils';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {

  /**
   * Control
   */
  @Input() control: AbstractControl;

  /**
   * Constructor
   * @param translations Translation
   */
  constructor(@Inject(TRANSLATION) public readonly translations: Translation) { }

}
