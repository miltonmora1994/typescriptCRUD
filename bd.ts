import {Client} from 'https://deno.land/x/mysql/mod.ts';

const client = await new Client().connect({
    hostname: '192.168.100.20',
    username: 'root',
    db: 'usuarios',
    password: '12345678',
    port: 3306,
});

export const conexion = client;