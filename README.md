# test_e-volution (Manager Tasks)

## Introducción 
Eeste repositorio contiene una aplicacion que te permite gestionar tus tareas, cuenta con un modulo de Login y Signin.
Esta aplicación fue desarrollada en Node.js y React.js(redux).

#### Pre-requisitos

##### Setear las siguientes variables a tu variables de ambiente
En el sistema operativo Debian 9 (Sistema operativo en el cual se desarrollo el contenido de este repositorio) debes seguir los siguientes pasos:
* agregar las siguientes variables al archivo bash_profile (con vsCode en una terminal: ```code ~.bash_profile```)
```
  export STAGE=dev
  export DB_CONNECTION_POOL=5
  export DB_HOST=mongodb://127.0.0.1:27017/task-manager
  export DB_NAME=task-manager

  export PORT=3000
  export SECURITY_SERVICE_PORT=3001
  export TASKS_SERVICE_PORT=3002
  export REACT_APP_SECURITY_SERVICE_PATH=http://localhost:3001/api/security/
  export REACT_APP_TASKS_SERVICE_PATH=http://localhost:3002/api/tasks/
```
* actualizar el archivo bash_profile (en terminal: ```source ~/.bash_profile```)

##### Crear Base de datos y Colecciones en MongoDB
* Nombre de la base de datos ```task-manager```
* Nombre de las coleciones ```Users - Tasks```

#### Instalación

* Clonar el repositorio
``` git clone https://github.com/juanD1/test_e-volution.git ```

* Instalar dependencias
``` sh init-app.sh  ```

* Iniciar
``` npm start  ```






