v### .env 

DATABASE_URL="postgresql://santiago:5EDx-kkb-B6ngBGgVP-fmw@sasa-mile-7238.g8z.gcp-us-east1.cockroachlabs.cloud:26257/institucion?sslmode=verify-full"

## Api
>http://localhost:3000/api/meta

para las estadisticas del dashboard sale la cantidad de municipios, instituciones y sedes

> GET http://localhost:3000/api/meta/municipalities
> PATCH ,DELETE :http://localhost:3000/api/meta/municipalities/[id]
 Obtener la cantidad de colegios y sedes en cada municipio del departamento 50

#### POST 
{
    "codeMunicipalities": "000000000",
    "name": "Prueba"
}

>http://localhost:3000/api/meta/institutions
Obtener todos los colegios del departamento del Meta

#### POST  
{
  "codeDane": "123456789",
  "name": "Colegio Meta Futuro",
  "address": "Calle 123 #45-67",
  "zona": "Urbano",
  "phone": "3101234567",
  "Guy": "Público",
  "calendar": "A",
  "state": "Activo",
  "rector": "Juan Pérez",
  "municipalitiesId": "6dc49286-cc7f-4b1c-927e-a6e57a23f5ab"
}

>http://localhost:3000/api/meta/institutions/[id]

### PATCH,GET,DELETE
CodeDane

> http://localhost:3000/api/meta/headquarters
> PUT , DELETE   http://localhost:3000/api/meta/headquarters/[id]
 
 Obtener todas las sedes de colegios en el departamento del Meta
