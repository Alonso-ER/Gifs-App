import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from './../interfaces/gifs.interfaces';

const giphyApiKey = 'VAPx9CVkPk3EIYppjk01DvVelXstlygD'
const giphyUrl = 'https://api.giphy.com/v1/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = []

  private apiKey: string = giphyApiKey;
  private serviceUrl: string = giphyUrl;

  constructor( private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10)
  }

  searchTag(tag: string): void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log({gifs: this.gifList })

      });

  }
}



//api.giphy.com/v1/gifs/search?api_key=VAPx9CVkPk3EIYppjk01DvVelXstlygD&q=chainsawman&limit=10
