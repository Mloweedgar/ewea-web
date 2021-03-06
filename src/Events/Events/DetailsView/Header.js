import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Text } = Typography;

/**
 * @function
 * @name EventDetailsViewHeader
 * @description Event Detaills header for drawer
 *
 * @param {object} props React props
 *
 * @returns {object} React component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const EventDetailsViewHeader = ({
  number = 'N/A',
  type = 'N/A',
  description = 'N/A',
}) => (
  <div>
    <h5>{`${type} - ${number}`}</h5>
    <Text type="secondary" style={{ fontSize: '12px' }}>
      {description}
    </Text>
  </div>
);

EventDetailsViewHeader.propTypes = {
  number: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EventDetailsViewHeader;
