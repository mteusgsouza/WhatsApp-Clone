class WhatsAppController {

    constructor() {

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements() {
        //carrega todos os elementos da página e cria os atributos para cada um, formatados no padrão camelCase
        this.el = {};
        //recebe todos os elementos com id tratados

        document.querySelectorAll('[id]').forEach(element => {
            //seleciona todos os elementos html que possuem id
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementsPrototype() {
        // metodo que adiciona funções reaproveitaveis aos elementos
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
        this.el.myPhoto.on('click', e => { //abre o painel de edição do perfil, fechando os paineis esquerdos que estiverem aberto antes
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);//tempo necessário para carregar a transição do css

        });
        this.el.btnNewContact.on('click', e => { //abre o painel de adicinar contato, fechando os paineis esquerdos que estiverem aberto antes
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);

        });
        this.el.btnClosePanelEditProfile.on('click', e => { //fecha o painel de edição de perfil
            this.el.panelEditProfile.removeClass('open');
        });
        this.el.btnClosePanelAddContact.on('click', e => { //fecha o painel de adicionar contato
            this.el.panelAddContact.removeClass('open');

        });
        this.el.photoContainerEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click();
        });
        this.el.inputNamePanelEditProfile.on('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        })
        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });
        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact)
        });
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', e => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });
            });
        });
        this.el.btnAttach.on('click', e => {
            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });
        this.el.btnAttachPhoto.on('click', e => {
            console.log('photo')
        });
        this.el.btnAttachCamera.on('click', e => {
            console.log('Camera')
        });
        this.el.btnAttachDocument.on('click', e => {
            console.log('Document')
        });
        this.el.btnAttachContact.on('click', e => {
            console.log('Contact')
        });

    }

    closeMenuAttach(e) {
        document.removeEventListener('click', this.closeMenuAttach);

        this.el.menuAttach.removeClass('open');

    }

    closeAllLeftPanel() {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }
}