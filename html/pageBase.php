<!DOCTYPE html>
<html>

    <link rel="stylesheet" type="text/css" href="index.css"/>
    <title>Arithm&eacute;tique</title>

<div class="header">
    <a class="logo">Jeu pour enfants</a>
    <div class="header-right">
      <a href="Index-V2.html">Recommencer</a>
      <a href="QuestionnaireV4.html">Exercice suivant</a>
    </div>
</div>

</br>



<body>
    <div class="mbr-overlay" style="opacity: 0.1; background-color: rgb(36, 233, 179);">
    </div>

    <div class="w3-display-middle">
        <section id="banner">
            <section class="cid-r7cqpTZvzZ" id="header1-0">
                <div class="container text-center" >
                    <div class="row slider-wrapper">
                        <div class="col-md-12">
                            <div id="leQuiz" class="slider-text  slider-text-two">
                                <!--Le bouton va permettre de débuter le jeu en appelant la fonction debuterJeu()-->
                                <button id="debuterJeu" onclick="debuterJeu('<?php echo $_GET['difficulte'] ?>')">D&eacute;buter</button>

                                </br>
                                </br>

                                <!--Div qui contient les chiffres-->
                                <div id="calcul" style="float:left;padding-left:60px">

                                <div id="chiffre1" style="float:left;font-size: xx-large;" ></div>
                                <div id="operateur" style="float:left;font-size: xx-large;"></div>
                                <div id="chiffre2" style="float:left;font-size: xx-large;"></div>

                            </div>

                            </br>
                            </br>
                            </br>
                            
                            <div id="lesReponses" class="bgimg w3-display-container w3-animate-opacity w3-text-white parallax filter filter-color-red">
                                <div class="w3-display-middle">
                                    <section id="banner">

                                        <div id="countdown"></div>
        
                                        <section class="cid-r7cqpTZvzZ mbr-fullscreen mbr-parallax-background" id="header1-0">
                                             <div class="w3-display-middle"></div>
                                                <div class="container text-center" data-stellar-background-ratio=".5">
                                                    <div class="row slider-wrapper">
                                                        <div class="col-md-12">
                                                            <div class="slider-text  slider-text-two">
                                                                <div class='colonne' id='liste'>
                                                                    <div class='calque_rep' id='rep1' onclick="verif(1)" ></div>
                                                                    <div class='calque_rep' id='rep2' onclick="verif(2)"></div>
                                                                    <div class='calque_rep' id='rep3' onclick="verif(3)"></div>
                                                                    <div class='calque_rep' id='rep4' onclick="verif(4)"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        <!--Div qui contient les statistiques du jeux-->
                                        <div id="stats" style="float:right; padding-right:75px">

                                        <div style="float:left;">Nombre de bonnes reponses :&nbsp;</div>
                                        <div id="bonne" style="float:left;font-weight:bold;text-align: center;">0</div>

                                        <div style="float:left;">&nbsp; Nombre d'erreurs : &nbsp;</div>
                                        <div id="erreur" style="float:left;font-weight:bold;text-align: center;">0</div>

                                        <div style="float:left;"> &nbsp;Questions restantes :&nbsp;</div>
                                        <div id="restant" style="float:left;font-weight:bold;text-align: center;">10</div>

                                        <div style="float:left;"> &nbsp;Score :&nbsp;</div>
                                        <div id="score" style="float:right;font-weight:bold;text-align: center;">0</div>

                                        </section>   
                                    </section>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </section>
        </section>
    </div>




<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="scripts/gererXML.js"></script>
<script src="scripts/difficulte/genererCalcul.js"></script>
<script src="scripts/global.js"></script>

</body>




</body>
</html> 
