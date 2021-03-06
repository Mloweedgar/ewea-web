import PropTypes from 'prop-types';
import React from 'react';
import districtIcon from '../assets/icons/geographicalfeatures/district.svg';
import EvacuationIcon from '../assets/icons/geographicalfeatures/evacuationcenters.svg';
import facilitiesIcon from '../assets/icons/geographicalfeatures/facilities.svg';
import infrastructureIcon from '../assets/icons/geographicalfeatures/infrastructures.svg';
import warehousesIcon from '../assets/icons/geographicalfeatures/warehouse.svg';
import regionIcon from '../assets/icons/geographicalfeatures/region.svg';
import subwardIcon from '../assets/icons/geographicalfeatures/subward.svg';
import wardIcon from '../assets/icons/geographicalfeatures/ward.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

/* constants */
const routes = [
  {
    name: 'Regions',
    path: '/regions',
    icon: regionIcon,
    description: modules.geographicalFeaturesRegions,
  },
  {
    name: 'Districts',
    path: '/districts',
    icon: districtIcon,
    description: modules.geographicalFeaturesDistricts,
  },
  {
    name: 'Wards',
    path: '/wards',
    icon: wardIcon,
    description: modules.geographicalFeaturesWards,
  },
  {
    name: 'Subwards',
    path: '/subwards',
    icon: subwardIcon,
    description: modules.geographicalFeaturesSubwards,
  },
  {
    name: 'Evacuation Centers',
    path: '/evacuationcenters',
    icon: EvacuationIcon,
    description: modules.geographicalFeaturesEvacuationCenters,
  },
  {
    name: 'Facilities',
    path: '/facilities',
    icon: facilitiesIcon,
    description: modules.geographicalFeaturesFacilities,
  },
  {
    name: 'Warehouses',
    path: '/warehouses',
    icon: warehousesIcon,
    description: modules.geographicalFeaturesWarehouses,
  },
  {
    name: 'Critical Infrastructure',
    path: '/infrastructure',
    icon: infrastructureIcon,
    description: modules.geographicalFeaturesCriticalInfrastructure,
  },
];

/**
 * @function
 * @name GeographicalFeatures
 * @description Home component which shows to navigation menu
 *
 * @param {object} props props object
 * @param {object} props.match match object from url router
 * @returns {object} React Navigation Component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const GeographicalFeatures = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
GeographicalFeatures.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default GeographicalFeatures;
