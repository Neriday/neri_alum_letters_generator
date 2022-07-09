window.addEventListener('load',function(){
	const mainInp      = document.querySelector('.letter-generator__inp');
	const languageSel  = document.querySelector('.letter-generator__select');
	const isAnimateBtn = document.querySelector('#checkbox-rect1');
	const isAnimateBlock = document.querySelector('.letter-generator__item.animate');
	const librarySel   = document.querySelector('.letter-generator__library');
	const generateBtn  = document.querySelector('.letter-generator__item.generate');
	const copyBtn      = document.querySelector('.letter-generator__btn-copy');
	const resultPlace  = document.querySelector('.letter-generator__result-text');
	const settingsItems  = document.querySelector('.letter-generator__main-items');

	settingsItems.addEventListener('input',function(e){
		let tar = e.target;
		if(tar.classList.contains('letter-generator__library')){
			if(librarySel.value == 'org'){
				languageSel.classList.add('btn-disabled');
				isAnimateBlock.classList.add('btn-disabled');

				languageSel.value = "eng";
				isAnimateBtn.checked = false;
			}else{
				languageSel.classList.remove('btn-disabled');
				isAnimateBlock.classList.remove('btn-disabled');
			}
		}
	});

	generateBtn.addEventListener('click', function(e){
		let inpValue = mainInp.value.toLowerCase();
		let ArrLitters = Array.from(inpValue);
		/*console.log(ArrLitters);
		console.log(librarySel.value);
		console.log(languageSel.value);
		console.log(isAnimateBtn.checked); */

		let bag = true;

		if(ArrLitters.length > 0 && librarySel.value!=''){
			bag = false;

			if(librarySel.value == 'org'){
				new originalCode(ArrLitters,ourAlphabet,'.letter-generator__result-text').print();
			}else{
				new UserSentenceInCode(ArrLitters,ourAlphabet,'.letter-generator__result-text').print();
			}

			if(languageSel.value == "rus"){
				new InRussianCode(ArrLitters,СyrillicAlphabet,'.letter-generator__result-text').print();
			}else if(languageSel.value == "ua"){
				new InUkrainianCode(ArrLitters,СyrillicAlphabet,'.letter-generator__result-text').print();
			}

			if(isAnimateBtn.checked && languageSel.value == "eng"){
				new engAnimated(ArrLitters,ourAlphabet,'.letter-generator__result-text').print();
			}else if(isAnimateBtn.checked && languageSel.value == "rus"){
				new rusAnimated(ArrLitters,СyrillicAlphabet,'.letter-generator__result-text').print();
			}else if(isAnimateBtn.checked && languageSel.value == "ua"){
				new uaAnimated(ArrLitters,СyrillicAlphabet,'.letter-generator__result-text').print();
			}
		}
		if(!bag){
			copyBtn.classList.remove('btn-disabled');
		}
		copyBtn.addEventListener('click',function(){
			navigator.clipboard.writeText(resultPlace.innerHTML);
		});
		
	});
});

let ourAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
				   'n','o','p','q','r','s','t','u','v','w','x','y','z'];

let СyrillicAlphabet = ['а','б','в','г','ґ','д','е','ё','ж','з','и','й','к','л','м','н','о','п',
						'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','є','ю','я','ї','і'];

let СyrillicLetterID = {
	'а': 'a',
	'б': 'b',
	'в': 'v',
	'г': 'g',
	'ґ': 'gg',
	'д': 'd',
	'е': 'e',
	'ё': 'yo',
	'ж': 'zh',
	'з': 'z',
	'и': 'y',
	'і': 'i',
	'й': 'y',
	'к': 'k',
	'л': 'l',
	'м': 'm',
	'н': 'n',
	'о': 'o',
	'п': 'p',
	'р': 'r',
	'с': 's',
	'т': 't',
	'у': 'u',
	'ф': 'f',
	'х': 'h',
	'ц': 'c',
	'ч': 'ch',
	'ш': 'sh',
	'щ': 'shch',
	'ъ': 'tv_znak',
	'ы': 'yy',
	'ь': 'mk_znak',
	'э': 'ee',
	'є': 'ye',
	'ю': 'yu',
	'я': 'ya',
	'ї': 'yi'
}

// *** *** *** *** *** *** *** *** *** *** *** *** ***
class UserSentenceInCode{
	constructor(userSentence,Alphabet,printObj){
		this.usrSent = userSentence;
		this.alph = Alphabet;
		this.printObj = document.querySelector(printObj);
		this.res = [];
	}
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:eng_regional_indicator_${AlphEl}_double: `;
		}
	}
	transformation(){
		this.usrSent.forEach((userEl)=>{
			this.alph.forEach((AlphEl)=>{
				this.addLetter(userEl,AlphEl);
			});
		});
	}
	print(){
		this.transformation();
		this.printObj.innerHTML = this.res;
	}
}
// *** *** *** *** *** *** *** *** *** *** *** *** ***
class originalCode extends UserSentenceInCode{
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:regional_indicator_${AlphEl}: `;
		}
	}
}
// *** *** *** *** *** *** *** *** *** *** *** *** ***
class InRussianCode extends UserSentenceInCode{
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:rus_regional_indicator_${СyrillicLetterID[AlphEl]}: `;
		}
	}
}
// *** *** *** *** *** *** *** *** *** *** *** *** ***
class InUkrainianCode extends UserSentenceInCode{
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:ua_regional_indicator_${СyrillicLetterID[AlphEl]}: `;
		}
	}
}
// *** *** *** *** *** *** *** *** *** *** *** *** ***
class engAnimated extends UserSentenceInCode{
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:Animated_${AlphEl.toUpperCase()}: `;
		}
	}
}
// *** *** *** *** *** *** *** *** *** *** *** *** ***
class rusAnimated extends UserSentenceInCode{
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:Animated_rus_${СyrillicLetterID[AlphEl].toUpperCase()}: `;
		}
	}
}
// *** *** *** *** *** *** *** *** *** *** *** *** ***
class uaAnimated extends UserSentenceInCode{
	addLetter(userEl,AlphEl){
		if(userEl == AlphEl){
			this.res += `:Animated_ua_${СyrillicLetterID[AlphEl].toUpperCase()}: `;
		}
	}
}