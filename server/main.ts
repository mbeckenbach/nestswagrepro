import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\'', '\'unsafe-inline\''], // TODO: Check if unsafe inline is needed in prod build!
        styleSrc: ['\'self\'', '\'unsafe-inline\'', 'fonts.gstatic.com', 'fonts.googleapis.com'],
        imgSrc: ['\'self\'', 'data:'],
        connectSrc: ['\'self\''],
        fontSrc: ['\'self\'', 'fonts.gstatic.com', 'fonts.googleapis.com'], // TODO: Check if unsafe inline is needed in prod build!
        objectSrc: ['\'self\''],
        mediaSrc: ['\'self\''],
        frameSrc: ['\'self\''],
      },
    }
  }));

  // TODO: Make app secret an env setting
  app.use(cookieParser('app-secret')); // adds cookies to request object
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  await app.listen(process.env.PORT || 4000);
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  bootstrap().catch(err => console.error(err));
}

