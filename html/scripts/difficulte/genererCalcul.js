let tableauQuestion = [];
var operateur, chiffre1, chiffre2, premiereValeur, deuxiemeValeur;
var tour = 0;

function genererCalcul(difficulte)
{
    switch (difficulte)
    {

        case "1":
        {
            premiereValeur = 2;
            deuxiemeValeur = 9;

            operateur = getRandomOperator(difficulte);
            break;
        }

        case "2":
        {
            premiereValeur = 2;
            deuxiemeValeur = 9;
            operateur = getRandomOperator(difficulte);
            break;
        }

        case "3":
        {
            premiereValeur = 2;
            deuxiemeValeur = 16;
            operateur = getRandomOperator(difficulte);
            break;
        }
        

    }
    
    chiffre1 = getRandomNumber(premiereValeur,deuxiemeValeur);
            
    //Chiffre2 ne peut pas être supérieur à chiffre1 (risque de résultat de soustraction négatif)
    chiffre2 = getRandomNumber(premiereValeur - 1, chiffre1 - 1);
                    
    //Si tour = 0 ça veut dire qu'on a aucun valeur dans le tableau donc aucune chance de doublon
    if(tour > 0)
    {
        for(let u = 0; u<tour; u++)
        {
            // Si il y a doublon
            while(tableauQuestion[u] == chiffre1 + operateur + chiffre2)
            {
                operateur = getRandomOperator(difficulte);
                chiffre1 = getRandomNumber(premiereValeur, deuxiemeValeur);
                chiffre2 = getRandomNumber(premiereValeur - 1, chiffre1 - 1);
            }
        }                        
    }
    tableauQuestion[tour] = chiffre1 + operateur + chiffre2;

    tour++;

    
        //On l'affiche sur la page
        chiffre1El.innerText = chiffre1;
        operateurEl.innerText = operateur;
        chiffre2El.innerText = chiffre2;
}




function getRandomOperator(difficulte)
{
    var operators = [];
    switch(difficulte)
    {
        case "1":
        {
            operators = ["+", "-"];
            break;
        }

        case "2":
        {
            operators = ["x"] ;
            break;
        }

        
        case "3":
        {
            operators = ["+", "-", "x"];
            break;
        }

    }   


    var random = Math.floor(Math.random() * operators.length);


    return operators[random];

}
