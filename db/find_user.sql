select * from bracket_users
where username = $1
limit 1;