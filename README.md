![Logo](public/cruzRoja.png)
# SistemaHospitalario
Este Sistema Hospitalario hace la gestion de citas, recetas y facturas entre pacientes y medicos, además de los usuarios Administradores administrar los Medicamentos, Seguros y Especialidades disponibles en el sistema

## Entidades Usadas:

__Usuario:__ Usado para todos los tipos de usuarios donde se guardan los datos comunes, tiene una relación polimórfica uno a uno con Paciente, Medico, Administrador. __Almacena__ los campos _nombre_, _contrasena_, _email_, _telefono_ y _tipo_ 

__Paciente:__ Tiene una relacion polimórfica con la entidad Usuario, relación muchos a uno con Cita, Receta y Factura, además de una relación muchos a muchos con Seguro. 

__Medico:__ Tiene una relación polimórfica con la entidad Usuario, relación muchos a uno con Cita y Receta. __Almacena__ los campos _horaEntrada_ y _horaSalida_

__Administrador:__ Tiene una relación polimórfica con la entidad Usuario. __Almacena__ el campo _departamento_

__Cita:__ Tiene una relación uno a muchos tanto con Paciente como por Medico. __Almacena__ el campo _fecha_ y _motivo_

__Receta:__ Tiene una relación uno a muchos con Medico y con Paciente, además de estar relacionado con Medicamento mediante la entidad Posología. No almacena campos extras mas que la llave primaria y las referencias.

__Posologia:__ Entidad que sirven para relacionar Receta con Medicamento, se usa para indicar como debe de administrarse un medicamento según el medico al un paciente. __Almacena__ los campos _cantidad_, _frecuencia_, _fechaLimite_

__Factura:__ Tiene una relación uno a muchos con Paciente. __Almacena__ los campos _costos_, _serviciosPrestados_, _estado_ 

__Seguro:__ Tiene una relación muchos a muchos con Paciente. __Almacena__ los campos, _nombre_ y _cobertura_

__Medicamento:__ Tiene una relación muchos a muchos mediante con Receta mediante la entidad Posología. __Almacena__ los campos _nombre_, _descripción_ y _efectosSecundarios_

## Instalación

Primero se tiene que clonar el proyecto en un directorio local mediante el comando:

```bash
git clone https://github.com/juanpedrosimonaro/SistemaHospitalario
```

Luego hay que instalar las dependencias del proyecto mediante:

```bash
npm install
```

Para poder conectarse con la base de datos se tiene crear una archivo .env en donde se va a guardar los _secretos_. Aquí hay un ejemplo de lo que se podría guardar gracias a [ElephantSQL](https://www.elephantsql.com)

```bash
DATABASENAME=wcqtvtda
DBUSERNAME=wcqtvtda
DBPASSWORD=k658rbHNd-1JF53HycESKGfaiLT420iE
DBHOST=chunee.db.elephantsql.com
BDIALECT=postgres
```

Finalmente inicializar el proyecto mediante <code>npm start</code> o <code>nodemon</code>
