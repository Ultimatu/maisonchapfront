export interface IUser {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  phone?: string | null;
  adresse?: string | null;
  password?: string | null;
  role?: string | null;
  langkey?: string | null;
  active?: boolean | null;
  photoPath?: string | null;


}

export class INewUser {
  nom?: string | null;
  prenom?: string | null;
  email?: string | null;
  phone?: string | null;
  adresse?: string | null;
  password?: string | null;
  role?: string | null;
  langkey?: string | null;
  active?: boolean | null;
  photoPath?: string | null;
}
export class User implements IUser {
  constructor(
    public id?: number,
    public nom?: string | null,
    public prenom?: string | null,
    public email?: string | null,
    public phone?: string | null,
    public adresse?: string | null,
    public password?: string | null,
    public role?: string | null,
    public langkey?: string | null,
    public active?: boolean | null,
    public photoPath?: string | null
  ) { }
}
