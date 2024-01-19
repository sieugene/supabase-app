CREATE POLICY "Create Student" ON "public"."students" AS PERMISSIVE FOR
INSERT
	TO authenticated WITH CHECK (
		(auth.uid() = students."userId")
		AND NOT EXISTS (
			SELECT
				1
			FROM
				students students_1
			WHERE
				(students_1."userId" = auth.uid())
		)
	)