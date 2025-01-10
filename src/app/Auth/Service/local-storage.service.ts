import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setVariable(key: string, value: any): void { 
    localStorage.setItem(key, JSON.stringify(value));
  }

  getVariable(key: string): any {
    return  localStorage.getItem(key);
  }

  removeVariable(key: string){
    localStorage.removeItem(key);
  }


}
