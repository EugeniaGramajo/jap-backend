import { IsNotEmpty, IsString, Matches } from 'class-validator';
export class UpdateUserDto {
  @IsString({ message: 'El correo debe ser una cadena.' })
  @IsNotEmpty({ message: 'El campo de correo no puede estar vacío.' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'El formato del correo no es válido.',
  })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena.' })
  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío.' })
  password: string;

  @IsString({ message: 'El nombre debe ser una cadena.' })
  @IsNotEmpty({ message: 'El campo del nombre no puede estar vacío.' })
  name: string;

  @IsString({ message: 'El apellido debe ser una cadena.' })
  @IsNotEmpty({ message: 'El campo del apellido no puede estar vacío.' })
  lastName: string;

  @IsString({ message: 'La dirección debe ser una cadena.' })
  address: string;

  @IsString({ message: 'El telefono debe ser una cadena.' })
  phone: string;

  @IsString({ message: 'La imagen debe ser una cadena.' })
  image: string;
}
