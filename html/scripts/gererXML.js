var path = "";


//Fonction pour afficher le XML
function afficheXML(niveau)
{

    path = 'xml_classement/niveau' + niveau + '.xml';

    let xmlContent = '';
    let tableClassement = document.getElementById('classement');

    fetch(path).then((response)=> {
        response.text().then((xml)=>{
            xmlContent = xml;
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
            let player = xmlDOM.querySelectorAll('player');

            player.forEach(playerXmlNode => {

                let row = document.createElement('tr');

                //pseudo
                let td = document.createElement('td');
                td.innerText = playerXmlNode.children[0].innerHTML;
                row.appendChild(td);

                //score
                td = document.createElement('td');
                td.innerText = playerXmlNode.children[1].innerHTML;
                row.appendChild(td);
                
                //temps
                td = document.createElement('td');
                td.innerText = playerXmlNode.children[2].innerHTML;
                row.appendChild(td);

                tableClassement.children[1].appendChild(row);
                
            });
            
        });
        
    });

}

function ecrireXml(niveau)
{

    path = 'xml_classement/niveau' + niveau + '.xml';
    //AJAX pour envoyer les données à l'API php : traitement_xml.php
    $(document).ready(function(){
        $("#envoyer").click(function()
        {
            var name = $("#name").val();

            $.post('./traitement_xml.php',
            {
                path : path,
                niveau : niveau,
                pseudo: name,
                score: score,
                temps: countDownEl.innerText

            },

            function(data, status)
            {
                console.log('data',data);
                console.log('status', status);

                afficherClassement();

            });
        });
    });
}
