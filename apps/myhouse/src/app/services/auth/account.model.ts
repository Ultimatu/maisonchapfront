export class Account {
  constructor(
    public active: boolean,
    public role: string | null,
    public email: string,
    public nom: string | null,
    public langKey: string,
    public phone: string | null,
    public adresse: string | null,
    public prenom: string | null,
    public photoPath: string | null,
    public username: string | null,
    public enabled: boolean,
    public accountNonExpired: boolean,
    public credentialsNonExpired: boolean,
    public accountNonLocked: boolean,
    public id: number | null,
    public authorities: Authority[]
  ) {}
}


export interface Authority {
  authority: string;
}
