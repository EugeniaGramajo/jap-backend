import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsISO8601,
} from 'class-validator';

export class CreateProductsCommentDto {
  @IsInt({ message: 'El puntaje debe ser un número entero.' })
  @Min(1, { message: 'El puntaje no puede ser menor a 1.' })
  @Max(5, { message: 'El puntaje no puede ser mayor a 5.' })
  score: number;

  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @IsString({ message: 'La descripción debe ser un texto.' })
  @Length(1, 500, {
    message: 'La descripción debe tener entre 1 y 500 caracteres.',
  })
  @Matches(/\S/, {
    message: 'La descripción no puede ser solo espacios en blanco.',
  })
  description: string;

  @IsNotEmpty({ message: 'El ID del usuario es obligatorio.' })
  userId: string;

  @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
  productId: number;

  @IsISO8601({}, { message: 'La fecha y hora debe estar en formato ISO 8601.' })
  @IsNotEmpty({ message: 'La fecha y hora es obligatoria.' })
  dateTime: string;
}
