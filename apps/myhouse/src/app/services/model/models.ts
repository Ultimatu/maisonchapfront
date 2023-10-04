export interface House {
  id: number;
  address: string;
  city: string;
  country: string;
  description: string;
  disponibility: string;
  numberOfBathrooms: string;
  numberOfFloors: string;
  numberOfRooms: string;
  photos: Photo[];
  price: string;
  statusHouse: StatusHouse;
  surface: string;
  title: string;
  typeHouse: {
    id: number;
    type: string;
    description: string;
    dateCreation: string;
    dateModification: string | null;
  };
  user: User;
}



export interface StatusHouse {
  id: number | null;
  status: string | null;
  description: string | null;
  dateCreation: string | null;
  updatedAt: string | null;
}


export interface TypeHouse {
  id: number;
  type: string;
  description: string;
  dateCreation: string;
  dateModification: string | null;
}


export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  lankey: string;
  photoPath: string;
  username: string;
  role: string;
  adresse: string;
  accountNonLocked: string;
}

export interface Photo {
  id: number | null;
  url: string | null;
  description: string | null;

}

