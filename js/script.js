'use strict'

const adultSelect = document.getElementById('adult');
const adultForm = document.querySelector('.is-adult');
const childForm = document.querySelector('.is-child');
const btnSubmit = document.querySelector('.btn-submit');
const inputName = document.getElementById('name');;
const inputAge = document.getElementById('age');
const selectAdult = document.getElementById('adult');
const inputRadio = document.querySelectorAll('input[name=gender]');
const inputSchool = document.getElementById('school');
const inputToy = document.getElementById('toys');
const inputProf = document.getElementById('prof');
const inputHobby = document.getElementById('hobbies');
const tableBody = document.querySelector('.body-table');
let btnDelete = document.querySelectorAll('.btn-del');
const getStorage = localStorage.getItem('data');
let btnDeleteIndex;
let isAdult;
const allPersons = JSON.parse(getStorage) || [];

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
		Child.countIncrement();
	}
	static childCount = 0;
	static countIncrement(){
		Child.childCount++;
	}
	static getCount(){
		return Child.childCount;
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
		Adult.countIncrement();
	}
	static adultCount = 0;
	static countIncrement(){
		Adult.adultCount++;
	}
	static getCount(){
		return Adult.adultCount;
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

	set hobbies(hobbies){
		this.hobbies.push(hobbies);
	}
}


// const child1 = new Child('Артем', 12, false, 'Мужской', 52);

// child1.favouriteToys = 'Машинка';
// child1.favouriteToys = 'Мячик';
// child1.favouriteToys = 'Вертолет';

// child1.sayMyName();
// child1.playWithToys();
// child1.goToSchool();

// const child2 = new Child('Лиза', 10, false, 'Женский', 23);

// child2.favouriteToys = 'Кукла';
// child2.favouriteToys = 'Кубик рубика';
// child2.favouriteToys = 'Мячик';

// child2.sayMyName();
// child2.playWithToys();
// child2.goToSchool();


// console.log(child1);
// console.log(child2);




	const getAdultSelect = () =>{
		adultSelect.addEventListener('change', ()=> {
			if(adultSelect.options[adultSelect.selectedIndex].value == 'yes'){
				adultForm.style.display = 'block';
				childForm.style.display = 'none';
			} else if (adultSelect.options[adultSelect.selectedIndex].value == 'no'){
				childForm.style.display = 'block';
				adultForm.style.display = 'none';
			} else {
				childForm.style.display = 'none';
				adultForm.style.display = 'none';
			}
		})
	}
	getAdultSelect()
	let checkedRadioVal;
	let personGender;

	const getRadioValue = () =>{
				inputRadio.forEach(e =>{
					if(e.checked){
						checkedRadioVal = e.value;
						if(checkedRadioVal == 'man'){
							personGender = 'Мужской';
						} else if(checkedRadioVal == 'women'){
							personGender = 'Женский';
						}
					}
				})
			}

btnSubmit.addEventListener('click', (e)=> {
				e.preventDefault();
				getRadioValue();
				isAdult = adultSelect.options[adultSelect.selectedIndex].textContent;
				if(isAdult == 'Да'){
					allPersons.push(new Adult(inputName.value, inputAge.value, isAdult, personGender, inputProf.value, inputHobby.value))
				} else if(isAdult == 'Нет'){
					allPersons.push(new Child(inputName.value, inputAge.value, isAdult, personGender, inputSchool.value, inputToy.value))
				}
				setStorage()
				render()
				clearValues()
				
				btnDelete = document.querySelectorAll('.btn-del');
				
			
			
})


const clearValues = ()=>{
	inputName.value = '';
	selectAdult.value = '';
	inputRadio.value = '';
	inputSchool.value = '';
	inputToy.value = '';
	inputAge.value = '';
	inputProf.value = '';
	inputHobby.value = '';
	tableBody.value = '';
	isAdult = '';
}

const deleteItem = () =>{
	
}
document.addEventListener('click', e => {
	if(e.target.classList.contains('btn-del')){
		let parentRow = e.target.closest('.body-table__row');
		parentRow.remove()
		
		btnDelete.forEach((elem,i)=>{
			if(e.target == elem){
				
				allPersons.splice(i, 1);
				btnDelete = document.querySelectorAll('.btn-del');
				
			}
		})
		setStorage();
	}

});

const setStorage = () => {
	let stringifyData = JSON.stringify(allPersons);
	localStorage.setItem('data', stringifyData)
}

const render = () => {
	tableBody.innerHTML = '';

	allPersons.forEach(e => {

		tableBody.insertAdjacentHTML('beforeend', `<div class="body-table__row">
	<div class="body-table__item body-table__item_name">${e.name || ''}</div>
	<div class="body-table__item body-table__item_age">${e.age || ''}</div>
	<div class="body-table__item body-table__item_adult">${e.isAdult || ''}</div>
	<div class="body-table__item body-table__item_gender">${e.gender || ''}</div>
	<div class="body-table__item body-table__item_school">${e.schoolNumber || ''}</div>
	<div class="body-table__item body-table__item_toy">${e._favouriteToys || ''}</div>
	<div class="body-table__item body-table__item_prof">${e.myProfession || ''}</div>
	<div class="body-table__item body-table__item_hobby">${e._hobbies || ''}</div>
	<div class="body-table__item body-table__item_del"><img class="btn-del" src="img/trash.png" alt="trash"></div>
</div>`)
	});
	btnDelete = document.querySelectorAll('.btn-del');
}

render()