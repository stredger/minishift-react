import { isRequired } from './input/Validators'
import { selectTransform } from './datatransform'


const detailFields = [
  {
    name: 'mineName',
    validator: isRequired,
    inputGroup: 0,
    width: '100%',
  },
  {
    name: 'alias',
    inputGroup: 1,
    width: '50%',
  },
  {
    name: 'mineLocationName',
    title: 'Location',
    inputGroup: 1,
    width: '50%',
  },
  {
    name: 'district',
    inputGroup: 4,
    width: '50%',
  },
  {
    name: 'mineManager',
    inputGroup: 4,
    width: '50%',
  },
  {
    name: 'enteredBy',
    inputGroup: 5,
    width: '50%',
    disabled: true,
  },
  {
    name: 'enteredDate',
    inputGroup: 5,
    width: '50%',
    disabled: true,
  },
  {
    name: 'permitteeCompanyCode',
    title: 'Permittee Company',
    // type: 'data-select',
    // route: 'companies',
    validator: isRequired,
    // transform: selectTransform('companies', 'code', 'name'),
    inputGroup: 7,
    width: '25%',
  },
  {
    name: 'regionCode',
    title: 'Region',
    type: 'data-select',
    route: 'regions',
    validator: isRequired,
    transform: selectTransform('regions', 'code', 'name'),
    inputGroup: 7,
    width: '25%',
  },
  {
    name: 'mineTypeCode',
    title: 'Mine Type',
    type: 'data-select',
    route: 'minetypes',
    validator: isRequired,
    transform: selectTransform('mineTypes', 'code', 'name'),
    inputGroup: 7,
    width: '25%',
  },
  {
    name: 'mineStatusCode',
    title: 'Mine Status',
    type: 'data-select',
    route: 'minestatuses',
    validator: isRequired,
    transform: selectTransform('mineStatuses', 'code', 'name'),
    inputGroup: 7,
    width: '25%',
  },
  {
    name: 'major',
    type: 'checkbox',
    inputGroup: 8,
  },
  {
    name: 'underInvestigation',
    type: 'checkbox',
    inputGroup: 8,
  },
  {
    name: 'withIssues',
    type: 'checkbox',
    inputGroup: 8,
  },
]
export { detailFields }

const updateFields = [
  {
    name: 'mineName',
    validator: isRequired,
    inputGroup: 0,
    width: '100%',
  },
  {
    name: 'alias',
    inputGroup: 1,
    width: '50%',
  },
  {
    name: 'mineLocationName',
    title: 'Location',
    inputGroup: 1,
    width: '50%',
  },
  {
    name: 'district',
    inputGroup: 2,
    width: '50%',
  },
  {
    name: 'mineManager',
    inputGroup: 2,
    width: '50%',
  },
  {
    name: 'enteredBy',
    inputGroup: 3,
    width: '50%',
    disabled: true,
  },
  {
    name: 'enteredDate',
    inputGroup: 3,
    width: '50%',
    disabled: true,
  },
  {
    name: 'permitteeCompanyCode',
    title: 'Permittee Company',
    type: 'data-select',
    route: 'companies',
    validator: isRequired,
    transform: selectTransform('companies', 'code', 'name'),
    inputGroup: 4,
    width: '25%',
  },
  {
    name: 'regionCode',
    title: 'Region',
    type: 'data-select',
    route: 'regions',
    validator: isRequired,
    transform: selectTransform('regions', 'code', 'name'),
    inputGroup: 4,
    width: '25%',
  },
  {
    name: 'mineTypeCode',
    title: 'Mine Type',
    type: 'data-select',
    route: 'minetypes',
    validator: isRequired,
    transform: selectTransform('mineTypes', 'code', 'name'),
    inputGroup: 4,
    width: '25%',
  },
  {
    name: 'mineStatusCode',
    title: 'Mine Status',
    type: 'data-select',
    route: 'minestatuses',
    validator: isRequired,
    transform: selectTransform('mineStatuses', 'code', 'name'),
    inputGroup: 4,
    width: '25%',
  },
  {
    name: 'major',
    type: 'checkbox',
    inputGroup: 5,
  },
  {
    name: 'underInvestigation',
    type: 'checkbox',
    inputGroup: 5,
  },
  {
    name: 'withIssues',
    type: 'checkbox',
    inputGroup: 5,
  },
]
export { updateFields }

export default {
  updateFields,
  detailFields,
}
