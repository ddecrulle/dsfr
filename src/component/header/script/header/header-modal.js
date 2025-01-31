import api from '../../api.js';

class HeaderModal extends api.core.Instance {
  constructor () {
    super();
    this._clickHandling = this.clickHandler.bind(this);
  }

  static get instanceClassName () {
    return 'HeaderModal';
  }

  init () {
    this.isResizing = true;
  }

  resize () {
    if (this.isBreakpoint(api.core.Breakpoints.LG)) this.deactivateModal();
    else this.activateModal();
  }

  activateModal () {
    this.setAttribute('role', 'dialog');
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    modal.isEnabled = true;
    const buttons = modal.buttons;
    let id = '';
    for (const button of buttons) {
      id = button.id || id;
      if (button.isPrimary && id) break;
    }
    this.setAttribute('aria-labelledby', id);
    this.listen('click', this._clickHandling, { capture: true });
  }

  deactivateModal () {
    const modal = this.element.getInstance('Modal');
    if (!modal) return;
    modal.conceal();
    modal.isEnabled = false;
    this.removeAttribute('role');
    this.removeAttribute('aria-labelledby');
    this.unlisten('click', this._clickHandling, { capture: true });
  }

  clickHandler (e) {
    if (e.target.matches('a, button') && !e.target.matches('[aria-controls]') && !e.target.matches(api.core.DisclosureSelector.PREVENT_CONCEAL)) {
      const modal = this.element.getInstance('Modal');
      modal.conceal();
    }
  }
}

export { HeaderModal };
