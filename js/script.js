'use strict'

class Human {
	constructor(name, age, isAdult, gender){
		this.name = name;
		this.age = age;
		this.isAdult = isAdult;
		this.gender = gender;
	}
	sayMyName(){
		console.log(`Меня зовут ${this.name}!`);
	}
	walk(){
		console.log('Я умею ходить');
	}
	work(){
		this.isAdult == true ? console.log('Я работаю') : console.log('Мне еще рано работать!');
	}
}

class Child extends Human{
	constructor(name, age, isAdult, gender, schoolNumber, favouriteToys = [],){
		super(name, age, isAdult, gender);
		this._favouriteToys = favouriteToys;
		this.schoolNumber = schoolNumber;
	}

	goToSchool(){
		console.log(`Я иду в мою школу №${this.schoolNumber}`);
	}
	playWithToys(){
		console.log(`Я играю с моими игрушками: ${this.favouriteToys.join(', ')}`);
	}

	get favouriteToys(){
		return this._favouriteToys;
	}

	set favouriteToys(toy){
		this.favouriteToys.push(toy);
	}
}

class Adult extends Human{
	constructor(name, age, isAdult, gender, myProfession, hobbies = []){
		super(name, age, isAdult, gender);
		this.myProfession = myProfession;
		this._hobbies = hobbies;
	}

	goToWork() {
		console.log(`Я иду на работу. Я ${this.myProfession}`);
	}
	myHobbies() {
		console.log(`В свободное время я занимаюсь  ${this.hobbies.join(', ')}`);
	}

	get hobbies(){
		return this._hobbies;
	}

	set hobbies(hobby){
		this.hobbies.push(hobby);
	}
}

const child1 = new Child('Артем', 12, false, 'Мужской', 52);

child1.favouriteToys = 'Машинка';
child1.favouriteToys = 'Мячик';
child1.favouriteToys = 'Вертолет';

child1.sayMyName();
child1.playWithToys();
child1.goToSchool();

const child2 = new Child('Лиза', 10, false, 'Женский', 23);

child2.favouriteToys = 'Кукла';
child2.favouriteToys = 'Кубик рубика';
child2.favouriteToys = 'Мячик';

child2.sayMyName();
child2.playWithToys();
child2.goToSchool();


console.log(child1);
console.log(child2);
