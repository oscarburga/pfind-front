export class Usuario {
    id: number;
    username: string;
    email: string;
    password: string;
    modalidad: string;
    enabled: Boolean;
    idEntity: number;
    roles: string[] = [];
}
