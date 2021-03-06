import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import './styles.css';

/**
 *
 * @class
 * @name RegionsListItem
 * @description  Single region list item component. Render single region details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RegionsListItem extends Component {
  // eslint-disable-next-line react/state-in-constructor
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
    const { name, family, nature, type, onEdit } = this.props;
    const { isHovered } = this.state;
    const avatarBackground = randomColor();

    return (
      <div
        className="RegionsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: avatarBackground }}>
                {name.charAt(0).toUpperCase()}{' '}
              </Avatar>
            )}
          </Col>
          <Col span={5}>{name}</Col>
          <Col span={6}>{nature}</Col>
          <Col span={4}>{type}</Col>
          <Col span={4}>{family}</Col>
          <Col span={3}>
            {isHovered && (
              <>
                <Icon
                  type="edit"
                  title="Update Region"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Region"
                  className="actionIcon"
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

RegionsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default RegionsListItem;
