import {
  clearFeatureFilters,
  Connect,
  filterFeatures,
} from '@codetanzania/ewea-api-states';
import { Button, Checkbox, Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 *
 * @class
 * @name CriticalInfrastructuresFilters
 * @description Filter modal component for filtering critical infrastructures
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class CriticalInfrastructuresFilters extends Component {
  /**
   *
   * @function
   * @name handleSubmit
   * @description Handle filter action
   *
   * @param {object} e event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      onCancel,
    } = this.props;

    validateFields((error, values) => {
      if (!error) {
        filterFeatures(values);
        onCancel();
      }
    });
  };

  /**
   *
   * @function
   * @name handleClearFilter
   * @description Action handle when clear
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleClearFilter = () => {
    const { onCancel } = this.props;
    clearFeatureFilters();
    onCancel();
  };

  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      filter,
      nature,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        {/* start critical infrastructures nature filters */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...formItemLayout} label="By Nature">
          {getFieldDecorator('nature', {
            initialValue: filter ? filter.nature : [],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                {nature.map(natureItem => (
                  <Col span={6} style={{ margin: '10px 0' }} key={natureItem}>
                    <Checkbox value={natureItem}>{natureItem}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>
        {/* end critical infrastructures nature filters */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleClearFilter}>
            Clear
          </Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Filter
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

CriticalInfrastructuresFilters.propTypes = {
  nature: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.objectOf(
    PropTypes.shape({
      nature: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

CriticalInfrastructuresFilters.defaultProps = {
  filter: null,
};

export default Form.create()(
  Connect(CriticalInfrastructuresFilters, {
    filter: 'features.filter',
    nature: 'features.schema.properties.nature.enum',
  })
);
