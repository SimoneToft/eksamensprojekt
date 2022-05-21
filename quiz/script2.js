//Vælger alle elementer der er behov for
const info_box = document.querySelector(".info_box");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

// Hvis continue button (start) klikkes
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //skjul info box
    quiz_box.classList.add("activeQuiz"); //vis quiz box
    showQuetions(0); //calling showQestions funktion
    queCounter(1); //passer 1 parameter til queCounter (question counter)
};
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
// Hvis restartQuiz button klikkes
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //vis quiz box
    result_box.classList.remove("activeResult"); //skjul result box
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions funktion
    queCounter(que_numb); //passing que_numb value til queCounter
    next_btn.classList.remove("show"); //skjuler next button
};
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_questions");
// hvis Next Question button klikkes
next_btn.onclick = ()=>{
    if(que_count < questions2.length - 1){ //hvis question count (nuværende spørgsmål) er mindre en total questions
        que_count++; //hæv que_count value
        que_numb++; //hæv que_numb value
        showQuetions(que_count); //calling showQestions funktion
        queCounter(que_numb); //passing que_numb value til queCounter
        next_btn.classList.remove("show"); //skjul next button
    }else{
        showResult(); //calling showResult funktion
    }
}
// henter spørgsmål og og svarmuligheder fra array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //laver ny span and div tag for spørgsmål og svarmuligheder og passer value fra array index
    let que_tag = '<span>'+ questions2[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions2[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions2[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions2[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions2[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //tilføjer nyt span tag inde i que_tag
    option_list.innerHTML = option_tag; //tilføjer ny div tag inde i option_tag
    
    const option = option_list.querySelectorAll(".option");
    // sætter onclick attribute til svarmuligheder
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// laver nye div tags til ikoner
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
//hvis en svarmulighed er valgt
function optionSelected(answer){
    let userAns = answer.textContent; //henter valgt svarmulighed
    let correcAns = questions2[que_count].answer; //henter korrekt svar fra array
    const allOptions = option_list.children.length; //henter alle svarmuligheder
    
    if(userAns == correcAns){ //hvis valgte svar er ens med korrekte svar i array
        userScore += 1; //hæv score med 1
        answer.classList.add("correct"); //tilføjer grøn farve til korrekt svar
        answer.insertAdjacentHTML("beforeend", tickIconTag); //tilføjer flueben til korrekt svar
    }else{
        answer.classList.add("incorrect"); //tilføjer rød farve til valgte svarmulighed
        answer.insertAdjacentHTML("beforeend", crossIconTag); //tilføjer kryds til valgte svarmulighed
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //hvis en svarmulighed passer til korrekt svar 
                option_list.children[i].setAttribute("class", "option correct"); //tilføj grøn farve til korrekt svar
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //tilføj flueben til korrekt svar
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //når svarmulighed er valgt, disable alle svarmuligheder
    }
    next_btn.classList.add("show"); //vis next button når en svarmulighed er valgt
}
function showResult(){
    info_box.classList.remove("activeInfo"); //skjul info box
    quiz_box.classList.remove("activeQuiz"); //skjul quiz box
    result_box.classList.add("activeResult"); //vis result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // hvis score > 3
        //laver nyt span tag med score og antal spørgsmål
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions2.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //tilføjer nyt span tag i score_Text
    }
    else if(userScore > 1){ // hvis score > 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions2.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // hvis score < 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions2.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function queCounter(index){
    //laver nyt span tag med question number og total questions
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions2.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //tilføjer nyt span tag i bottom_ques_counter
}