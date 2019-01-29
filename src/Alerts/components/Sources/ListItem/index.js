import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single source list item component. Render single source details
 *
 * @class
 * @name SourcesListItem
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.url
 * @param {string} props.email
 * @param {string} props.mobile
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class SourcesListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { name, url, email, mobile } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="SourcesListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{name.toUpperCase().charAt(0)}</Avatar>
            )}
          </Col>
          <Col span={5}>{name}</Col>
          <Col span={6}>{url}</Col>
          <Col span={4}>{email}</Col>
          <Col span={4}>{mobile}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Source"
                  className="actionIcon"
                />
                <Icon
                  type="share-alt"
                  title="Share Source"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Source"
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

export default SourcesListItem;
