//#region Variables globales

var tour,   bonne_rep, nb_erreurs,bonneRepBouton, score = 0;
var nb_questions = 10;
let startingMinutes =  2;
let time = startingMinutes * 60;


//Tableau qui va nous servir pour remplir les réponses.
let tableau = [0,0,0,0];

var Ladifficulte;

//On instancie le timer
var timer = setInterval(updateCountdown, 1000);
stopInterval(timer);

//#region Constantes qui permetent de récuperer les elements des div

//Les statistiques
const countDownEl = document.getElementById('countdown');
const bonneReponseEl = document.getElementById('bonne');
const restantEl = document.getElementById('restant');
const scoreEl  = document.getElementById('score');
const erreursEl = document.getElementById('erreur');

//Le calcul à resoudre
const chiffre1El = document.getElementById('chiffre1');
const chiffre2El = document.getElementById('chiffre2');
const operateurEl = document.getElementById('operateur');

//Les boutons reponses
const rep1El = document.getElementById('rep1');
const rep2El = document.getElementById('rep2');
const rep3El = document.getElementById('rep3');
const rep4El = document.getElementById('rep4');

//Les zones qui vont apparaitre et disparaitre en fonction du jeu
const leTest = document.getElementById('leTest');
const lesReponses = document.getElementById('lesReponses');
const leQuiz = document.getElementById('leQuiz');

//#endregion

//#endregion

//Fonction appelée lors de l'appuie du bouton Débuter.
function debuterJeu(difficulte)
{

    Ladifficulte = difficulte;
    // On affiche les boutons de reponse
    lesReponses.style.visibility = 'visible';

    //On réénitialise les statistiques
    bonne_rep = 0;
    nb_erreurs = 0;
    nb_questions = 10;
    tour = 0;

    erreursEl.innerText = nb_erreurs;
    bonneReponseEl.innerText = bonne_rep;
    scoreEl.value = score;

    //On réénitialise le timer
    startingMinutes =  2;
    time = startingMinutes * 60;
    score = 0;

    // On lance le timer à 2 minutes
    clearInterval(timer);
    timer = setInterval(updateCountdown, 1000);


    suivant();
}

//Fonction appelée lorsque les 10 questions ont étées répondues
function finirJeu()
{
    stopInterval(timer);
    lesReponses.style.visibility = 'hidden';
    leQuiz.innerHTML = "";
    nb_questions = nb_questions - 1;
    restantEl.innerText = nb_questions;
    score+= time * 10;

    const img ="";
    if(score > 1100)
    {
        leQuiz.innerHTML += "<img src='img/medaille-or.jpg'>";
    }
    else if(score >800)
    {
        leQuiz.innerHTML += "<img src='img/medaille-argent.jpg'>";
    }
    else if(score>600)
    {
        leQuiz.innerHTML += "<img src='img/medaille-bronze.jpg'>";
    }
    leQuiz.innerHTML += "<div>&nbsp;Jeux termin&eacute; vous avez " + bonne_rep + " bonnes r&eacute;ponses!</div>";
    leQuiz.innerHTML += "<div>&nbsp;Vous avez r&eacute;pondu au questions en " + countDownEl.innerText + " minutes.</div>";
    leQuiz.innerHTML += "<div>&nbsp;Votre score est de " + score + " Bravo !</div>";

    leQuiz.innerHTML += "</br><label for='name'>Entrez votre nom pour rentrer dans le classement!</label>";
    leQuiz.innerHTML += "</br><input type='text' id='name' name='name' required minlength='4' maxlength='8' size='10'>";
    leQuiz.innerHTML += "<button id='envoyer'>Ok!</button>";


    ecrireXml(Ladifficulte);

}

function afficherClassement()
{

    var leNom = document.getElementById('name').value ;
    leQuiz.innerHTML = "";  
    leQuiz.innerHTML += leNom + " a gagn&eacute; avec un score de " + score;

    leQuiz.innerHTML += "<div id='content'>";
    leQuiz.innerHTML += "<button id='lebouton' onClick='trierTableau();'>Trier</button>";
    leQuiz.innerHTML += "<table id='classement' cellpadding='10px' style='text-align:left;'><thead><tr><th>Pseudo</th> <th>Score</th> <th>Temps</th> </tr></thead><tbody></tbody></table></div>";

    afficheXML(Ladifficulte);

}

//Fonction appelée lorsque la réponse est selectionée lors de l'appui sur un bouton
function suivant()
{
    restantEl.innerText = nb_questions;

    //On ajoute le calcul
    remplir();
}

function verif(nb)
{
    //On change le nombre de questions restantes
    var  correction = correct();

    switch (nb)
    {
        case 1:
            reponse = rep1El.innerText;
            break;
        case 2:
            reponse = rep2El.innerText;
            break;
        case 3:
            reponse = rep3El.innerText;
            break;
        case 4:
            reponse = rep4El.innerText;
            break;
    }


    if(reponse == correction)
    {
        bonne_rep += 1;
        bonneReponseEl.innerText = bonne_rep;
        score += 40;
        scoreEl.innerText = score;
    }
    else
    {
        erreursEl.innerText = nb_erreurs += 1; 
    }

    if(nb_questions != 1)
    {
        nb_questions = nb_questions - 1;
        suivant();
    }
    else
    {
        finirJeu();

    }

    
}

//Fonction qui permet de remplir la question et les réponses
function remplir()
{
    genererCalcul(Ladifficulte);

    genererReponses();

}

function genererReponses()
{
    //On génère les réponses
    tableau = [0,0,0,0];
    
    //On parcours le tableau
    while(tableauRemplit() == false)
    {
        val = getRandomNumber(0,3)
    
        //Si aucune valeur n'est encore assignée au noeud du tableau
        if(tableau[val]== 0)
        {
                //On vérifie si la bonne réponse n'est pas déjà assignée
            if(correctIsHere() == false)
            {
                tableau[val] = correct();
            }
            //Sinon on génere une valeur cohérente par rapport au calcul
            else
            {
                tableau[val] =  genererValeurInexistante();
            }
        }
    }
    
    //On affiche les réponses sur la page
    rep1El.innerText = tableau[0];
    rep2El.innerText = tableau[1];
    rep3El.innerText = tableau[2];
    rep4El.innerText = tableau[3];
}



//Cette fonction va générer une valeur cohérente par rapport à la bonne réponse
function genererValeurInexistante()
{

    //Cette variable va permettre de déterminer si on va additionner ou soustraire
    var operator =  Math.floor(Math.random()*2  );

    var valeur = 0;

    switch (operator)
    {
        case 0:
            //Addition : on va additionner la bonne réponse avec un valeur comprise entre 2 et 9
            valeur = correct() + getRandomNumber(2,9);
            break;
        
        case 1:
            //Soustraction : on va soustraire la bonne réponse, on va aussi vérifier si la valeur n'est pas négative
            valeur = getRandomNumber(1,correct());

            valeur = correct() - valeur;
            break;
    }
    
    //On vérifie si cette valeur n'est pas déjà assignée dans le tableau
    for(let i = 0; i < 4; i++)
    {
        if(tableau[i] == valeur)
        {
            //Si elle est déjà assignée alors on faire une recursive.
            valeur = genererValeurInexistante()
        }
    }

    return valeur;
}

//Fonction qui permet de récuperer la bonne réponse
function correct()
{
    //On récupere toutes les valeurs.
    var chiffre1 = chiffre1El.innerHTML;
    var chiffre2 = chiffre2El.innerHTML;
    var operateur = operateurEl.innerHTML;

    //On va faire le calcul pour avoir le bon résultat, le switch va permettre de calculer en fonction de l'opérateur
    var correction;
    switch (operateur)
    {
        case '+' :
            //On va mettre ici parseFloat car sinon chiffre1 et chiffre2 vont être concaténés
            correction =  parseFloat(chiffre1)  + parseFloat(chiffre2) ;
            break;

        case '-' :
            correction = chiffre1 - chiffre2;
            break;
        
        case 'x' :
            correction = chiffre1 * chiffre2;
            break;
    }

    return correction;
}

//Fonction qui permet de savoir si la bonne réponse est déjà assignée dans le tableau
function correctIsHere()
{
    var present = false;
    var bonneRep = correct();

    for(let i=0; i < 4 ; i++ )
    {
        if(tableau[i] == bonneRep)
        {
            present = true;
            break; 
        }
    }
    return present;
}

//Fonction qui permet de savoir si le tableau est remplit
function tableauRemplit(tab)
{
    var remplit = true;
    
    for(let i = 0; i < 4; i++)
    {
        if(tableau[i] == 0)
        {
            remplit = false;
            break;
        }
    }
    return remplit;
}

function getRandomNumber(min, max)
{

    // On arrondit à la décimale
    min = Math.ceil(min); 
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function updateCountdown()
{ 

    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countDownEl.innerHTML = `${minutes} : ${seconds}`;

    if(time > 0)
    {
        time--;
    }
    else
    {
        stopInterval(timer);

    }
}

function stopInterval(leTimer)
{
    clearInterval(leTimer);
}


//Fonction pour trier le classement par score (croissant)
function trierTableau()
{
    debugger;
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("classement");
          switching = true;
          /*Make a loop that will continue until
          no switching has been done:*/
          while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
              //start by saying there should be no switching:
              shouldSwitch = false;
              /*Get the two elements you want to compare,
              one from current row and one from the next:*/
              x = rows[i].getElementsByTagName("TD")[1];
              y = rows[i + 1].getElementsByTagName("TD")[1];
              //check if the two rows should switch place:
              if (parseInt(x.innerHTML) < parseInt(y.innerHTML) ) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            }
            if (shouldSwitch) {
              /*If a switch has been marked, make the switch
              and mark that a switch has been done:*/
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
            }
          }
}




