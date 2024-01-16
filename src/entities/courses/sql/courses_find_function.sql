create function courses_find_title_code(courses) returns text as $$
  select $1.title || ' ' || $1.code;
$$ language sql immutable;
