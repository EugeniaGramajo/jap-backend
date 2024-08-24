import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    this.startPing(); // Inicia el ping cuando se instancia el servicio
  }

  getHello(): string {
    console.log('sdadsds');
    return 'Hello World!';
  }

  keepAlive(): string {
    return 'Server is alive!';
  }

  private startPing() {
    setInterval(
      () => {
        fetch('https://jap-backend.onrender.com/alive')
          .then(() =>
            console.log('Ping realizado para mantener el servidor activo'),
          )
          .catch((error) =>
            console.error('Error al realizar el ping:', error.message),
          );
      },
      1 * 30 * 1000,
    ); // Cada 5 minutos
  }
}
