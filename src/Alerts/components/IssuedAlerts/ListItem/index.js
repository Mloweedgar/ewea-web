import { Avatar, Checkbox, Col, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

/* constants */
const { confirm } = Modal;
const sideSpan = { xxl: 1, xl: 1, lg: 1, md: 2, sm: 3, xs: 3 };
const eventSpan = { xxl: 8, xl: 8, lg: 7, md: 8, sm: 19, xs: 19 };
const areaSpan = { xxl: 5, xl: 5, lg: 6, md: 5, sm: 0, xs: 0 };
const urgencySpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const statusSpan = { xxl: 3, xl: 3, lg: 3, md: 2, sm: 0, xs: 0 };
const severitySpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const isHoveredSpan = { xxl: 1, xl: 1, lg: 1, md: 1, sm: 2, xs: 2 };

/**
 * @class
 * @name AlertsListItem
 * @description Single alert list item component.
 * Render single alert details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertsListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    urgency: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseEnter ListItem event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseLeave ListItem event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * @function
   * @name handleToggleSelect
   * @description Handle Toggling List Item checkbox
   *
   * @param {object} event - Event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });
    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a alert
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { event, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${event} ?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onArchive();
      },
    });
  };

  render() {
    const {
      abbreviation,
      urgency,
      severity,
      status,
      description,
      event,
      color,
      location,
      onEdit,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const avatarBackground = color || randomColor();
    let sideComponent = null;

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: avatarBackground }}>
          {abbreviation}
        </Avatar>
      );
    }

    return (
      <div
        className="AlertsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col {...sideSpan}>{sideComponent}</Col>
          <Col {...eventSpan} title={description}>
            {event}
          </Col>
          <Col {...areaSpan}>{location}</Col>
          <Col {...statusSpan}>{status}</Col>
          <Col {...severitySpan}>{severity}</Col>
          <Col {...urgencySpan}>{urgency}</Col>
          <Col {...isHoveredSpan}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Alert',
                  title: 'Update Alert Details',
                  onClick: onEdit,
                }}
                archive={{
                  name: 'Archive Alert',
                  title: 'Remove Alert from list of active alerts',
                  onClick: this.showArchiveConfirm,
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AlertsListItem;
