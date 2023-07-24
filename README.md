# Microservice\_Mercadolibre\_Products\_AWS

Microservicio para la gestión de productos, replicando y modificando parte de la arquitectura de desarrollo de ML implementada con Typescript, Amazon S3, Systems Manager Parameter Store, Api-Gateway, Serverless-Framework, Lambda, Sequelize, Mysql, Amazon RDS, entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

*   [Repositorio base de datos](https://github.com/andresWeitzel/Microdb_MercadoLibre_Productos_Mysql)
*   [Api Doc ML Productos](https://developers.mercadolibre.com.ar/es_ar/publica-productos)
*   [Playlist prueba de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurAs3C8syrdYMZfQ0nUokcjz)

<br>

## Índice 📜

<details>
 <summary> Ver </summary>

 <br>

### Sección 1) Descripción, configuración y tecnologías.

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
*   [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Ejemplos

*   [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
*   [2.1) Ejemplos.](#21-ejemplos-)

### Sección 3) Prueba de funcionalidad y Referencias

*   [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
*   [3.1) Referencias.](#31-referencias-)

<br>

</details>

<br>

## Sección 1) Descripción, configuración y tecnologías.

### 1.0) Descripción [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

### 1.0.0) Descripción General

### 1.0.1) Descripción Arquitectura y Funcionamiento

<br>

</details>

### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

*   Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS
```

*   Nos posicionamos sobre el proyecto

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado

```git
npm install -g serverless
```

*   Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Instalamos todos los paquetes necesarios

```git
npm i
```

*   Creamos un archivo para almacenar las variables ssm utilizadas en el proyecto (Más allá que sea un proyecto con fines no comerciales es una buena práctica utilizar variables de entorno).
    *   Click der sobre la raíz del proyecto
    *   New file
    *   Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
    *   Añadimos las ssm necesarias dentro del archivo.
    ```git
      # Keys
      X_API_KEY : 'f98d8cd98h73s204e3456998ecl9427j'
      BEARER_TOKEN : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

      # API VALUES
      API_HOST : 'localhost'
      API_PORT: '4000'
      API_STAGE: 'dev'
      API_VERSION : 'v1'
      API_ENDPOINT_PRODUCTS_NAME : 'products'
      API_ENDPOINT_PRODUCTS_SPECIFICATIONS_NAME : 'products-specifications'
      API_ENDPOINT_PRODUCTS_SPECIFICATIONS_S3_NAME : 'products-specifications-s3'

      # Database
      DATABASE_NAME : 'microdb_mercadolibre_productos'
      DATABASE_USER : 'root'
      DATABASE_PASSWORD : ''
      DATABASE_HOST : '127.0.0.1'
      DATABASE_DIALECT : 'mysql'
      DATABASE_POOL_MAX : 5
      DATABASE_POOL_MIN : 0
      DATABASE_POOL_ACQUIRE : 30000
      DATABASE_POOL_IDLE : 10000

      #Products Specification Bucket s3
      BUCKET_NAME: PRODUCTS_SPECIFICATIONS_BUCKET
      BUCKET_KEY: productsSpecificationsBucketS3.json
      # S3 Client
      # This specific key is required when working offline
      S3_CLIENT_ACCESS_KEY_ID: S3RVER
      S3_CLIENT_SECRET_ACCESS_KEY: S3RVER
      S3_CLIENT_ENDPOINT: http://localhost:4569
          
      # S3 Config
      S3_HOST: localhostdir
      S3_DIRECTORY: /AWS-S3/storage

      # AWS credencials
      REGION: us-east-1
      AWS_ACCESS_KEY_ID : 123
      AWS_SECRET_ACCESS_KEY: 123
    ```
*   El siguiente script configurado en el package.json del proyecto es el encargado de
    *   Levantar serverless-offline (serverless-offline)

```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```

*   Ejecutamos el proyecto desde terminal

```git
npm start
```

<br>

</details>
 <br>

### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

*   Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado

```git
npm install -g serverless
```

*   Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Inicializamos un template ts de serverles

```git
serverless create --template aws-nodejs-typescript
```

*   Comprobamos la versión de typescript

```git
tsc -v
```

*   Instalamos los paquetes necesarios

```git
npm i
```

*   Para este caso vamos a utilizar la manera tradicional de configuración para los archivos del proyecto. (serverless.yml, src/helpers, src/resources, src/controllers, src/services , etc). Por ende se modifican los archivos de la plantilla base.
*   Instalamos serverless offline

```git
npm i serverless-offline --save-dev
```

*   Instalamos serverless ssm

```git
npm i serverless-offline-ssm --save-dev
```

*   Instalamos S3 local

```git
npm install serverless-s3-local --save-dev
```

*   Instalamos el Cliente s3

```git
npm install @aws-sdk/client-s3
```

*   Agregamos los plugins de serverless al .yml

```git
plugins:
  - serverless-esbuild
  - serverless-s3-local
  - serverless-offline-ssm
  - serverless-offline

```

*   Instalamos sequelize

```git
npm install sequelize  --save
```

*   Instalamos los plugins necesarios para el [uso de sequelize con ts junto a nodejs](https://sequelize.org/docs/v6/other-topics/typescript/) según la doc oficial. [Doc de los siguientes plugins](https://www.npmjs.com/package/sequelize-typescript)

```git
npm install --save-dev @types/node @types/validator
npm install sequelize reflect-metadata sequelize-typescript
```

*   Luego agregamos la configuración en `tsconfig.json`, dentro de `compilerOptions`. Si existe un target eliminar uno.

```git
"target": "es6", // or a more recent ecmascript version
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

*   Instalamos `mysql2` para usar el sgdb mysql

```git
npm i mysql2 --save
```

*   Usando ts se ha presentado problemas al intentar importar un módulo de conexión de postgres por parte de nodejs, más allá que nunca se usa. Instalamos el módulo de forma manual

```git
npm i pg-hstore --save
```

*   El siguiente script configurado en el package.json del proyecto es el encargado de
    *   Levantar serverless-offline (serverless-offline)

```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```

*   Ejecutamos el proyecto desde terminal

```git
npm start
```

<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

| **Tecnologías** | **Versión** | **Finalidad** |\
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api |
| [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html) | 3.0 | Contenedor de Objetos |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [Typescript](https://www.typescriptlang.org/) | 3.8.3  | Lenguaje con alto tipado basado en JS |
| [Sequelize](https://sequelize.org/) | ^6.11.0 | ORM |
| [Mysql](https://www.mysql.com/) | 10.1 | SGDB |
| [XAMPP](https://www.apachefriends.org/es/index.html) | 3.2.2 | Paquete de servidores |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |

</br>

| **Plugin** |
| -------------  |
| [Serverless Plugin](https://www.serverless.com/plugins/) |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |
| [serverless-s3-local](https://www.serverless.com/plugins/serverless-s3-local) | complemento sin servidor para ejecutar clones de S3 en local

</br>

| **Extensión** |\
| -------------  |
| Prettier - Code formatter |
| YAML - Autoformatter .yml |
| Typescript Toolbox - generate setters, getters, constrc, etc |

<br>

</details>

<br>

## Sección 2) Endpoints y Ejemplos.

### 2.0) Endpoints y recursos [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

</details>

### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

<br>

</details>

<br>

## Sección 3) Prueba de funcionalidad y Referencias.

### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

<br>

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

#### Configuración

*   [Configuración de Typescript y Serverless](https://blog.logrocket.com/building-serverless-app-typescript/)

#### Ejemplos proyectos typescript/serverless

*   [Serverless Framework AWS TypeScript Example](https://github.com/serverless/examples/tree/v3/aws-node-typescript)
*   [Apollo Lambda GraphQL API Example](https://github.com/serverless/examples/tree/v3/aws-node-typescript-apollo-lambda)

## Ejemplos proyectos typescript/serverless/sequelize

*   [Proyecto sequelize](https://javascript.plainenglish.io/how-to-use-sequelize-v6-orm-lambda-with-typescript-2dfc56dee6a1)

#### Herramientas

*   [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)

#### Sequelize

*   [Modelos y Operadores](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

#### Api Gateway

*   [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
*   [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

#### Configuración buckets

*   [s3-example](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-configuring-buckets.html)
*   [s3-examples oficial](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-node-examples.html)

#### Librerías

*   [Validación de campos](https://www.npmjs.com/package/node-input-validator)
*   [Validación de propiedades de clases](https://www.npmjs.com/package/class-validator)
*   [Configuración de prettier con ESLint](https://khalilstemmler.com/blogs/tooling/prettier/)
*   [Comprobación y configuración de formato markdown](https://github.com/remarkjs/remark-lint#example-check-markdown-on-the-api)

<br>

</details>
