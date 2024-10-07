import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto, ResponseLoginUserDto } from 'src/users/dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<object> {
    const { name, lastName, password } = createUserDto;

    let { email } = createUserDto;
    if (!name || !lastName || !email || !password) {
      throw new BadRequestException('Todos los campos son obligatorios.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email = email.toLowerCase();
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

      return { message: 'Usuario creado correctamente' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Hubo un problema al registrar el usuario.',
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseLoginUserDto> {
    const { password } = loginUserDto;
    let { email } = loginUserDto;

    if (!email) {
      throw new BadRequestException('El correo electrónico es requerido.');
    }
    email = email.toLowerCase();
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException(
          'El correo no está en la base de datos.',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('La contraseña no es válida.');
      }

      return {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Hubo un problema al intentar iniciar sesión.',
      );
    }
  }

  async updateProfile(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<string> {
    try {
      await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: { ...updateUserDto },
      });
      return 'Datos actualizados correctamente!.';
    } catch (error) {
      throw new InternalServerErrorException(
        'Hubo un error al actualizar los datos.',
      );
    }
  }
}
