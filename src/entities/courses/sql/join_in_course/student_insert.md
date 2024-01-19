-> Database Functions
	* Name - join_in_course
	Definition
	BEGIN  
	IF EXISTS (
		SELECT 1 FROM public.students WHERE "userId" = auth.uid() AND id = new.student_id
	) THEN
		RETURN NEW;
	ELSE
		RAISE EXCEPTION  'new.student_id: %', new.student_id;
		RAISE EXCEPTION 'You can only join yourself to a course.';
	END IF;
	END;

-> Database Triggers
	* Create a new trigger
	Name - before_join_in_course
	Table - student_courses
	Events - Insert
	Trigger Type - Before the event
	Orientation - Row
	Function to trigger - join_in_course