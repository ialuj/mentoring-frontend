import { Model } from 'pinia-orm';
import Province from './Province';

export default class District extends Model {
  static entity = 'districts';
  static primaryKey = 'id';

  fields() {
    return {
      id: this.number(() => 0),
      uuid: this.attr(''),
      district: this.attr(''),
      province: this.belongTo(Province, 'id'),
    };
  }

  static piniaOptions = {
    persist: true,
  };
}