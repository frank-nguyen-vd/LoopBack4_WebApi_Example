import { AuthenticationComponent } from '@loopback/authentication';
import { AuthorizationComponent } from '@loopback/authorization';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import multer from 'multer';
import path from 'path';
import { FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY } from './keys';
import { LogMixin, LOG_LEVEL } from './logger';
import { CasbinAuthorizationComponent } from './rbac/casbin-authorization';
import {
  JWTAuthenticationComponent,
  SECURITY_SCHEME_SPEC
} from './rbac/jwt-authentication';
import { MySequence } from './sequence';

export { ApplicationConfig };

export class ApiServerApplication extends LogMixin(
  BootMixin(ServiceMixin(RepositoryMixin(RestApplication)))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    this.logLevel(LOG_LEVEL.DEBUG);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    // Bind authentication related elements
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    // Bind authorization related elements
    this.component(AuthorizationComponent);
    this.component(CasbinAuthorizationComponent);

    this.addSecuritySpec();
// Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'API Server',
        version: require('../package.json').version,
      },
      paths: {},
      components: { securitySchemes: SECURITY_SCHEME_SPEC },
      security: [
        {
          jwt: [],
        },
      ],
      servers: [{ url: '/' }],
    });
  }

  /**
   * Configure `multer` options for file upload
   */
   protected configureFileUpload(destination?: string) {
    // Upload files to `dist/.sandbox` by default
    destination = destination ?? path.join(__dirname, '../.sandbox');
    this.bind(STORAGE_DIRECTORY).to(destination);
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        // Use the original file name as is
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
  }
}
