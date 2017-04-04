/**
 * Created by pc on 02/04/2017.
 */
export class Noticia{
  constructor(
    public $key:string,
    public avaliacao:number,
    public title :string,
    public description:string,
    public imagem :string,
    public autor: string,
    public  likes: number,
    public totalLikes: number,
    public totalDislikes: number,
    public visualizacoes: number) {

  }

  static fromJsonList(array): Noticia[]{
    return array.map(Noticia.fromJson);
  }

  static fromJson({$key, avaliacao, title, description, imagem, autor, likes, totalLikes, totalDislikes, visualizacoes}): Noticia{

    return new Noticia
    ($key, avaliacao, title, description, imagem, autor, likes, totalLikes, totalDislikes, visualizacoes);

  }
}

