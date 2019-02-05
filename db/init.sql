drop table if exists bracket_users;
drop table if exists brackets_join_users;
drop table if exists brackets;

create table if not exists bracket_users (
    id serial primary key,
    username text unique,
    password text
);

create table if not exists brackets_join_users (
    join_id serial primary key,
    user_id int,
    creator boolean,
    bracket_id int,
    placement int
);

create table if not exists brackets (
    bracket_id serial primary key,
    event_name text,
    current_round int default 1,
    total_rounds int
);

select * from bracket_users;
select * from brackets;
select * from brackets_join_users;