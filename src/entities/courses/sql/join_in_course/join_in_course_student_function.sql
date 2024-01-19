BEGIN  
  IF EXISTS (
    SELECT 1 FROM public.students WHERE "userId" = auth.uid() AND id = new.student_id
  ) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'You can only join yourself to a course.';
  END IF;
END;