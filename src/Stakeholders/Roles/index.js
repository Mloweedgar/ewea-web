import {
  Connect,
  getPartyRoles,
  openPartyRoleForm,
  selectPartyRole,
  closePartyRoleForm,
} from '@codetanzania/ewea-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RoleFilters from './Filters';
import RoleList from './List';
import RoleForm from './Form';
import NotificationForm from './NotificationForm';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name Roles
 * @description Render role module which has search box, actions and list of roles
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Roles extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedRoles: [],
    notificationBody: undefined,
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    getPartyRoles();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * @function
   * @name openForm
   * @description Open role form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openPartyRoleForm();
  };

  /**
   * @function
   * @name openForm
   * @description close role form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closePartyRoleForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchRoles
   * @description Search Roles List based on supplied filter word
   *
   * @param {object} event Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchRoles = event => {
    getPartyRoles({ q: event.target.value });
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} role - role to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = role => {
    selectPartyRole(role);
    this.setState({ isEditForm: true });
    openPartyRoleForm();
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify contacts
   *
   * @param {object[]} role List of contacts selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = role => {
    this.setState({
      selectedRoles: role,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify contacts
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeNotificationForm = () => {
    this.setState({ showNotificationForm: false });
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Performs after close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const { roles, loading, showForm, posting, page, total, role } = this.props;
    const {
      showFilters,
      isEditForm,
      showNotificationForm,
      selectedRoles,
      notificationBody,
    } = this.state;
    return (
      <div className="RoleList">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Search
              size="large"
              placeholder="Search for roles here ..."
              onChange={this.searchRoles}
              allowClear
              title="Search roles"
              className="SearchBox"
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Row type="flex" justify="end">
              <Col xxl={3} xl={5} lg={6} md={8} sm={24} xs={24}>
                <Button
                  block
                  type="primary"
                  icon="plus"
                  size="large"
                  title="Add new role"
                  onClick={this.openForm}
                >
                  New Role
                </Button>
              </Col>
            </Row>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <RoleList
          roles={roles}
          loading={loading}
          onEdit={this.handleEdit}
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Roles"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          maskClosable={false}
          destroyOnClose
          footer={null}
        >
          <RoleFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify according to roles"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
          afterClose={this.handleAfterCloseNotificationForm}
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            recipients={selectedRoles}
            body={notificationBody}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Role' : 'Add New Role'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <RoleForm
            posting={posting}
            isEditForm={isEditForm}
            role={role}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

Roles.propTypes = {
  showForm: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  role: PropTypes.shape({
    name: PropTypes.string,
    abbreviation: PropTypes.string,
    description: PropTypes.string,
  }),
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

Roles.defaultProps = {
  role: null,
};

export default Connect(Roles, {
  roles: 'partyRoles.list',
  role: 'partyRoles.selected',
  showForm: 'partyRoles.showForm',
  posting: 'partyRoles.posting',
  loading: 'partyRoles.loading',
  page: 'partyRoles.page',
  total: 'partyRoles.total',
});
