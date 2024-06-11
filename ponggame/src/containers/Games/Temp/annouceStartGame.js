/* if (!gameToStart) {
      const rootElem = document.getElementById('root');
      const custModalElem = document.createElement('div');
      const custModalDialogElem = document.createElement('div');
      const custModalContent = document.createElement('div');
      const custModalBody = document.createElement('div');
      const custModalHeader = document.createElement('div');
      const custModalTitle = document.createElement('h5');
      const btn = document.createElement('button');
      const p = document.createElement('p');

      custModalTitle.innerText = `${ selectedPlayers[0].username } x AI`;
      p.innerText = t("press the enter key to start the game");
      btn.innerText = "x";

      custModalElem.className = 'customModal modal fade show d-block';
      custModalDialogElem.className = 'modal-dialog', 'modal-dialog-centered';
      custModalContent.className = 'modal-content';
      custModalBody.className = 'modal-body';
      custModalHeader.className = 'modal-header justify-content-between'
      custModalTitle.className = 'modal-title'
      btn.className = 'btn btn-danger';
      btn.addEventListener('click', function (e) {
        custModalElem.remove();
      });
      
      rootElem.appendChild(custModalElem);
      custModalElem.appendChild(custModalDialogElem);
      custModalDialogElem.appendChild(custModalContent);
      custModalContent.appendChild(custModalHeader);
      custModalContent.appendChild(custModalBody);

      custModalHeader.appendChild(custModalTitle);
      custModalHeader.appendChild(btn);
      custModalBody.appendChild(p);

    }
    else {
      const custModalElem = document.querySelector('.customModal');
      if (custModalElem) {
        custModalElem.remove();
      }
    } */