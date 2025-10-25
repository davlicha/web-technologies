"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OnlineCourse {
    title;
    duration;
    students = [];
    constructor(title, duration) {
        this.title = title;
        this.duration = duration;
    }
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log(`Student ${student} registered for ${this.title}.`);
        }
        else {
            console.log(`Student ${student} is already registered for ${this.title}.`);
        }
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
}
class CourseManager {
    courses = [];
    addCourse(course) {
        this.courses.push(course);
        console.log(`Course "${course.title}" added.`);
    }
    removeCourse(courseName) {
        const index = this.courses.findIndex(c => c.title === courseName);
        if (index !== -1) {
            this.courses.splice(index, 1);
            console.log(`Course "${courseName}" removed.`);
        }
        else {
            console.log(`Course "${courseName}" not found.`);
        }
    }
    findCourse(courseName) {
        return this.courses.find(c => c.title === courseName);
    }
    listCourses() {
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
