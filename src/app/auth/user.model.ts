export class User{//this is used in auth service, authservice is used in auth component
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}

  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      console.log('Token expired broo!');
      return null;
    }
    return this._token;
  }
}