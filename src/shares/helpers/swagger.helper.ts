import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { modules } from 'src/app.module';

const documentInfo = {
  docUrl: '/docs',
  docTitle: 'Task Management API',
  docDescription: 'Task Management',
  docVersion: '1.0',
  swaggerFolder: `${process.cwd()}/output-specs`,
  swaggerFileName: 'task-management.json',
  siteTitle: 'Task Management API Docs',
};

export function setupSwagger(app: INestApplication, serverUrl?: string) {
  const {
    docUrl,
    docTitle,
    docDescription,
    docVersion,
    swaggerFolder,
    swaggerFileName,
    siteTitle,
  } = documentInfo;

  const tags = collectApiTags();

  const options = new DocumentBuilder()
    .setTitle(docTitle)
    .setDescription(docDescription)
    .addServer(serverUrl)
    .setVersion(docVersion)
    .addBearerAuth()
    .addBasicAuth();

  tags.forEach((tag) => {
    options.addTag(tag);
  });

  const optionsSwagger = options.build();
  const document = SwaggerModule.createDocument(app, optionsSwagger);

  try {
    if (!existsSync(swaggerFolder)) {
      mkdirSync(swaggerFolder);
    }
    writeFileSync(
      `${swaggerFolder}/${swaggerFileName}`,
      JSON.stringify(document, null, 2),
      {
        encoding: 'utf-8',
      },
    );
  } catch (e) {
    console.warn(`Could not save swagger docs into file`, e);
  }
  SwaggerModule.setup(docUrl, app, document, {
    customSiteTitle: siteTitle,
    swaggerOptions: {
      tagsSorter: 'alpha',
      displayOperationId: true,
      persistAuthorization: true,
    },
  });
}

export function collectApiTags() {
  let tags = [];
  for (const module of modules) {
    const controllers = Reflect.getMetadata('controllers', module);
    if (!controllers?.length) {
      continue;
    }
    for (const controller of controllers) {
      const apiTags = Reflect.getMetadata('swagger/apiUseTags', controller);
      if (apiTags?.length) {
        tags = tags.concat(apiTags);
      }
    }
  }
  tags.sort();

  return tags;
}
