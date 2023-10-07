--
-- DATA INSERTION FOR TESTS
--

INSERT INTO users (id, email, password) values
    ('14b953e8-30f9-47fc-943b-85d54cbcd54c', 'test@example.net', '$2a$10$MPxChzrFB1IN4KADLezz.O1Z/5gY3.iBAbMB9/ZeimHTYHFfW.yia');

INSERT INTO stacks (id, name, description, user_id) values
    ('2935b117-880c-4f73-be89-de8fba6b196e', 'DockerEasy', 'stack of docker easy', '14b953e8-30f9-47fc-943b-85d54cbcd54c');

INSERT INTO services (id, name, docker_image, docker_tag, entrypoint, description, position_x, position_y, context, dockerfile, stack_id, container_name, env_file) values
    ('1a29bb76-7c29-4992-9407-8ca77507a616', 'api', 'ghcr.io/romaindreidemy/mt5-easydocker/api', 'latest', '', '', 10.00000000,	10.00000000, '', '', '2935b117-880c-4f73-be89-de8fba6b196e', 'api', ''),
    ('1cffb358-d9dd-40f4-88d5-dd1bc66565b3', 'database', 'postgres', '15', '', '', 260.00000000, 10.00000000, '', '',	'2935b117-880c-4f73-be89-de8fba6b196e',	'database', ''),
    ('457f0d0b-0d3b-4fee-9e65-fd5dcf9ea833', 'front', 'ghcr.io/romaindreidemy/mt5-easydocker/front', 'latest', '', '', 510.00000000, 10.00000000, '', '', '2935b117-880c-4f73-be89-de8fba6b196e', 'front', '');

INSERT INTO service_env_variables (id, key, value, service_id) values
    ('fa3d8104-312d-4e25-bbe3-cc72201fba40', 'POSTGRES_USER', '${POSTGRES_USER}', '1cffb358-d9dd-40f4-88d5-dd1bc66565b3'),
    ('620f8876-9b69-4004-9dee-719f4b687267', 'POSTGRES_PASSWORD', '${POSTGRES_PASSWORD}', '1cffb358-d9dd-40f4-88d5-dd1bc66565b3'),
    ('f2fefa07-ce78-4435-9f7d-24d177d22770', 'POSTGRES_DB', '${POSTGRES_DB}', '1cffb358-d9dd-40f4-88d5-dd1bc66565b3');

INSERT INTO service_ports (id, private, public, service_id) values
    ('25ad3904-4059-4327-9e4c-9494d581b827',	3000,	0,	'1a29bb76-7c29-4992-9407-8ca77507a616'),
    ('542be3a7-e04f-468e-bdde-d76a668a2ce9',	5432,	0,	'1cffb358-d9dd-40f4-88d5-dd1bc66565b3'),
    ('bbb18269-3b71-4a2f-859c-c0c04d062ed5',	80,	0,	'457f0d0b-0d3b-4fee-9e65-fd5dcf9ea833');

INSERT INTO service_volumes (id, local_path, container_path, service_id) values
    ('e0b6c940-733d-469e-b570-406ff5faaf43',	'./.env',	'/app/.env',	'1a29bb76-7c29-4992-9407-8ca77507a616'),
    ('f225e477-6966-43b5-99dc-1898a8ad7f60',	'./tmp/database',	'/var/lib/postgresql/data',	'1cffb358-d9dd-40f4-88d5-dd1bc66565b3');

