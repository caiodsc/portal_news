/**
 * Created by pc on 01/04/2017.
 */
export class AuthInfo {

  constructor(
    public $uid:string
  ) {

  }
  isLoggedIn() {
    return !!this.$uid;
  }
}
