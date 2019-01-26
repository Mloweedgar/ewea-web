import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single role list item component. Render single role details
 *
 * @class
 * @name RoleListItem
 *
 * @param {Object} props
 * @param {string} props.abbreviation
 * @param {string} props.name
 * @param {string} props.description
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RoleListItem extends Component {
  state = {
    isHovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { abbreviation, name, description } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="RoleListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{abbreviation}</Avatar>
            )}
          </Col>
          <Col span={9}>{name}</Col>
          <Col span={10}>{description}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon type="edit" title="Update Role" className="actionIcon" />
                <Icon
                  type="database"
                  title="Archive Role"
                  className="actionIcon"
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

/* props validation */
RoleListItem.propTypes = {
  abbreviation: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default RoleListItem;
