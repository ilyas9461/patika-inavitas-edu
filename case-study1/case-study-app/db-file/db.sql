--DROP DATABASE IF EXISTS "patika_nodejs_bootcamp";

CREATE DATABASE "patika_nodejs_bootcamp"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Turkish_Turkey.1254'
    LC_CTYPE = 'Turkish_Turkey.1254'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS vehicles;
CREATE TABLE IF NOT EXISTS vehicles
(
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_plate varchar(20)  NOT NULL,
    current_status int2 NOT NULL,	--2 byte, 16 bit -32768 and +32767
    is_active bool NOT NULL
);

DROP TABLE IF EXISTS devices;
CREATE TABLE IF NOT EXISTS devices
(
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id int8 NOT NULL,
    device_type_id int8  NOT NULL,
    device_name varchar(75) NOT NULL,
    is_online bool NOT NULL,
    is_active bool NOT NULL
);

DROP TABLE IF EXISTS devices_type;
CREATE TABLE IF NOT EXISTS  devices_type
(
    id SERIAL PRIMARY KEY NOT NULL,
    device_name varchar(75) NOT NULL,
    device_description varchar(255) NOT NULL,
    is_active bool NOT NULL
);

DROP TABLE IF EXISTS log_temperature;
CREATE TABLE IF NOT EXISTS  log_temperature
(
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id int8, 
    device_id  int8,
    read_data varchar(50),
    created_at timestamp
);

DROP TABLE IF EXISTS log_location;
CREATE TABLE IF NOT EXISTS  log_location
(
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id int8, 
    device_id  int8,
    latitude varchar(50),
    longtitude varchar(50),
    created_at timestamp
);

-- insert into devices_type (device_name, device_description, is_active) 
-- VALUES ('TEMPERATURE','SENSOR',false),('GPS','LOCATION',false)

-- insert into vehicles(vehicle_plate,is_active, current_status) 
-- VALUES ('26LYS465',true,1),('26LYS858',true,2)

--insert into devices (vehicle_id, device_type_id, device_name, is_online, is_active)
--values (2, 1, 'TEMPERATURE', false, false), (2, 2, 'GPS', false, false)

-- Select  devices.id, vehicles.vehicle_plate, devices.device_name, devices.is_online, devices.is_active from devices
-- inner join vehicles on devices.vehicle_id=vehicles.id ;

--ALTER DATABASE "case-study1" RENAME TO patika_nodejs_bootcamp; --disconnect olmalı
--CREATE USER patika WITH PASSWORD 'lizaliza';
--grant all privileges on database patika_nodejs_bootcamp to patika
--GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO patika;

