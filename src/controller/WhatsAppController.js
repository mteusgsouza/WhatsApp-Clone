class WhatsAppController {

    constructor() {

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements() {
        //carrega todos os elementos da página e cria os atributos para cada um, formatados no padrão camelCase
        //ex: id="input-profile-photo" -> this.el.inputProfilePhoto
        this.el = {};
        //recebe todos os elementos com id tratados

        document.querySelectorAll('[id]').forEach(element => {
            //seleciona todos os elementos html que possuem id
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype() {
        // metodo que adiciona funções reaproveitáveis aos elementos
        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this;//necessario o return para conseguir aninhar funções
        }
        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        }
        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }
        Element.prototype.on = function (events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);

            });
            return this;
        }
        Element.prototype.css = function (styles) {
            for (let name in styles) {
                this.style[name] = styles[name];
            }
            return this;
        }
        Element.prototype.addClass = function (name) {
            this.classList.add(name);
            return this;
        }
        Element.prototype.removeClass = function (name) {
            this.classList.remove(name);
            return this;
        }
        Element.prototype.toggleClass = function (name) {
            this.classList.toggle(name);
            return this;
        }
        Element.prototype.hasClass = function (name) {
            return this.classList.contains(name);
        }

        //funções para formulários
        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }
        HTMLFormElement.prototype.toJSON = function () {
            //retorna o formulário mas em formato json
            let json = {};
            this.getForm().forEach((value, key) => {
                json[key] = value;
            });
            return json;
        }

    }

    initEvents() {
        //escuta os eventos do app

        //paineis de perfil e contato
        this.el.myPhoto.on('click', e => {
            //abre o painel de edição do perfil, fechando os paineis esquerdos que estiverem aberto antes
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();

            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);
            //tempo necessário para carregar a transição do css

        });
        this.el.btnNewContact.on('click', e => {
            //abre o painel de adicinar contato, fechando os paineis esquerdos que estiverem aberto antes
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);

        });

        //botões de fechar paineis
        this.el.btnClosePanelEditProfile.on('click', e => {
            //fecha o painel de edição de perfil
            this.el.panelEditProfile.removeClass('open');
        });
        this.el.btnClosePanelAddContact.on('click', e => {
            //fecha o painel de adicionar contato
            this.el.panelAddContact.removeClass('open');
        });

        //inputs de foto de perfil e input de name
        this.el.photoContainerEditProfile.on('click', e => {
            //abre um input type="file" para seleção de forto de perfil
            this.el.inputProfilePhoto.click();
        });
        this.el.inputNamePanelEditProfile.on('keypress', e => {
            //recebe o nome digitado para o perfil
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        })

        //botões de salvar nome de perfil e contato
        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });
        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact)
        });

        //conversas
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            //abre a conversa clicada e escode a home
            item.on('click', e => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });
            });
        });

        //botões de anexar arquivo
        this.el.btnAttach.on('click', e => {
            //botão que abre o menu de anexos
            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        //imagens e videos
        this.el.btnAttachPhoto.on('click', e => {
            //adicionar imagem/video
            this.el.inputPhoto.click();
        });
        this.el.inputPhoto.on('change', e => {
            //input de imagem/video
            console.log(this.el.inputPhoto.files);
            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file);
            });
        });

        //câmera
        this.el.btnAttachCamera.on('click', e => {
            //anexar foto da câmera
            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });
            this._camera = new CameraController(this.el.videoCamera);
            //instancia a classe que recebe a tela da câmerda
        });
        this.el.btnClosePanelCamera.on('click', e => {
            //fecha o painel da câmera
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });
        this.el.btnTakePicture.on('click', e => {
            //tirar foto
            console.log('take picture')
        });

        //documento
        this.el.btnAttachDocument.on('click', e => {
            //abre o painel de anexar documento
            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            });
        });
        this.el.btnClosePanelDocumentPreview.on('click', e => {
            //fecha o painel de envio do documentos
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        });
        this.el.btnSendDocument.on('click', e => {
            //botão de enviar o documento
            console.log('send document');
        });

        //contatos
        this.el.btnAttachContact.on('click', e => {
            //abre o modal de contatos
            this.el.modalContacts.show();
        });
        this.el.btnCloseModalContacts.on('click', e => {
            //fecha o modal de contatos
            this.el.modalContacts.hide();
        });

        //botões de gravação de áudio
        this.el.btnSendMicrophone.on('click', e => {
            //esconde o botão de envio de áudio e mostra os botões de gravação
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTimer();
        });
        this.el.btnCancelMicrophone.on('click', e => {
            //botão de cancelar a gravação
            this.closeRecordMicrophone();
        });
        this.el.btnFinishMicrophone.on('click', e => {
            //botão de concluir a gravação
            this.closeRecordMicrophone();
        });

        this.el.inputText.on('keypress', e => {
            //recebe o texto digitado e se for enter faz o click no botão de enviar
            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault();
                this.el.btnSend.click();

            }
        });

        this.el.inputText.on('keyup', e => {
            //trata de quando deve aparecer placeholder e o botão de enviar mensagem 
            if (this.el.inputText.innerHTML.length) {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }

        });

        this.el.btnSend.on('click', e => {
            //envia o texto em inputText
            console.log(this.el.inputText.innerHTML);
        });

        this.el.btnEmojis.on('click', e => {
            //abre e fecha o painel de emojis
            this.el.panelEmojis.toggleClass('open');
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            //seleciona os emojis para serem incluidos no inputText quando clicados
            emoji.on('click', e => {
                let img = this.el.imgEmojiDefault.cloneNode();
                //faz um clone do emoji para ser enviado no input text

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.classList.add(name);
                });
                //adiciona todas as classes que os emojis tem nas classes do img


                let cursor = window.getSelection();
                //recebe a seleção criada

                //descobre onde está focado o cursor para inserir o emoji onde ele estiver
                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    //se não estiver focado em nada e se o foco não for o input, coloca o focus no inputText 
                    this.el.inputText.focus();
                    let cursor = window.getSelection();//recebe onde no inputtext está a seleção
                }
                
                //subistituição de texto selecionado por emoji

                let range = document.createRange();
                //recebe o intervalo da seleção feita
                range = cursor.getRangeAt(0);//posição do cursor
                range.deleteContents();
                //deleta a seleção para subistituir por emoji

                let frag = document.createDocumentFragment();
                //cria um fragmento de um documento
                frag.appendChild(img);
                //framento recebe o emoji
                range.insertNode(frag);
                //insere o fragmento onde estava a seleção
                range.setStartAfter(img);
                //define que o cursor deve ficar depois do emoji

                this.el.inputText.dispatchEvent(new Event('keyup'));
                //precisa acionar o evento keyup para remover o placeholder 
            });
        });

    }

    startRecordMicrophoneTimer() {
        //inicia o timer da gravação de áudio
        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 100);//intervalo de atualização do timer
    }

    closeRecordMicrophone() {
        //esconde os botões de gravação de áudio  e mostra o botão de envio de áudio
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);//limpa o intervalo de gravação para a próxima gravação inicar zerada
    }

    closeAllMainPanel() {
        //fecha os paineis de envio arquivos da conversa
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
    }

    closeMenuAttach(e) {
        //fecha o menu de anexos da conversa
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
    }

    closeAllLeftPanel() {
        //fecha os paineis a esqueda
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}