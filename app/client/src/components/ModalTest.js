import React, { Component } from 'react';
import M from 'materialize-css';
// import 'materialize-css/dist/css/materialize.min.css';

export default class ModalTest extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        // console.log('Open Start');
      },
      onOpenEnd: () => {
        // console.log('Open End');
      },
      onCloseStart: () => {
        // console.log('Close Start');
      },
      onCloseEnd: () => {
        // console.log('Close End');
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%',
    };
    M.Modal.init(this.Modal, options);
  }

  clickCancel = () => {
    console.log('Disagreed');
  };
  clickSave = () => {
    console.log('Agreed');
  };

  render() {
    return (
      <>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          + NOVO LANÇAMENTO
        </a>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <form action="#">
              <div>
                <label>
                  <input name="out" type="radio" className="with-gap" />
                  <span>Despesas</span>
                </label>
              </div>
              <div>
                <label>
                  <input name="In" type="radio" className="with-gap" />
                  <span>Receitas</span>
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a
              className="modal-close waves-effect waves-red btn-flat"
              onClick={this.clickCancel}
            >
              Cancelar
            </a>
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={this.clickSave}
            >
              Salvar
            </a>
          </div>
        </div>
      </>
    );
  }
}
