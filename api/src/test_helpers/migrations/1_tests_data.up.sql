--
-- DATA INSERTION FOR TESTS
--

INSERT INTO users (id, email, password) values
    ('14b953e8-30f9-47fc-943b-85d54cbcd54c', 'test@example.net', 'testpassword');

INSERT INTO stacks (id, name, description, user_id) values
    ('2935b117-880c-4f73-be89-de8fba6b196e', 'stack1', 'stack', '14b953e8-30f9-47fc-943b-85d54cbcd54c');

INSERT INTO services (id, name, docker_image, docker_tag, entrypoint, description, position_x, position_y, context, dockerfile, stack_id, container_name, env_file) values
    ('e477175f-dfce-4426-acfb-13fe7a71b2d2', 'service', '', '', '', 'un service de la stack', 20.00000000, 20.00000000, '', '', '2935b117-880c-4f73-be89-de8fba6b196e', '', '');

