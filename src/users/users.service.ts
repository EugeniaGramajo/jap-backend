import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/DTOs/register.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto, ResponseLoginUserDto } from 'src/DTOs/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    const { name, lastName, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return 'Usuario creado correctamente';
  }

  async login(loginUserDto: LoginUserDto): Promise<ResponseLoginUserDto> {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('El correo no está en la base de datos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña no es valida');
    }

    return {
      name: user.name,
      lastName: user.lastName,
    };
  }
}
