import React from 'react';
import { hours } from './InfoCard';
import { TimePicker, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

declare interface EditOfficeHourProps {
  openHours: hours[],
  day: string,
  form: FormInstance
}

const { RangePicker } = TimePicker;

const EditOfficeHour = (props: EditOfficeHourProps) => {
  return (
    <Form.List name={props.day} key={props.day + "-picker-list"}>
      {
        (fields, { add, remove }) => {
          return (
            <>
              {
                fields.map((field, index) => (
                  <div key={props.day + "-" + field.key + "-item"}>
                    <Form.Item name={field.key} key={props.day + "-" + field.key + "-form-item"}>
                      <RangePicker
                        key={props.day + "-" + field.key + "-form-item-picker"}
                        className={'picker-input-color'}
                        picker={'time'}
                        format={'HH:mm'}
                        allowClear={false}
                        suffixIcon={null}
                        clearIcon={null}
                        minuteStep={15}
                      />
                    </Form.Item>
                    {
                      index !== fields.length - 1 &&
                      <span key={props.day + "-" + field.key + "-item-separator"} style={{
                        marginRight: '16px',
                      }}>
                        {'&'}
                      </span>
                    }
                  </div>
                ))
              }
              <div key={props.day + "-modifier"}>
                <PlusCircleOutlined
                  key={props.day + "-add-modifier"}
                  className={'dynamic-add-button'}
                  style={{
                    marginRight: '16px',
                    fontSize: '20px',
                  }}
                  onClick={() => {
                    add();
                  }}
                />
                {
                  fields.length > 0 &&
                  <MinusCircleOutlined
                    key={props.day + "-remove-modifier"}
                    className="dynamic-delete-button"
                    style={{
                      fontSize: '20px',
                    }}
                    onClick={() => {
                      remove(fields[fields.length - 1].name);
                    }}
                  />
                }
              </div>
            </>
          );
        }
      }
    </Form.List>
  );
};

export default EditOfficeHour;