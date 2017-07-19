import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class SpeechService {
  recognition: any;

  private _utterance: any;

  constructor(private zone: NgZone) { }
  record(lang: string): Observable<string> {
    return Observable.create(observe => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this.recognition = new webkitSpeechRecognition();

      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = take => this.zone.run(() =>
        observe.next(take.results.item(take.results.length - 1).item(0).transcript)
      );

      this.recognition.onend = () => observe.complete();
      this.recognition.lang = lang;
      this.recognition.start();
    });
  }

  stoprecord() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  startSynthesis(text: string): Observable<string> {
    return Observable.create(observe => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      this._utterance = new webkitSpeechRecognition();

      this._utterance.volume = 1;
      this._utterance.rate = 1;
      this._utterance.pitch = 1;

      this._utterance.onend = () => observe.complete();
      this._utterance.lang = 'en-US';
      this._utterance.onstart = take => this.zone.run(() => {
        observe.next(take.results.item(take.results.length - 1).item(0).transcript);
      });
    })
  }
}
