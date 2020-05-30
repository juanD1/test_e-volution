import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import DateTimePicker from 'react-datetime-picker';

interface ModalProps {
  modal: boolean;
  name: string;
  title: string;
  principalButton: {
    text: string;
    color: any;
    disabled?: boolean;
    onClick(e: React.SyntheticEvent<HTMLButtonElement>): void;
  };
  fields: {
    typeComponent: string;
    name: string;
    label?: string;
    icon?: string;
    type?: string;
    value?: any;
    dateTimevalue?: Date;
    options?: { value: string }[];
    onChangeHandler?(e: any): void;
  }[];
  toggle(e: React.SyntheticEvent<HTMLButtonElement>): void;
}

export const Modal: React.FunctionComponent<ModalProps> = props => {
  const [disabledPrinciplaButton, setDisabledPrinciplaButton] = useState<boolean>(true);

  const validateFileds = () => {
    const filteredFiles = props.fields.map(field => {
      const { value, dateTimevalue } = field;
      let toReturn;
      if (value) {
        toReturn = { value };
      } else if (dateTimevalue) {
        toReturn = { dateTimevalue };
      }
      return toReturn;
    });
    const validValuesFields = filteredFiles.filter(item => item);

    const { length: fieldsLength } = props.fields;
    const { length: validFieldsLength } = validValuesFields;

    validFieldsLength !== fieldsLength ? setDisabledPrinciplaButton(true) : setDisabledPrinciplaButton(false);
  };

  useEffect(() => {
    validateFileds();
  }, [props.fields, validateFileds]);

  return (
    <MDBModal isOpen={props.modal}>
      <MDBModalHeader>{props.title}</MDBModalHeader>
      <MDBModalBody>
        {props.fields.map((field, key) =>
          field.typeComponent === 'INPUT' ? (
            <MDBInput
              key={key}
              name={field.name}
              label={field.label}
              icon={field.icon}
              type={field.type}
              value={field.value}
              onChange={field.onChangeHandler}
            />
          ) : field.typeComponent === 'SELECT' ? (
            field.options && (
              <select
                className="browser-default custom-select"
                key={key}
                name={field.name}
                value={field.value}
                onChange={field.onChangeHandler}
              >
                <option value="" disabled selected>
                  Choose priority
                </option>
                {field.options.map((option, key) => (
                  <option key={key} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            )
          ) : field.typeComponent === 'DATETIMEPICKER' ? (
            <div key={key} style={{ display: 'grid', marginTop: 25 }}>
              <DateTimePicker
                name={field.name}
                value={field.dateTimevalue}
                minDate={new Date()}
                onChange={field.onChangeHandler}
              />
            </div>
          ) : field.typeComponent === 'TEXT' ? (
            <p key={key}>{field.label}</p>
          ) : null,
        )}
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn name={props.name} color="secondary" onClick={e => props.toggle(e)}>
          Cancel
        </MDBBtn>
        <MDBBtn
          color={props.principalButton.color}
          disabled={disabledPrinciplaButton}
          onClick={props.principalButton.onClick}
        >
          {props.principalButton.text}
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};
