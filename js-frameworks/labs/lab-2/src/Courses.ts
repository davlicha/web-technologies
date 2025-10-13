interface Course {
    title: string;
    duration: number;
    students: string[];
}

class OnlineCourse implements Course {
    title: string;
    duration: number;
    students: string[] = [];

    constructor(title: string, duration: number) {
        this.title = title;
        this.duration = duration;
    }

    registerStudent(student: string): void {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`Student ${student} registered for ${this.title}.`);
        } else {
            console.log(`Student ${student} is already registered for ${this.title}.`);
        }
    }

    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }
}

class CourseManager {
    private courses: Course[] = [];

    addCourse(course: Course): void {
        this.courses.push(course);
        console.log(`Course "${course.title}" added.`);
    }

    removeCourse(courseName: string): void {
        const index = this.courses.findIndex(c => c.title === courseName);
        if (index !== -1) {
            this.courses.splice(index, 1);
            console.log(`Course "${courseName}" removed.`);
        } else {
            console.log(`Course "${courseName}" not found.`);
        }
    }

    findCourse(courseName: string): Course | undefined {
        return this.courses.find(c => c.title === courseName);
    }

    listCourses(): void {
        console.log("\n--- Available Courses ---");
        this.courses.forEach(course => {
            console.log(`Course: ${course.title} (${course.duration} hours)`);
            console.log(`  Students: ${course.students.join(", ") || "No students yet"}`);
        });
        console.log("-----------------------");
    }
}

const courseManager = new CourseManager();
const tsCourse = new OnlineCourse("TypeScript Basics", 40);
const reactCourse = new OnlineCourse("React Advanced", 60);

courseManager.addCourse(tsCourse);
courseManager.addCourse(reactCourse);

tsCourse.registerStudent("Alice");
tsCourse.registerStudent("Bob");
reactCourse.registerStudent("Charlie");
tsCourse.registerStudent("Alice");

courseManager.listCourses();

courseManager.removeCourse("React Advanced");
courseManager.listCourses();