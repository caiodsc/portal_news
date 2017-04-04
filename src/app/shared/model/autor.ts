/**
 * Created by pc on 03/04/2017.
 */
export class Autor{
  constructor(
    public $key:string,
    public nome:string) {

  }

  static fromJsonList(array): Autor[]{
    return array.map(Autor.fromJson);
  }

  static fromJson({$key, nome}): Autor{

    return new Autor
    ($key, nome);

  }
}
