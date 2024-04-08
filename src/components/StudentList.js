function StudentList({ students, onStudentSelect }) {
	return (
		<div>
			<h1>Student List</h1>
			<ul>
				{students.map((student) => (
					<li key={student.id} onClick={() => onStudentSelect(student)}>{student.name}</li>
				))}
			</ul>
		</div>
	);
}

export default StudentList;