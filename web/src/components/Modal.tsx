import * as React from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

interface ModalProps {
  modal: boolean;
  name: string;
  title: string;
  principalButton: {
    text: string;
    color: any;
    onClick(e: React.SyntheticEvent<HTMLButtonElement>): void;
  };
  fields: {
    typeComponent: string;
    name: string;
    label: string;
    icon: string;
    type: string;
    value?: string;
    options?: {value:string}[];
    onChangeHandler(e: React.FormEvent<HTMLInputElement>): void;
  }[]
  toggle(e: React.SyntheticEvent<HTMLButtonElement>): void;
}

export const Modal: React.FunctionComponent<ModalProps> = props => {
  return (
    <MDBModal isOpen={props.modal}>
      <MDBModalHeader>{props.title}</MDBModalHeader>
      <MDBModalBody>
        {
          props.fields.map(field => 
            field.typeComponent === 'INPUT' ?
              <MDBInput
                name={field.name}              
                label={field.label}
                icon={field.icon}
                type={field.type}              
                value={field.value}
                onChange={field.onChangeHandler}
              />
            : field.typeComponent === 'SELECT' ?
                field.options && 
                  <select className="browser-default custom-select">
                    <option value="" disabled selected>Choose priority</option>
                    {field.options.map(option =>
                      <option value={option.value}>{option.value}</option>                      
                    )}
                  </select>  
              : null                  
          )
        }
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn name={props.name} color="secondary" onClick={(e) => props.toggle(e)}>Cancel</MDBBtn>
        <MDBBtn 
          color={props.principalButton.color}
          onClick={props.principalButton.onClick}
        >
          {props.principalButton.text}
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  )
}