import { conexion } from './bd.ts';
import validate = WebAssembly.validate;



let op
do {
    console.log("Menu");
    console.log("1. Crear un usuario");
    console.log("2. Actualizar un usuario");
    console.log("3. Listar usuarios");
    console.log("4. Eliminar usuario");
    console.log("5. Salir");
    op = parseInt(prompt("Seleccione una opción") as string);


    switch (op) {
        case 1: {
            function validar_email(email: any) {
                var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return regex.test(email) ? true : false;
            }

            console.log("Registro de usuarios");
            let name = prompt("Ingrese su nombre") as string;
            let lastname = prompt("Ingrese su apellido") as string;
            let phone = prompt("Ingrese su celular") as string;
            let email = prompt("Ingrese su correo") as string;
            let password = prompt("Ingrese una contraseña") as string;

            if (name.length > 3 && lastname.length > 3 && phone.length == 10 && validar_email(email) && password.length >= 8) {
                console.log("Datos almacenados")
                let user = await conexion.execute(`INSERT INTO register (name,lastname,phone,email,password) values (?,?,?,?,?)`, [
                    name,
                    lastname,
                    phone,
                    email,
                    password,
                ]);

                console.log(user);
            } else {
                console.log("Por favor ingresar informacion valida")
            }
            break;
        }
        case 2: {


            let users = await conexion.query(`select * from register`);
            console.log(users);
            let id = prompt("Seleccione el ID que desea actualizar") as string;
            let name = prompt("Ingrese su nombre") as string;
            let lastname = prompt("Ingrese su apellido") as string;
            let phone = prompt("Ingrese su celular") as string;
            let email = prompt("Ingrese su correo") as string;
            let password = prompt("Ingrese una contraseña") as string;
            let result = await conexion.execute(`update register set name = ?,lastname = ?,phone = ?,email = ?,password = ? WHERE id = ?`, [
                name,
                lastname,
                phone,
                email,
                password,
                id,
            ]);
            console.log(result);
            break;
        }
        case 3: {

            let users = await conexion.query(`select * from register`);
            console.log(users);
            break;
        }
        case 4: {

            let users = await conexion.query(`select * from register`);
            console.log(users);
            let id = prompt("Seleccione el ID que desea eliminar") as string;
            let select = await conexion.execute(`delete from register where id = ?`, [id])
            console.log("Registro eliminado: ", select)
            break;
        }
        case 5: {
            break;
        }
    }
}while(op != 5);