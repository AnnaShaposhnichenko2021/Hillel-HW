class Group {
  students = [];
  get students() {
    return this.students;
  }
  addStudent(student){
    this.students.push(student)
  }
  getAverageMark() {
    return this.students.reduce((acc, student) => {
      const markSum = student.marks.reduce((sum, value) => 
      sum + value, 0);
      const markAverage = markSum / student.marks.length;
      return acc + markAverage
    },0) / this.students.length
  }
}
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  };
}

const feGroup = new Group();
const firstStudent = new Student('John Doe', [10, 102, 0]);

feGroup.addStudent(new Student('John Doe', [10, 10, 5, 10]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));

console.log(feGroup.students);

console.log(feGroup.getAverageMark());