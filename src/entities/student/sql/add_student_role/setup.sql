CREATE FUNCTION add_student_role()
RETURNS TRIGGER
LANGUAGE PLPGSQL
security definer
AS $$
DECLARE
  assign_role TEXT := 'student';
  user_id UUID := NEW."userId";
  current_claim jsonb := get_claim(user_id, 'userrole');
BEGIN
  IF current_claim IS NULL THEN
    PERFORM set_claim(user_id, 'userrole', jsonb_build_array(assign_role));
    RAISE NOTICE 'Set claim (null): %', jsonb_build_array(assign_role);
  ELSE
    PERFORM set_claim(user_id, 'userrole', current_claim || jsonb_build_array(assign_role));
    RAISE NOTICE 'Set claim (add userrole): %', current_claim || jsonb_build_array(assign_role);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER students_claim_insert_trigger
BEFORE INSERT ON students
FOR EACH ROW EXECUTE PROCEDURE add_student_role();

