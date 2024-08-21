import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/DTOs/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto, ResponseLoginUserDto } from 'src/DTOs/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    const { name, lastName, email, password } = createUserDto;

    if (!name || !lastName || !email || !password) {
      throw new BadRequestException('Todos los campos son obligatorios.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new BadRequestException(
        'El formato del correo electrónico es inválido.',
      );
    }
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El correo ya está en uso.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.prisma.user.create({
        data: {
          name,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      return 'Usuario creado correctamente';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Hubo un problema al registrar el usuario.',
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseLoginUserDto> {
    const { email, password } = loginUserDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new UnauthorizedException(
          'El correo no está en la base de datos.',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('La contraseña no es valida');
      }

      return {
        name: user.name,
        lastName: user.lastName,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Hubo un problema al intentar iniciar sesión.',
      );
    }
  }
}
